import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PinchGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type CustomImage = {
  id: string;
  uri: string;
  position: { x: number; y: number };
  scale: number;
  zIndex: number;
  side: 'Front' | 'Back';
  shape: 'none' | 'circle' | 'square';
};

type Props = {
  img: CustomImage;
  containerWidth: number;
  containerHeight: number;
  imageSize: number;
  onDragEnd: (id: string, x: number, y: number) => void;
  onScaleEnd: (id: string, scale: number) => void;
  isSelected: boolean;
  onSelect: () => void;
};

type PanContext = {
  startX: number;
  startY: number;
};

type PinchContext = {
  startScale: number;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function DraggableImage({
  img,
  containerWidth,
  containerHeight,
  imageSize,
  onDragEnd,
  onScaleEnd,
  isSelected,
  onSelect,
}: Props) {
  const translateX = useSharedValue(img.position.x);
  const translateY = useSharedValue(img.position.y);
  const scale = useSharedValue(img.scale);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      let newX = ctx.startX + event.translationX;
      let newY = ctx.startY + event.translationY;

      newX = Math.min(Math.max(newX, 0), containerWidth - imageSize * scale.value);
      newY = Math.min(Math.max(newY, 0), containerHeight - imageSize * scale.value);

      translateX.value = newX;
      translateY.value = newY;
    },
    onEnd: () => {
      runOnJS(onDragEnd)(img.id, translateX.value, translateY.value);
    },
  });

  const pinchGestureHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    PinchContext
  >({
    onStart: (_, ctx) => {
      ctx.startScale = scale.value;
    },
    onActive: (event, ctx) => {
      let newScale = ctx.startScale * event.scale;
      if (newScale < 0.5) newScale = 0.5;
      if (newScale > 3) newScale = 3;
      scale.value = newScale;
    },
    onEnd: () => {
      runOnJS(onScaleEnd)(img.id, scale.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: imageSize,
    height: imageSize,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    zIndex: img.zIndex,
    borderWidth: isSelected ? 2 : 0,
    borderColor: isSelected ? 'red' : 'transparent',
    borderRadius:
      img.shape === 'circle'
        ? imageSize / 2
        : img.shape === 'none'
        ? 16 // rounded-xl setara borderRadius 16
        : 0,
    overflow: 'hidden',
  }));

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={animatedStyle}>
        <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
          <Animated.View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={onSelect}>
              <Image
                source={{ uri: img.uri }}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius:
                      img.shape === 'circle'
                        ? imageSize / 2
                        : img.shape === 'none'
                        ? 16
                        : 0,
                  },
                ]}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
}
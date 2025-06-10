import React, { useRef } from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PinchGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
  GestureHandlerRootView,
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

  const panRef = useRef(null);
  const pinchRef = useRef(null);

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

      const scaledSize = imageSize * scale.value;
      const maxX = containerWidth - scaledSize;
      const maxY = containerHeight - scaledSize;

      newX = Math.min(Math.max(newX, 0), maxX > 0 ? maxX : 0);
      newY = Math.min(Math.max(newY, 0), maxY > 0 ? maxY : 0);

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
      newScale = Math.max(0.5, Math.min(newScale, 3));
      scale.value = newScale;

      // Optional: adjust position to keep within bounds during scale
      const scaledSize = imageSize * newScale;
      const maxX = containerWidth - scaledSize;
      const maxY = containerHeight - scaledSize;

      translateX.value = Math.min(Math.max(translateX.value, 0), maxX > 0 ? maxX : 0);
      translateY.value = Math.min(Math.max(translateY.value, 0), maxY > 0 ? maxY : 0);
    },
    onEnd: () => {
      runOnJS(onScaleEnd)(img.id, scale.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius =
      img.shape === 'circle'
        ? imageSize / 2
        : img.shape === 'none'
        ? 16
        : 0;

    return {
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
      borderRadius,
      overflow: 'hidden',
    };
  });

  const imageStyle = StyleSheet.create({
    image: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      borderRadius:
        img.shape === 'circle'
          ? imageSize / 2
          : img.shape === 'none'
          ? 16
          : 0,
    },
  });

  return (
    <PanGestureHandler
      ref={panRef}
      simultaneousHandlers={pinchRef}
      onGestureEvent={panGestureHandler}
    >
      <Animated.View style={animatedStyle}>
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={panRef}
          onGestureEvent={pinchGestureHandler}
        >
          <Animated.View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={onSelect}>
              <AnimatedImage
                source={{ uri: img.uri }}
                style={imageStyle.image}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
}
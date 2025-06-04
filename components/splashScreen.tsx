// components/splashScreen.tsx
import React, { useRef } from "react";
import { View } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

export type SplashVideoScreenProps = {
  onFinish: () => void;
};

export default function SplashVideoScreen({ onFinish }: SplashVideoScreenProps) {
  const videoRef = useRef<Video>(null);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      onFinish();
    }
  };

  return (
    <View className="flex-1 bg-blue-500">
      <Video
        ref={videoRef}
        source={require("../assets/splash.mp4")}
        style={{ flex: 1 }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        useNativeControls={false}
        isMuted={false}
      />
    </View>
  );
}

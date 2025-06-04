import { useRouter } from "expo-router";
import SplashVideoScreen, { SplashVideoScreenProps } from "../components/splashScreen";

export default function Splash() {
  const router = useRouter();

  const handleFinish: SplashVideoScreenProps["onFinish"] = () => {
    router.replace("/(tabs)");
  };

  return <SplashVideoScreen onFinish={handleFinish} />;
}
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';

const app = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/splash");
  }, []);

  return null;
}

export default app
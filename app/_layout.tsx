
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from '@/lib/auth';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!





  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "JakartaMedium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakartasemibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
  <Stack>
    <Stack.Screen name="index"  options={{ headerShown: false }} />
    <Stack.Screen name="(root)"  options={{ headerShown: false }} />
    <Stack.Screen name="(auth)"  options={{ headerShown: false }} />
    <Stack.Screen name="+not-found" options={{ headerShown: false }} />
  </Stack>
  </ClerkLoaded>
  </ClerkProvider>
  );
}

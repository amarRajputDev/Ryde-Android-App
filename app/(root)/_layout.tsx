

import 'react-native-reanimated';

import { Stack } from 'expo-router';


export default function RootLayout() {
  


  return (
  <Stack>
    <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
    <Stack.Screen name="Find-ride"  options={{ headerShown: false }} />
    <Stack.Screen name="confirm-ride"  options={{ headerShown: false }} />
    <Stack.Screen name="book-ride"  options={{ headerShown: false }} />
   
  </Stack>
  );
}

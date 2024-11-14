import 'react-native-gesture-handler';
import { Redirect } from 'expo-router'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'


function Home() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/Home"} />
  }
  return ( 


      <Redirect href="/(auth)/welcome" />

  )
}

export default Home

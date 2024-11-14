import { View, Text } from 'react-native'
import React from 'react'
import { useLocationStore } from '@/store'
import RideLayout from '../components/RideLayout'
import GoogleTextInput from '../components/GoogleTextInput'
import { icons } from '../constants'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

export default function FindRide() {
    const { userAddress , destinationAddress , setUserLocation ,setDestinationLocation} = useLocationStore()
  return (
    <RideLayout title='Ride' snapPoints={["20%","80%"]} >
      <View style={{marginVertical:12  }}>
        <Text style={{fontSize:16 , fontFamily:"Jakartasemibold" , marginBottom:12}}>From</Text>
        <GoogleTextInput
        icon={icons.target}
        initialLocation={userAddress!}
        containerStyle={{backgroundColor : 'rgb(245 245 245)'}}
        textInputBackgroundColor='#f5f5f5'
        handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View style={{marginVertical:12 }}>
        <Text style={{fontSize:16 , fontFamily:"Jakartasemibold" , marginBottom:12}}>To</Text>
        <GoogleTextInput
        icon={icons.map}
        initialLocation={destinationAddress!}
        containerStyle={{backgroundColor : 'rgb(245 245 245)'}}
        textInputBackgroundColor='transparent'
        handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
      title='Find Now'
      onPress={()=>router.push("/(root)/confirm-ride")}
      Bstyles={{height :50   , borderRadius : 50 , marginBottom : 20 } } // Provide appropriate styles or an empty object
            Tstyles={{color: 'white', fontFamily: 'Jakarta-Bold', fontWeight: 'bold'}}
      />

      <View style={{height:200}}></View>

    </RideLayout>
  )
}
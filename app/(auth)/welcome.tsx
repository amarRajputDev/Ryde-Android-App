import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'
import { icons, onboarding } from '../constants'
import { StyleSheet } from 'react-native'
import CustomButton from '../components/CustomButton'

function OnBoarding() {
   const swiperref = useRef<Swiper>(null)
   const [activeIndex, setactiveIndex] = useState(0)
   const isLastSlide = activeIndex === onboarding.length-1
  return (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    <TouchableOpacity onPress={()=>{
        router.replace("/(auth)/signup")
    }} style={{ width: '100%',  alignItems: 'flex-end', padding: 20 , position:"absolute" , top:25 , zIndex : 2}}>
        <Text style={{ fontFamily: 'Jakarta-Bold' }}>
        Skip
        </Text>
    </TouchableOpacity>
        <Swiper
        ref={swiperref}
        loop={false}
        dot={<View style={{ width: 25, height: 5, marginHorizontal: 4, backgroundColor: '#E2E8F0', borderRadius: 50 }} />}
        activeDot={<View style={{ width: 25, height: 5, marginHorizontal: 4, backgroundColor: '#0286FF', borderRadius: 50 }} />}
        onIndexChanged={(index) => setactiveIndex(index)}
        >
         {onboarding.map((items)=>(
         <View key={items.id} style={styles.swiperScreen}>
            <Image source={items.image} style={styles.image} />
            <View style={styles.container}>
            <Text style={styles.Text}>{items.title}</Text>
         <Text style={styles.Description}>{items.description}</Text>
            </View>
         </View>
         ))}
        </Swiper>
        <CustomButton 
            title={isLastSlide? "Get Started" : "Next" } 
            onPress={() => isLastSlide ? router.replace("/(auth)/signup") : swiperref.current?.scrollBy(1)}
           
            Bstyles={{height :50  , width : "80%" , borderRadius : 50 , marginBottom : 20 } } // Provide appropriate styles or an empty object
            Tstyles={{color: 'white', fontFamily: 'Jakarta-Bold', fontWeight: 'bold'}}
        />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    swiperScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    },

    image:{
    width: '100%',
    height: 300,
    },

    container : {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 0,
    
    },

    Text : {
    fontSize: 24,
    fontFamily: 'Jakarta-Bold',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    
    },

    Description :{
    fontSize: 16,
    fontFamily: 'Jakartasemibold',
    textAlign: 'center',
    color: '#858585',
    marginLeft: 10,
    marginRight: 10,
    
    }
    
  });

export default OnBoarding

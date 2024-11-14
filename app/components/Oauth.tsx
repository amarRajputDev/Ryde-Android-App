import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '../constants'

export default function Oauth() {
    const googleAuth = () =>{
        
    }
  return (
    <View>
        <View style={{display:"flex" , flexDirection:'row', justifyContent: 'center', alignItems: 'center' , gap:10}}>
            <View  style={{ height: 1,width:90, backgroundColor: 'black'}} />
            <Text style={{ fontSize: 20, fontFamily: 'Jakartasemibold' }}>Or</Text>
            <View  style={{ height: 1,width:90, backgroundColor: 'black'}} />
        </View>

        <CustomButton 
            title="Sign Up With Google" 
            // onPress={onSignup}
            bgVariant='outline'
            textVariant='primary'
            onPress={googleAuth}
            IconLeft={()=>(
                <Image source={icons.google}
                resizeMode='contain'
                style={{width : 20 , height:20 , marginHorizontal:8}}
                />
                
            )}
            
            Bstyles={{height :50  , width : 300,marginTop : 20, borderRadius : 50 , shadowColor: 'transparent' , backgroundColor:"white" }} // Provide appropriate styles or an empty object
            Tstyles={{color: 'white', fontFamily: 'Jakarta-Bold', fontWeight: 'bold'}}
        />

    </View>
  )
} 

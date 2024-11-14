import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images, Primary } from '../constants'
import { StyleSheet } from 'react-native'
import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'
import { Link, useRouter } from 'expo-router'
import Oauth from '../components/Oauth'
import { useSignIn } from '@clerk/clerk-expo'

function Signin() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [Form, setForm] = useState({
    email:"",
    password:""
  })

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: Form.email,
        password : Form.password,
      })

      Alert.alert(signInAttempt.status)
      console.log(signInAttempt.status)

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, Form.email, Form.password])
  return (
  <ScrollView style={{flex:1 , backgroundColor : "white"}}>
    <View style={{flex:1 , backgroundColor : "white" }}>
      <View style={{ width: '100%', height: 240 , position : "relative" , marginBottom : 20}}>
        <Image
          source={images.signUpCar}
          style={{ width: '100%', height: 250  }}
        />
        <Text style={[Style.text]}>Log  In Your Account</Text>
      </View>
        

        <InputField
        label = "Email"
        placeholder = "Enter Your Email"
        value={Form.email}
        icon ={icons.email}
        onChangeText={(value) => setForm({...Form , email : value})}
        marginVertical={10}
        className={{width:300}}
        />

        <InputField
        label = "Password"
        placeholder = "Enter Your Password"
        value={Form.password}
        secureTextEntry = {true}
        icon ={icons.lock}
        onChangeText={(value) => setForm({...Form , password : value})}
        marginVertical={10}
        className={{width:300}}
        />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

<CustomButton 
            title="Sign in" 
            onPress={onSignInPress}
            
            Bstyles={{height :50  , width : 300,marginTop : 20, borderRadius : 50  } } // Provide appropriate styles or an empty object
            Tstyles={{color: 'white', fontFamily: 'Jakarta-Bold', fontWeight: 'bold'}}
        />

        {/* Oauth Button */}
        <Oauth />

        <Link href={"/(auth)/signup"}>
        <Text>Don't Have Account?</Text>
        <Text style={{color:Primary}}>Sign Up</Text>
        </Link>

        </View>

    </View>
  </ScrollView>
  )
}


const Style = StyleSheet.create({
  text:{
  fontSize: 24,
  fontFamily: 'Jakartasemibold',
  position: 'absolute',
  bottom: 5,
  left: 5,
  }

})

export default Signin

import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images, Primary } from '../constants'
import { StyleSheet } from 'react-native'
import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'
import { Link, router } from 'expo-router'
import Oauth from '../components/Oauth'
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'
import { fetchAPI } from '@/lib/fetch'

function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModel, setShowSuccessModel] = useState(false)
  const [Form, setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  const [verification, setverification] = useState({
    state : "default",
    error : "",
    code : ""
  })

  const [test, settest] = useState<String | null>("")

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: Form.email,
        password: Form.password,
 
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setverification({
        ...verification,
        state : 'pending'
      })
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error" , err.errors[0].longMessage)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code
      });

    
      settest(completeSignUp.status)

      if (completeSignUp.status === 'complete') {
        // TODO: create a database user!
        await fetchAPI(
          "/(api)/user" ,
          {
            method : "POST",
            body: JSON.stringify({
              name:Form.name,
              email:Form.email,
              clerkId: completeSignUp.createdUserId,
            })
          }
        )


        await setActive({ session: completeSignUp.createdSessionId })
        setverification({...verification , state : "success"})
      } else {
        setverification({...verification ,error: "verification failed", state : "failed"})

      }
    } catch (err: any) {
      setverification({...verification , error: err.errors[0].longMessage , state : "failed"})

    }
  }
  return (
  <ScrollView style={{flex:1 , backgroundColor : "white"}}>
    <View style={{flex:1 , backgroundColor : "white" }}>
      <View style={{ width: '100%', height: 240 , position : "relative" , marginBottom : 20}}>
        <Image
          source={images.signUpCar}
          style={{ width: '100%', height: 250  }}
        />
        <Text style={[Style.text]}>Create Your Account</Text>
      </View>
        <InputField
        label = "Name"
        placeholder = "Enter Your Name"
        value={Form.name}
        icon ={icons.person}
        onChangeText={(value) => setForm({...Form , name : value})}
        className={{width:300}}
        marginVertical={10}

        />

        <InputField
        label = "Email"
        placeholder = "Enter Your Email"
        value={Form.email}
        icon ={icons.email}
        onChangeText={(value) => setForm({...Form , email : value})}
        className={{width:300}}
        marginVertical={10}

        />

        <InputField
        label = "Password"
        placeholder = "Enter Your Password"
        value={Form.password}
        secureTextEntry = {true}
        icon ={icons.lock}
        onChangeText={(value) => setForm({...Form , password : value})}
        className={{width:300}}
        marginVertical={10}

        />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

<CustomButton 
            title="Sign Up" 
            onPress={onSignUpPress}
            
            Bstyles={{height :50  , width : 300,marginTop : 20, borderRadius : 50  } } // Provide appropriate styles or an empty object
            Tstyles={{color: 'white', fontFamily: 'Jakarta-Bold', fontWeight: 'bold'}}
        />

        {/* Oauth Button */}
        <Oauth />

        <Link href={"/(auth)/signin"}>
        <Text>Already Have Account?</Text>
        <Text style={{color:Primary}}>Log In </Text>
        </Link>

        

        </View>


        <ReactNativeModal
         isVisible={verification.state === "pending"}
         onModalHide={() =>{ if(verification.state === "success") setShowSuccessModel(true)}}
         >
        <View style={{marginHorizontal:28 , marginVertical:36 , borderRadius: 30, minHeight: 300,backgroundColor:"white" , padding:20}}>
          <Text style={{fontSize: 24, fontFamily: 'Jakarta-ExtraBold', marginBottom: 8}}>Verification</Text>
          <Text style={{fontSize: 14, fontFamily: 'Jakarta', marginBottom: 20}}>We Send a Verification Code to @{Form.email}</Text>
          <InputField
          label = "code"
          icon = {icons.lock}
          placeholder = "12345"
          value={verification.code}
          keyboardType='numeric'
          onChangeText={(value) => setverification({ ...verification, code: value })} // Simplified state update
          className={{width : 220 }}
          marginVertical={15}
          />
          {
            verification.error && (
            <Text style={{color: 'red', marginTop: 4}}>{verification.error}</Text>
            )
          }
          <CustomButton
          title='Verify Email'
          onPress={onPressVerify}
          bgVariant='success'
          Bstyles={{height:50}}
          />
          </View>

        </ReactNativeModal>


      <ReactNativeModal isVisible={showSuccessModel}>
      <View style={{marginHorizontal:28 , marginVertical:36 , borderRadius: 30, minHeight: 300,backgroundColor:"white"}}> 
        <Image source={images.check} style={{width:110 ,height:110,marginHorizontal:"auto" , marginVertical:20 }}/>
        <Text style={{fontSize: 20, fontFamily: 'Jakarta-Bold', textAlign: 'center'}}>Verified</Text>
        <Text style={{fontSize: 15, fontFamily: 'Jakarta', textAlign: 'center'}}>You have successfully verified your account</Text>
        <View style={{alignItems: 'center'}}>

        <CustomButton title = "Browse Home" bgVariant='success' Bstyles={{height:50 , width : "90%" , marginTop : 10}}  onPress={()=>{router.push("/(root)/(tabs)/Home")
          setShowSuccessModel(false)
         }} />
        </View>
      </View>

      </ReactNativeModal>
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

export default Signup

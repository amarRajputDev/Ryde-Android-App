import { InputFieldProps } from '@/types/type'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, View, TextInput, StyleSheet, Image, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Primary } from '../constants';

function InputField({
    label,
    labelStyle,
    placeholder,
    icon,
    iconStyle,
    secureTextEntry,
    inputStyle,
    className,
    marginVertical,
    ...props
}: InputFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
  return (
    <GestureHandlerRootView>
    <KeyboardAvoidingView behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ width: '100%' , marginVertical :marginVertical, justifyContent :"center" ,alignItems : "center" }}>
                <View >

               <Text style={{ fontSize: 15, fontFamily: 'Jakartasemibold', fontWeight: 'bold', marginBottom: 3, color: "black" }}>{label}</Text>
               <View style={[[className,style.container, { borderColor: isFocused ? Primary : 'transparent' }]]}>
                {icon && <Image source={icon} style ={[iconStyle , style.icon]} />}
               <TextInput
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}  // Set focus state to true
                    onBlur={() => setIsFocused(false)}  // Set focus state to false
                    style={[inputStyle, style.inputfield]}  // Add any additional styles for TextInput
                    secureTextEntry={secureTextEntry}
                    {...props}
                />

               </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
    container :{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor :"rgb(245 245 245)",
    // width : 300,
    paddingHorizontal : 7,
    height : 50
    
    },

    icon : {
        width : 20,
        height : 20,
        marginLeft:4
    },

    inputfield:{
    // borderRadius: 8, // rounded full
    padding: 4, // p4
    fontFamily: 'Jakartasemibold', // jakartasemi bold
    fontSize: 15, // text-15px
    flex: 1, // flex
    }

})

export default InputField

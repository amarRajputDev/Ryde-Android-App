import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { router } from 'expo-router';
import { icons } from '../constants';
import Map from './Map';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function RideLayout({title , children , snapPoints} : {title : string,children : React.ReactNode , snapPoints?:string[]}) {
    const { height: screenHeight } = Dimensions.get('window');
    const bottomsheetref = useRef<BottomSheet>(null)
  return (
    <GestureHandlerRootView>
        <View style={{flex:1 , backgroundColor:"white"} }>
            <View style={{display:"flex" , flexDirection:"column" , height:800 , backgroundColor:"#2f80ed"}}>
                <View style={{display:"flex" , flexDirection:"row" , position:"absolute" , zIndex:10 , top:50 ,alignItems:"center" , justifyContent:"center" , paddingHorizontal:20}}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <View style={{width:40 , height:40 ,backgroundColor:"white" , borderRadius:50 , alignItems:"center" , justifyContent:"center" }}>
                            <Image
                            source={icons.backArrow}
                            resizeMode ="contain"
                            style={{width:24 , height:24}}
                            />
                        </View>

                    </TouchableOpacity>
                    <Text style={{fontSize:16 , fontFamily:"Jakartasemibold" , marginLeft:20}}>{title || "Go Back"}</Text>

                </View>
                    <Map/>
            </View>
            <BottomSheet
             ref={bottomsheetref} 
             snapPoints={ snapPoints || ["45%" , "80%"]}
             index={0}
            //  keyboardBehavior='extend'
            //  android_keyboardInputMode='adjustResize'
             >
                <BottomSheetScrollView  style={{ flex:1 , padding:20 }}>
                    {children}

                </BottomSheetScrollView>
             </BottomSheet>
        </View>
    </GestureHandlerRootView>
  )
}
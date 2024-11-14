import { ButtonProps } from '@/types/type'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const getBgVarientStyle = (variant:ButtonProps["bgVariant"]) :object =>{
    switch(variant){
        case "secondary" :
            return { backgroundColor: "#6B7280" };

        case "danger" :
            return { backgroundColor: "#F56565" };

        case "success" :
            return { backgroundColor: "#22C55E" };  
            
        case "outline" :
            return { backgroundColor: "transparent", borderWidth: 1, borderColor: "black" };  

            default:
            return { backgroundColor: "#0286FF" };  
    }
}

const getTextVarientStyle = (variant:ButtonProps["textVariant"]) :object =>{
    switch(variant){
        case "primary" :
            return { color:"black" };  

        case "secondary" :
            return { color : "F7fafc" };

        case "danger" :
            return { color : "Fff5f5" };

        case "success" :
            return { color: "F0fff4" };  
            

            default:
            return { color: "white" };  
    }
}

function CustomButton({
    onPress,
    title,
    bgVariant = "primary" as ButtonProps["bgVariant"],
    textVariant = "default",
    IconLeft,
    IconRight,
    Bstyles,
    Tstyles,
    ...props
}: ButtonProps) {
  return (
  <TouchableOpacity onPress={onPress} style={[ Bstyles, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 50 }, getBgVarientStyle(bgVariant)]}>
    {IconLeft && <IconLeft />}
    <Text style={[Tstyles , getTextVarientStyle(textVariant)]}>{title}</Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
  )
}

export default CustomButton

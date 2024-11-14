import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


import { DriverCardProps } from "@/types/type";
import { icons } from "../constants";
import { formatTime } from "@/lib/util";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {

    useEffect(() => {
      console.log(item)
    }, [])
    
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={{
        backgroundColor: selected === item.id ? "#E6F3FF" : "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderRadius: 20,
      }}
   
    >
      <Image
        source={{ uri: item.profile_image_url }}
      
        style={{ width: 56, height: 56, borderRadius: 50 }}
      />

      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          marginHorizontal: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 4, // mb-1 = 4px in Tailwind
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "JakartaRegular",
            }}
          >
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 8,
            }}
          >
            <Image
              source={icons.star}
              style={{
                width: 14,
                height: 14,
                marginRight: 4,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "JakartaRegular",
              }}
            >
              4
            </Text>
          </View>
        </View>

        <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }}
>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Image
      source={icons.dollar}
      style={{
        width: 16,
        height: 16,
      }}
    />
    <Text
      style={{
        fontSize: 12,
        fontFamily: 'JakartaRegular',
        marginLeft: 4,
      }}
    >
      ${item.price? item.price : Math.floor(Math.random() * (20 - 10 + 1)) + 10}
    </Text>
  </View>

  <Text
    style={{
      fontSize: 12,
      fontFamily: 'JakartaRegular',
      color: '#4A5568', 
      marginHorizontal: 4,
    }}
  >
    |
  </Text>

  <Text
    style={{
      fontSize: 12,
      fontFamily: 'JakartaRegular',
      color: '#4A5568',
    }}
  >
    {item.time? formatTime(item.time!) : Math.floor(Math.random() * (20 - 10 + 1)) + 10 } Min
  </Text>

  <Text
    style={{
      fontSize: 12,
      fontFamily: 'JakartaRegular',
      color: '#4A5568',
      marginHorizontal: 4,
    }}
  >
    |
  </Text>

  <Text
    style={{
      fontSize: 12,
      fontFamily: 'JakartaRegular',
      color: '#4A5568',
    }}
  >
    {item.car_seats} seats
  </Text>
</View>

      </View>

      <Image
        source={{ uri: item.car_image_url }}
        style={{
            height: 56, 
            width: 56,  
          }}
          
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCard;

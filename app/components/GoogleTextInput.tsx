import "react-native-get-random-values"; // Ensure this is included
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import InputField from "./InputField";
import axios from "axios";
import { router } from "expo-router";
import { useLocationStore } from "@/store";

const googlePlaceApi = process.env.EXPO_GOOGLE_API_KEY;
export default function GoogleTextInput({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) {
  const [place, setplace] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [fullAddresses, setfullAddresses] = useState([]);
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [suggestion, setSuggestion] = useState(true)



  useEffect(() => {
    if (suggestion) {
      
      fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${place}&access_token=pk.eyJ1IjoiYW1hcmxvZGhpIiwiYSI6ImNtMzRnbzdwaDFyYWIyaXNhczhldnFnd2MifQ.eexmPzI8l_PoP6tAU6NYQg&autocomplete=true`
      )
        .then((response) => response.json()) // Parse JSON response
        .then((data) => {
          console.log(data.features[0].properties.full_address);
          const addresses = data.features.map((feature) => feature);
          console.log(addresses);
  
          setfullAddresses(addresses);
        }) // Set data in state
        .catch((error) => {
          console.error("Error fetching data:", error);
          setfullAddresses([]);
        }); // Handle errors
    }
  }, [place]);

  return (
    <>
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            zIndex: 10,
          
            paddingHorizontal: 20,

            borderRadius: 8,
            marginBottom: 20,
            gap: 10,
            
            // borderWidth: 2,          // Thickness of the border
            // backgroundColor: isFocused ? "black" : "white",     // Border color
          },
          containerStyle,
        ]}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            width: 24,
            height: 24,
          }}
        >
          <Image
            source={icon ? icon : icon?.search}
            style={{ width: 28, height: 28 }}
            resizeMode="contain"
          />
        </View>

        <TextInput
          value={place}
          style={style.textInputContainer}
          onFocus={() => setIsFocused(true)} // Set focus state to true
          onBlur={() => setIsFocused(false)}
          // marginVertical={10}
          placeholder="Where you want to go..."
          onChangeText={(value) => {
            setplace(value);
            setSuggestion(true)
            
            // console.log(value);
          }}
        />
      </View>
      {fullAddresses.length !== 0 ? (
        <View style={style.listContainer}>
          {fullAddresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              onPress={() => {
                setplace(address.properties.full_address)
                // console.log(address.properties.full_address)

                handlePress({
                  latitude: address.properties.coordinates.latitude!,
                  longitude: address.properties.coordinates.longitude!,
                  address: address.properties.full_address,
                });
                setSuggestion(false)
                setfullAddresses([])
              }}
            
            >
              <View >
                <Text style={style.addressText}>
                  {address.properties.full_address}
                </Text>

                <View
                  style={{
                    borderWidth: 0.5,
                    backgroundColor: "#A6AEBF",
                    borderColor: "#A6AEBF",
                    opacity: 0.1,
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}

const style = StyleSheet.create({
  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 2,
    position: "relative",
    shadowColor: "#d4d4d4",
    height: 50,
    width: 200,
  },
  listContainer: {
    // elevation: 100,
    zIndex: 50,
    position: "absolute",
    marginTop: 90,
    backgroundColor: "white",
    padding: 20,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    width: "100%",
    gap: 10,
  },

  addressText: {
    width: "100%", // Set a width to see the effect
    fontSize: 16,
    // lineHeight:1,
    marginBottom: 3,
  },
});

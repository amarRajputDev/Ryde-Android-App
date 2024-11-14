import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Ride } from "@/types/type";
import { colors, icons } from "../constants";
import { formatDate, formatTime } from "@/lib/util";

export default function RideCard({
  ride: {
    destination_address,
    destination_latitude,
    destination_longitude,
    origin_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) {
  return (
    <View style={style.container}>
      <View style={[style.innerView2]}>
        <View style={style.innerView}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={style.map}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 20,
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <Image source={icons.to} style={{ width: 20, height: 20 }} />
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "JakartaMedium",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {origin_address}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Image source={icons.point} style={{ width: 20, height: 20 }} />
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "JakartaMedium",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            // width: '100%',
            // flex:1,
            marginTop: 20,
            backgroundColor: colors.general[500],
            borderRadius: 28,
            padding: 14,
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 10,
            // borderWidth: 2,
          }}
        >

          {/* Date and time */}

          <View
            style={style.infoView}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color: "rgb(107 114 128)",
              }}
            >
              Time & Date
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color: "rgb(107 114 128)",
              }}
            >
              {formatDate(created_at)} , {formatTime(ride_time)}
            </Text>
          </View>


          {/* Driver's Name  */}
          <View
            style={style.infoView}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color: "rgb(107 114 128)",
              }}
            >
              Driver
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color: "rgb(107 114 128)",
              }}
            >
              {driver.first_name} {driver.last_name}
            </Text>
          </View>

          {/* Seats  */}
          <View
            style={style.infoView}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color: "rgb(107 114 128)",
              }}
            >
              Car's Seat
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color: "rgb(107 114 128)",
              }}
            >
              {driver.car_seats}
            </Text>
          </View>

          {/* Payment Staus  */}
          <View
           style={style.infoView}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color: "rgb(107 114 128)",
              }}
            >
              Payment Status
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: "JakartaMedium",
                color:payment_status === 'paid' ? "green" : "red",
              }}
            >
              {payment_status}
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    // width:300,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "rgb(212 212 212)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 12,
    paddingVertical: 10,
  },

  innerView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  innerView2: {
    display: "flex",
    // flex:1,
    width: 300,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  map: {
    width: 80,
    height: 90,
    borderRadius: 8,
  },
  infoView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "110%",
    // borderWidth: 2,
    // flex:1
    // marginBottom: 10,
  }
});

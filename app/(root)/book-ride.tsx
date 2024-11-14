import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View, StyleSheet } from "react-native";
import react, { useEffect, useState } from "react";

import { StripeProvider } from '@stripe/stripe-react-native';
import { useDriverStore, useLocationStore } from "@/store";
import RideLayout from "../components/RideLayout";
import { icons } from "../constants";
import { formatTime } from "@/lib/util";
import Payment from "../components/Payment";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();




  

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver
  )[0];

  return (
    <StripeProvider
    publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}
    merchantIdentifier="merchant.Ryde.com" // required for Apple Pay
    urlScheme="myapp" // required for 3D Secure and bank redirects
  >
    <RideLayout title="Book Ride" snapPoints={["40%" , "85%"]}>
      
        <Text style={styles.title}>Ride Information</Text>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            style={styles.profileImage}
          />

          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driverDetails?.title}</Text>

            <View style={styles.ratingContainer}>
              <Image source={icons.star} style={styles.starIcon} resizeMode="contain" />
              <Text style={styles.ratingText}>{driverDetails?.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rideDetailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ride Price</Text>
            <Text style={styles.detailValueGreen}>${driverDetails?.price ? driverDetails?.price  : 5 }</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup Time</Text>
            <Text style={styles.detailValue}>{ driverDetails.time ? formatTime(driverDetails?.time!) : "5 Min" }</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Car Seats</Text>
            <Text style={styles.detailValue}>{driverDetails?.car_seats}</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Image source={icons.to} style={styles.icon} />
            <Text style={styles.addressText}>{userAddress}</Text>
          </View>

          <View style={styles.addressRow}>
            <Image source={icons.point} style={styles.icon} />
            <Text style={styles.addressText}>{destinationAddress}</Text>
          </View>
        </View>
        <Payment />
    
    </RideLayout>
   
  </StripeProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Jakartasemibold",
    marginBottom: 12,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: "100%",
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  driverName: {
    fontSize: 18,
    fontFamily: "Jakartasemibold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 18,
    fontFamily: "Jakarta",
  },
  rideDetailsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#E6F3FF", // Replace with actual bg-general-600 color
    borderRadius: 24,
    marginTop: 20,
    width: "100%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 18,
    fontFamily: "Jakarta",
  },
  detailValue: {
    fontSize: 18,
    fontFamily: "Jakarta",
  },
  detailValueGreen: {
    fontSize: 18,
    fontFamily: "Jakarta",
    color: "#0CC25F",
  },
  addressContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 20,
    width: "100%",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#EBEBEB", // Replace with actual border-general-700
    borderBottomColor: "#4B5563",
    paddingVertical: 12,
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
  },
  addressText: {
    fontSize: 18,
    fontFamily: "Jakarta",
    marginLeft: 8,
  },
});

export default BookRide;

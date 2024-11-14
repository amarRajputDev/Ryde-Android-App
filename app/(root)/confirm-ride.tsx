import { View, Text, FlatList } from "react-native";
import React from "react";
import RideLayout from "../components/RideLayout";
import DriverCard from "../components/DriverCard";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";


export default function ConfirmRide() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id!))}
          />
        )}
        ListFooterComponent={() => (
          <View style={{ marginHorizontal: 20, marginTop: 40 }}>
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
              Bstyles={{ height: 50, borderRadius: 50, marginBottom: 20 }}
              Tstyles={{
                color: "white",
                fontFamily: "Jakarta-Bold",
                fontWeight: "bold",
              }}
            />
          </View>
        )}
      />
    </RideLayout>
  );
}

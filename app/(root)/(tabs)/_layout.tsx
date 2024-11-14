import "react-native-reanimated";

import { Stack, Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { icons } from "@/app/constants";

const TabIcon = ({focused , source}:{focused:boolean ,source:ImageSourcePropType })  => (
  <View style={{flex : 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50 , backgroundColor : `${focused ? "#00FF9C" : ""}`}}>
    <View style={{ borderRadius: 50, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' , backgroundColor : `${focused ? "#00FF9C" : ""}` }}>
    <Image source={source} tintColor="white" resizeMode="contain" style={{width:28 , height:28}} />  
    </View>
  </View>
);

export default function RootLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor:"white",
        tabBarShowLabel:false,
        tabBarStyle:{
          backgroundColor:"#333333",
          borderRadius:50,
          paddingBottom:0,
          overflow:"hidden",
          marginHorizontal:20,
          marginBottom:20,
          height:78,
          display:"flex",
          justifyContent:"space-between",
          alignItems :"center",
          flexDirection:"row",
          position:"absolute"
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.home} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.chat} />,
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.list} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.profile} />,
        }}
      />
    </Tabs>
  );
}

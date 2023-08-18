import { Drawer } from "expo-router/drawer";
import { useFonts } from "expo-font";
import { COLORS, images } from "../../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Image, SafeAreaView, Text, View } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";

export default Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Drawer
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 250,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
                backgroundColor: COLORS.lightWhite,
              }}
            >
              <Image
                source={images.profile}
                style={{ height: 130, width: 130, borderRadius: 65 }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                Andy
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                andy@gmail.com
              </Text>
            </View>
            <DrawerItemList {...props} style={{ fontSize: 25 }} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0,
        drawerActiveTintColor: COLORS.primary,
        drawerLabelStyle: {
          color: COLORS.primary,
          fontSize: 18,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          headerLeft: () => <DrawerToggleButton />,
          drawerIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          headerLeft: () => <DrawerToggleButton />,
          drawerIcon: () => <FontAwesome name="user" size={24} color="black" />,
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="downloads"
        options={{
          drawerLabel: "Downloads",
          title: "Downloads",
          headerLeft: () => <DrawerToggleButton />,
          drawerIcon: () => (
            <FontAwesome name="download" size={24} color="black" />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="favorites"
        options={{
          drawerLabel: "Favorites",
          title: "Favorites",
          headerLeft: () => <DrawerToggleButton />,
          drawerIcon: () => (
            <MaterialIcons name="favorite" size={24} color="black" />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          headerLeft: () => <DrawerToggleButton />,
          drawerIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
          headerTitleStyle: {
            color: "red",
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="help"
        options={{
          drawerLabel: "Help",
          title: "Help",
          headerLeft: () => <DrawerToggleButton />,
          drawerIcon: () => (
            <Entypo name="help-with-circle" size={24} color="black" />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="contactus"
        options={{
          drawerLabel: "Contact us",
          title: "Contact us",
          headerLeft: () => <DrawerToggleButton />,
          drawerIcon: () => <AntDesign name="phone" size={24} color="black" />,
        }}
      ></Drawer.Screen>
    </Drawer>
  );
};

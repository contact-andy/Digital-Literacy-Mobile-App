import { DrawerToggleButton } from "@react-navigation/drawer";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { COLORS, icons, images } from "../../../constants";
import { ScreenHeaderBtn } from "../../../components";

export default function ContactusPage() {
  return (
    <View style={styles.container}>
      {/* <Drawer.Screen
        options={{
          title: "Setting",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      /> */}
      <Drawer.Screen
        options={{
          title: "Conatct us",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Text>Setting PAGE </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

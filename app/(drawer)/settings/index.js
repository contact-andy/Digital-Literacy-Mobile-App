import { DrawerToggleButton } from "@react-navigation/drawer";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, icons, images } from "../../../constants";
import { ScreenHeaderBtn } from "../../../components";

export default function SettingsPage() {
  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "Andy",
  };
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
          title: "Settings",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <View style={styles.container}>
        <Image source={images.banner} style={styles.coverPhoto} />
        <View style={styles.avatarContainer}>
          <Text style={styles.name}>Manage Setting</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Language</Text>
          <TextInput
            style={styles.input}
            placeholder="Select Lanaguage"
            value={"Afan Oromo"}
            editable={false}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 50,
    resizeMode: "cover",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "white",
  },
  name: {
    marginTop: 35,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "60%",
    justifyContent: "space-between",
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

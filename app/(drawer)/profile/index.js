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

export default function ProfilePage() {
  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "Andy",
  };
  return (
    <View style={styles.container} automaticallyAdjustKeyboardInsets={true}>
      {/* <Drawer.Screen
        options={{
          title: "Setting",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      /> */}
      <Drawer.Screen
        options={{
          title: "Profile",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <View style={styles.container}>
        <Image source={images.banner} style={styles.coverPhoto} />
        <View style={styles.avatarContainer}>
          <Image source={images.profile} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
        </View>
        {/* <View style={styles.buttonContainer}>
          <Button title="Like" onPress={() => {}} />
          <Button title="Message" onPress={() => {}} />
          <Button title="Share" onPress={() => {}} />
        </View> */}

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={"Andy"}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={""}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
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
    height: 200,
    resizeMode: "cover",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "white",
  },
  name: {
    marginTop: 15,
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

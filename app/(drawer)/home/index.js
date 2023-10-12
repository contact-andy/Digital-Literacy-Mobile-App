import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../../constants";
import {
  CompletedVideos,
  RecentVideos,
  ScreenHeaderBtn,
  Welcome,
} from "../../../components";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import * as SQLite from "expo-sqlite";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let testCounter = 1;
  const onRefresh = useCallback(() => {
    testCounter++;
    setRefreshing(true);
    setIsLoading(!isLoading);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    console.log("From Home: " + isLoading);
  }, []);

  const ReloadComponent = () => {
    return <Text>{testCounter}</Text>;
  };

  const db = SQLite.openDatabase("db.testDb"); // returns Database object
  useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql(
      //   "DROP TABLE `favorites`",
      //   [],
      //   function (transaction, resultSet) {
      //     console.log("Drop table: favorites: ", resultSet);
      //   },
      //   function (transaction, error) {
      //     console.log("Error drop table", error);
      //   }
      // );

      // tx.executeSql(
      //   "DROP TABLE `videos`",
      //   [],
      //   function (transaction, resultSet) {
      //     console.log("Drop table: videos: ", resultSet);
      //   },
      //   function (transaction, error) {
      //     console.log("Error drop table", error);
      //   }
      // );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `videos` ( `id` int(11) NOT NULL,  `title` varchar(255) NOT NULL,  `description` text DEFAULT NULL,  `fileName` varchar(255) NOT NULL,  `poster` varchar(255) DEFAULT NULL,  `category` varchar(255) NOT NULL,  `language` varchar(255) NULL,  `MIMEType` varchar(255) NULL)",
        [],
        function (transaction, resultSet) {
          console.log("created table: videos: ", resultSet);
        },
        function (transaction, error) {
          console.log("Error create table", error);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `settings` ( `langauge` varchar(255) NULL,  `quality` varchar(255) NULL,`connectionType` varchar(255) NULL)",
        [],
        function (transaction, resultSet) {
          console.log("created table: settings: ", resultSet);
        },
        function (transaction, error) {
          console.log("Error create table", error);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `profile` ( `id` int(11) NOT NULL,  `firstName` varchar(255) NOT NULL, `middleName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL,   `sex` varchar(255) NOT NULL,  `dob` varchar(255)  NULL,  `email` varchar(255) NOT NULL,  `address` varchar(255) NULL)",
        [],
        function (transaction, resultSet) {
          console.log("created table: profile: ", resultSet);
        },
        function (transaction, error) {
          console.log("Error create table", error);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `favorites` ( `id` int(11) NOT NULL,  `title` varchar(255) NOT NULL,  `description` text DEFAULT NULL,  `fileName` varchar(255) NOT NULL,  `poster` varchar(255) DEFAULT NULL,  `category` varchar(255) NOT NULL,  `language` varchar(255) NULL)",
        [],
        function (transaction, resultSet) {
          console.log("created table: favorites: ", resultSet);
        },
        function (transaction, error) {
          console.log("Error create table", error);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `watched` ( `id` int(11) NOT NULL,`userId` int(11) NOT NULL,`videoId` int(11) NOT NULL)",
        [],
        function (transaction, resultSet) {
          console.log("created table: watched: ", resultSet);
        },
        function (transaction, error) {
          console.log("Error create table", error);
        }
      );
    });

    // db.transaction((tx) => {
    //   tx.executeSql("delete from `videos`");
    // });

    // console.log("All Tables Created!");
  }, [isLoading]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen
        options={{
          title: "Home",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
          drawerStyle: {
            backgroundColor: COLORS.white,
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: COLORS.primary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {/* <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      /> */}

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <View>
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  router.push(`/(drawer)/home/search/${searchTerm}`);
                }
              }}
              isLoading={isLoading}
            />
          </View>
          {/* <View style={{ backgroundColor: "red" }}>
            <Text>Start</Text>
            <ReloadComponent />
            <Text>End</Text>
          </View> */}
          {/* <RecentVideos /> */}
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
          >
            <CompletedVideos />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { Text, SafeAreaView } from "react-native";

import { CompletedVideoCard } from "../../../components";
import { COLORS, icons, SIZES } from "../../../constants";
import styles from "../../../styles/search";
import * as SQLite from "expo-sqlite";

const FavoritesPage = () => {
  const db = SQLite.openDatabase("db.testDb"); // returns Database object
  const params = { id: "Favorites" };
  const router = useRouter();
  const [downloadedVideo, setdownloadedVideo] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(false);
  let newPage = page;

  const handleSearch = async (newPage) => {
    setSearchLoader(true);
    let limit = 5;
    let offset = (newPage - 1) * limit;
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM favorites WHERE 1 ORDER BY id DESC limit ${limit} offset ${offset} `,
          null,
          (txObj, resultSet) => setSearchResult(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
      });
      console.log("Loading...");
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    // if (pageLimit === true) {
    console.log("Last Page");
    //   return;
    // }
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      newPage = page - 1;
      handleSearch(newPage);
    } else if (direction === "right" && pageLimit === false) {
      setPage(page + 1);
      newPage = page + 1;
      handleSearch(newPage);
    }
  };

  useEffect(() => {
    handleSearch(newPage);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleSearch(newPage);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
      showsVerticalScrollIndicator={false}
    >
      <Drawer.Screen
        options={{
          title: "Favorites",
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={searchResult}
        renderItem={({ item }) => (
          <CompletedVideoCard
            video={item}
            handleNavigate={() =>
              router.push(`/(drawer)/favorites/video-details/${item.id}`)
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedvideos}>
                Check all favorites video lists
              </Text>
              <Text style={styles.pageCounter}>page: {page}</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

export default FavoritesPage;

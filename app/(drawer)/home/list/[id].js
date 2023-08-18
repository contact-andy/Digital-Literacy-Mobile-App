import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import axios from "axios";

import { ScreenHeaderBtn, CompletedVideoCard } from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import styles from "../../../../styles/search";
import { SERVER } from "../../../../constants/url";

const VideoList = () => {
  const params = useSearchParams();
  const router = useRouter();
  console.log("Video list heree");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(false);
  let newPage = page;

  const handleSearch = async (newPage) => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `${SERVER.url}/api/video/cat/${params.id}/${newPage}`,
        // url: `http://192.168.145.254:5000/api/video/findAll/${params.id}`,
      };

      const response = await axios.request(options);
      console.log("options.url: " + options.url);
      console.log("response.data.length: " + response.data.length);
      console.log("pageLimit: " + pageLimit);
      if (response.data.length == 0) {
        setPageLimit(true);
      } else {
        setPageLimit(false);
      }
      console.log("pageLimit: " + pageLimit);
      setSearchResult(response.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    // if (pageLimit === true) {
    //   console.log("Last Page");
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "Home",
        }}
      />

      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <CompletedVideoCard
            video={item}
            handleNavigate={() =>
              router.push(`/(drawer)/home/video-details/${item.id}`)
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedVideos}>
                Check all video lists
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

export default VideoList;

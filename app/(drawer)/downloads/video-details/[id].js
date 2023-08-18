import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import useFetch from "../../../../hook/useFetch";
import DownloadView from "../../../../components/videodetails/company/DownloadView";
import * as SQLite from "expo-sqlite";

const tabs = ["About", "Additonal Materials"];

const VideoDetails = () => {
  const db = SQLite.openDatabase("db.testDb"); // returns Database object

  const params = useSearchParams();
  const router = useRouter();

  const { isLoading, error, refetch } = useFetch("id", params.id, 1);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const getVideo = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "Select * from `videos` where id=? ",
        [params.id],
        (txObj, resultSet) => {
          setData(resultSet.rows._array);
          console.log(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  useEffect(() => {
    getVideo();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getVideo();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Additonal Materials":
        return (
          <Specifics
            title="Additonal Materials"
            points={data[0].title["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].description ?? "No data provided here"} />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "Downloads",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <DownloadView
                id={data[0].id}
                title={data[0].title}
                description={data[0].description}
                fileName={data[0].fileName}
                poster={data[0].poster}
                category={data[0].category}
                langauge={data[0].language}
                MIMEType={data[0].MIMEType}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default VideoDetails;

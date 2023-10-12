import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./completedVideos.style";
import { COLORS } from "../../../constants";
import CompletedVideoCard from "../../common/cards/nearby/CompletedVideosCard";
import useFetch from "../../../hook/useFetch";

const CompletedVideos = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("cat", "Health", 1);
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed Digital Contents</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((video) => (
            <CompletedVideoCard
              video={video}
              key={`${video.id}`}
              handleNavigate={() =>
                router.push(`/(drawer)/home/video-details/${video.id}`)
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default CompletedVideos;

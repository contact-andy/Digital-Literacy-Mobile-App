import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./recentVideos.style";
import { COLORS, SIZES } from "../../../constants";
import PopularVideoCard from "../../common/cards/popular/PopularVideoCard";
import useFetch from "../../../hook/useFetch";

const RecentVideos = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("latest", 1, 5);

  const [selectedVideo, setSelectedVideo] = useState();

  const handleCardPress = (item) => {
    router.push(`/(drawer)/home/video-details/${item.id}`);
    setSelectedVideo(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Videos</Text>
        <TouchableOpacity>
          {/* <Text style={styles.headerBtn}>Show all</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularVideoCard
                item={item}
                selectedVideo={selectedVideo}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default RecentVideos;

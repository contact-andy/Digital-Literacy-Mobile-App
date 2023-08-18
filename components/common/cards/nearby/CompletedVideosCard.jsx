import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./completedVideoCard.style";
import { checkImageURL } from "../../../../utils";
import { SERVER } from "../../../../constants/url";
const CompletedVideoCard = ({ video, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(`${SERVER.url}/posters/` + video?.poster)
              ? `${SERVER.url}/posters/` + video?.poster
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.videoTitle} numberOfLines={1}>
          {video?.title}
        </Text>

        <Text style={styles.videoDesc} numberOfLines={2}>
          {video?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CompletedVideoCard;

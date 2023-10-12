import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./completedVideoCard.style";
import { checkImageURL } from "../../../../utils";
import { SERVER } from "../../../../constants/url";
const CompletedVideoCard = ({ video, handleNavigate }) => {
  console.log(video);
  const testImage = checkImageURL(`${SERVER.url}/posters/` + video?.poster)
    ? true
    : false;
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(`${SERVER.url}/posters/` + video?.poster)
              ? `${SERVER.url}/posters/` + video?.poster
              : `${SERVER.url}/posters/videoIcon.png`,
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

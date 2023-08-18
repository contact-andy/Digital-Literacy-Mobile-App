import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import styles from "./popularvideocard.style";
import { checkImageURL } from "../../../../utils";
import { SERVER } from "../../../../constants/url";
const PopularVideoCard = ({ item, selectedVideo, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedVideo, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedVideo, item)}>
        <Image
          source={{
            uri: checkImageURL(`${SERVER.url}/posters/` + item.poster)
              ? `${SERVER.url}/posters/` + item.poster
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      {/* <Text style={styles.companyName} numberOfLines={1}>
          {item.title}
        </Text> */}

      <View style={styles.infoContainer}>
        <Text style={styles.VideoName(selectedVideo, item)} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedVideo, item)} numberOfLines={1}>
            {item?.description}
          </Text>
          <Text style={styles.location}>{item.created_at}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularVideoCard;

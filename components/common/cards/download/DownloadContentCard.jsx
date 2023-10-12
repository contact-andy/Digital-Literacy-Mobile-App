import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

import styles from "./downloadContentCard.style";
import { checkImageURL } from "../../../../utils";
import { SERVER } from "../../../../constants/url";
import { AntDesign } from "@expo/vector-icons";
const DownloadContentCard = ({
  video,
  handleNavigate,
  deleteDownloadHandler,
}) => {
  // console.log(video);
  const deleteAlert = () =>
    Alert.alert("Download Deletion", "Are you sure want to delete?", [
      {
        text: "Delete",
        onPress: () => {
          deleteDownloadHandler(video.id);
        },
        style: "cancel",
      },
      { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
    ]);

  const testImage = checkImageURL(`${SERVER.url}/posters/` + video?.poster)
    ? true
    : false;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.innerContainer} onPress={handleNavigate}>
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
      <TouchableOpacity style={styles.deleteIcon} onPress={deleteAlert}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default DownloadContentCard;

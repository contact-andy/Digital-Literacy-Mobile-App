import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";

import styles from "./company.style";
import { COLORS, icons } from "../../../constants";
import { checkImageURL } from "../../../utils";
import * as FileSystem from "expo-file-system";
import { ResizeMode, Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
// import VideoPlayer from "expo-video-player";
// import Video from "react-native-video";
import { SERVER } from "../../../constants/url";
import { FontAwesome } from "@expo/vector-icons";
const DownloadView = ({
  id,
  title,
  description,
  fileName,
  poster,
  category,
  language,
  MIMEType,
}) => {
  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [base64, setBase64] = useState(null);
  // const MIMEType = "video/mp4";
  useEffect(() => {
    const getLocalFile = async () => {
      setIsLoading(true);
      let content = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + fileName,
        { encoding: FileSystem.EncodingType.Base64 }
      );
      setBase64(content);
      setIsLoading(true);
    };
    getLocalFile();
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "108%",
          height: 250,
          backgroundColor: COLORS.primary,
          marginTop: -25,
        }}
      >
        <Video
          ref={video}
          style={{ width: "100%", height: 250 }}
          source={{
            uri: `data:${MIMEType};base64,${base64}`,
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping={false}
          shouldPlay={true}
          // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <View style={styles.textContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              margin: 5,
              alignContent: "center",
              justifyContent: "flex-start",
            }}
          >
            <FontAwesome name="download" size={24} color="black" />
            <Text style={{ padding: 5 }}>Downloaded</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.jobName} numberOfLines={1}>
          {title}
        </Text>

        <Text style={styles.jobType}>{description}</Text>
        {/* {getVideo()} */}
      </View>
      {/* <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{descrption} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{id}</Text>
        </View>
      </View> */}
    </View>
  );
};

export default DownloadView;

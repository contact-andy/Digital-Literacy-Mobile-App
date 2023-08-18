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
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import useFetchLike from "../../../hook/useFetchLike";
import likeVideo from "../../../hook/likeVideo";
import unlikeVideo from "../../../hook/unlikeVideo";
import WatchVideo from "../../../hook/watchVideo";
import UnwatchVideo from "../../../hook/unwatchVideo";
import CheckWatchVideo from "../../../hook/checkWatchVideo";

const Company = ({
  id,
  title,
  description,
  fileName,
  poster,
  category,
  language,
}) => {
  const video = useRef(null);
  let userId = 1;
  const [watched, setWatched] = useState(false);
  const { youLike, setYouLike } = useFetchLike(userId, id, 0);
  const { countLike, setCountLike } = useFetchLike(userId, id, 1);
  const { youWatched, setYouWWatched } = CheckWatchVideo(
    userId,
    id,
    setWatched
  );

  const [status, setStatus] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(youLike?.length === 1 ? true : false);
  const [likeCounter, setLikeCounter] = useState(countLike);
  const [error, setError] = useState(false);
  const [downloadedVideo, setdownloadedVideo] = useState([]);
  // console.log("youWatched: " + youWatched);
  const db = SQLite.openDatabase("db.testDb"); // returns Database object

  const setWatchVideo = () => {
    WatchVideo(userId, id);
    console.log("Watched");
    setWatched(true);
  };

  const setUnwatchVideo = () => {
    UnwatchVideo(userId, id);
    console.log("Not Watched");
    setWatched(false);
  };

  const setLikeVideo = () => {
    let count = countLike + 1;
    setCountLike(count);
    setYouLike([{ id }]);
    likeVideo(userId, id, {
      id,
      title,
      description,
      fileName,
      poster,
      category,
      language,
    });
    console.log("countLike:" + countLike + " LIKE");
    setLike(false);
  };

  const setUnlikeVideo = () => {
    let count = countLike - 1;
    setCountLike(count);
    setYouLike([]);
    unlikeVideo(userId, id);
    console.log("countLike:" + countLike + " UNLIKE");
    setLike(true);
  };

  useEffect(() => {
    const getLocalFile = async () => {
      const permissions = await MediaLibrary.getPermissionsAsync();
      if (permissions.granted) {
        let content = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "bash.mp4",
          { encoding: FileSystem.EncodingType.Base64 }
        );
        console.log(content + "READING END HERE");
      }
    };

    // getLocalFile();
    // FileSystem.getContentUriAsync(
    //   "file://com.android.externalstorage.documents/tree/primary%3AMusic/csharp.mp4"
    // ).then((cUri) => {
    //   console.log(cUri);
    // });

    // db.transaction((tx) => {
    //   tx.executeSql("DROP TABLE `videos`"),
    //     function (error) {
    //       console.log(error.message);
    //     },
    //     function () {
    //       console.log("Created database OK");
    //     };
    // });
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "CREATE TABLE IF NOT EXISTS `videos` ( `id` int(11) NOT NULL,  `title` varchar(255) NOT NULL,  `description` text DEFAULT NULL,  `fileName` varchar(255) NOT NULL,  `poster` varchar(255) DEFAULT NULL,  `category` varchar(255) NOT NULL,  `language` varchar(255) NULL,  `MIMEType` varchar(255) NULL)"
    //   ),
    //     function (error) {
    //       console.log(error.message);
    //     },
    //     function () {
    //       console.log("Created table OK");
    //     };
    // });
    db.transaction((tx) => {
      tx.executeSql(
        `Select * from videos where id=${id}`,
        null,
        (txObj, resultSet) => setdownloadedVideo(resultSet.rows._array),
        (txObj, error) => console.log(error + "ERROR END")
      );
    });

    // db.transaction((tx) => {
    //   tx.executeSql("delete from `videos`");
    // });

    console.log("Created table OK");
  }, []);

  const getVideo = () => {
    return downloadedVideo.map((vid, index) => {
      return (
        <View key={index}>
          <Text>{vid.title}</Text>
          <Video
            ref={video}
            style={{ width: "100%", height: 250 }}
            source={{
              uri: `data:${vid.MIMEType};base64,${vid.base64}`,
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping={false}
            shouldPlay={false}
          />
        </View>
      );
    });
  };
  const storeVideo = ({
    id,
    title,
    description,
    fileName,
    poster,
    category,
    language,
    MIMEType,
  }) => {
    console.log("START...HERE");
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO `videos` (`id`, `title`, `description`, `fileName`, `poster`, `category`, `language`,`MIMEType`) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
        [
          id,
          title,
          description,
          fileName,
          poster,
          category,
          language,
          MIMEType,
        ],
        (txObj, resultSet) => {
          let existingVideos = [...downloadedVideo];
          existingVideos.push({
            id,
            title,
            description,
            fileName,
            poster,
            category,
            language,
          });
          setdownloadedVideo(existingVideos);
        },
        (txObj, error) => console.log(error)
      );
    });
    console.log("END HERE");
  };

  const downloadfromUrl = async () => {
    setIsLoading(true);
    try {
      let remoteUrl = `${SERVER.url}/videos/${fileName}`;
      let localPath = `${FileSystem.documentDirectory}${fileName}`;
      FileSystem.downloadAsync(remoteUrl, localPath).then((result) => {
        // console.log(uri + " Downloaded");
        setIsLoading(false);
        storeVideo({
          id,
          title,
          description,
          fileName,
          poster,
          category,
          language,
          MIMEType: result.headers["Content-Type"],
        });
      });
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

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
            // uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            uri: `${SERVER.url}/videos/${fileName}`,
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
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {downloadedVideo.length === 1 ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                margin: 5,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="download" size={24} color="black" />
              <Text style={{ padding: 5 }}>Saved</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                margin: 5,
                alignContent: "center",
                justifyContent: "center",
              }}
              onPress={downloadfromUrl}
            >
              <AntDesign name="download" size={24} color="black" />
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : error ? (
                <Text>Something went wrong</Text>
              ) : (
                <>
                  <Text style={{ padding: 5 }}>
                    Download
                    {/* {downloadedVideo.length} */}
                  </Text>
                </>
              )}
              {/* <Text>Download</Text> */}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              margin: 5,
              alignContent: "center",
              justifyContent: "center",
            }}
            onPress={() =>
              youLike?.length === 1 ? setUnlikeVideo() : setLikeVideo()
            }
          >
            {youLike?.length === 1 ? (
              <FontAwesome name="heart" size={24} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={24} color="black" />
            )}
            <Text style={{ padding: 5 }} t>
              {countLike > 0 ? countLike : ""}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              margin: 5,
              alignContent: "center",
              justifyContent: "center",
            }}
            onPress={() => (watched ? setUnwatchVideo() : setWatchVideo())}
          >
            {watched ? (
              <>
                <FontAwesome name="bookmark" size={24} color={COLORS.primary} />
                <Text style={{ padding: 5 }}>Watched</Text>
              </>
            ) : (
              <FontAwesome name="bookmark-o" size={24} color="black" />
            )}
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

export default Company;

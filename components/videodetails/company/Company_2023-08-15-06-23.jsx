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
const Company = ({ id, title, description, fileName, poster, category }) => {
  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [encodedBase64, setEncodedBase64] = useState();
  const [MIMEType, setMIMEType] = useState();
  const [downloadedVideo, setdownloadedVideo] = useState([]);

  const db = SQLite.openDatabase("db.testDb"); // returns Database object
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
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `videos` ( `id` int(11) NOT NULL,  `title` varchar(255) NOT NULL,  `description` text DEFAULT NULL,  `fileName` varchar(255) NOT NULL,  `poster` varchar(255) DEFAULT NULL,  `category` varchar(255) NOT NULL,  `base64` varchar(max) NOT NULL, `MIMEType` varchar(255) DEFAULT NULL )"
      ),
        function (error) {
          console.log(error.message);
        },
        function () {
          console.log("Created table OK");
        };
    });
    db.transaction((tx) => {
      tx.executeSql(
        "Select * from `videos`",
        null,
        (txObj, resultSet) => setdownloadedVideo(resultSet.rows._array),
        (txObj, error) => console.log(error + "ERROR END")
      );
    });
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
            // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
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
    base64,
    MIMEType,
  }) => {
    console.log("START...HERE");
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO `videos` (`id`, `title`, `description`, `fileName`, `poster`, `category`,`base64`,`MIMEType`) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
        [id, title, description, fileName, poster, category, base64, MIMEType],
        (txObj, resultSet) => {
          console.log(base64);
          let existingVideos = [...downloadedVideo];
          existingVideos.push({
            id,
            title,
            description,
            fileName,
            poster,
            category,
            base64,
            MIMEType,
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

      FileSystem.downloadAsync(remoteUrl, localPath).then(({ uri }) => {
        console.log(uri + " Downloaded");
        setIsLoading(false);
      });

      // const result = await FileSystem.downloadAsync(
      //   `${SERVER.url}/videos/${fileName}`,
      //   FileSystem.documentDirectory + fileName
      // );
      // console.log(result);

      // FileSystem.readAsStringAsync(result.uri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // })
      //   .then((base64) => {
      //     let MIMEType = result.headers["Content-Type"];
      //     console.log(base64);
      //     console.log("START...HERE");
      //     save(result.uri, fileName, result.headers["Content-Type"]);
      //     db.transaction((tx) => {
      //       tx.executeSql(
      //         "INSERT INTO `videos` (`id`, `title`, `description`, `fileName`, `poster`, `category`,`base64`,`MIMEType`) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
      //         [
      //           id,
      //           title,
      //           description,
      //           fileName,
      //           poster,
      //           category,
      //           base64,
      //           MIMEType,
      //         ],
      //         (txObj, resultSet) => {
      //           console.log(base64);
      //           let existingVideos = [...downloadedVideo];
      //           existingVideos.push({
      //             id,
      //             title,
      //             description,
      //             fileName,
      //             poster,
      //             category,
      //             base64,
      //             MIMEType,
      //           });
      //           setdownloadedVideo(existingVideos);
      //         },
      //         (txObj, error) => console.log(error)
      //       );
      //     });
      //     console.log("END HERE");
      //     setIsLoading(false);
      //   })
      //   .catch((e) => {
      //     console.log("There was an error saving the video:" + e);
      //   });
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  // let downloadedVideo = [];
  // const getAllVideo = async () => {
  //   const storedVideo = await AsyncStorage.getItem("downloaded_videos");
  //   console.log(storedVideo);
  //   let videoFound = JSON.parse(storedVideo);
  //   if (videoFound) {
  //     downloadedVideo = [...videoFound];
  //   }
  // };
  // getAllVideo();
  // const downloadfromUrl = async () => {
  //   setIsLoading(true);
  //   // let remoteUrl = `${SERVER.url}/videos/${fileName}`;
  //   // let localPath = `${FileSystem.documentDirectory}/${fileName}`;

  //   // FileSystem.downloadAsync(remoteUrl, localPath).then(({ uri }) =>
  //   //   console.log(uri + " Downloaded")
  //   // );
  //   console.log(Platform.OS);
  //   try {
  //     const result = await FileSystem.downloadAsync(
  //       `${SERVER.url}/videos/${fileName}`,
  //       FileSystem.documentDirectory + fileName
  //     );

  //     console.log(result);
  //     save(result.uri, fileName, result.headers["Content-Type"]);
  //   } catch (e) {
  //     setError(true);
  //     console.error(e);
  //   }
  //   console.log("Download completed.");
  //   setIsLoading(false);
  // };

  const save = async (uri, filename, mimetype) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    if (Platform.OS === "android") {
      //SECOND TRY

      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            console.log(permissions.directoryUri);
          })
          .catch((e) => {
            setError(true);
            console.log(e);
          });
      } else {
        shareAsync(uri);
      }
      //SECOND TRY END

      //FIRST TRY

      // const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      // if (perm.status != "granted") {
      //   shareAsync(uri);
      // }

      // try {
      //   const asset = await MediaLibrary.createAssetAsync(result.uri);
      //   const album = await MediaLibrary.getAlbumAsync("DownloadMe");
      //   if (album == null) {
      //     await MediaLibrary.createAlbumAsync("DownloadMe", asset, false);
      //   } else {
      //     await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
    } else {
      shareAsync(uri);
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
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{ margin: 5, justifyContent: "center" }}
            onPress={downloadfromUrl}
          >
            <FontAwesome name="download" size={24} color="black" />
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : (
              <>
                <Text>Download Completed: {downloadedVideo.length}</Text>
                {/* <Video
                  ref={video}
                  style={{ width: "100%", height: 250 }}
                  source={{ uri: `data:${MIMEType};base64,${encodedBase64}` }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping={false}
                  shouldPlay={false}
                  // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                /> */}
              </>
            )}
            {/* <Text>Download</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5 }}>
            <FontAwesome name="heart-o" size={24} color="black" />
            {/* <Text>My favorite</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={{ margin: 5 }}>
            <FontAwesome name="bookmark-o" size={24} color="black" />
            {/* <Text>Mark as Watched</Text> */}
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

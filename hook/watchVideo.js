import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../constants/url";
import * as SQLite from "expo-sqlite";

const WatchVideo = async (userId, videoId) => {
  const db = SQLite.openDatabase("db.testDb"); // returns Database object
  const options = {
    method: "POST",
    url: `${SERVER.url}/api/watched/`,
    // url: `http://192.168.145.254:5000/api/fav/${userId}/${videoId}/${type}`,
    data: {
      userId,
      videoId,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.request(options);
    console.log("url: " + options.url);
    console.log("response.data: " + JSON.stringify(response.data));
    console.log("watched");
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO `watched` (`id`, `userId`, `videoId`) VALUES (?, ?, ?)",
        [videoId, userId, videoId],
        (txObj, resultSet) => {
          console.log("Watched video status stored in local db.");
        },
        (txObj, error) => console.log(error)
      );
    });
  } catch (error) {
    console.log("ERROR: " + error);
  } finally {
  }
};

export default WatchVideo;

import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../constants/url";
import * as SQLite from "expo-sqlite";

const UnwatchVideo = async (userId, videoId) => {
  const db = SQLite.openDatabase("db.testDb"); // returns Database object
  const options = {
    method: "DELETE",
    url: `${SERVER.url}/api/watched/${userId}/${videoId}`,
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
    console.log("Unwatched");

    db.transaction((tx) => {
      console.log("Change STATUS:");
      tx.executeSql(
        "DELETE from `watched` where `id`=?",
        [videoId],
        (txObj, resultSet) => {
          console.log("Watched video status CLEARED from local db.");
        },
        (txObj, error) => console.log(error)
      );
    });
  } catch (error) {
    console.log("ERROR: " + error);
  } finally {
  }
};

export default UnwatchVideo;

import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../constants/url";
import * as SQLite from "expo-sqlite";

const unlikeVideo = async (userId, videoId) => {
  const db = SQLite.openDatabase("db.testDb"); // returns Database object
  const options = {
    method: "DELETE",
    url: `${SERVER.url}/api/fav/${userId}/${videoId}`,
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
    console.log("UNLIKE");
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE from `favorites` where `id`=?",
        [videoId],
        (txObj, resultSet) => {
          console.log("Like video CLEARED from local db.");
        },
        (txObj, error) => console.log(error)
      );
    });
  } catch (error) {
    console.log("ERROR: " + error);
  } finally {
  }
};

export default unlikeVideo;

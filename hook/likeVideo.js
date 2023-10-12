import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../constants/url";
import * as SQLite from "expo-sqlite";

const likeVideo = async (
  userId,
  videoId,
  { id, title, description, fileName, poster, category, language }
) => {
  const db = SQLite.openDatabase("db.testDb"); // returns Database object

  const options = {
    method: "POST",
    url: `${SERVER.url}/api/fav/`,
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
    console.log("LIKE");
    console.log(`id: ${id}`);
    console.log(`title: ${title}`);
    console.log(`description: ${description}`);
    console.log(`fileName: ${fileName}`);
    console.log(`poster: ${poster}`);
    console.log(`category: ${category}`);
    console.log(`language: ${language}`);
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO `favorites` (`id`, `title`, `description`, `fileName`, `poster`, `category`, `language`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, title, description, fileName, poster, category, language],
        (txObj, resultSet) => {
          console.log("Like video stored in local db.");
        },
        (txObj, error) => console.log(error)
      );
    });
  } catch (error) {
    console.log("ERROR: " + error);
  } finally {
  }
};

export default likeVideo;

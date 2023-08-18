import { useState, useEffect } from "react";

import axios from "axios";
import { SERVER } from "../constants/url";
const CheckWatchVideo = (userId, videoId, setWatched) => {
  const [youWatched, setYouWatched] = useState([]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: `${SERVER.url}/api/watched/${userId}/${videoId}`,
      // url: `http://192.168.145.254:5000/api/fav/${userId}/${videoId}/${type}`,

      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.request(options);
      console.log("url: " + options.url);
      console.log("response.data: " + JSON.stringify(response.data));
      setYouWatched(response.data);
      if (response.data.length === 0) setWatched(false);
      else setWatched(true);
    } catch (error) {
      console.log("ERROR: " + error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };
  return { youWatched, setYouWatched };
};

export default CheckWatchVideo;

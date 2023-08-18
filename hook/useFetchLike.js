import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../constants/url";
const useFetchLike = (userId, videoId, type) => {
  const [countLike, setCountLike] = useState(0);
  const [youLike, setYouLike] = useState([]);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: `${SERVER.url}/api/fav/${userId}/${videoId}/${type}`,
      // url: `http://192.168.145.254:5000/api/fav/${userId}/${videoId}/${type}`,

      headers: {
        "Content-Type": "application/json",
      },
    };
    setIsLikeLoading(true);
    try {
      const response = await axios.request(options);
      console.log("url: " + options.url);
      console.log("response.data: " + JSON.stringify(response.data));
      if (type === 1) setCountLike(response.data[0].countLike);
      else setYouLike(response.data);
      setIsLikeLoading(false);
    } catch (error) {
      setError(error);
      console.log("ERROR: " + error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const likeVideo = async () => {
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
      setIsLikeLoading(false);
    } catch (error) {
      setError(error);
      console.log("ERROR: " + error);
    } finally {
      setIsLikeLoading(false);
    }
  };
  const unlikeVideo = async () => {
    const options = {
      method: "DELETE",
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
      console.log("UNLIKE");
      setIsLikeLoading(false);
    } catch (error) {
      setError(error);
      console.log("ERROR: " + error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLikeLoading(true);
    fetchData();
  };
  if (type === 1) return { countLike, setCountLike };
  else return { youLike, setYouLike };
};

export default useFetchLike;

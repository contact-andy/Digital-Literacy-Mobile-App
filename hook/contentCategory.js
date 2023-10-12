import { useState, useEffect } from "react";

import axios from "axios";
import { SERVER } from "../constants/url";
const ContentCategory = (catLoading, setCatLoading) => {
  const [videoCategories, setVideoCategories] = useState([]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: `${SERVER.url}/api/category`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.request(options);
      // console.log("url: " + options.url);
      // console.log("response.data: " + JSON.stringify(response.data));
      // const propertyValues = Object.values(response.data);
      setVideoCategories(response.data);
      console.log(response.data);
      if (response.data.length === 0) {
        console.log(true);
        setCatLoading(true);
      } else {
        setCatLoading(false);
        console.log(false);
      }
      // console.log(catLoading);
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
  return { videoCategories, setVideoCategories };
};

export default ContentCategory;

import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../constants/url";
const useFetch = (type, endpoint, page) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `${SERVER.url}/api/content/${type}/${endpoint}/${page}`,
    // url: `http://192.168.145.254:5000/api/content/findAll/${endpoint}`,

    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      console.log("url: " + options.url);
      // console.log("response.data: " + JSON.stringify(response.data));
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log("ERROR: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

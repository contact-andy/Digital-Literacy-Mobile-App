import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { checkImageURL } from "../../../utils";
import { SERVER } from "../../../constants/url";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";
import ContentCategory from "../../../hook/contentCategory";

// const videoCategories = [
//   "Agricultural",
//   "Child Education",
//   "Digital Literacy",
//   "Health",
//   "Other",
// ];

const Welcome = ({ searchTerm, setSearchTerm, handleClick, isLoading }) => {
  const router = useRouter();
  const [activeVideoCategory, setActiveVideoCategory] = useState("Full-time");
  const [catLoading, setCatLoading] = useState(false);
  const { videoCategories, setVideoCategories } = ContentCategory(
    catLoading,
    setCatLoading
  );

  console.log("isLoading: " + isLoading);
  useEffect(() => {
    console.log("Reload started...");
  }, [isLoading]);

  let RenderItem = ({ videoCategories }) =>
    videoCategories.map((item) => {
      return (
        <TouchableOpacity
          style={styles.tab(activeVideoCategory, item)}
          onPress={() => {
            setActiveVideoCategory(item.title);
            router.push(`/(drawer)/home/list/${item.title}`);
          }}
          key={item.title}
        >
          <Image
            source={{
              uri: checkImageURL(`${SERVER.url}/category/` + item.photo)
                ? `${SERVER.url}/category/` + item.photo
                : `${SERVER.url}/category/home-category.png`,
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
          <Text style={styles.tabText(activeVideoCategory, item)}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    });

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Andy</Text>
        <Text style={styles.welcomeMessage}>
          Welcome to Digital Literacy Content Platform
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {catLoading ? (
          <Text>
            {"hello"} {catLoading}
          </Text>
        ) : (
          // <FlatList
          //   data={videoCategories}
          //   renderItem={({ item }) => (
          //     <TouchableOpacity
          //       style={styles.tab(activeVideoCategory, item)}
          //       onPress={() => {
          //         setActiveVideoCategory(item.title);
          //         router.push(`/(drawer)/home/list/${item.title}`);
          //       }}
          //     >
          //       <Image
          //         source={{
          //           uri: checkImageURL(`${SERVER.url}/category/` + item.photo)
          //             ? `${SERVER.url}/category/` + item.photo
          //             : `${SERVER.url}/category/home-category.png`,
          //         }}
          //         resizeMode="contain"
          //         style={styles.logoImage}
          //       />
          //       <Text style={styles.tabText(activeVideoCategory, item)}>
          //         {item.title}
          //       </Text>
          //     </TouchableOpacity>
          //   )}
          //   numColumns={2}
          //   keyExtractor={(item) => item.title}
          //   contentContainerStyle={{}}
          // />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <RenderItem videoCategories={videoCategories} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Welcome;

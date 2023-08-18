import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedVideo, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedVideo === item.id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedVideo, item) => ({
    width: "100%",
    height: 100,
    backgroundColor: selectedVideo === item.id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  VideoName: (selectedVideo, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedVideo === item.id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "column",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  publisher: (selectedVideo, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedVideo === item.id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;

import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors: colors,
  text: {
    color: colors.textDark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Copperplate",
    flexDirection: "row",
  },
};

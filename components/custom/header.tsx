import { memo } from "react";
import IconBurger from "@/components/icon/icon-burger";
import IconSearch from "@/components/icon/icon-search";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <TouchableOpacity activeOpacity={0.8}>
          <IconBurger />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.shadowTitleHeader}>TEST ACTIONS</Text>
            <Text style={styles.titleHeader}>TEST ACTIONS</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <IconSearch />
      </TouchableOpacity>
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    borderColor: "black",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    marginLeft: 14,
    flexDirection: "row",
    marginBottom: Platform.OS == "web" ? -1 : 0,
  },
  titleHeader: {
    fontFamily: "TTCommons",
    fontSize: 23,
    color: "#65a4ec",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  shadowTitleHeader: {
    fontFamily: "TTCommons",
    fontSize: 23,
    color: "#4b627d",
    position: "absolute",
    top: 2,
    left: 2,
    zIndex: -1,
  },
});

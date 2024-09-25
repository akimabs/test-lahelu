import { memo } from "react";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, View, Animated, Dimensions, TouchableHighlight } from "react-native";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 3;

const TabNav = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const translateX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const tabData = useMemo(() => ["Home", "Fresh", "Trending"], []);

  const handleTabPress = useCallback((index: number) => {
    setActiveTab(index);
    Animated.timing(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
      duration: 250,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {tabData.map((tab, index) => (
        <TouchableHighlight
          underlayColor="#DDDDDD20"
          activeOpacity={0.8}
          key={index}
          style={styles.tabButton}
          onPress={() => handleTabPress(index)}
        >
          <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>{tab}</Text>
        </TouchableHighlight>
      ))}
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

export default memo(TabNav);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "black",
    position: "relative",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  tabText: {
    color: "#ccc",
    fontWeight: "bold",
    fontSize: 14,
  },
  activeTabText: {
    color: "#65a4ec",
    fontWeight: "bold",
    fontSize: 14,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: TAB_WIDTH,
    backgroundColor: "#65a4ec",
  },
});

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import HomeScreen from "./home/_layout";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingTop: StatusBar.currentHeight || 0,
    overflow: "scroll",
  },
});

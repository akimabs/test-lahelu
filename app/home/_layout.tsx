import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import Header from "@/components/custom/header";
import TabNav from "@/components/custom/tab-nav";
import ScrollContent from "./components/scroll-content";
import { useHome } from "./logic/useHome";

function Home() {
  const translateY = useRef(new Animated.Value(0)).current;
  const offset = useRef<number>(0);
  const [animationRunning, setAnimationRunning] = useState<boolean>(false);
  const { mergedData, isFetching, refetch } = useHome();

  const handleAnimationHeader = useCallback(
    (value: number) => {
      if (animationRunning) return;

      setAnimationRunning(true);
      Animated.spring(translateY, {
        toValue: value,
        useNativeDriver: true,
      }).start(() => {
        setAnimationRunning(false);
      });
    },
    [translateY, animationRunning]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      const dif = currentOffset - offset.current;

      if (Math.abs(dif) >= 10) {
        if (dif < 0) {
          // Scrolling up
          handleAnimationHeader(0); // Show header
        } else {
          // Scrolling down
          handleAnimationHeader(1); // Hide header
        }
      }

      offset.current = currentOffset;
    },
    [handleAnimationHeader]
  );

  const styledMemo = useMemo(
    () => [
      {
        translateY: translateY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Platform.OS === "ios" ? -140 : -130],
        }),
      },
    ],
    [translateY]
  );

  const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
      position: "absolute",
      width: "100%",
      zIndex: 1000,
      transform: styledMemo,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.header}>
        <View>
          <Header />
          <TabNav />
        </View>
      </Animated.View>
      <ScrollContent onScroll={handleScroll} data={mergedData} isFetching={isFetching} refetch={refetch} />
    </SafeAreaView>
  );
}

export default Home;

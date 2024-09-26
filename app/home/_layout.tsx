import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import Header from "@/components/custom/header";
import TabNav from "@/components/custom/tab-nav";
import ScrollContent from "./components/scroll-content";
import { useHome } from "./logic/useHome";

function Home() {
  const translateY = useRef(new Animated.Value(0)).current;
  const offset = useRef<number>(0);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const { dataPostHome, isFetching } = useHome();

  const handleAnimationHeader = useCallback(
    (value: number) => {
      Animated.spring(translateY, {
        toValue: value,
        useNativeDriver: true,
      }).start();
    },
    [translateY]
  );

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - offset.current;
    if (!hasScrolled) {
      setHasScrolled(true);
    }
    if (Math.abs(dif) >= 10) {
      dif < 0 ? handleAnimationHeader(0) : handleAnimationHeader(1);
    }
    offset.current = currentOffset;
  }, []);

  const styledMemo = useMemo(
    () => [
      {
        translateY: translateY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Platform.OS == "ios" ? -140 : -130],
        }),
      },
    ],
    []
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
      <ScrollContent onScroll={handleScroll} data={dataPostHome} isFetching={isFetching} />
    </SafeAreaView>
  );
}

export default Home;

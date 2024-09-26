import { z } from "zod";
import { FlashList } from "@shopify/flash-list";
import { memo, useCallback, useMemo, useState } from "react";
import PostAPISchema, { PostItemSchema } from "@/api/schema/post.schema";
import CardGreetings from "@/components/ui/card-greetings";
import CardContent from "@/components/custom/card-content";
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text } from "react-native";
import { randomNumber } from "@/scripts/randomNumber";
import debounce from "lodash.debounce";
import { dummyData } from "@/constants/data";

type TData = { imgUrl: string; username: string; total_comment: number };
type Props = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  data: TData[];
  isFetching: boolean;
  refetch: any;
};

function ScrollContent({ onScroll, data, isFetching, refetch }: Props) {
  const dataHashtag = useMemo(() => ["Sawer", "Lucu", "Meme", "Waduh", "Anjay", "Mabar", "Lol"], []);

  const headerComponent = useCallback(() => {
    return <CardGreetings emoji="🥰" title="Ingin download meme di Lahelu? Klik disini!" />;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: TData }) => (
      <CardContent dataHashtag={dataHashtag} imgUrl={item.imgUrl} totalComment={item.total_comment} username={item.username} />
    ),
    [data]
  );

  const loadMoreData = useCallback(
    debounce(() => {
      refetch();
    }, 1000),
    []
  );

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      estimatedItemSize={100}
      onScroll={onScroll}
      contentContainerStyle={styles.list}
      ListHeaderComponent={headerComponent}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        if (isFetching) {
          return <ActivityIndicator style={styles.paddingLoading} animating size="large" color="#65a4ec" />;
        }
        return <Text>data is empty</Text>;
      }}
    />
  );
}

export default memo(ScrollContent);

const styles = StyleSheet.create({
  list: { paddingTop: 90 },
  paddingLoading: { padding: 20 },
});

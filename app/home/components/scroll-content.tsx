import { FlashList } from "@shopify/flash-list";
import { memo, useCallback, useMemo } from "react";
import CardGreetings from "@/components/ui/card-greetings";
import CardContent from "@/components/custom/card-content";
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text } from "react-native";
import debounce from "lodash.debounce";
import { QueryObserverResult } from "@tanstack/react-query";
import { PostAPIType } from "@/api/type/post.type";

type TData = { imgUrl: string; username: string; total_comment: number };
type Props = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  data: TData[];
  isFetching: boolean;
  refetch: () => Promise<QueryObserverResult<PostAPIType.PostsHome.Response>>;
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

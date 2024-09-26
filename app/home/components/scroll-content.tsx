import { z } from "zod";
import { FlashList } from "@shopify/flash-list";
import { memo, useCallback, useMemo, useState } from "react";
import PostAPISchema, { PostItemSchema } from "@/api/schema/post.schema";
import CardGreetings from "@/components/ui/card-greetings";
import CardContent from "@/components/custom/card-content";
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text } from "react-native";
import { randomNumber } from "@/scripts/randomNumber";

type Props = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  data: z.infer<typeof PostAPISchema.PostsHome.Response> | undefined;
  isFetching: boolean;
};

function ScrollContent({ onScroll, data, isFetching }: Props) {
  const dataHashtag = ["Sawer", "Lucu", "Meme", "Waduh", "Anjay", "Mabar", "Lol"];

  const [dataTemporary, setData] = useState<z.infer<typeof PostItemSchema>[] | undefined>(data?.data);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const memeAssets = useMemo(
    () => [
      "https://cdn.jsdelivr.net/gh/akimabs/asset_test_rn_platform/meme1.jpg",
      "https://cdn.jsdelivr.net/gh/akimabs/asset_test_rn_platform/meme2.jpg",
      "https://cdn.jsdelivr.net/gh/akimabs/asset_test_rn_platform/meme4.jpg",
      "https://cdn.jsdelivr.net/gh/akimabs/asset_test_rn_platform/meme5.jpg",
      "https://cdn.jsdelivr.net/gh/akimabs/asset_test_rn_platform/meme6.jpg",
      "https://cdn.jsdelivr.net/gh/akimabs/asset_test_rn_platform/meme7.jpg",
    ],
    [index]
  );

  const loadMoreData = useCallback(() => {
    setLoading(true);
    const nextIndex = (index + 1) % memeAssets.length;
    const newData: { imgUrl: string; username: string; total_comment: number }[] | undefined = [
      {
        username: "udon_sedunia",
        imgUrl: memeAssets[nextIndex],
        total_comment: randomNumber(20),
      },
    ];

    const dataUsage = isFetching ? newData : data?.data || [];

    setData((prevData) => [...(prevData || []), ...dataUsage]);
    setIndex(nextIndex);
    setLoading(false);
  }, [memeAssets, index]);

  const headerComponent = useCallback(() => {
    return <CardGreetings emoji="🥰" title="Ingin download meme di Lahelu? Klik disini!" />;
  }, []);

  return (
    <FlashList
      data={dataTemporary}
      renderItem={({ item }) => (
        <CardContent dataHashtag={dataHashtag} imgUrl={item.imgUrl} totalComment={item.total_comment} username={item.username} />
      )}
      keyExtractor={(_, index) => index.toString()}
      estimatedItemSize={100}
      onScroll={onScroll}
      contentContainerStyle={styles.list}
      ListHeaderComponent={headerComponent}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={() => {
        if (loading || isFetching) {
          return <ActivityIndicator animating size="large" color="#65a4ec" />;
        }
        return <Text>data is empty</Text>;
      }}
    />
  );
}

export default memo(ScrollContent);

const styles = StyleSheet.create({
  list: { paddingTop: 90 },
});

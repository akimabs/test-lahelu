import { memo, useCallback } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CardContent from "@/components/custom/card-content";
import CardGreetings from "@/components/ui/card-greetings";

type Props = {
  onScroll: any;
};
function ScrollContent({ onScroll }: Props) {
  const data = [
    {
      id: "1",
      imgUrl: "https://i.pinimg.com/236x/85/47/82/854782b27fd9da2723726f8a1cde71c9.jpg",
      username: "",
    },
    {
      id: "2",
      imgUrl: "https://i.pinimg.com/236x/85/47/82/854782b27fd9da2723726f8a1cde71c9.jpg",
      username: "",
    },
    {
      id: "3",
      imgUrl: "https://i.pinimg.com/236x/85/47/82/854782b27fd9da2723726f8a1cde71c9.jpg",
      username: "",
    },
    {
      id: "4",
      imgUrl: "https://i.pinimg.com/236x/85/47/82/854782b27fd9da2723726f8a1cde71c9.jpg",
      username: "",
    },
    {
      id: "5",
      imgUrl: "https://i.pinimg.com/236x/85/47/82/854782b27fd9da2723726f8a1cde71c9.jpg",
      username: "",
    },
    {
      id: "6",
      imgUrl: "https://i.pinimg.com/236x/85/47/82/854782b27fd9da2723726f8a1cde71c9.jpg",
      username: "",
    },
    {
      id: "7",
      imgUrl: "https://i.pinimg.com/236x/85/47/82/854782b27fd9da2723726f8a1cde71c9.jpg",
      username: "",
    },
    {
      id: "8",
      imgUrl: "https://froyonion.sgp1.digitaloceanspaces.com/images/blogdetail/858eb1bd32c0fc50cba8ba93e472de88e7082914.jpg",
    },
  ];

  const dataHashtag = ["Sawer", "Lucu", "Meme", "Waduh", "Anjay", "Mabar", "Lol"];

  const headerComponent = useCallback(() => {
    return <CardGreetings emoji="🥰" title="Ingin download meme di Lahelu? Klik disini!" />;
  }, []);

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <CardContent dataHashtag={dataHashtag} imgUrl={item.imgUrl} />}
      keyExtractor={(item) => item.id}
      estimatedItemSize={200}
      onScroll={onScroll}
      contentContainerStyle={{ paddingTop: 90 }}
      ListHeaderComponent={headerComponent}
    />
  );
}

export default memo(ScrollContent);

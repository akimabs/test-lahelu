import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import IconSawer from "@/components/icon/icon-sawer";
import IconHashtag from "@/components/icon/icon-hashtag";

type Props = {
  index: number;
  title: string;
};

function Badge({ index, title }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={index == 0 ? styles.containerContain : styles.container}>
      {index == 0 ? <IconSawer /> : <IconHashtag />}
      <Text style={styles.textTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerContain: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#dd952a",
    marginRight: 10,
    backgroundColor: "#dd952a",
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default memo(Badge);

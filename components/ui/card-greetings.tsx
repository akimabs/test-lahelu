import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  emoji: string;
  title: string;
};

function CardGreetings({ emoji, title }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Text style={styles.textEmoji}>{emoji}</Text>
      <Text style={styles.textTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default memo(CardGreetings);

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 15,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#65a4ec",
    backgroundColor: "#4f738b60",
  },
  textEmoji: {
    fontSize: 16,
  },
  textTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    marginLeft: 20,
  },
});

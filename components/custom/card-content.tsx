import { memo, useCallback, useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconMore from "@/components/icon/icon-more";
import IconGalery from "@/components/icon/icon-galery";
import IconDownload from "@/components/icon/icon-download";
import IconSad from "@/components/icon/icon-sad";
import IconReport from "@/components/icon/icon-report";
import IconX from "@/components/icon/icon-x";
import IconArrowUp from "@/components/icon/icon-arrow-up";
import IconArrowDown from "@/components/icon/icon-arrow-down";
import IconComment from "@/components/icon/icon-comment";
import IconShare from "@/components/icon/icon-share";
import Modal from "react-native-modal";
import { FlashList } from "@shopify/flash-list";
import Badge from "../ui/badge";

type Props = {
  imgUrl: string;
  username: string;
  totalComment: number;
  dataHashtag: string[];
};

function CardContent({ imgUrl, dataHashtag, totalComment, username }: Props) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS == "ios") setAspectRatio(2);

    Image.getSize(
      imgUrl,
      (width, height) => {
        setAspectRatio(Number(width / height));
      },
      (error) => {
        console.log("Error loading image size: ", error);
      }
    );
  }, [imgUrl]);

  const dismissModal = useCallback(() => {
    setModalVisible(false);
  }, [isModalVisible]);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.containerHeader}>
        <View style={styles.containerTitle}>
          <View style={styles.profilePicture} />
          <Text style={styles.textUsername}>{username}</Text>
          <Text style={styles.textDateSeparator}>·</Text>
          <Text style={styles.textDate}>2 Hari</Text>
        </View>
        <TouchableOpacity style={{ height: 24, width: 24 }} onPress={toggleModal}>
          <IconMore />
        </TouchableOpacity>
      </View>
      <View style={styles.containerCaption}>
        <Text style={styles.textCaption}>AWoakwoakwoakwo</Text>
      </View>
      {aspectRatio && Platform.OS == "web" ? (
        <img
          style={{
            width: "100%",
            height: undefined,
            aspectRatio,
            backgroundColor: "gray",
            marginBottom: 13,
          }}
          src={imgUrl}
          alt={imgUrl}
          loading="lazy"
        />
      ) : (
        <Image
          source={{
            uri: imgUrl,
          }}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: aspectRatio ?? 0,
            backgroundColor: "gray",
            marginBottom: 13,
          }}
        />
      )}

      {/* Hashtag */}
      <FlashList
        data={dataHashtag}
        renderItem={({ item, index }) => <Badge title={item} index={index} />}
        keyExtractor={(item) => item}
        horizontal={true}
        estimatedItemSize={10}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagContainer}
      />

      {/* Action Item */}
      <View style={styles.actionItem}>
        <View style={styles.actionReaction}>
          <TouchableOpacity activeOpacity={0.5} style={styles.actionLike}>
            <IconArrowUp />
            <Text style={styles.textAction}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.actionDislike}>
            <IconArrowDown />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.actionComment}>
            <IconComment />
            <Text style={styles.textAction}>{totalComment}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.actionComment}>
          <IconShare />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        style={styles.containerModal}
        isVisible={isModalVisible}
        useNativeDriver
        animationOutTiming={1000}
        onBackButtonPress={dismissModal}
        onBackdropPress={dismissModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.containerHeaderModal}>
              <Text style={styles.modalText}>Pilihan</Text>
              <TouchableOpacity onPress={dismissModal}>
                <IconX />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.containerSection}>
              <TouchableOpacity style={styles.section}>
                <IconGalery />
                <Text style={styles.textSection}>Simpan ke Album</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.section}>
                <IconDownload />
                <Text style={styles.textSection}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.section}>
                <IconSad />
                <Text style={styles.textSection}>Tidak Suka</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.section}>
                <IconReport />
                <Text style={styles.textSectionReport}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default memo(CardContent);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderBottomColor: "black",
    borderBottomWidth: 4,
  },
  textUsername: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  textDate: {
    color: "gray",
    fontSize: 12,
  },
  containerCaption: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  textCaption: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  textDateSeparator: {
    color: "gray",
    marginHorizontal: 5,
    fontSize: 12,
  },
  containerTitle: { display: "flex", flexDirection: "row", alignItems: "center" },
  profilePicture: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "gray",
    marginRight: 10,
  },
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  containerModal: { margin: 0 },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#1a1a1a",
  },
  containerHeaderModal: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  textSection: {
    color: "white",
    marginLeft: 10,
    fontSize: 17,
  },
  textSectionReport: {
    color: "#e67070",
    marginLeft: 10,
    fontSize: 17,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    width: "100%",
    backgroundColor: "#414141",
    height: 1,
  },
  containerSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  actionReaction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tagContainer: {
    paddingHorizontal: 15,
  },
  actionItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 15,
  },
  actionLike: {
    padding: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: "#414141",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionDislike: {
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: "#414141",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionComment: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#414141",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textAction: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginLeft: 6,
    marginRight: 3,
  },
});

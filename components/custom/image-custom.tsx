import { memo, useState } from "react";
import { Image, Platform } from "react-native";

const ImageCustom = ({ url }: { url: string }) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1.2);

  Image.getSize(url, (width, height) => {
    setAspectRatio(width / height);
  });

  return (
    <>
      {Platform.OS == "web" ? (
        <img
          style={{
            width: "100%",
            height: undefined,
            aspectRatio,
            backgroundColor: "gray",
            marginBottom: 13,
          }}
          src={url}
          alt={url}
          loading="lazy"
        />
      ) : (
        <Image
          source={{
            uri: url,
          }}
          style={{
            width: "100%",
            aspectRatio: aspectRatio,
            marginBottom: 13,
          }}
          resizeMode="cover"
        />
      )}
    </>
  );
};

export default memo(ImageCustom);

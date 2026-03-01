"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { usePreloader } from "./asset-preloader";

export function PreloadableImage(props: ImageProps) {
  const { registerAsset, markAssetLoaded } = usePreloader();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (props.src) {
      registerAsset(props.src.toString());
      setHasStarted(true);
    }
  }, [props.src, registerAsset]);

  return (
    <Image
      {...props}
      onLoadingComplete={(img) => {
        markAssetLoaded(props.src.toString());
        if (props.onLoadingComplete) props.onLoadingComplete(img);
      }}
    />
  );
}

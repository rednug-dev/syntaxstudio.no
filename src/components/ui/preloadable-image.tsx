"use client";

import Image, { ImageProps } from "next/image";
import { useEffect } from "react";
import { usePreloader } from "./asset-preloader";

export function PreloadableImage(props: ImageProps) {
  const { registerAsset, markAssetLoaded } = usePreloader();

  useEffect(() => {
    if (props.src) {
      registerAsset(props.src.toString());
    }
  }, [props.src, registerAsset]);

  return (
    <Image
      {...props}
      alt={props.alt}
      onLoadingComplete={(img) => {
        markAssetLoaded(props.src.toString());
        if (props.onLoadingComplete) props.onLoadingComplete(img);
      }}
    />
  );
}

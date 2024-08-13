import { toast } from "react-toastify";

export const renderMessageToaster = (message: string, messageType: string) => {
  if (messageType === "error") return toast.error(message);
  else return toast.success(message);
};

export function getCroppedImg(image: any, crop: any, fileName: string) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx: any = canvas.getContext("2d");

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob: any) => {
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
}

export const getImageUrl = (imageUrl: string) => {
  const { REACT_APP_IMAGE_URL } = process.env;
  if (imageUrl.startsWith('upload')) {
    return REACT_APP_IMAGE_URL + imageUrl;
  } else {
    return imageUrl;
  }
}

export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}


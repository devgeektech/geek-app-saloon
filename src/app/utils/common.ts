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


  export const fetchLocationFromLatLng = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
      const data = await response.json();
      
      if (data && data.address) {
        // Extract address components
        const road = data.address.road || '';
        const city = data.address.city || data.address.town || data.address.village || '';
        const country = data.address.country || '';

      
        let location = '';
        if (road) location += `${road}, `;
        if (city) location += `${city}, `;
        if (country) location += `${country}`;
        
        return location.trim();  
      }
      
      throw new Error('No address found');
    } catch (error) {
      console.error('Error fetching location:', error);
      return '';
    }
  };
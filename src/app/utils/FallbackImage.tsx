import fallBackImage from '../../_metronic/assets/images/fallBackImage.png';

type ImageFallBackProps = {
  src: string;
  alt: string;
  fallBackSrc?: string;
  styleClass : string;
}

function ImageWithFallback({ src, alt, fallBackSrc = fallBackImage, styleClass}: ImageFallBackProps) {
  return (
      <img
        src={src}
        alt={alt}
        onError={(e) => (e.currentTarget.src = fallBackSrc)}
        className={styleClass}
      />
  );
}

export default ImageWithFallback;

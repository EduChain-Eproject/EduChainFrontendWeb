import React from 'react';

interface Props {
  imageUrl: string;
  altText?: string;
}

const ImageCard: React.FC<Props> = ({ imageUrl, altText = 'Image' }) => (
  <div className="image-card relative w-full h-screen overflow-hidden" style={{ marginTop: 50 }}>
    <img
      src={imageUrl}
      alt={altText}
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
);

export default ImageCard;

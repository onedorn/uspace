import React from 'react';

interface TestimonialImageProps {
  src: string;
  alt: string;
  className?: string;
}

const TestimonialImage: React.FC<TestimonialImageProps> = ({ src, alt, className }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <img
        src={src}
        alt={alt}
        className={`mx-auto block max-w-full h-auto object-contain ${className ?? ''}`}
      />
    </div>
  );
};

export default TestimonialImage;

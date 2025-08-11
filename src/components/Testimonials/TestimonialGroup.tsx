import React from 'react';
import TestimonialImage from './TestimonialImage';

interface TestimonialGroupProps {
  srcList: string[];
  alt: string;
}

const TestimonialGroup: React.FC<TestimonialGroupProps> = ({ srcList, alt }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {srcList.map((src, index) => (
        <TestimonialImage key={index} src={src} alt={`${alt} #${index + 1}`} />
      ))}
    </div>
  );
};
export default TestimonialGroup;

import React from 'react';
import { CorporateAdvantages, corporateAdvantages } from '../../data/corporate-advantages';

const CorporateGrid: React.FC = () => {
  return (
    <>
      <h1 className="text-h4 text-center text-orange-500 uppercase">
        Переваги корпоративного навчання разом з uspace
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {corporateAdvantages.map((item: CorporateAdvantages) => (
          <div
            key={item.id}
            className="relative bg-white p-4 flex flex-col justify-start overflow-hidden shadow-lg"
          >
            <div className="relative border-2 border-orange-500 border-dashed p-2 h-full">
              <img src={item.icon} alt={item.title} className="absolute top-0 right-0 w-16 h-16" />

              <h3 className="text-h4 font-semibold text-gray-900 mb-2 text-left">{item.title}</h3>
              <p className="text-gray-700 text-p18-reg text-left">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CorporateGrid;

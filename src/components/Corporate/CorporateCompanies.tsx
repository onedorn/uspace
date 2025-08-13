import React from 'react';
import { companies } from '../../data/corporate-companies';

const CorporateCompanies = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-h4 text-center text-orange-500 uppercase mb-8">
        Компанії, які довіряють нам своїх співробітників
      </h1>
      <div className="flex flex-wrap flex-row justify-center gap-6">
        {companies.map((company) => (
          <div key={company.id} className="flex flex-row items-center">
            <img
              src={company.logo}
              alt={`Logo of Company ${company.id}`}
              className="max-h-20 md:max-h-24 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporateCompanies;

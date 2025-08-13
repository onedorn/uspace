import React from 'react';
import CorporateHeader from './CorporateHeader';
import CorporateAdvantages from './CorporateAdvantages';
import CorporateProcess from './CorporateProcess';
import CorporateCompanies from './CorporateCompanies';

const Corporate = () => {
  return (
    <section
      id="corporate"
      className="flex flex-col gap-12 items-center justify-center w-full h-full my-8"
    >
      <CorporateHeader />
      <CorporateAdvantages />
      <CorporateProcess />
      <CorporateCompanies />
    </section>
  );
};

export default Corporate;

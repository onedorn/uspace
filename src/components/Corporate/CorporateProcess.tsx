import React from 'react';
import clsx from 'clsx';
import { corporateProcess } from '../../data/corporate-process';

const CorporateProcess = () => {
  return (
    <>
      <h1 className="text-h4 text-center text-orange-500 uppercase">
        Переваги корпоративного навчання разом з uspace
      </h1>

      <div className="w-full">
        <ul className="space-y-6 md:space-y-8">
          {corporateProcess.map(({ id, description, title }, index) => {
            const isLastItem = index === corporateProcess.length - 1;

            return (
              <li
                key={index}
                className={clsx(
                  'grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-t border-orange-500',
                  'min-h-[150px] md:min-h-[120px]',
                  isLastItem && 'border-b border-orange-500'
                )}
              >
                <div className="text-h3 text-hover-orange-100 uppercase">{id}</div>
                <div className="text-h3 uppercase text-blue-500 text-left">{title}</div>
                <div className="text-p18-reg max-w-[400px] text-left">{description}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CorporateProcess;

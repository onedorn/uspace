import React from 'react';

const Home = (): React.JSX.Element => {
  return (
    <div className="text-container bg-indigo-500">
      <h1 className="font-gnuolane font-normal text-heading-1">Heading 1</h1>
      <h2 className="font-gnuolane font-normal text-heading-2">Heading 2</h2>
      <h3 className="font-gnuolane font-normal text-heading-3">Heading 3</h3>
      <h4 className="font-texgyreheros font-normal text-heading-4">Heading 4</h4>
      <p className="font-texgyreheros text-p-large">Large text</p>
      <p className="font-texgyreheros italic text-p-large">Large italic</p>
      <p className="font-texgyreheros italic underline text-p-large">Large italic underlined</p>
      <p className="font-texgyreheros text-p-medium">Medium text</p>
      <p className="font-texgyreheros italic text-p-medium">Medium italic</p>
      <p className="font-texgyreheros italic underline text-p-medium">Medium italic underlined</p>
      <p className="font-gnuolane text-p-medium">Medium gnuolane</p>
      <p className="font-texgyreheros text-p-small">Small text</p>
      <p className="font-texgyreheros italic text-p-small">Small italic</p>
      <p className="font-texgyreheros italic underline text-p-small">Small italic underlined</p>
      <p className="font-texgyreheros text-p-xsmall">X-small text</p>
      <p className="font-texgyreheros italic text-p-xsmall">X-small italic</p>
    </div>
  );
};

export default Home;

import React from 'react';
import Formats from '../components/Formats';
import Hero from '../components/Hero';
import Teachers from '../components/Teachers';
import Corporate from '../components/Corporate/Corporate';
import Testimonials from '../components/Testimonials/Testimonials';
import FrequentlyAskedQuestions from '../components/FrequentlyAskedQuestions';
import Pricing from '../components/Pricing';
import Contacts from '../components/Contacts/Contacts';

const Home = (): React.JSX.Element => {
  return (
    <>
      <Hero />
      <Formats />
      <Teachers />
      <Corporate />
      <Testimonials />
      <Pricing />
      <FrequentlyAskedQuestions />
      <Contacts />
    </>
  );
};

export default Home;

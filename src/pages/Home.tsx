import React from 'react';
import Formats from '../components/Formats';
import Hero from '../components/Hero';
import Teachers from '../components/Teachers';
import Corporate from '../components/Corporate';
import Testimonials from '../components/Testimonials';
import FrequentlyAskedQuestions from '../components/FrequentlyAskedQuestions';
import Prices from '../components/Prices';
import Contacts from '../components/Contacts';

const Home = (): React.JSX.Element => {
  return (
    <>
      <Formats />
      <Hero />
      <Teachers />
      <Corporate />
      <Testimonials />
      <Prices />
      <FrequentlyAskedQuestions />
      <Contacts />
    </>
  );
};

export default Home;

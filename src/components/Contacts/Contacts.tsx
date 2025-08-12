import React from 'react';
import ContactForm from './ContactForm';
import ContactBoard from './ContactBoard';

const Contacts = () => {
  return (
    <section id="contacts">
      <div className="mx-auto my-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-10">КОНТАКТИ</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ContactForm />
          </div>

          <div className="flex-1 flex justify-center items-center">
            <ContactBoard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

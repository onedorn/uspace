import React from 'react';
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaTelegram } from '@react-icons/all-files/fa/FaTelegram';

const ContactBoard = () => (
  <div
    className="relative w-full min-h-[436px] md:min-h-[450px] flex items-center justify-center overflow-hidden"
    style={{
      backgroundColor: '#000000',
      backgroundImage: `url('/media/contacts/frame.png')`,
      backgroundSize: '102% 104%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <div className="text-center text-white z-10 w-full h-full flex flex-col items-center justify-center">
      <h3 className="text-2xl font-semibold mb-6 text-center">ДЕ НАС ЗНАЙТИ?</h3>
      <div className="w-full flex flex-col items-center gap-6">
        <a
          href="https://instagram.com/uspace_english"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-300 hover:text-amber-400 flex items-center gap-1 italic"
        >
          <FaEnvelope /> example@gmail.com
        </a>
        <a
          href="https://instagram.com/uspace_english"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-300 hover:text-amber-400 flex items-center gap-1 italic"
        >
          <FaInstagram /> @uspace_english
        </a>
        <a
          href="https://t.me/uspace_english"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-300 hover:text-amber-400 flex items-center gap-1 italic"
        >
          <FaTelegram /> Telegram
        </a>
      </div>
    </div>
  </div>
);

export default ContactBoard;

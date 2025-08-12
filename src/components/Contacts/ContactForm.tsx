import React, { useState } from 'react';
import { Button } from '@headlessui/react';
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import { FaExclamationCircle as FaErrorIcon } from '@react-icons/all-files/fa/FaExclamationCircle';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', question: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', question: '' };

    if (!name.trim()) {
      newErrors.name = 'Ім’я є обов’язковим';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Електронна пошта є обов’язковою';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Невалідна електронна пошта';
      isValid = false;
    }

    if (!question.trim()) {
      newErrors.question = 'Питання є обов’язковим';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Форма успішно відправлена!');
      setName('');
      setEmail('');
      setQuestion('');
      setErrors({ name: '', email: '', question: '' });
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-blue-800">ЗАЛИШИЛИСЬ ПИТАННЯ?</h3>
      <p className="mb-4 text-gray-600">
        Заповніть форму або напишіть нам в соц мережах і ми contact you!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Ім’я</label>
          <div className="relative">
            <input
              type="text"
              className={`w-full border-0 border-b-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-b-2 focus:${errors.name ? 'border-red-500' : 'border-blue-500'} outline-none bg-transparent py-1 appearance-none`}
              style={{ boxShadow: 'none' }}
              placeholder="Ваше ім’я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="absolute right-0 top-0 text-red-500 flex items-center gap-1 text-sm">
                <FaErrorIcon /> {errors.name}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Електронна пошта</label>
          <div className="relative">
            <input
              type="email"
              className={`w-full border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-b-2 focus:${errors.email ? 'border-red-500' : 'border-blue-500'} outline-none bg-transparent py-1 appearance-none`}
              style={{ boxShadow: 'none' }}
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="absolute right-0 top-0 text-red-500 flex items-center gap-1 text-sm">
                <FaErrorIcon /> {errors.email}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Ваше питання</label>
          <div className="relative">
            <textarea
              className={`w-full border-0 border-b-2 ${errors.question ? 'border-red-500' : 'border-gray-300'} focus:border-b-2 focus:${errors.question ? 'border-red-500' : 'border-blue-500'} outline-none bg-transparent py-1 resize-none appearance-none`}
              style={{ boxShadow: 'none' }}
              rows={3}
              placeholder="Запишіть ваше питання..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {errors.question && (
              <span className="absolute right-0 top-0 text-red-500 flex items-center gap-1 text-sm">
                <FaErrorIcon /> {errors.question}
              </span>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <FaEnvelope /> Запитати
        </Button>
      </form>
    </>
  );
};

export default ContactForm;

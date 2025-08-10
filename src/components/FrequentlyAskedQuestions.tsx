import React, { useState } from 'react';

const faqData = [
  {
    question: 'Де проходять заняття?',
    answer:
      'Всі заняття проходять на платформі Zoom з використанням інтерактивної дошки Miro та підручників.',
  },
  {
    question: 'З якими рівнями ми працюємо?',
    answer:
      'Ми працюємо з усіма рівнями від Beginner (A1) до Advanced (C1), підбираючи програму під індивідуальні потреби.',
  },
  {
    question: 'Який графік занять?',
    answer: 'Графік узгоджується індивідуально, щоб він був максимально зручним для учня.',
  },
  {
    question: 'За якими матеріалами ви навчаєте?',
    answer: 'Ми використовуємо сучасні підручники, авторські матеріали та інтерактивні ресурси.',
  },
  {
    question: 'Які правила перенесення та скасування уроків?',
    answer: 'Про перенесення чи скасування уроку потрібно попереджати не пізніше ніж за 12 годин.',
  },
];

const FrequentlyAskedQuestions: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-orange-500 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-h2 text-blue-500 text-center mb-10">FAQ</h1>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-orange-300 rounded-2xl bg-beige-500 shadow-sm w-full overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 focus:outline-none"
              >
                <span className="text-heading-4 text-black-500">{item.question}</span>
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-40 px-6 pb-5' : 'max-h-0 px-6 pb-0'
                }`}
              >
                <p className="text-p-medium text-black-300">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;

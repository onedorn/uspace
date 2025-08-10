import React from 'react';

interface PricingCardProps {
  title: string;
  description: string;
  features: string[];
  price8: { main: string; sub: string };
  price20: { main: string; sub: string };
  imageSrc: string;
  imageAlt: string;
}

const PricingCard = ({
  title,
  description,
  features,
  price8,
  price20,
  imageSrc,
  imageAlt,
}: PricingCardProps) => {
  return (
    <div className="border border-orange-300 rounded-lg p-6 bg-white shadow-md flex flex-col items-center text-center">
      <div className="mb-4">
        <img src={imageSrc} alt={imageAlt} className="w-24 h-24" />
      </div>
      <h2 className="text-h3 text-blue-500 mb-2">{title}</h2>
      <p className="text-p18-reg mb-4">{description}</p>
      <ul className="list-disc list-inside mb-4 text-left text-p16-regular">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="mb-4">
        <p className="text-p24 font-bold">{price8.main}</p>
        <p>{price8.sub}</p>
      </div>
      <div className="mb-4">
        <p className="text-p24 font-bold">{price20.main}</p>
        <p>{price20.sub}</p>
      </div>
      <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-hover-orange-500">
        Записатися
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  const cards = [
    {
      title: 'ІНДИВІДУАЛЬНИЙ',
      description: 'Для тих, хто шукає максимальну ефективність!',
      features: [
        'Для всіх рівнів англійської',
        'Заняття один на один з викладачем',
        'В1+3 рази на тиждень по 60 хвилин',
        'Матеріали уроку',
        'Домашнє завдання з перевіркою',
      ],
      price8: { main: '8 занять - 4800 грн', sub: '(600 грн/заняття)' },
      price20: { main: '20 занять - 11400 грн', sub: '(570 грн/заняття)' },
      imageSrc: '/media/pricing/individual.png',
      imageAlt: 'Books',
    },
    {
      title: 'ПАРНІ ЗАНЯТТЯ',
      description: 'Якщо ти бажаєш ефективний англійський з однодумцем - це твій самий формат!',
      features: [
        'Для всіх рівнів англійської',
        'Заняття в парі з іншим учнем',
        'В1+3 рази на тиждень по 60 хвилин',
        'Матеріали уроку',
        'Домашнє завдання з перевіркою',
      ],
      price8: { main: '8 занять - 3200 грн', sub: '(400 грн/заняття)' },
      price20: { main: '20 занять - 7600 грн', sub: '(380 грн/заняття)' },
      imageSrc: '/media/pricing/pairs.png',
      imageAlt: 'Laptop',
    },
    {
      title: 'ГРУПОВІ ЗАНЯТТЯ',
      description: 'Якщо ти бажаєш взаємодію з іншими ефективний англійський!',
      features: [
        'Для всіх рівнів англійської',
        'Заняття в міні-групах 4-6 учнів',
        '2 рази на тиждень по 60 хвилин',
        'Матеріали уроку',
        'Домашнє завдання з перевіркою',
      ],
      price8: { main: '8 занять - 2000 грн', sub: '(250 грн/заняття)' },
      price20: { main: '20 занять - 4700 грн', sub: '(235 грн/заняття)' },
      imageSrc: '/media/pricing/group.png',
      imageAlt: 'People',
    },
  ];

  return (
    <div className="bg-beige-100 py-8">
      <h1 className="text-h2 text-blue-500 text-center mb-8">ПРАЙС</h1>
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <PricingCard key={index} {...card} />
          ))}
          <div className="hidden md:block lg:hidden border border-orange-300 rounded-lg p-6 bg-white shadow-md flex items-center justify-center">
            <img src="/media/pricing/phoebe.png" alt="Filler" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

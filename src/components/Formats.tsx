import React from 'react';

interface FormatCardProps {
  title: string;
  description: string;
  additional: string;
  imageSrc: string;
  imageAlt: string;
}

const FormatCard = ({ title, description, additional, imageSrc, imageAlt }: FormatCardProps) => {
  return (
    <div className="border border-orange-300 rounded-lg p-6 bg-white shadow-md flex flex-col items-center text-center">
      <div className="mb-4">
        <img src={imageSrc} alt={imageAlt} className="w-24 h-24" />
      </div>
      <h2 className="text-h3 text-blue-500 mb-2">{title}</h2>
      <p className="text-p18-reg mb-4">{description}</p>
      <p className="text-p18-reg mb-4 font-bold">{additional}</p>
    </div>
  );
};

const Formats: React.FC = () => {
  const individual = {
    title: 'ІНДИВІДУАЛЬНІ',
    description:
      'Для тих, хто шукає максимальну ефективність — індивідуальні заняття саме той вибір. Ти отримаєш всю увагу викладача та будеш навчатися за програмою, яка повністю охоплює твої інтереси чи потреби.',
    additional: '1 учень (ви)',
    imageSrc: '/media/formats/iconoir_star-solid.png',
    imageAlt: 'Books',
  };

  const pair = {
    title: 'ПАРНІ ЗАНЯТТЯ',
    description:
      'Якщо ти бажаєш вивчити англійську з однодумцем — це той самий формат! Ми підберемо людину зі схожим рівнем та смаками, що дасть можливість вчитись краще комунікувати, вміти себе пояснити і донести думку.',
    additional: '2 учні',
    imageSrc: '/media/formats/fluent_circle-hint-16-regular.png',
    imageAlt: 'Laptop',
  };

  const group = {
    title: 'ГРУПОВІ ЗАНЯТТЯ',
    description:
      'Якщо ти бажаєш взаємодіяти з іншими вивчаючи англійську — груповий формат для тебе! Адже під час занять ти маєш можливість спілкуватись зі студентами, що допомагає розвивати мовленнєві навички.',
    additional: '3-5 учнів',
    imageSrc: '/media/formats/hugeicons_menu-circle.png',
    imageAlt: 'People',
  };

  return (
    <section id="formats" className="bg-beige-100 py-8">
      <h1 className="text-h2 text-blue-500 text-center mb-8">ФОРМАТИ НАВЧАННЯ</h1>
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormatCard {...individual} />
          <FormatCard {...pair} />
          <div className="border border-orange-300 rounded-lg p-6 bg-white shadow-md flex items-center justify-center">
            <img src="/path/to/filler-image.png" alt="Filler" className="w-full h-auto" />
          </div>
          <FormatCard {...group} />
        </div>
      </div>
    </section>
  );
};

export default Formats;

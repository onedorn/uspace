export interface CorporateAdvantages {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const corporateAdvantages: CorporateAdvantages[] = [
  {
    id: '1',
    title: 'Індивідуальний підхід',
    description:
      'Наша команда складається з професіоналів з міжнародними сертифікатами та багаторічним досвідом.',
    icon: '/media/corporate/book.png',
  },
  {
    id: '2',
    title: 'Досвідчені викладачі',
    description:
      'Ми розробляємо програми навчання, адаптовані до специфіки вашого бізнесу та потреб співробітників.',
    icon: '/media/corporate/teacher.png',
  },
  {
    id: '3',
    title: 'Графік занять',
    description: 'Заняття проводяться у зручний для вашої команди час, як онлайн, так і офлайн.',
    icon: '/media/corporate/schedule.png',
  },
  {
    id: '4',
    title: 'Практична спрямованість',
    description: 'Фокус на реальних бізнес-ситуаціях для негайного застосування знань на практиці.',
    icon: '/media/corporate/dog.png',
  },
];

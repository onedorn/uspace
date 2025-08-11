export interface Testimonial {
  id: number;
  src: string | string[];
  alt: string;
}

export const testimonials: Testimonial[] = [
  { id: 1, src: '/media/testimonials/t1.png', alt: 'Відгук клієнта №1' },
  { id: 2, src: '/media/testimonials/t2.png', alt: 'Відгук клієнта №2' },
  { id: 3, src: '/media/testimonials/t3.png', alt: 'Відгук клієнта №3' },
  { id: 4, src: '/media/testimonials/t4.png', alt: 'Відгук клієнта №4' },
  { id: 5, src: '/media/testimonials/t5.png', alt: 'Відгук клієнта №5' },
  { id: 6, src: '/media/testimonials/t6.png', alt: 'Відгук клієнта №6' },
  { id: 7, src: '/media/testimonials/t7.png', alt: 'Відгук клієнта №7' },
  {
    id: 8,
    src: [
      '/media/testimonials/t8.1.png',
      '/media/testimonials/t8.2.png',
      '/media/testimonials/t8.3.png',
    ],
    alt: 'Відгуки клієнта №8 (кілька скріншотів)',
  },
  { id: 9, src: '/media/testimonials/t9.png', alt: 'Відгук клієнта №9' },
  { id: 10, src: '/media/testimonials/t10.png', alt: 'Відгук клієнта №10' },
  { id: 11, src: '/media/testimonials/t11.png', alt: 'Відгук клієнта №11' },
  { id: 12, src: '/media/testimonials/t12.png', alt: 'Відгук клієнта №12' },
];

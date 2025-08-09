import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration: React.FC = () => {
  const { key, pathname } = useLocation();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(`scroll-pos:${key}`);
    if (savedPosition) {
      const { x, y } = JSON.parse(savedPosition);
      window.scrollTo(x, y);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      sessionStorage.setItem(
        `scroll-pos:${key}`,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      );
    };
  }, [key, pathname]);

  return null;
};

export default ScrollRestoration;

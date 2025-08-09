import React from 'react';
import ScrollRestoration from './utils/ScrollRestoration';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = (): React.JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />
      <Header />
      <main className="base-container flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

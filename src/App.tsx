import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App = (): React.JSX.Element => {
  return (
    <div className="base flex flex-col min-h-screen">
      <ScrollRestoration getKey={(location) => location.pathname} />

      <header className="content">
        <Navigation />
      </header>
      <main className="content flex-grow">
        <Outlet />
      </main>
      <footer className="content">
        <Footer />
      </footer>
    </div>
  );
};

export default App;

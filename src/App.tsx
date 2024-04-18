import React, { JSX } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes-constants';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
// require('../../../assets/css/style.css');
// import '../../../assets/css/style.css';

const App = () => {
  return (
    <Routes>
      
      <Route index element={<HomePage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };

import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
// require('../../../assets/css/style.css');
// import '../../../assets/css/style.css';
/**
 * All in One Accessibility Settings index Page
 */
const App = () => {
  return (
    <Routes>
      
      <Route index element={<HomePage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };

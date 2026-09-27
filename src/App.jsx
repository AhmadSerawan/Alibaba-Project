
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageLayout from './Layouts/PageLayout.jsx';

import { Routes, Route } from 'react-router';
import CatPage from './Pages/CatPage.jsx';
import ProductProp from './Pages/ProductProp.jsx';
import ViewCartPage from './Pages/ViewCartPage.jsx';
import { CartProvider } from './Contexts/CartContext.jsx'; // 1. Import CartProvider

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<PageLayout />} />
        <Route path="/catpage" element={<CatPage />} />
        <Route path="/product" element={<ProductProp />} />
        <Route path="/cart" element={<ViewCartPage />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
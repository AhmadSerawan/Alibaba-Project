
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageLayout from './Layouts/PageLayout.jsx';

import { Routes, Route } from 'react-router';
import CatPage from './Pages/CatPage.jsx';
import ProductProp from './Pages/ProductProp.jsx';
import ViewCartPage from './Pages/ViewCartPage.jsx';
import { CartProvider } from './Contexts/CartContext.jsx'; // 1. Import CartProvider
// import Login from './Pages/Auth1/Login.jsx';
import Login3 from './Pages/Auth3/Login3.jsx';


const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<PageLayout />} />
        <Route path="/catpage" element={<CatPage />} />
        <Route path="/catpage/:categoryId" element={<CatPage />} />
        <Route path="/product/:productId" element={<ProductProp />} />
        <Route path="/cart" element={<ViewCartPage />} />
        <Route path="/login3" element={<Login3 />} />
      </Routes>
    </CartProvider>
  );
};


export default App;
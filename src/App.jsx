
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
import Checkout from './Components/Checkout.jsx';
import CheckCode from './Pages/Auth3/checkCode.jsx';
import FillYourInfo from './Pages/Auth3/FillYourInfo.jsx';
import Profile from './Components/Profile.jsx';
import TermsAndCon from './Components/TermsAndCon.jsx';
import ContactUSPage from './Components/ContactUSPage.jsx';
import DeleteProfileComponent from './Components/DeleteProfileComponent.jsx';
import Dashboard from './Components/Dashboard.jsx';


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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/check-code" element={<CheckCode  />} />
        <Route path="/register" element={<FillYourInfo  />} />
        <Route path="/profile" element={<Profile  />} />
        <Route path="/terms" element={<TermsAndCon  />} />
        <Route path="/contact" element={<ContactUSPage  />} />
        <Route path="/delete" element={<DeleteProfileComponent  />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </CartProvider>
  );
};


export default App;
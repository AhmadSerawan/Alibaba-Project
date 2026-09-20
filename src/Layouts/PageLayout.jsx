import Footer from "../Components/Footer";
import NavBarComp from "../Components/NavBarComp";
import SubscribeSectino from "../Components/Subscribe";
import ProductPage from "../Pages/ProductPage";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const PageLayout = () => {
  return (
    <>
      <NavBarComp />
      <ProductPage />
      <SubscribeSectino/>
      <Footer/>
    </>
  );
};

export default PageLayout;

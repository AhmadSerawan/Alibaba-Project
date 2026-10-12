import Footer from "../Components/Footer";
import NavBarComp from "../Components/NavBarComp";
import SubscribeSectino from "../Components/Subscribe";
import ProductPage from "../Pages/ProductPage";
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

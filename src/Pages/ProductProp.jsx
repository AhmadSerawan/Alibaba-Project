import Footer from "../Components/Footer"
import NavBarComp from "../Components/NavBarComp"
import ProductDetails from "../Components/ProductDetails"
import ProductInfoRecomm from "../Components/ProductInfoRecomm"
import RelatedProdDisc from "../Components/RelatedProdDisc"
import SubscribeSectino from "../Components/Subscribe"

const ProductProp = () => {
    return (
        <>
            <NavBarComp></NavBarComp>
            <ProductDetails></ProductDetails>
            <ProductInfoRecomm></ProductInfoRecomm>
            <RelatedProdDisc></RelatedProdDisc>
            <SubscribeSectino></SubscribeSectino>
            <Footer></Footer>
        </>
    )
}

export default ProductProp
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "../Components/Breadcrumb";
import NavBarComp from "../Components/NavBarComp";
import Footer from "../Components/Footer";
import SubscribeSectino from "../Components/Subscribe";
import CategoriyeRightSide from "../Components/CategoriyeRightSide";
import FilterSidebar from "../Components/FilterSidebar";

const mockBreadcrumbs = [
	{ label: "Home", path: "/" },
	{ label: "Clothings", path: "/category/clothings" },
	{ label: "Men's wear", path: "/category/clothings/mens-wear" },
	{ label: "Summer clothing", path: "/category/clothings/mens-wear/summer" },
];

const CatPage = () => {
	return (
		<>
			<NavBarComp></NavBarComp>
			<div className="warpCat" style={{ backgroundColor: "#f7fafc" }}>
				<Container>
					<div className="wrapCatDown">
						<Breadcrumb items={mockBreadcrumbs} />
						<div className="wrapCat3">
							<Row>
								<Col lg="3">
									<FilterSidebar />
								</Col>
								<Col lg="9">
									<CategoriyeRightSide />
								</Col>
							</Row>
						</div>
					</div>
				</Container>
			</div>
			<SubscribeSectino></SubscribeSectino>
			<Footer></Footer>
		</>
	)
}

export default CatPage

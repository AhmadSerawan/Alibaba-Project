import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import MiddleImage from "../assets/imgs/MiddleImage.png";
import Avatar from "../assets/imgs/Avatar.png";
import QuoteBg from "../assets/imgs/QuoteBg.png";
import SecCardOne from "../assets/imgs/SecCardOne.jpg";
import imageBack from "../assets/imgs/imageBack.png";
import { Search02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router";
import { getImage, placeholderImage, useApiAll } from "../Config/api.js";

/* ---------------- helpers ---------------- */

const nameOf = (item) => item?.name ?? item?.title ?? "";

const chunk = (list, size) => {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
};

// Countries for "Suppliers by region" (flags from flagcdn.com)
const COUNTRIES = [
  { code: "ae", name: "Arabic Emirates" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "sy", name: "Syria" },
  { code: "eg", name: "Egypt" },
  { code: "tr", name: "Turkey" },
  { code: "jo", name: "Jordan" },
  { code: "lb", name: "Lebanon" },
  { code: "kw", name: "Kuwait" },
  { code: "qa", name: "Qatar" },
  { code: "cn", name: "China" },
];

// Loading / error note for a section that depends on an API request
const SectionNote = ({ request, className = "" }) => {
  if (request.loading) {
    return (
      <div className={`py-3 text-center ${className}`}>
        <Spinner animation="border" size="sm" className="me-2" />
        Loading...
      </div>
    );
  }
  if (request.error) {
    return (
      <div className={`py-3 text-center text-danger ${className}`} role="alert">
        {request.error.status === 401
          ? "Please log in to see this content."
          : request.error.message || "Could not load data."}
      </div>
    );
  }
  return null;
};

// One small product (name + price + photo) used in the two "Home and outdoor" blocks
const ProductTile = ({ product }) => (
  <div className="aboveCardProd  rel ">
    <div className="productName weight400 font16" style={{ color: "#1c1c1c" }}>
      {nameOf(product)}
    </div>
    <div className="From weight400 font13" style={{ color: "#8b96a5" }}>
      From
    </div>
    <div className="productPrice weight400 font13" style={{ color: "#8b96a5" }}>
      USD {product.price}
    </div>
    <img
      src={getImage(product)}
      className="imageAbsalim abs"
      alt={nameOf(product)}
    />
  </div>
);

// 8 products -> 4 columns x 2
const ProductColumns = ({ products }) =>
  chunk(products, 2).map((pair, index) => (
    <div
      key={index}
      className="productColumn d-flex flex-column w-25 borderCustmright space-between"
    >
      {pair.map((product, i) => (
        <ProductTile key={`${product.id}-${i}`} product={product} />
      ))}
    </div>
  ));

const ProductPage = () => {
  /* ----- API (Tamkeen) ----- */
  const productsReq = useApiAll("/product");
  const categoriesReq = useApiAll("/category");

  const products = productsReq.items;
  const categories = categoriesReq.items;

  // Fixed (not random) slice of the product list; wraps around if the list is short
  const take = (start, count) =>
    products.length
      ? Array.from(
          { length: count },
          (_, i) => products[(start + i) % products.length]
        )
      : [];

  // Deals and offers: products 1-5
  const dealsItems = take(0, 5);

  // First "Home and outdoor": products 6-13
  const blockOneItems = take(5, 8);

  // Second block: first category from the API + its products
  const blockTwoCategory = categories[0] || null;
  const inCategory = blockTwoCategory
    ? products.filter(
        (p) =>
          String(p.category_id ?? p.category?.id) === String(blockTwoCategory.id)
      )
    : [];
  const blockTwoItems =
    inCategory.length >= 8
      ? inCategory.slice(0, 8)
      : [...inCategory, ...take(13, 8 - inCategory.length)];

  // Recommended items: products 22-31 (2 rows x 5)
  const recommendedRows = chunk(take(200, 10),5);

  // Extra services: fixed categories (text) + their / product photos
  const extraCards = [1, 2, 3, 4].map((n, i) => {
    const category = categories.length ? categories[n % categories.length] : null;
    const image =
      getImage(category, null) ||
      (products.length
        ? getImage(products[(31 + i) % products.length])
        : placeholderImage("Hub"));
    return {
      id: i,
      image,
      text: category ? `Source from ${nameOf(category)}` : "Source from Industry Hubs",
    };
  });

  return (
    <>
      <div className="breakUnder2" />
      <div className="productPage inter">
        <Container>
          <div className="inSession d-flex justify-content-between">
            <Row className="w-100">
              <Col lg={3} md={3} sm={12}>
                <div className="left w-100 me-auto">
                  <Nav
                    defaultActiveKey="/home"
                    className=" heroSectionNav flex-column"
                  >
                    <Nav.Link>Automoblies</Nav.Link>
                    <Nav.Link>Clothes and wear</Nav.Link>
                    <Nav.Link>Home interiors</Nav.Link>
                    <Nav.Link>Computer and tech</Nav.Link>
                    <Nav.Link>Tools, equipments</Nav.Link>
                    <Nav.Link>Sport and outdoor</Nav.Link>
                    <Nav.Link>Animal and pets</Nav.Link>
                    <Nav.Link>Mechinery tools</Nav.Link>
                    <Nav.Link>More category</Nav.Link>
                  </Nav>
                </div>
              </Col>
              <Col lg={7} md={7} sm={12}>
                <div className="middle w-100 me-auto ms-auto rel">
                  <img src={MiddleImage} alt="MiddleText" />
                  <div className="middleText abs">
                    <div className="middleText1">Latest trending</div>
                    <div className="middleText2">Electronic items</div>
                    <div className="middleTextB">Learn more</div>
                  </div>
                </div>
              </Col>
              <Col lg={2} md={2} sm={12}>
                <div className="right w-100 ms-auto d-flex flex-column justify-contnet-between align-items-center gap10">
                  <div className="card1RightSideHeroSection productPage d-flex flex-column  justify-content-between gap10">
                    <div className="greeting  flex align-items-center justify-content-center ">
                      <img src={Avatar} alt="Avatar" />
                      <div className="greetingText">
                        Hi, user let's get started
                      </div>
                    </div>
                    <div className="JoinNow">
                      <Button className="w-100 btn-secondary" as={Link} to="/register">
                        Join now
                      </Button>
                    </div>
                    <div className="LogIn">
                      <Button className="w-100 " as={Link} to="/login3">
                        Log in
                      </Button>
                    </div>
                  </div>
                  <div className="card2RightSideHeroSection whiteFont">
                    Get US $10 off with a new supplier
                  </div>
                  <div className="card3RightSideHeroSection whiteFont">
                    Send quotes with supplier preferences
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* ---------- Deals and offers (API) ---------- */}
          <div className="inSession1 mt-5">
            <Row>
              <Col lg={3} className="">
                <div className="DealsAndOffers borderCustmright d-flex flex-column ">
                  <div className="TextDeals1 font20 weight600">
                    Deals and offers
                  </div>
                  <div className="TextDeals2 font16 weight400">
                    Hygiene equipments
                  </div>
                  <div className="OfferCounter mt-3 ">
                    <ul className="d-flex gap5 me-auto  ">
                      <li className="d-flex flex-column px-1 py-1">
                        <div className="numberOffer">04</div>
                        <div className="DaysOffer">Days</div>
                      </li>
                      <li className="d-flex flex-column px-1 py-1">
                        <div className="numberOffer">13</div>
                        <div className="DaysOffer HourOffer">Hour</div>
                      </li>
                      <li className="d-flex flex-column px-1 py-1">
                        <div className="numberOffer">34</div>
                        <div className="DaysOffer MinOffer">Min</div>
                      </li>
                      <li className="d-flex flex-column px-1 py-1">
                        <div className="numberOffer">56</div>
                        <div className="DaysOffer SecOffer">Sec</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={9}>
                <div className="DealsAndOffersCards d-flex align-items-center">
                  <SectionNote request={productsReq} className="w-100" />
                  {dealsItems.map((product, index) => (
                    <div
                      key={`${product.id}-${index}`}
                      className={`DealsAndOffersCard borderCustmright d-flex flex-column ${
                        index === 0 ? "align-items-center text-center" : ""
                      }`}
                    >
                      <div className="imageWRapper">
                        <img src={getImage(product)} alt={nameOf(product)} />
                      </div>
                      <div className="textCardOffer weight400 font16">
                        {nameOf(product)}
                      </div>
                      <span className="discount">
                        -{product.discount ?? product.discount_percentage ?? 25}%
                      </span>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>

          {/* ---------- Home and outdoor #1 (products from API) ---------- */}
          <div className="inSession1 mt-5 rel">
            <Row>
              <Col lg={3}>
                <div className="secondCardsList borderCustmright rel">
                  <div
                    className="abs secCard1img"
                    style={{
                      backgroundImage: `url(${SecCardOne})`,
                      // height: "110vh",
                      backgroundSize: "180%",
                      backgroundPosition: "-6px -112px",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="secondCardsListText1 rel weight700 font20 width40">
                    Home and outdoor
                  </div>
                  <button className="buttonSecCard rel">Source now</button>
                </div>
              </Col>
              <Col lg={9}>
                <div className="productListing d-flex space-between h-100 ">
                  <SectionNote request={productsReq} className="w-100" />
                  <ProductColumns products={blockOneItems} />
                  <div className="breakUnder3 abs"></div>
                </div>
              </Col>
            </Row>
          </div>

          {/* ---------- Home and outdoor #2 (category + products from API) ---------- */}
          <div className="inSession1 mt-5 rel">
            <Row>
              <Col lg={3}>
                <div className="secondCardsList borderCustmright rel">
                  <div
                    className="abs secCard1img1"
                    style={{
                      backgroundImage: `url(${imageBack})`,
                      // height: "110vh",
                      backgroundSize: "105%",
                      backgroundPosition: "-6px -112px",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="secondCardsListText1 rel weight700 font20 width40">
                    {nameOf(blockTwoCategory) || "Home and outdoor"}
                  </div>
                  <button className="buttonSecCard rel">Source now</button>
                </div>
              </Col>
              <Col lg={9}>
                <div className="productListing d-flex space-between h-100 ">
                  <SectionNote request={productsReq} className="w-100" />
                  <ProductColumns products={blockTwoItems} />
                  <div className="breakUnder3 abs"></div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="inSession2 mt-5 rel">
            <div
              className="backPink abs"
              style={{
                backgroundImage: `url(${QuoteBg})`,
                borderRadius: "6px",
              }}
            ></div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="leftQuote whiteFont d-flex flex-column gap15">
                <div className="leftQuoteText1 font32 weight700 ">
                  An easy way to send requests to all suppliers
                </div>
                <div className="leftQuoteText2 font16 weight400">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </div>
              </div>
              <div className="rightQuote">
                <Form>
                  <div className="QuoteToSuppliers flex-column gap20 p-4">
                    <label className="QuoteT1   weight700 font20">
                      Send quote to suppliers
                    </label>
                    <div className="QuoteWhatItem">
                      <input
                        type="text"
                        name="ItemNeeded"
                        className="font16 weight400 form-control"
                        placeholder="What item you need?"
                        id=""
                      />
                    </div>
                    <div className="QuoteMoreDet">
                      <textarea
                        name="More Details"
                        placeholder="Type more details"
                        className="form-control"
                        id=""
                      ></textarea>
                    </div>
                    <div className="QuantiPcs d-flex gap5">
                      <div className="QuanityQoute">
                        <input
                          type="number"
                          placeholder="Quantity"
                          className="form-control"
                          name="Quantity"
                          id=""
                        />
                      </div>
                      <div className="PcsQoute">
                        <select name="" id="" className="form-select">
                          <option value="Pcs" className="form-option">
                            Pcs
                          </option>
                          <option value="" className=""></option>
                          <option value="" className=""></option>
                          <option value="" className=""></option>
                        </select>
                      </div>
                    </div>
                    <div className="button send-button">Send inquiry</div>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="RecommendedItemsSection d-flex flex-column gap20 mt-5">
            <div className="text1REc font24 weight700">Recommended items</div>

            {/* ---------- Recommended items (API) ---------- */}
            <div className="RecItemCards d-flex flex-column gap20 ">
              <SectionNote request={productsReq} />
              {recommendedRows.map((row, rowIndex) => (
                <div key={rowIndex} className="RecItemCardsAbove d-flex gap20">
                  {row.map((product, i) => (
                    <div
                      key={`${(product.id)}-${i}`}
                      className="itemRec inSession1 d-flex flex-column gap10"
                    >
                      <div className="ItemImage">
                        <img src={getImage(product)} alt={nameOf(product)} />
                      </div>
                      <div className="priceDollar weight600 font16">
                        ${product.price}
                      </div>
                      <div
                        className="ItemDesc font16 weight400"
                        style={{ color: "#8b96a5" }}
                      >
                        {nameOf(product)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ---------- Our extra services (photos + text from API) ---------- */}
            <div className="OurExtraServSection mb-3">
              <div className="OurExtraSrvText font24 weight600">
                Our extra services
              </div>
              <div className="ExtraCardsSrvice d-flex justify-content-between gap20 mt-3">
                {extraCards.map((card) => (
                  <div key={card.id} className="ExtraCard rel inSession1">
                    <div className="imageBefore">
                      <img src={card.image} className="abs" alt="" />
                    </div>
                    <div className="TextExtra22">{card.text}</div>
                    <div className="abs iconExtraCa">
                      <HugeiconsIcon icon={Search02Icon} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Suppliers by region (different countries + flags) ---------- */}
          <div className="SuppliersSection mt-3">
            <div className="suppText font24 weight600">Suppliers by region</div>
            {chunk(COUNTRIES, 5).map((row, rowIndex) => (
              <div key={rowIndex} className="CountriesSuppler mt-3 d-flex gap20">
                {row.map((country) => (
                  <div
                    key={country.code}
                    className="counteryCard d-flex gap10 align-items-center"
                    style={{ width: "221px" }}
                  >
                    <div className="CountryImage mb-1">
                      <img
                        src={`https://flagcdn.com/w40/${country.code}.png`}
                        srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                        alt={country.name}
                        style={{
                          width: "28px",
                          height: "20px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="countryNameAndWebsite d-flex flex-column ">
                      <div className="countryName font16 weight400 ">
                        {country.name}
                      </div>
                      <div className="CountrywebSite font13 weight400">
                        shopname.{country.code}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductPage;

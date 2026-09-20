import { Button, Col, Form, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import MiddleImage from "../assets/imgs/MiddleImage.png";
import SmartWatch from "../assets/imgs/SmartWatch.png";
import Laptopp from "../assets/imgs/Laptopp.png";
import Cameraa from "../assets/imgs/Cameraa.png";
import HeadPhone from "../assets/imgs/HeadPhone.png";
import Phonee from "../assets/imgs/Phonee.png";
import Avatar from "../assets/imgs/Avatar.png";
import QuoteBg from "../assets/imgs/QuoteBg.png";
import SecCardOne from "../assets/imgs/SecCardOne.jpg";
import imageBack from "../assets/imgs/imageBack.png";
import Chair from "../assets/imgs/Chair.png";
import ArabicEmirates from "../assets/imgs/ArabicEmirates.png";
import ItemImage from "../assets/imgs/ItemImage.png";
import BeforeExtraCardImage from "../assets/imgs/BeforeExtraCardImage.png";
import { Search02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Nav from "react-bootstrap/Nav";
const ProductPage = () => {
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
                      <Button className="w-100 ">Join now</Button>
                    </div>
                    <div className="LogIn">
                      <Button className="w-100 ">Log in</Button>
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
                  <div className="DealsAndOffersCard borderCustmright d-flex flex-column align-items-center text-center">
                    <div className="imageWRapper">
                      <img src={SmartWatch} alt="" />
                    </div>
                    <div className="textCardOffer weight400 font16">
                      Smart watches
                    </div>
                    <span className="discount">-25%</span>
                  </div>
                  <div className="DealsAndOffersCard borderCustmright d-flex flex-column ">
                    <div className="imageWRapper">
                      <img src={Laptopp} alt="" />
                    </div>
                    <div className="textCardOffer weight400 font16">
                      Laptops
                    </div>
                    <span className="discount">-25%</span>
                  </div>
                  <div className="DealsAndOffersCard borderCustmright d-flex flex-column ">
                    <div className="imageWRapper">
                      <img src={Cameraa} alt="" />
                    </div>
                    <div className="textCardOffer weight400 font16">
                      GoPro cameras
                    </div>
                    <span className="discount">-25%</span>
                  </div>
                  <div className="DealsAndOffersCard borderCustmright d-flex flex-column ">
                    <div className="imageWRapper">
                      <img src={HeadPhone} alt="" />
                    </div>
                    <div className="textCardOffer weight400 font16">
                      Headphones
                    </div>
                    <span className="discount">-25%</span>
                  </div>
                  <div className="DealsAndOffersCard borderCustmright d-flex flex-column ">
                    <div className="imageWRapper">
                      <img src={Phonee} alt="" />
                    </div>
                    <div className="textCardOffer weight400 font16">Phones</div>
                    <span className="discount">-25%</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
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
                  <div className="productColumn d-flex flex-column w-25 borderCustmright space-between">
                    <div className="aboveCardProd  rel ">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>
                  <div className="productColumn d-flex flex-column borderCustmright w-25 space-between">
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>
                  <div className="productColumn d-flex flex-column w-25 borderCustmright space-between">
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>
                  <div className="productColumn d-flex flex-column w-25 borderCustmright space-between">
                    <div className="aboveCardProd   rel ">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>

                  <div className="breakUnder3 abs"></div>
                </div>
              </Col>
            </Row>
          </div>
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
                    Home and outdoor
                  </div>
                  <button className="buttonSecCard rel">Source now</button>
                </div>
              </Col>
              <Col lg={9}>
                <div className="productListing d-flex space-between h-100 ">
                  <div className="productColumn d-flex flex-column w-25 borderCustmright space-between">
                    <div className="aboveCardProd  rel ">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>
                  <div className="productColumn d-flex flex-column borderCustmright w-25 space-between">
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>
                  <div className="productColumn d-flex flex-column w-25 borderCustmright space-between">
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>
                  <div className="productColumn d-flex flex-column w-25 borderCustmright space-between">
                    <div className="aboveCardProd   rel ">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                    <div className="aboveCardProd  rel">
                      <div
                        className="productName weight400 font16"
                        style={{ color: "#1c1c1c" }}
                      >
                        Soft chairs
                      </div>
                      <div
                        className="From weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        From
                      </div>
                      <div
                        className="productPrice weight400 font13"
                        style={{ color: "#8b96a5" }}
                      >
                        USD 19
                      </div>
                      <img src={Chair} className="imageAbsalim abs" />
                    </div>
                  </div>

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
                          <option selected className="form-option">
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
            <div className="RecItemCards d-flex flex-column gap20 ">
              <div className="RecItemCardsAbove d-flex gap20">
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
              </div>
              <div className="RecItemCardsAbove d-flex gap20">
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
                <div className="itemRec inSession1 d-flex flex-column gap10">
                  <div className="ItemImage">
                    <img src={ItemImage} alt="" />
                  </div>
                  <div className="priceDollar weight600 font16">$10.30</div>
                  <div
                    className="ItemDesc font16 weight400"
                    style={{ color: "#8b96a5" }}
                  >
                    T-shirts with multiple colors, for men
                  </div>
                </div>
              </div>
            </div>
            <div className="OurExtraServSection mb-3">
              <div className="OurExtraSrvText font24 weight600">
                Our extra services
              </div>
              <div className="ExtraCardsSrvice d-flex justify-content-between gap20 mt-3">
                <div className="ExtraCard rel inSession1">
                  <div className="imageBefore">
                    <img src={BeforeExtraCardImage} className="abs" alt="" />
                  </div>
                  <div className="TextExtra22">Source from Industry Hubs</div>
                  <div className="abs iconExtraCa">
                    <HugeiconsIcon icon={Search02Icon} />
                  </div>
                </div>
                <div className="ExtraCard rel inSession1">
                  <div className="imageBefore">
                    <img src={BeforeExtraCardImage} className="abs" alt="" />
                  </div>
                  <div className="TextExtra22">Source from Industry Hubs</div>
                  <div className="abs iconExtraCa">
                    <HugeiconsIcon icon={Search02Icon} />
                  </div>
                </div>
                <div className="ExtraCard rel inSession1">
                  <div className="imageBefore">
                    <img src={BeforeExtraCardImage} className="abs" alt="" />
                  </div>
                  <div className="TextExtra22">Source from Industry Hubs</div>
                  <div className="abs iconExtraCa">
                    <HugeiconsIcon icon={Search02Icon} />
                  </div>
                </div>
                <div className="ExtraCard rel inSession1">
                  <div className="imageBefore">
                    <img src={BeforeExtraCardImage} className="abs" alt="" />
                  </div>
                  <div className="TextExtra22">Source from Industry Hubs</div>
                  <div className="abs iconExtraCa">
                    <HugeiconsIcon icon={Search02Icon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="SuppliersSection mt-3">
            <div className="suppText font24 weight600">Suppliers by region</div>
            <div className="CountriesSuppler mt-3 d-flex gap20">
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
            </div>
            <div className="CountriesSuppler mt-3 d-flex gap20">
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
              <div
                className="counteryCard d-flex gap10 align-items-center"
                style={{ width: "221px" }}
              >
                <div className="CountryImage mb-1">
                  <img
                    src={ArabicEmirates}
                    alt=""
                    style={{ width: "28px", height: "20px" }}
                  />
                </div>
                <div className="countryNameAndWebsite d-flex flex-column ">
                  <div className="countryName font16 weight400 ">
                    Arabic Emirates
                  </div>
                  <div className="CountrywebSite font13 weight400">
                    shopname.ae
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </Container>
      </div>
    </>
  );
};

export default ProductPage;

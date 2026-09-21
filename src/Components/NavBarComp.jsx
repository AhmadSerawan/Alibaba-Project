import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartDrawer from "./CartDrawer";
import Logo from "../assets/imgs/Alibaba_Logo.png";
import {
  UserCircleIcon,
  MessageSquareMoreIcon,
  InLoveIcon,
  ShoppingCart02Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dropdown } from "bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useState } from "react";

const NavBarComp = () => {
  const [selectedLang, setSelectedLang] = useState("");
  return (
    <Navbar expand="lg" className="NAV flex-column">
      <Container
        style={{ height: "86px" }}
        className="d-flex align-items-center"
      >
        <Navbar.Brand href="#">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "86px", height: "62px", overflow: "hidden" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="wrapperSearch  mx-auto">
            <Form className="d-flex justify-content-between align-items-center ">
              <input
                type="search"
                placeholder="Search"
                className=" searchField"
                aria-label="Search"
              />
              <NavDropdown
                title="All category"
                id="navbarScrollingDropdown"
                className="CatClass "
              >
                <NavDropdown.Item href="#action3">Automobiles</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Clothes and wear
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">
                  Home interiors
                </NavDropdown.Item>
                <NavDropdown.Item href="#action6">
                  Computer and tech
                </NavDropdown.Item>
                <NavDropdown.Item href="#action6">
                  Tools, equipments
                </NavDropdown.Item>
                <NavDropdown.Item href="#action6">
                  Sports and outdoor
                </NavDropdown.Item>
                <NavDropdown.Item href="#action6">
                  Animal and pets
                </NavDropdown.Item>
                <NavDropdown.Item href="#action6">
                  Machinery tools
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action6">
                  Other Categories
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="outline-success" className="searchButton">
                Search
              </Button>
            </Form>
          </div>
          <Nav
            className="NavNav ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">
              <div className="d-flex align-items-center flex-column">
                <HugeiconsIcon icon={UserCircleIcon} />
                <span className="font12">Profile</span>
              </div>
            </Nav.Link>
            <Nav.Link href="#action1">
              <div className="d-flex align-items-center flex-column">
                <HugeiconsIcon icon={MessageSquareMoreIcon} />
                <span className="font12">Messages</span>
              </div>
            </Nav.Link>
            <Nav.Link href="#action1">
              <div className="d-flex align-items-center flex-column">
                <HugeiconsIcon icon={InLoveIcon} />
                <span className="font12">Orders</span>
              </div>
            </Nav.Link>
            <Nav.Link href="#action1">
              <div className="d-flex align-items-center flex-column">
                <CartDrawer></CartDrawer>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="breakUnder" />
      <Container>
        <div
          className="wrapUnderNav w-100 justify-content-between d-flex"
          style={{ height: "56px", display: "flex", alignItems: "center" }}
        >
          <div className="leftSideNavUnder">
            <Navbar
              expand="lg"
              className="align-items-center flex align-items-center"
            >
              <button className="navbtton">
                <HugeiconsIcon icon={Menu01Icon} />
                <span className=" ms-1 inter">All category</span>
              </button>

              <Nav className="me-auto NavCatNav">
                <Nav.Link
                  style={{
                    color: "#1c1c1c",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  href="#link"
                >
                  Hot offers
                </Nav.Link>
                <Nav.Link
                  style={{
                    color: "#1c1c1c",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  href="#link"
                >
                  Gift boxes
                </Nav.Link>
                <Nav.Link
                  style={{
                    color: "#1c1c1c",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  href="#link"
                >
                  About Us
                </Nav.Link>
                <NavDropdown title="Help" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    style={{
                      color: "#1c1c1c",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                    href="#action/3.1"
                  >
                    FAQ
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    style={{
                      color: "#1c1c1c",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                    href="#action/3.2"
                  >
                    Contact Us
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    style={{
                      color: "#1c1c1c",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                    href="#action/3.3"
                  >
                    Customer Support
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar>
          </div>
          <div className="rightSideNavUnder ">
            <NavDropdown
              title={selectedLang || "Language"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                style={{
                  color: "#1c1c1c",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
                onClick={() => setSelectedLang("English, USD")}
                href="#action/3.1"
              >
                English, USD
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{
                  color: "#1c1c1c",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
                onClick={() => setSelectedLang("Arabic, SYR")}
                href="#action/3.1"
              >
                Arabic, SYR
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{
                  color: "#1c1c1c",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
                onClick={() => setSelectedLang("French, EUR")}
                href="#action/3.2"
              >
                French, EUR
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBarComp;

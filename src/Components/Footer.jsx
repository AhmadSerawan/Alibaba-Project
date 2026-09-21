import { Container, NavDropdown } from "react-bootstrap";
import Logo from "../assets/imgs/Alibaba_Logo.png";
import marketButton from "../assets/imgs/marketButton.png";
import { useState } from "react";
import ArabicEmirates from "../assets/imgs/ArabicEmirates.png";
import English from "../assets/imgs/English.png";
import FranceFlag from "../assets/imgs/FranceFlag.png";

const Footer = () => {
  const [selectedLang, setSelectedLang] = useState("");
  return (
    <>
      <div className="bg-white">
        <Container>
          <div className="innerWrap d-flex aling-items-center justify-content-between mt-5">
            <div className="firstCol d-flex flex-column gap10">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "92px", height: "66px", overflow: "hidden" }}
              />
              <div className="text1 weight400 font16 width56 natural-grey">
                Best information about the company gies here but now lorem ipsum
                is
              </div>
              <div className="socialmedia">
                <div
                  class="icons7 d-flex justify-content-between mt-1 mb-5"
                  style={{ width: "200px" }}
                >
                  <a href="#">
                    <i class="bi bi-facebook natural-grey "></i>
                  </a>
                  <a href="#">
                    <i class="bi bi-twitter natural-grey"></i>
                  </a>
                  <a href="#">
                    <i class="bi bi-linkedin natural-grey"></i>
                  </a>
                  <a href="#">
                    <i class="bi bi-instagram natural-grey"></i>
                  </a>
                  <a href="#">
                    <i class="bi bi-youtube natural-grey "></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="secondColu d-flex flex-column">
              <div className="text111 weight500 font16">About</div>
              <div className="text222 font16 weight400 natural-grey">
                <div className="text222In">About Us</div>
                <div className="text222In">Find store</div>
                <div className="text222In">Categories</div>
                <div className="text222In">Blogs</div>
              </div>
            </div>
            <div className="secondColu d-flex flex-column">
              <div className="text111 weight500 font16">Partnership</div>
              <div className="text222 font16 weight400 natural-grey">
                <div className="text222In">About Us</div>
                <div className="text222In">Find store</div>
                <div className="text222In">Categories</div>
                <div className="text222In">Blogs</div>
              </div>
            </div>
            <div className="secondColu d-flex flex-column">
              <div className="text111 weight500 font16">Information</div>
              <div className="text222 font16 weight400 natural-grey">
                <div className="text222In">Help Center</div>
                <div className="text222In">Money Refund</div>
                <div className="text222In">Shipping</div>
                <div className="text222In">Contact us</div>
              </div>
            </div>
            <div className="secondColu d-flex flex-column">
              <div className="text111 weight500 font16">For users</div>
              <div className="text222 font16 weight400 natural-grey">
                <div className="text222In">Login</div>
                <div className="text222In">Register</div>
                <div className="text222In">Settings</div>
                <div className="text222In">My Orders</div>
              </div>
            </div>
            <div className="secondColu d-flex flex-column">
              <div className="text111 weight500 font16">Get app</div>
              <img src={marketButton} alt="" />
              <img src={marketButton} alt="" />
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-grey py-4 ">
        <Container className="d-flex justify-content-between">
          <div
            className="2023 me-auto weight400 font16"
            style={{ color: "#606060" }}
          >
            @ 2026 Ecommerce.
          </div>
          <div className="lang ms-auto">
            <div className="rightSideNavUnder d-flex gap5 align-items-ce">
              {selectedLang === "Arabic" ? (
                <img
                  src={ArabicEmirates}
                  alt="Arabic"
                  style={{ width: "28px" }}
                />
              ) : selectedLang === "English" ? (
                <img src={English} alt="English" />
              ) : selectedLang === "French" ? (
                <img src={FranceFlag} alt="French" />
              ) : null}

              <NavDropdown
                title={selectedLang || "Language"}
                id="basic-nav-dropdown"
              >
                {/* ArabicEmirates */}
                <NavDropdown.Item
                  style={{
                    color: "#1c1c1c",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  onClick={() => setSelectedLang("English")}
                  href="#action/3.1"
                >
                  English
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{
                    color: "#1c1c1c",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  onClick={() => setSelectedLang("Arabic")}
                  href="#action/3.1"
                >
                  Arabic
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{
                    color: "#1c1c1c",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  onClick={() => setSelectedLang("French")}
                  href="#action/3.2"
                >
                  French
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;

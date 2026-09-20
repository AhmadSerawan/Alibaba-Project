import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const SubscribeSectino = () => {
  return (
    <>
      <div className="SubscribeSection mt-3 align-items-center d-flex flex-column py-5 ">
        <div className="SubText1 font20 weight600">
          Subscribe on our newsletter
        </div>
        <div className="subText2 font16 weight400">
          Get daily news on upcoming offers from many suppliers all over the
          world
        </div>
        <Form>
          <div className="SubQuery d-flex align-items-center justify-contnet-center gap20 p-4">
            <div className="QuoteWhatItem">
              <div className="position-relative">
                <i
                  className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                  style={{ zIndex: 5 }}
                ></i>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>
            <div className="button Subscribe-button width45 ">Subscribe</div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SubscribeSectino;

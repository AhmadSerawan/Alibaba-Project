import { Container, Row, Col } from "react-bootstrap";
import PageLayout from "../../Layouts/PageLayout";
import { useEffect, useState } from "react";
import { API_Config } from "../../Config/API-Config";
import { useNavigate } from "react-router";

const Register = () => {
  // const [username, setUsername] = useState("")
  // const [email, setEmail] = useState("")

  const [hearCats, setHearCats] = useState([]);

  const [error, setError] = useState(null)

  const [passCheck, setPassCheck] = useState({
    pass1: "",
    pass2: ''
  })

  const navigateTo = useNavigate()

  const [registerData, setRegiserData] = useState({
    name: {
      value: "",
    },
    field_name: {
      value: "",
    },
    field_surname: {
      value: "",
    },
    mail: {
      value: "",
    },
    field_mobile: {
      value: "",
    },
    field_gender: {
      target_id: 9,
    },
    field_how_did_you_find_us: [],
    pass: {
      value: "",
    },
  });

  useEffect(() => {
    const hear_url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.HEAR}`;

    fetch(hear_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((ServerError) => {
            throw new Error(ServerError.message || "Someting went wrong !");
          });
        }
        return res.json();
      })
      .then((data) => {
        setHearCats(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRegisteration = (e) => {
    e.preventDefault();

    const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.REGISTER}?_format=json`;

    console.log(url);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData)
      })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((ServerError) => {
            throw new Error(ServerError.message || "Someting went wrong !");
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigateTo('/login3')
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      });
  };

  return (
    <PageLayout>
      <Container>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <h1 className="my-5">Create new account</h1>

            <form className="mb-5" onSubmit={handleRegisteration}>
              <div className="mb-3">
                <label htmlFor="username" className="mb-3">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="minimum 4 characters"
                  onInput={(e) => {
                    setRegiserData({
                      ...registerData,
                      name: {
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstname" className="mb-3">
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  className="form-control"
                  placeholder="minimum 4 characters"
                  onInput={(e) => {
                    setRegiserData({
                      ...registerData,
                      field_name: {
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lasttname" className="mb-3">
                  Last Name
                </label>
                <input
                  id="lasttname"
                  type="text"
                  className="form-control"
                  placeholder="minimum 4 characters"
                  onInput={(e) => {
                    setRegiserData({
                      ...registerData,
                      field_surname: {
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="mb-3">
                  EMail
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder=""
                  onInput={(e) => {
                    setRegiserData({
                      ...registerData,
                      mail: {
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="mb-3">
                  Gender
                </label>
                <select
                  id="gender"
                  className="form-select"
                  onChange={(e) => {
                    setRegiserData({
                      ...registerData,
                      field_gender: {
                        target_id: parseInt(e.target.value),
                      },
                    });
                  }}
                >
                  <option value="9">Male</option>
                  <option value="10">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="mb-3">
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="text"
                  className="form-control"
                  placeholder=""
                  onInput={(e) => {
                    setRegiserData({
                      ...registerData,
                      field_mobile: {
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="mb-3">
                  How did you find us?
                </label>
                {hearCats.map((el) => (
                  <div key={el.id}>
                    <input 
                    type="checkbox" 
                    id={`el--${el.id}`}
                    value={el.id}
                    onChange={(e)=>{
                      // console.log(e)
                      if(e.target.checked) {
                        setRegiserData({
                          ...registerData,
                          field_how_did_you_find_us: [
                            ...registerData.field_how_did_you_find_us,
                            { target_id: e.target.value }
                          ],
                        })
                      } else {
                        setRegiserData({
                          ...registerData,
                          field_how_did_you_find_us: [
                            ...registerData.field_how_did_you_find_us.filter( item => item.target_id !== e.target.value)
                          ],
                        })
                      }

                    }} 
                    
                    />
                    <label htmlFor={`el--${el.id}`}>{el.name}</label>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <label htmlFor="Password" className="mb-3">
                  Password
                </label>
                <input
                  id="Password"
                  type="password"
                  className="form-control"
                  placeholder=""
                  onInput={(e) => {
                    setRegiserData({
                      ...registerData,
                      pass: {
                        value: e.target.value,
                      },
                    });

                    setPassCheck({
                      ...passCheck,
                      pass1: e.target.value
                    })
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="ConfirmPassword" className="mb-3">
                  Confirm Password
                </label>
                <input
                  id="ConfirmPassword"
                  type="password"
                  className="form-control"
                  placeholder=""
                  onInput={(e) => {
                      setPassCheck({
                      ...passCheck,
                      pass2: e.target.value
                    })
                  }}
                />

                <div>
                  {
                    passCheck.pass2.length !== 0
                    ? passCheck.pass1 !== passCheck.pass2
                      ? <div className="text-danger">كلمة المرور غير متطابقة</div>
                      : <div className="text-success">كلمة المرور متطابقة</div>
                    : <></>
                  }
                </div>
              </div>



              <div className="mb-3 mt-3">
                <button className="btn btn-primary w-100">
                  Create Account
                </button>
              </div>

              {
                error
                ? <div className="alert alert-warning">{error.message}</div>
                : <></>
              }
            </form>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
};

export default Register;

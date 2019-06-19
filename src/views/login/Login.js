import React from "react";
import {
  MDBAlert,
  MDBCard,
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBBtn
} from "mdbreact";
import { Link } from "react-router-dom";
import { withGlobalContext } from "../../context/Provider";
import validate from "./validation";
import jwt_decode from "jwt-decode";
import globals from "../../constants/Globals";
//Material kit header
import Header from "../../components/webcomponents/Header/Header.jsx";
import HeaderLinks from "../../components/webcomponents/Header/HeaderLinks.jsx";
//
import { Form, Spin, Icon, Input, Button, Checkbox, Alert } from "antd";

const dashboardRoutes = [];
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const parseUser = user => {
  if (typeof user.phone_number == "object") {
    user = {
      ...user,

      phone_number: user.phone_number.main,
      alt_phone_number: user.phone_number.alt
    };
  }
  console.log("[id number ]", user);
  user = { ...user, idno: user.idNumber };
  return user;
};
class App extends React.Component {
  state = {
    isStudent: false,
    email: "",
    emailError: null,
    password: "",
    passwordError: null,
    serverRes: null,
    loading: true
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        let data = {
          email: values.email,
          password: values.password
        };
        console.log(data);
        this.setState({ checkingDetails: true, serverRes: null });
        const LoginAsync = async () =>
          await (await fetch(`${globals.BASE_URL}/api/users/login`, {
            method: "post",
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json"
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data)
          })).json();

        LoginAsync()
          .then(data => {
            //this.setState({currentPlace:data.results})
            if (data.success) {
              let user = jwt_decode(data.token);
              console.log("[Current User]", user);

              //add role based redirection
              if (user.role == "admin") {
                this.props.history.push({
                  pathname: "/admin/dashboard",
                  snack: { type: "success", msg: "Login was successful" }
                });
              } else {
                if (!user.isSetUp) {
                  this.props.history.push({
                    pathname: "/completeprofile",
                    snack: { type: "success", msg: "Login was successful" }
                  });
                } else {
                  this.props.history.push({
                    pathname: `/${user.role}/dashboard`,
                    snack: { type: "success", msg: "Login was successful" }
                  });
                }
              }

              this.props.global.onLogin(data.token, user);
              // this.props.global._logoutHelper(user.exp - user.iat);
            } else {
              this.setState({
                checkingDetails: false,
                serverRes: data.message
              });
            }
          })
          .catch(error => {
            console.log(error);
            if (error == "TypeError: Failed to fetch") {
              //   alert('Server is offline')
              this.setState({
                serverRes: "Failed to contact server!"
              });
            } else if (error.message == "Network request failed") {
              // alert('No internet connection')
              this.setState({
                serverRes: "Network request failed"
              });
            }
            this.setState({ checkingDetails: false });
            console.log(error);
          });
      }
    });
  };
  _loaded = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  };
  componentDidMount = () => {
    this._loaded();
  };

  render() {
    const { classes, ...rest } = this.props;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    return (
      <MDBContainer>
        <MDBRow>
          <Header
            color="white"
            routes={dashboardRoutes}
            brand="TotoSci Academy"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
            {...rest}
          />
          <MDBCard
            style={{
              margin: "8.5rem auto",
              width: "30rem",
              padding: "20px 40px"
            }}
          >
            {/*<MDBBtn outline={this.state.isStudent} color="primary"
						 	 onClick={()=>{ this.setState({isStudent:false});}}
					>Staff </MDBBtn>
			 <MDBBtn   outline={!this.state.isStudent}color="primary"
				 onClick={()=>{ this.setState({isStudent:true});}}
				 >Student </MDBBtn>*/}
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {" "}
                <div
                  className="h5 text-center mb-4"
                  style={{ marginTop: "10px" }}
                >
                  <img
                    src={require("../../assets/img/totosci.png")}
                    style={{ height: "50px" }}
                  />
                </div>
                {state.serverRes ? (
                  <Alert message={state.serverRes} type="error" showIcon />
                ) : null}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    { required: true, message: "Please input your email!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                <Link className="login-form-forgot" to={`/reset`}>
                  Forgot password
                </Link>
              </Form.Item>
              <Form.Item>
                <div className="text-center">
                  {state.checkingDetails ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Log in
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
            {/* <div className="grey-text">
                <MDBInput
                  label={
                    this.state.isStudent
                      ? "Type your admission number"
                      : "Type your email"
                  }
                  icon="envelope"
                  group
                  value={state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                  type="email"
                  onBlur={() =>
                    this.setState({
                      emailError: validate(
                        "email",
                        state.email ? state.email : null
                      )
                    })
                  }
                  error="Whoops!"
                  success="right"
                />
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    textAlign: "center"
                  }}
                >
                  {state.emailError}
                </p>
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  group
                  value={state.password}
                  onChange={event => {
                    this.setState({ password: event.target.value });
                  }}
                  onBlur={() =>
                    this.setState({
                      passwordError: validate(
                        "password",
                        state.password ? state.password : null
                      )
                    })
                  }
                  onKeyPress={event => {
                    if (event.key == "Enter" && !state.checkingDetails) {
                      this.handleSubmit();
                    }
                  }}
                  type="password"
                />
                <p
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    textAlign: "center"
                  }}
                >
                  {state.passwordError}
                </p>
              </div>*/}
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const center = {
  position: "absolute",
  left: "50%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};

export default withGlobalContext(Form.create({ name: "normal_login" })(App));

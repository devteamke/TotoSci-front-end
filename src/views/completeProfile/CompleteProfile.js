import React from "react";
import {
  MDBAlert,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import { withGlobalContext } from "../../context/Provider";
import validate from "./validation";
import jwt_decode from "jwt-decode";
import globals from "../../constants/Globals";
import GridItem from "../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../components/dcomponents/Grid/GridContainer.jsx";
import Snackbar from "../../components/dcomponents/Snackbar/Snackbar.jsx";
import Card from "../../components/dcomponents/Card/Card.jsx";
import CardHeader from "../../components/dcomponents/Card/CardHeader.jsx";
import CardAvatar from "../../components/dcomponents/Card/CardAvatar.jsx";
import CardBody from "../../components/dcomponents/Card/CardBody.jsx";
import CardFooter from "../../components/dcomponents/Card/CardFooter.jsx";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";

import Header from "../../components/webcomponents/Header/Header.jsx";
import HeaderLinks from "../../components/webcomponents/Header/HeaderLinks.jsx";
//
import {
  Form,
  Spin,
  Icon,
  Input,
  InputNumber,
  Button,
  Checkbox,
  Alert,
  Select
} from "antd";
const { Option } = Select;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
class App extends React.Component {
  state = {
    loading: true,

    //snack
    savingInfo: false,
    open: false,
    place: "bc",
    resType: "warning"
  };

  _loaded = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  };

  handleSubmit = e => {
    let state = this.state;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        let data = {
          salutation: values.salutation,

          idNumber: values.idno,

          residence: values.residence,

          alt_phone_number: "254" + values.phone.toString()
        };

        console.log(data);
        this.setState({ savingInfo: true });
        const SaveAsync = async () =>
          await (await fetch(`${globals.BASE_URL}/api/users/complete_profile`, {
            method: "post",
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              Authorization: this.props.global.token
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data)
          })).json();

        SaveAsync()
          .then(data => {
            this._snack({
              type: data.success ? "success" : "warning",
              msg: data.message
            });
            //this.setState({currentPlace:data.results})
            if (data.success) {
              this.props.history.push({
                pathname: `/${data.user.role}/dashboard`,
                snack: {
                  type: "success",
                  msg: "Your profile was successfully updated"
                }
              });

              this.props.global.updateUser(data.user, data.token);
            } else {
              this.setState({ savingInfo: false });
            }
          })
          .catch(error => {
            console.log(error);
            if (error == "TypeError: Failed to fetch") {
              //   alert('Server is offline')
            } else if (error.message == "Network request failed") {
              // alert('No internet connection')
              this.setState({
                serverRes: "Network request failed"
              });
            }
            this._snack({ type: "warning", msg: error.toString() });
            this.setState({ savingInfo: false });
            console.log(error);
          });
      }
    });
  };
  _snack = params => {
    if (this.props.location.snack) {
      let snack = this.props.location.snack;
      this.setState({ open: true, resType: snack.type, serverRes: snack.msg });
      setTimeout(
        function() {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    }
    if (params) {
      this.setState({
        open: true,
        resType: params.type,
        serverRes: params.msg
      });
      setTimeout(
        function() {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    }
  };

  componentDidMount = () => {
    this._loaded();
  };
  render = () => {
    const state = this.state;
    const { classes, ...rest } = this.props;
    const context = this.props.global;
    const { user } = context;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "254"
    })(
      <Select style={{ width: 90 }}>
        <Option value="254">+254</Option>
      </Select>
    );
    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }

    return (
      <div>
        <Snackbar
          place={this.state.place}
          color={state.resType}
          icon={AddAlert}
          message={state.serverRes}
          open={this.state.open}
          closeNotification={() => this.setState({ open: false })}
          close
        />
        <Header
          absolute
          color="white"
          brand="TotoSci Academy"
          rightLinks={<HeaderLinks />}
          {...rest}
        />

        <GridItem xs={12} sm={12} md={6} style={{ margin: "10rem auto" }}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="text-center">
                    <h5>
                      Your are almost there, complete your profile to
                      continue...
                    </h5>
                    <MDBIcon
                      style={{ margin: "1rem auto" }}
                      icon="user-circle"
                      className="blue-grey-text"
                      size="6x"
                    />
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                      <Form.Item label="Salutation">
                        {getFieldDecorator("salutation", {
                          rules: [
                            {
                              required: true,
                              message: "Please select your salutation"
                            }
                          ]
                        })(
                          <Select style={{ width: "100%" }}>
                            <Option value="mr">Mr</Option>
                            <Option value="mrs">Mrs</Option>
                            <Option value="Miss">Miss</Option>
                            <Option value="dr">Dr</Option>
                            <Option value="prof">Prof</Option>
                            <Option value="other">other</Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label="Residence">
                        {getFieldDecorator("residence", {
                          rules: [
                            {
                              required: true,

                              message: "Please input your residence!"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="ID Number">
                        {getFieldDecorator("idno", {
                          rules: [
                            {
                              type: "number",
                              message: "ID input must be a number"
                            },
                            {
                              required: true,
                              message: "Please input your ID number!"
                            }
                          ]
                        })(<InputNumber style={{ width: "100%" }} />)}
                      </Form.Item>
                      <Form.Item label="Alternative phone number">
                        {getFieldDecorator("phone", {
                          rules: [
                            {
                              type: "number",
                              message: "Alternative phone must be a number"
                            },
                            {
                              required: true,
                              message:
                                "Please input your alternative phone number!"
                            }
                          ]
                        })(
                          <InputNumber
                            addonBefore={prefixSelector}
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>
                      {/*  <Form.Item>
                        {getFieldDecorator("remember", {
                          valuePropName: "checked",
                          initialValue: true
                        })(<Checkbox>Remember me</Checkbox>)}
                        <Link className="login-form-forgot" to={`/reset`}>
                          Forgot password
                        </Link>
                      </Form.Item>*/}
                      <Form.Item>
                        {state.savingInfo ? (
                          <Spin
                            indicator={antIcon}
                            style={{ float: "right" }}
                          />
                        ) : (
                          <Button
                            style={{ float: "right" }}
                            type="primary"
                            htmlType="submit"
                          >
                            Continue
                          </Button>
                        )}
                      </Form.Item>
                    </Form>
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </div>
    );
  };
}
const center = {
  position: "absolute",
  left: "50%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};
export default withGlobalContext(
  Form.create({ name: "complete_profile" })(App)
);

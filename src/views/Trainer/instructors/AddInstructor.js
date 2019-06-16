import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";
import CustomInput from "../../../components/dcomponents/CustomInput/CustomInput.jsx";

import { MDBBtn, MDBInput } from "mdbreact";
import avatar from "../../../assets/img/faces/marc.jpg";

import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../context/Provider";
//Form components
import InstructorForm from "./forms/Instructor";
import validate from "./validation";
//antd
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
  Radio,
  Spin
} from "antd";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const { Option } = Select;

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      //other
      addingUser: false,
      open: false,
      place: "bc",
      resType: "warning"
    };
  }

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

  handleSubmit = e => {
    e.preventDefault();
    const state = this.state;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ registering: true });
        let data = {
          role: "instructor",
          email: values.email,

          fname: values.fname,
          lname: values.lname,
          school: values.school,
          phone_number: { main: values.phone, alt: "" }
        };
        console.log(data);
        this.setState({ registering: true });
        const AddAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${this.props.global.user.role}/register`,
            {
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
            }
          )).json();

        AddAsync()
          .then(data => {
            this._snack({
              type: data.success ? "success" : "warning",
              msg: data.message
            });
            //this.setState({currentPlace:data.results})
            if (data.success) {
              this.props.form.resetFields();
              this.setState({
                registering: false,
                serverRes: data.message
              });
            } else {
              this.setState({
                registering: false,

                serverRes: data.message
              });
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
            this.props.snack({ type: "warning", msg: error.toString() });
            this.setState({ registering: false });
            console.log(error);
          });
      }
    });
  };
  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      role: e.target.value
    });
  };
  componentDidMount = () => {};

  render() {
    const { classes } = this.props;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
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
          <div
            className="spinner-grow text-info"
            role="status"
            style={{ marginBottom: "15px" }}
          >
            <span className="sr-only">Loading...</span>
          </div>
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
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Card title="Register a new Instructor" style={{ width: "100%" }}>
              <GridItem xs={12} sm={12} md={12}>
                <h5>Instructor Details</h5>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="First Name">
                    {getFieldDecorator("fname", {
                      rules: [
                        {
                          required: true,
                          message: "Please input  first name!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Last Name">
                    {getFieldDecorator("lname", {
                      rules: [
                        {
                          required: true,
                          message: "Please input last  name!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="E-mail">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          type: "email",
                          message: "The input is not valid E-mail!"
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Phone Number">
                    {getFieldDecorator("phone", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your phone number!"
                        }
                      ]
                    })(
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>

                  <div className="text-center">
                    {state.registering ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Register
                      </Button>
                    )}
                  </div>
                </Form>
              </GridItem>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}></GridItem>
        </GridContainer>
      </div>
    );
  }
}

const capitalize = str => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};
const unKebab = string => {
  if (string) {
    string = string.replace(/-/g, " ").toLowerCase();

    let splitStr = string.toLowerCase().split(" ");
    string = splitStr.map(str => {
      return str.charAt(0).toUpperCase() + str.slice(1) + " ";
    });
  }

  return string;
};

const center = {
  position: "absolute",
  left: "50%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};

export default Form.create({ name: "register" })(
  withGlobalContext(withStyles(styles)(AddUser))
);

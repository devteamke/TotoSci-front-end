import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";

import { MDBBtn, MDBInput } from "mdbreact";
import avatar from "../../../assets/img/faces/marc.jpg";

import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../context/Provider";
//Form components

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
  InputNumber,
  Spin
} from "antd";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
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

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //form fields
      name: "",
      nameError: null,
      county: "",
      countyError: null,
      sub_county: "",
      sub_countyError: null,
      schoolType: '',
      schoolTypeError: null,
      //other
      adding: false,
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
        function () {
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
        function () {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    }
  };

  handleChange = event => {
    console.log("value", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      schoolType: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let state = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ adding: true });
        let data = [];
        let contact = {};
        let school = {
          school_type: state.schoolType,
          name: values.name,
          county: values.county,
          sub_county: values.sub_county
        };
        if (school.school_type == 'school-based') {
          school = { ...school, school_code: values.school_code }
          contact = {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            phone_number: {
              main: values.phone, alt: ''
            }
          }
          data.push(school);
          data.push(contact)
        } else {
          data.push(school)
        }
        console.log(data);
        this.setState({ adding: true });
        const AddAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${this.props.global.user.role}/new_school`,
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
                adding: false,
                serverRes: data.message,
                //form fields
                name: "",
                nameError: null,
                county: "",
                countyError: null,
                sub_county: "",
                sub_countyError: null
              });
            } else {
              this.setState({
                adding: false,

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
            this._snack({ type: "warning", msg: error.toString() });
            this.setState({ adding: false });
            console.log(error);
          });
      }
    });
  };

  componentDidMount = () => {
    this._snack();
  };

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
          <GridItem xs={12} sm={12} md={12}>
            <Card title="Add a new school" style={{ width: "100%" }}>

              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Row gutter={48}>
                  <Col span={12}>
                    <Form.Item label='School Type'>
                      <Radio.Group onChange={this.onChange} value={this.state.schoolType}>
                        <Radio value={'supervised'}>Supervised</Radio>
                        <Radio value={'unsupervised'}>Unsupervised </Radio>
                        <Radio value={'school-based'}>School Based</Radio>

                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Name">
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Please input  school name!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="County">
                      {getFieldDecorator("county", {
                        rules: [
                          {
                            required: true,
                            message: "Please input county!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Sub County">
                      {getFieldDecorator("sub_county", {
                        rules: [
                          {
                            required: true,
                            message: "Please input sub county!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    {this.state.schoolType == 'school-based' ? (
                      <>
                        <Form.Item label="School Code">
                          {getFieldDecorator("school_code", {
                            rules: [
                              {
                                required: true,
                                message: "Please input schol code!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                      </>
                    ) : (<></>)}
                  </Col>
                  <Col span={12} >
                    {this.state.schoolType == 'school-based' ? (
                      <>
                        <h5 style={{ textAlign: 'center' }}> Contact Person</h5>
                        <span style={{ left: "50%", right: "50%" }}></span>
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
                        <Form.Item label="Last  Name">
                          {getFieldDecorator("lname", {
                            rules: [
                              {
                                required: true,
                                message: "Please input  last name!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="E-mail">
                          {getFieldDecorator("email", {
                            rules: [
                              {
                                required: true,
                                message: "Please input  email!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                          {getFieldDecorator("phone", {
                            rules: [
                              {
                                required: true,
                                message: "Please input phone Number!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>

                      </>

                    ) : (<></>)}
                  </Col>
                </Row>
                <Row>
                  {this.state.schoolType != '' ? (
                    <>
                      <div className="text-center">
                        {state.adding ? (
                          <Spin indicator={antIcon} />
                        ) : (
                            <Button type="primary" htmlType="submit">
                              Add School
                      </Button>
                          )}
                      </div>
                    </>
                  ) : (<></>)}
                </Row>
              </Form>

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
  withGlobalContext(withStyles(styles)(Add))
);

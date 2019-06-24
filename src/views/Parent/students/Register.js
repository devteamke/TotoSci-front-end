import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";
import CustomInput from "../../../components/dcomponents/CustomInput/CustomInput.jsx";

//import Card from "../../../components/dcomponents/Card/Card.jsx";
import CardHeader from "../../../components/dcomponents/Card/CardHeader.jsx";
import CardAvatar from "../../../components/dcomponents/Card/CardAvatar.jsx";
import CardBody from "../../../components/dcomponents/Card/CardBody.jsx";
import CardFooter from "../../../components/dcomponents/Card/CardFooter.jsx";
import {
  MDBBtn,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBIcon
} from "mdbreact";
import validate from "./validation";
import avatar from "../../../assets/img/faces/marc.jpg";
//import Select from "@material-ui/core/Select";
import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../context/Provider";
//Form components

import "./register.css";
//ant design
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
  Spin,
  DatePicker
} from "antd";
import moment from "moment";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const { MonthPicker, RangePicker } = DatePicker;

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
      confirmDirty: false,
      autoCompleteResult: [],

      school: "",
      schools: [],

      //Existing parent
      isExisting: true,
      searchStr: "",
      searching: false,
      parentList: [],
      existingSelected: false,

      //sponsor
      isSponsored: true,

      loading: true,
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

  handleChange = event => {
    console.log("value", event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    const state = this.state;
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.setState({ registering: true });
        let data = {
          studentFname: values.fname,
          studentLname: values.lname,
          school: values.school[0],
          isSponsored: state.isSponsored,
          gender: values.gender,
          DOB: values.dob
        };
        if (!state.isSponsored) {
          if (!state.isExisting) {
            data = {
              ...data,
              parentFname: values.pfname,
              parentLname: values.plname,
              email: values.email,
              phone_number: { main: values.phone },
              existingParent: false
            };
          } else {
            data = { ...data, existingParent: state.selected._id };
          }
        }
        console.log(data);
        this.setState({ registering: true });
        const AddAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${this.props.global.user.role}/new_student`,
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

                selected: null,
                existingSelected: false,
                searchStr: "",
                //Sponsored
                isSponsored: true,

                school: "",
                registering: false
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
            this._snack({ type: "warning", msg: error.toString() });
            this.setState({ registering: false });
            console.log(error);
          });
      }
    });
  };

  _handleSearch = () => {
    this.setState({ searching: true });
    const SearchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/search_parent`,
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
          body: JSON.stringify({ query: this.state.searchStr })
        }
      )).json();

    SearchAsync()
      .then(data => {
        //this.setState({currentPlace:data.results})
        if (data.success) {
          this.setState({
            parentList: data.parents,
            searching: false
          });
        } else {
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
        this.setState({ searching: false });
        console.log(error);
      });
  };
  _fetchSchools = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_schools`,
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
          body: JSON.stringify({ data: "hello server" })
        }
      )).json();

    FetchAsync()
      .then(data => {
        //this.setState({currentPlace:data.results})
        if (data.success) {
          let schools = data.schools.map(each => {
            return { value: each._id, label: unKebab(each.name) };
          });
          console.log("mapped schools", schools);
          this.setState({
            schools: schools,
            loading: false
          });
        } else {
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

        console.log(error);
      });
  };

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      isSponsored: !this.state.isSponsored
    });
  };
  onChange2 = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      isExisting: !this.state.isExisting
    });
  };
  onChangeG = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      gender: e.target.value
    });
  };
  _handleSelect = obj => {
    this.setState({ selected: obj, existingSelected: true });
  };
  componentDidMount = () => {
    this._snack();
    this._fetchSchools();
  };
  //ant design
  handleParentChange = value => {
    if (value.length == "5d0231026accc00c57f14281".length) {
      return;
    }
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      this.setState({
        searching: true,
        searchStr: value,
        existingSelected: false,
        selected: null
      });
      const SearchAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/search_parent`,
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
            body: JSON.stringify({ query: value })
          }
        )).json();

      SearchAsync()
        .then(data => {
          //this.setState({currentPlace:data.results})
          if (data.success) {
            autoCompleteResult = data.parents;
            this.setState({
              autoCompleteResult,
              searching: false,
              plength: data.parents.length
            });
          } else {
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
          this.setState({ searching: false });
          console.log(error);
        });
    }
  };
  disabledDate = current => {
    // Can not select days before today and today
    return current && current > moment().subtract(1825, "days");
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
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "254"
    })(
      <Select style={{ width: 90 }}>
        <Option value="254">+254</Option>
      </Select>
    );

    const parentOptions = autoCompleteResult.map(parent => (
      <AutoCompleteOption
        key={parent._id}
        onClick={() => {
          this.setState({ existingSelected: true, selected: parent });
        }}
      >
        {capitalize(parent.fname) + " " + capitalize(parent.lname)}
      </AutoCompleteOption>
    ));

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
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Card title="Register a new student" style={{ width: "100%" }}>
              <GridItem xs={12} sm={12} md={12}>
                <h5>Student Details</h5>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="First Name">
                    {getFieldDecorator("fname", {
                      rules: [
                        {
                          required: true,
                          message: "Please input student's last name!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Last Name">
                    {getFieldDecorator("lname", {
                      rules: [
                        {
                          required: true,
                          message: "Please input student's last  name!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Gender">
                    {getFieldDecorator("gender", {
                      rules: [
                        {
                          required: true,
                          message: "Please select the students gender!"
                        }
                      ]
                    })(
                      <Radio.Group
                        style={{ float: "left" }}
                        onChange={this.onChangeG}
                      >
                        <Radio value={"male"}>Male</Radio>
                        <Radio value={"female"}>Female</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                  <Form.Item label="DOB">
                    {getFieldDecorator("dob", {
                      rules: [
                        {
                          required: true,
                          message: "Please select the students date of birth!"
                        }
                      ]
                    })(
                      <DatePicker
                        disabledDate={this.disabledDate}
                        format={"DD/MM/YYYY"}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Student type">
                    <Radio.Group
                      onChange={this.onChange}
                      value={this.state.isSponsored}
                    >
                      <Radio value={true}>Sponsored</Radio>
                      <Radio value={false}>Self Sponsored(parent)</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {!state.isSponsored ? (
                    <>
                      <GridItem xs={12} sm={12} md={12}>
                        <h5>Parent Details</h5>
                      </GridItem>
                      <Form.Item label="Option">
                        <Radio.Group
                          style={{ marginRight: "45.5px" }}
                          onChange={this.onChange2}
                          value={this.state.isExisting}
                        >
                          <Radio value={true}>Existing Parent</Radio>
                          <Radio value={false}>New Parent</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {!state.isExisting ? (
                        <>
                          <Form.Item label="First Name">
                            {getFieldDecorator("pfname", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input parent's first name!"
                                }
                              ]
                            })(<Input />)}
                          </Form.Item>
                          <Form.Item label="Last Name">
                            {getFieldDecorator("plname", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input parent's last  name!"
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
                        </>
                      ) : (
                        <>
                          <Form.Item label="Search Parent">
                            {getFieldDecorator("psearch", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please search and select parent!"
                                }
                              ]
                            })(
                              <AutoComplete
                                dataSource={parentOptions}
                                onChange={this.handleParentChange}
                                placeholder="parent"
                              >
                                <Input />
                              </AutoComplete>
                            )}
                          </Form.Item>
                          {state.searching ? (
                            <div className="text-center">
                              <div
                                className="spinner-grow text-info"
                                role="status"
                                style={{
                                  marginBottom: "15px",
                                  marginLeft: "9rem",
                                  marginTop: "1.1rem"
                                }}
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          ) : state.searchStr && state.plength == 0 ? (
                            <div
                              className="text-center"
                              style={{
                                marginRight: "1rem",
                                marginTop: "-1.5rem"
                              }}
                            >
                              <p style={{ marginTop: 50 }}>
                                {" "}
                                No parent found matching "{state.searchStr}"
                              </p>{" "}
                            </div>
                          ) : null}

                          <>
                            {state.existingSelected ? (
                              <Form.Item>
                                <MDBTable
                                  borderless
                                  hover
                                  small
                                  style={{
                                    width: "27%",
                                    float: "right",
                                    marginRight: "1rem",
                                    marginTop: "-1.5rem"
                                  }}
                                >
                                  <MDBTableBody>
                                    <tr>
                                      <td style={{ width: "50%" }}>
                                        <b style={{ fontSize: "1.1em" }}>
                                          First Name
                                        </b>
                                      </td>

                                      <td>
                                        {capitalize(state.selected.fname)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ width: "50%" }}>
                                        <b style={{ fontSize: "1.1em" }}>
                                          Last Name
                                        </b>
                                      </td>

                                      <td>
                                        {capitalize(state.selected.lname)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ width: "50%" }}>
                                        <b style={{ fontSize: "1.1em" }}>
                                          Email
                                        </b>
                                      </td>

                                      <td>
                                        {capitalize(state.selected.email)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ width: "50%" }}>
                                        <b style={{ fontSize: "1.1em" }}>
                                          Phone_number
                                        </b>
                                      </td>

                                      <td>
                                        {capitalize(
                                          state.selected.phone_number
                                            ? state.selected.phone_number.main
                                            : ""
                                        )}
                                      </td>
                                    </tr>
                                  </MDBTableBody>
                                </MDBTable>
                              </Form.Item>
                            ) : null}
                          </>
                        </>
                      )}
                    </>
                  ) : null}

                  <Form.Item label="Learning Venue/ School">
                    {getFieldDecorator("school", {
                      rules: [
                        {
                          type: "array",
                          required: true,
                          message: "Please select school/venue!"
                        }
                      ]
                    })(<Cascader options={state.schools} />)}
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
  left: "58.3%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};

export default withGlobalContext(
  Form.create({ name: "register" })(withStyles(styles)(AddUser))
);

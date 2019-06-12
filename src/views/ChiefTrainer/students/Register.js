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
import Button from "../../../components/dcomponents/CustomButtons/Button.jsx";
import Card from "../../../components/dcomponents/Card/Card.jsx";
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
import avatar from "../../../assets/img/faces/marc.jpg";
import Select from "@material-ui/core/Select";
import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../context/Provider";
//Form components

import "./register.css";

import validate from "./validation";
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
      //form fields
      fname: "",
      fnameError: null,
      lname: "",
      lnameError: null,
      //parent
      pfname: "",
      pfnameError: null,
      plname: "",
      plnameError: null,
      email: "",
      emailError: null,
      residence: "",
      residenceError: "",

      school: "",
      //Existing parent
      isExisting: true,
      searchStr: "",
      searching: false,
      parentList: [],
      existingSelected: false,

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
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    let state = this.state;
    const fnameError = validate(
      "fname",
      state.fname === "" ? null : state.fname
    );
    const lnameError = validate(
      "lname",
      state.lname === "" ? null : state.lname
    );
    //parent valudation

    let pfnameError = validate(
      "fname",
      state.pfname === "" ? null : state.pfname
    );
    let plnameError = validate(
      "lname",
      state.plname === "" ? null : state.plname
    );
    let emailError = validate(
      "email",
      state.email === "" ? null : state.email
    );
    let phoneError = validate(
      "phone",
      state.phone_number === "" ? null : state.phone_number
    );

    //other validation
    const schoolError = validate(
      "school",
      state.school === "" ? null : state.school
    );
    if (state.existingSelected) {
      pfnameError = null;
      plnameError = null;
      emailError = null;
      phoneError = null;
    }

    this.setState(
      {
        fnameError: fnameError,
        lnameError: lnameError,
        //parent
        pfnameError: pfnameError,
        plnameError: plnameError,
        emailError: emailError,
        phone_numberError: phoneError,
        //Other info
        schoolError: schoolError
      },
      () => {
        if (
          !emailError &&
          !fnameError &&
          !lnameError &&
          !pfnameError &&
          !plnameError &&
          !phoneError &&
          !schoolError
        ) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
            role: "parent",

            studentFname: state.fname,
            studentLname: state.lname,
            school: state.school
          };
          if (!state.isExisting) {
            data = {
              ...data,
              parentFname: state.pfname,
              parentLname: state.plname,
              email: state.email,
              phone_number: { main: state.phone_number },
              existingParent: false
            };
          } else {
            data = { ...data, existingParent: state.selected._id };
          }
          console.log(data);
          this.setState({ registering: true, serverRes: null });
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
                this.setState({
                  registering: false,
                  serverRes: data.message,
                  //form fields
                  fname: "",
                  fnameError: null,
                  lname: "",
                  lnameError: null,
                  //parent
                  pfname: "",
                  pfnameError: null,
                  plname: "",
                  plnameError: null,
                  email: "",
                  emailError: null,
                  residence: "",
                  residenceError: "",

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
      }
    );
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

  schools = () => {
    return <MenuItem value={"heri-hub"}>Heri Hub</MenuItem>;
  };
  handleOptionChange = () => {
    this.setState({
      isExisting: !this.state.isExisting
    });
  };
  _handleSelect = obj => {
    this.setState({ selected: obj, existingSelected: true });
  };
  componentDidMount = () => {
    this._snack();
  };

  render() {
    const { classes } = this.props;
    const state = this.state;
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
          <GridItem xs={12} sm={12} md={11}>
            <div
              style={{
                width: "15rem",
                marginTop: "3px",
                float: "left"
              }}
            >
              <MDBBtn
                size=""
                style={{ display: "inline-block" }}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/${this.props.global.user.role}/students`,
                    data: ""
                  });
                }}
              >
                Back
              </MDBBtn>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={11}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  Register a new student
                </h4>
                <p className={classes.cardCategoryWhite}>Fill in their info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <h5>Student Details</h5>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
                      label={"First Name"}
                      group
                      value={state.fname}
                      onChange={event => {
                        this.setState({ fname: event.target.value });
                      }}
                      onBlur={() =>
                        this.setState({
                          fnameError: validate(
                            "fname",
                            state.fname == "" ? null : state.fname
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
                      {state.fnameError}
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
                      label={"Last Name"}
                      group
                      value={state.lname}
                      onChange={event => {
                        this.setState({ lname: event.target.value });
                      }}
                      type="text"
                      onBlur={() =>
                        this.setState({
                          lnameError: validate(
                            "lname",
                            state.lname == "" ? null : state.lname
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
                      {state.lnameError}
                    </p>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <h5>Parent details</h5>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div style={{ marginLeft: "1.3rem" }}>
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="option1"
                          checked={state.isExisting}
                          onChange={this.handleOptionChange}
                          className="form-check-input"
                        />
                        Existing parent
                      </label>
                      <label style={{ marginLeft: "3rem" }}>
                        <input
                          type="radio"
                          name="react-tips"
                          value="option1"
                          checked={!state.isExisting}
                          onChange={this.handleOptionChange}
                          className="form-check-input"
                        />
                        New Parent
                      </label>
                    </div>
                  </GridItem>

                  {state.isExisting ? (
                    <span style={{ marginBottom: "24px" }}>
                      <GridItem xs={12} sm={12} md={12}>
                        <div
                          style={{
                            width: "22rem",
                            float: "left",
                            marginBottom: "-24px"
                          }}
                        >
                          {state.existingSelected ? (
                            <MDBIcon
                              size="2x"
                              className="red-text pr-3"
                              style={{ marginLeft: "6rem" }}
                              onClick={() =>
                                this.setState({
                                  selected: null,
                                  existingSelected: false,
                                  searchStr: ""
                                })
                              }
                              icon="user-times"
                            />
                          ) : (
                            <MDBInput
                              responsive
                              label={"Search existing parent by name"}
                              group
                              value={state.searchStr}
                              onChange={event => {
                                this.setState(
                                  { searchStr: event.target.value },
                                  () => this._handleSearch()
                                );
                              }}
                              type="email"
                            />
                          )}
                        </div>
                        <br />
                        <div style={{ width: "1rem", marginBottom: "30px" }}>
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
                          ) : null}

                          {state.existingSelected ? (
                            <MDBTable borderless hover small>
                              <MDBTableBody>
                                <tr>
                                  <td style={{ width: "50%" }}>
                                    <b style={{ fontSize: "1.25em" }}>
                                      First Name
                                    </b>
                                  </td>

                                  <td>{capitalize(state.selected.fname)}</td>
                                </tr>
                                <tr>
                                  <td style={{ width: "50%" }}>
                                    <b style={{ fontSize: "1.25em" }}>
                                      Last Name
                                    </b>
                                  </td>

                                  <td>{capitalize(state.selected.lname)}</td>
                                </tr>
                                <tr>
                                  <td style={{ width: "50%" }}>
                                    <b style={{ fontSize: "1.25em" }}>Email</b>
                                  </td>

                                  <td>{capitalize(state.selected.email)}</td>
                                </tr>
                                <tr>
                                  <td style={{ width: "50%" }}>
                                    <b style={{ fontSize: "1.25em" }}>
                                      Phone_number
                                    </b>
                                  </td>

                                  <td>
                                    {capitalize(
                                      state.selected.phone_number?state.selected.phone_number.main:''
                                    )}
                                  </td>
                                </tr>
                              </MDBTableBody>
                            </MDBTable>
                          ) : (
                            <>
                              {state.searchStr !== "" &&
                              !this.state.searching ? (
                                <>
                                  {state.parentList.length > 0 ? (
                                    <MDBListGroup style={{ width: "22rem" }}>
                                      {state.parentList.map(parent => {
                                        return (
                                          <MDBListGroupItem
                                            className="item"
                                            onClick={() =>
                                              this._handleSelect(parent)
                                            }
                                          >
                                            {capitalize(parent.fname)}{" "}
                                            {capitalize(parent.lname)}
                                          </MDBListGroupItem>
                                        );
                                      })}
                                    </MDBListGroup>
                                  ) : (
                                    <div
                                      className="text-center"
                                      style={{
                                        height: 50,
                                        width: "270px",
                                        paddingLeft: "7rem"
                                      }}
                                    >
                                      <p style={{ marginTop: 50 }}>
                                        {" "}
                                        No parent found matching "
                                        {state.searchStr}"
                                      </p>{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </>
                          )}
                        </div>
                      </GridItem>
                    </span>
                  ) : (
                    <>
                      <GridItem xs={12} sm={12} md={6}>
                        <MDBInput
                          label={"First Name"}
                          group
                          value={state.pfname}
                          onChange={event => {
                            this.setState({ pfname: event.target.value });
                          }}
                          onBlur={() =>
                            this.setState({
                              pfnameError: validate(
                                "fname",
                                state.pfname == "" ? null : state.pfname
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
                          {state.pfnameError}
                        </p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <MDBInput
                          label={"Last Name"}
                          group
                          value={state.plname}
                          onChange={event => {
                            this.setState({ plname: event.target.value });
                          }}
                          type="text"
                          onBlur={() =>
                            this.setState({
                              plnameError: validate(
                                "lname",
                                state.plname == "" ? null : state.plname
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
                          {state.plnameError}
                        </p>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <MDBInput
                          label={"Email Address"}
                          group
                          value={state.email}
                          onChange={event => {
                            this.setState({ email: event.target.value });
                          }}
                          onBlur={() =>
                            this.setState({
                              emailError: validate(
                                "email",
                                state.email == "" ? null : state.email
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
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <MDBInput
                          label={"Phone Number"}
                          group
                          value={state.phone_number}
                          onChange={event => {
                            this.setState({
                              phone_number: event.target.value,
                              phone_numberError: validate(
                                "phone",
                                event.target.value == ""
                                  ? null
                                  : event.target.value
                              )
                            });
                          }}
                          onBlur={() =>
                            this.setState({
                              phone_numberError: validate(
                                "phone",
                                state.phone_number == ""
                                  ? null
                                  : state.phone_number
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
                          {state.phone_numberError}
                        </p>
                      </GridItem>
                    </>
                  )}
                  <br />
                  <br />
                  <br />
                  <GridItem xs={12} sm={12} md={12} className="mt-5">
                    <h5>Other details</h5>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel htmlFor="">
                        Learning Venue or School
                      </InputLabel>
                      <Select
                        value={state.school}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "school",
                          id: ""
                        }}
                        style={{ width: "100%" }}
                      >
                        <MenuItem value="">
                          <em>-</em>
                        </MenuItem>
                        {this.schools()}
                      </Select>
                    </FormControl>
                    <p
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        textAlign: "center"
                      }}
                    >
                      {state.schoolError}
                    </p>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="text-center">
                      {state.registering ? (
                        <div
                          className="spinner-grow text-info"
                          role="status"
                          style={{ marginBottom: "15px" }}
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <MDBBtn onClick={this.handleSubmit}>
                          Register student
                        </MDBBtn>
                      )}
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
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

export default withGlobalContext(withStyles(styles)(AddUser));

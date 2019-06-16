import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core components

import GridItem from "../../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../../components/dcomponents/Grid/GridContainer.jsx";

import { MDBBtn, MDBInput } from "mdbreact";
//mport avatar from "../../assets/img/faces/marc.jpg";
import validate from "./validation";
import globals from "../../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../../context/Provider";
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
  Radio
} from "antd";

const { Option } = Select;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    console.log("[super props]", props);
    this.state = {
      //form fields
      role: "trainer",

      school: "",
      schools: [],
      loading: true,
      //other
      addingUser: false,
      open: false,
      place: "bc",
      resType: "warning"
    };
  }
  handleChange = event => {
    console.log("value", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
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
          this.setState({
            schools: data.schools,
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
        this.props.snack({ type: "warning", msg: error.toString() });

        console.log(error);
      });
  };
  handleSubmit = () => {
    let state = this.state;
    const fnameError = validate(
      "fname",
      state.fname === "" ? null : state.fname
    );
    const emailError = validate(
      "email",
      state.email === "" ? null : state.email
    );
    const lnameError = validate(
      "lname",
      state.lname === "" ? null : state.lname
    );
    const schoolError = validate(
      "school",
      state.school === "" ? null : state.school
    );

    const phoneError = validate(
      "phone",
      state.phone_number === "" ? null : state.phone_number
    );

    this.setState(
      {
        emailError: emailError,
        fnameError: fnameError,
        lnameError: lnameError,
        schoolError: schoolError,
        phone_numberError: phoneError
      },
      () => {
        if (
          !emailError &&
          !fnameError &&
          !lnameError &&
          !phoneError &&
          !schoolError
        ) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
            role: state.role,
            email: state.email,

            fname: state.fname,
            lname: state.lname,
            school: state.school,
            phone_number: { main: state.phone_number, alt: "" }
          };
          console.log(data);
          this.setState({ addingUser: true, serverRes: null });
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
              this.props.snack({
                type: data.success ? "success" : "warning",
                msg: data.message
              });
              //this.setState({currentPlace:data.results})
              if (data.success) {
                this.setState({
                  addingUser: false,
                  serverRes: data.message,

                  email: "",
                  emailError: null,
                  fname: "",
                  fnameError: null,
                  lname: "",
                  lnameError: null,
                  salutation: "",
                  school: "",
                  phone_number: "",
                  phone_numberError: null
                });
              } else {
                this.setState({
                  addingUser: false,

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
              this.setState({ addingUser: false });
              console.log(error);
            });
        }
      }
    );
  };

  componentDidMount = () => {
    this._fetchSchools();
  };
  render() {
    const { classes } = this.props;
    const state = this.state;

    if (state.loading) {
      return (
        <div style={{ ...center, marginTop: 300 }}>
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
      <>
        <GridItem xs={12} sm={12} md={12}>
          <h1>Trainer</h1>
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
          <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
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
            type="email"
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
          <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
            {state.lnameError}
          </p>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
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
          <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
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
                  event.target.value == "" ? null : event.target.value
                )
              });
            }}
            onBlur={() =>
              this.setState({
                phone_numberError: validate(
                  "phone",
                  state.phone_number == "" ? null : state.phone_number
                )
              })
            }
            error="Whoops!"
            success="right"
          />
          <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
            {state.phone_numberError}
          </p>
        </GridItem>

        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <div className="text-center">
              {state.addingUser ? (
                <div
                  className="spinner-grow text-info"
                  role="status"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <MDBBtn onClick={this.handleSubmit}>Add Trainer</MDBBtn>
              )}
            </div>
          </GridItem>
        </GridContainer>
      </>
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
export default Form.create({ name: "add_trainer" })(withGlobalContext(Admin));

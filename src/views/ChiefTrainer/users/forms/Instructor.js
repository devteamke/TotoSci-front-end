import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components

import GridItem from "../../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../../components/dcomponents/Grid/GridContainer.jsx";

import Button from "../../../../components/dcomponents/CustomButtons/Button.jsx";

import { MDBBtn, MDBInput } from "mdbreact";
//mport avatar from "../../assets/img/faces/marc.jpg";
import validate from "./validation";
import globals from "../../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../../context/Provider";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    console.log("[super props]", props);
    this.state = {
      //form fields
      role: "instructor",

      email: "",
      emailError: null,
      fname: "",
      fnameError: null,
      lname: "",
      lnameError: null,
      phone_number: "",
      phone_numberError: null,

      county: "",
      countyError: null,
      sub_county: "",
      sub_countyError: null,

      //other
      addingUser: false,
      open: false,
      place: "bc",
      resType: "warning"
    };
  }
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
    const phoneError = validate(
      "phone",
      state.phone_number === "" ? null : state.phone_number
    );
    const countyError = validate(
      "county",
      state.county === "" ? null : state.county
    );
    const sub_countyError = validate(
      "sub_county",
      state.sub_county === "" ? null : state.sub_county
    );

    this.setState(
      {
        emailError: emailError,
        fnameError: fnameError,
        lnameError: lnameError,
        phone_numberError: phoneError,

        countyError: countyError,
        sub_countyError: sub_countyError
      },
      () => {
        if (
          !emailError &&
          !fnameError &&
          !lnameError &&
          !countyError &&
          !sub_countyError &&
          !phoneError
        ) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
            role: state.role,
            email: state.email,

            fname: state.fname,
            lname: state.lname,

            county: state.county,
            sub_county: state.sub_county
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
                  phone_number: "",
                  phone_numberError: null,

                  county: "",
                  countyError: null,
                  sub_county: "",
                  sub_countyError: null
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
  _validateSal = passed => {
    let val = passed || this.state.salutation.toLowerCase();
    const sal = ["mr", "mrs", "miss", "dr", "prof", "other", "NA"];
    if (sal.includes(val)) {
      return null;
    } else {
      return "Salutation must be either Mr, Mrs, Miss, Dr, Prof";
    }
  };
  render() {
    const { classes } = this.props;
    const state = this.state;
    return (
      <span>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h1>Instructor</h1>
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
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
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
            <p
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
            >
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
            <p
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
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
            <p
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
            >
              {state.phone_numberError}
            </p>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <MDBInput
              label={"County"}
              group
              value={state.county}
              onChange={event => {
                this.setState({ county: event.target.value });
              }}
              onBlur={() =>
                this.setState({
                  countyError: validate(
                    "county",
                    state.county == "" ? null : state.county
                  )
                })
              }
              error="Whoops!"
              success="right"
            />
            <p
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
            >
              {state.countyError}
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <MDBInput
              label={"Sub County"}
              group
              value={state.sub_county}
              onChange={event => {
                this.setState({ sub_county: event.target.value });
              }}
              onBlur={() =>
                this.setState({
                  sub_countyError: validate(
                    "sub_county",
                    state.sub_county == "" ? null : state.sub_county
                  )
                })
              }
              error="Whoops!"
              success="right"
            />
            <p
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
            >
              {state.sub_countyError}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
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
                <MDBBtn onClick={this.handleSubmit}>Add Instructor</MDBBtn>
              )}
            </div>
          </GridItem>
        </GridContainer>
      </span>
    );
  }
}

export default withGlobalContext(Admin);

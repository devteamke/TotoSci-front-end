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
import { MDBBtn, MDBInput } from "mdbreact";
import avatar from "../../../assets/img/faces/marc.jpg";
import Select from "@material-ui/core/Select";
import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../context/Provider";
//Form components

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
      name: "",
      nameError: null,
      county: "",
      countyError: null,
      sub_county: "",
      sub_countyError: null,
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
    const nameError = validate("name", state.name === "" ? null : state.name);
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
        nameError: nameError,
        countyError: countyError,
        sub_countyError: sub_countyError
      },
      () => {
        if (!countyError && !nameError && !sub_countyError) {
          // alert('Details are valid!'+globals.BASE_URL)
          this.setState({ adding: true });
          let data = {
            name: state.name,
            county: state.county,
            sub_county: state.sub_county
          };
          console.log(data);
          this.setState({ serverRes: null });
          const AddAsync = async () =>
            await (await fetch(
              `${globals.BASE_URL}/api/${this.props.global.user.role}/new_class`,
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
      }
    );
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
                    pathname: `/${this.props.global.user.role}/classes`,
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
                <h4 className={classes.cardTitleWhite}>Add a new Class</h4>
                <p className={classes.cardCategoryWhite}>Fill in Class info</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
                      label={"Name"}
                      group
                      value={state.name}
                      onChange={event => {
                        this.setState({ name: event.target.value });
                      }}
                      onBlur={() =>
                        this.setState({
                          nameError: validate(
                            "name",
                            state.name == "" ? null : state.name
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
                      {state.nameError}
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
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
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        textAlign: "center"
                      }}
                    >
                      {state.sub_countyError}
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
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
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        textAlign: "center"
                      }}
                    >
                      {state.countyError}
                    </p>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="text-center">
                      {state.adding ? (
                        <div
                          className="spinner-grow text-info"
                          role="status"
                          style={{ marginBottom: "15px" }}
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <MDBBtn onClick={this.handleSubmit}>Add Class</MDBBtn>
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

export default withGlobalContext(withStyles(styles)(AddUser));

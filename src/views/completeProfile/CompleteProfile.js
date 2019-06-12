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

class App extends React.Component {
  state = {
    loading: true,

    salutation: "" || this.props.global.user.salutation,
    salutationError: null,
    residence: "" || this.props.global.user.residence,
    residenceError: null,
    idno:
      "" || this.props.global.user.idNumber
        ? this.props.global.user.idNumber.toString()
        : "",
    idnoError: null,
    // county:''||this.props.global.user.county,
    // countyError:null,
    // sub_county:''||this.props.global.user.sub_county,
    // sub_countyError:null,

    alt_phone_number: "" || this.props.global.user.alt_phone_number,
    alt_phone_numberError: null,

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

  handleSubmit = () => {
    let state = this.state;

    const salutationError =
      validate(
        "salutation",
        state.salutation === "" ? null : state.salutation
      ) || this._validateSal();
    const residenceError = validate(
      "residence",
      state.residence === "" ? null : state.residence
    );
    // const countyError = validate('county', state.county===''?null:state.county);
    // const sub_countyError = validate('sub_county', state.sub_county===''?null:state.sub_county);
    const idnoError = validate("idno", state.idno === "" ? null : state.idno);
    const alt_phoneError = validate(
      "alt_phone",
      state.alt_phone_number === "" ? null : state.alt_phone_number
    );

    this.setState(
      {
        idnoError: idnoError,
        salutationError: salutationError,
        residenceError: residenceError,
        // countyError:this.props.global.user.role=='trainer'||this.props.global.user.role=='instructor'?countyError:null,
        // sub_countyError:this.props.global.user.role=='trainer'||this.props.global.user.role=='instructor'?countyError:null,

        alt_phone_numberError: alt_phoneError
      },
      () => {
        if (
          !salutationError &&
          !idnoError &&
          !residenceError &&
          !alt_phoneError
        ) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
            salutation: state.salutation,

            idNumber: state.idno,

            residence: state.residence,

            alt_phone_number: state.alt_phone_number
          };
          // if(this.props.global.user.role=='trainer'||this.props.global.user.role=='instructor'){
          // 	data ={ ...data,
          // 		   county:state.county,
          // 			sub_county:state.sub_county,
          // 		  }
          // }
          console.log(data);
          this.setState({ savingInfo: true });
          const SaveAsync = async () =>
            await (await fetch(
              `${globals.BASE_URL}/api/users/complete_profile`,
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
      }
    );
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

  _validateSal = passed => {
    let val = passed || this.state.salutation.toLowerCase();
    const sal = ["mr", "mrs", "miss", "dr", "prof", "other", "NA"];
    if (sal.includes(val)) {
      return null;
    } else {
      return "Salutation must be either Mr, Mrs, Miss, Dr, Prof";
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
                      size="9x"
                    />

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <MDBInput
                          label={"Salutaion"}
                          group
                          value={state.salutation}
                          onChange={event => {
                            this.setState({ salutation: event.target.value });
                          }}
                          onBlur={() =>
                            this.setState({
                              salutationError:
                                validate(
                                  "salutation",
                                  state.salutation === ""
                                    ? null
                                    : state.salutation
                                ) || this._validateSal()
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
                          {state.salutationError}
                        </p>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <MDBInput
                          label={"Residence"}
                          group
                          value={state.residence}
                          onChange={event => {
                            this.setState({ residence: event.target.value });
                          }}
                          onBlur={() =>
                            this.setState({
                              residenceError: validate(
                                "residence",
                                state.residence == "" ? null : state.residence
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
                          {state.residenceError}
                        </p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <MDBInput
                          label={"ID Number"}
                          group
                          value={state.idno}
                          onChange={event => {
                            this.setState({ idno: event.target.value });
                          }}
                          onBlur={() =>
                            this.setState({
                              idnoError: validate(
                                "idno",
                                state.idno == "" ? null : state.idno
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
                          {state.idnoError}
                        </p>
                      </GridItem>
                      {false ? (
                        <>
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
                              style={{
                                color: "red",
                                fontSize: "0.8rem",
                                textAlign: "center"
                              }}
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
                                this.setState({
                                  sub_county: event.target.value
                                });
                              }}
                              onBlur={() =>
                                this.setState({
                                  sub_countyError: validate(
                                    "sub_county",
                                    state.sub_county == ""
                                      ? null
                                      : state.sub_county
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
                        </>
                      ) : null}

                      <GridItem xs={12} sm={12} md={6}>
                        <MDBInput
                          label={"Alternative Phone Number"}
                          group
                          value={state.alt_phone_number}
                          onChange={event => {
                            this.setState({
                              alt_phone_number: event.target.value,
                              alt_phone_numberError: validate(
                                "alt_phone",
                                event.target.value == ""
                                  ? null
                                  : event.target.value
                              )
                            });
                          }}
                          onBlur={() =>
                            this.setState({
                              alt_phone_numberError: validate(
                                "alt_phone",
                                state.alt_phone_number == ""
                                  ? null
                                  : state.alt_phone_number
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
                          {state.alt_phone_numberError}
                        </p>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <div className="text-center">
                          {state.savingInfo ? (
                            <div
                              className="spinner-grow text-info"
                              role="status"
                              style={{ marginBottom: "15px" }}
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            <MDBBtn onClick={this.handleSubmit}>
                              {" "}
                              Continue{" "}
                            </MDBBtn>
                          )}
                        </div>
                      </GridItem>
                    </GridContainer>
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
export default withGlobalContext(App);

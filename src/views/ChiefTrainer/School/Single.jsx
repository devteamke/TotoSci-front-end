import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
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
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import avatar from "../../../assets/img/faces/marc.jpg";
import { withGlobalContext } from "../../../context/Provider";
import validate from "./validation.js";
import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
//Moment
import moment from "moment";

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
const parseSchool = school => {
  if (typeof school.phone_number == "object") {
    school = {
      ...school
    };
  }
  school = {
    ...school,
    idno: school.idNumber ? school.idNumber.toString() : ""
  };
  return school;
};
class Single extends React.Component {
  constructor(props) {
    super(props);
    console.log("Got data", this.props.location.data);
    let school = this.props.location.data;
    if (!school) {
      this.props.history.push(`/${this.props.global.user.role}/schools`);
      return;
    }

    console.log("{school}", school);
    this.state = {
      //School info
      school: school,
      oldSchool: school,

      //snack
      open: false,
      place: "bc",
      resType: "warning",
      serverRes: "",
      updating: false,
      addedBy:
        school.addedBy.length > 0
          ? school.addedBy[0].fname +
            " " +
            (school.addedBy[0].lname ? school.addedBy[0].lname : "")
          : "NA",
      //Account Status
      savingInfo: false,
      //delete Modal
      deleteModal: false,
      deleting: false,

      //school erros

      nameError: null,
      countyError: null,
      sub_countyError: null
    };
  }
  handleSubmit = () => {
    const state = this.state;
    console.log("[school]", state.school);

    if (!state.countyError && !state.sub_countyError && !state.nameError) {
      this.setState({ updating: true });

      const UpdateSchoolAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/update_school`,
          {
            method: "PATCH",
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
            body: JSON.stringify(this.state.school)
          }
        )).json();

      UpdateSchoolAsync()
        .then(data => {
          //this.setState({currentPlace:data.results})
          this.setState({
            open: true,
            school: { ...data.school, addedBy: state.addedBy },
            oldSchool: { ...data.school, addedBy: state.addedBy },
            updating: false,
            resType: data.success ? "success" : "warning"
          });
          setTimeout(
            function() {
              this.setState({ open: false, updating: false });
            }.bind(this),
            9000
          );

          if (data.success) {
            this.setState({
              serverRes: data.message
            });
          } else {
            this.setState({
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
          this.setState({ updating: false });
          console.log(error);
          this.setState({
            open: true,
            updating: false,
            resType: "warning"
          });
          setTimeout(
            function() {
              this.setState({ open: false });
            }.bind(this),
            9000
          );
        });
    }
  };
  // alert('Details are valid!'+globals.BASE_URL)

  handleDeleteModal = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  };
  handleDelete = () => {
    this.setState({ deleteModal: !this.state.deleteModal, deleting: true });
    let data = {
      _id: this.state.school._id
    };

    const DeleteAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.school.role}/requestDelete`,
        {
          method: "DELETE",
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.global.token,
            "Access-Control-Allow-Origin": `${globals.BASE_URL}`
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data)
        }
      )).json();

    DeleteAsync()
      .then(data => {
        //this.setState({currentPlace:data.results})
        this.setState({
          open: true,
          updating: false,
          resType: data.success ? "success" : "warning"
        });
        setTimeout(
          function() {
            this.setState({ open: false, updating: false });
          }.bind(this),
          9000
        );

        if (data.success) {
          this.props.history.push({
            pathname: "/admin/students",
            snack: { type: "success", msg: data.message }
          });
        } else {
          this.setState({
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
        this.setState({ updating: false });
        console.log(error);
        this.setState({
          open: true,
          updating: false,
          resType: data.success ? "success" : "warning"
        });
        setTimeout(
          function() {
            this.setState({ open: false });
          }.bind(this),
          9000
        );
      });
  };

  componentWillMount = () => {};
  render = () => {
    if (!this.props.location.data) {
      return null;
    }

    let edit = null;

    const gstate = this.props.global;
    const state = this.state;
    const { school } = this.state;
    const { oldSchool } = this.state;
    const { classes } = this.props;

    edit = (
      <>
        {/* change account info */}

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info" style={{ backgroundColor: "#2bbbad" }}>
              <h4 className={classes.cardTitleWhite}>Change School Details</h4>
              <p className={classes.cardCategoryWhite}>Update info</p>
            </CardHeader>
            <CardBody>
              <GridContainer></GridContainer>

              <>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <MDBInput
                      label={"School Name"}
                      group
                      value={school.name}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          school: { ...prevState.school, name: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          nameError: validate(
                            "name",
                            school.name == "" ? null : school.name
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

                  <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
                      label={"Sub county"}
                      group
                      value={school.sub_county}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          school: { ...prevState.school, sub_county: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          sub_countyError: validate(
                            "sub_county",
                            school.sub_county == "" ? null : school.sub_county
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

                  <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
                      label={"county"}
                      group
                      value={school.county}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          school: { ...prevState.school, county: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          countyError: validate(
                            "county",
                            school.county == "" ? null : school.county
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
              </>
            </CardBody>
            {state.savingInfo ? (
              <div className="text-center">
                <div
                  className="spinner-grow text-info"
                  role="status"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {JSON.stringify(school) !== JSON.stringify(state.oldSchool) ? (
                  <div className="text-center">
                    <MDBBtn style={btnBg} onClick={this.handleSubmit}>
                      Save
                    </MDBBtn>
                  </div>
                ) : null}
              </>
            )}
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
      </>
    );

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
            <MDBBtn
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              Back
            </MDBBtn>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  {school.name ? (
                    <img
                      src={`https://ui-avatars.com/api/?name=${school.name}+${school.sub_county}&background=01afc4&color=fff&size=256`}
                      alt="..."
                    />
                  ) : (
                    <MDBIcon
                      icon="school-circle"
                      className="blue-grey-text"
                      size="9x"
                    />
                  )}
                </a>
              </CardAvatar>

              <CardBody profile>
                <GridItem xs={12} sm={10} md={10} style={{ margin: "0 auto" }}>
                  <MDBTable borderless hover small>
                    <MDBTableBody>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>School Name</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {capitalize(oldSchool.name)}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Sub County</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldSchool.sub_county}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>county</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldSchool.county}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Added By</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {capitalize(state.addedBy)}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Added On</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldSchool.createdAt
                            ? moment(oldSchool.createdAt).format("MMM Do YY")
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Updated On</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldSchool.updatedAt
                            ? moment(oldSchool.updatedAt).format("MMM Do YY")
                            : null}
                        </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
          {edit}
        </GridContainer>
      </div>
    );
  };
}

export default withGlobalContext(withStyles(styles)(Single));

const capitalize = str => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};
const btnBg = {
  backgroundColor: "#01afc4 !important"
};

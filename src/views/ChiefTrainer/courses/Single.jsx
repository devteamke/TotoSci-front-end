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
const parseCourse = course => {
  if (typeof course.phone_number == "object") {
    course = {
      ...course,

      phone_number: course.phone_number.main,
      alt_phone_number: course.phone_number.alt
    };
  }
  course = {
    ...course,
    idno: course.idNumber ? course.idNumber.toString() : ""
  };
  return course;
};
class Single extends React.Component {
  constructor(props) {
    super(props);
    console.log("Got data", this.props.location.data);
    let course = this.props.location.data;
    if (!course) {
      this.props.history.push(`/${this.props.global.user.role}/courses`);
      return;
    }
    course = parseCourse(course);
    console.log("{course}", course);
    this.state = {
      //Course info
      course: course,
      oldCourse: course,
      addedBy:
        course.addedBy.length > 0
          ? course.addedBy[0].fname +
            " " +
            (course.addedBy[0].lname ? course.addedBy[0].lname : "")
          : "NA",
      //snack
      open: false,
      place: "bc",
      resType: "warning",
      serverRes: "",
      updating: false,

      //Account Status
      savingInfo: false,
      //delete Modal
      deleteModal: false,
      deleting: false,

      //course erros

      nameError: null,
      descriptionError: null,
      chargeError: null
    };
  }
  handleSubmit = () => {
    const state = this.state;
    console.log("[course]", state.course);
    console.log("[nameError]", state.nameError);

    if (!state.chargeError && !state.nameError && !state.descriptionError) {
      // alert('Details are valid!'+globals.BASE_URL)
      this.setState({ updating: true });

      const UpdateCourseAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/update_course`,
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
            body: JSON.stringify(this.state.course)
          }
        )).json();

      UpdateCourseAsync()
        .then(data => {
          //this.setState({currentPlace:data.results})
          this.setState({
            open: true,
            course: { ...data.course, addedBy: state.addedBy },
            oldCourse: { ...data.course, addedBy: state.addedBy },
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

  handleDeleteModal = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  };
  handleDelete = () => {
    this.setState({ deleteModal: !this.state.deleteModal, deleting: true });
    let data = {
      _id: this.state.course._id
    };

    const DeleteAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.course.role}/requestDelete`,
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
    const { course } = this.state;
    const { oldCourse } = this.state;
    const { classes } = this.props;

    edit = (
      <>
        {/* change account info */}

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info" style={{ backgroundColor: "#2bbbad" }}>
              <h4 className={classes.cardTitleWhite}>Change Course Details</h4>
              <p className={classes.cardCategoryWhite}>
                Update status , info...{" "}
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer></GridContainer>

              <>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <MDBInput
                      label={"Course Name"}
                      group
                      value={course.name}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          course: { ...prevState.course, name: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          nameError: validate(
                            "name",
                            course.name == "" ? null : course.name
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
                      label={"Session Charge"}
                      group
                      value={course.charge}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          course: { ...prevState.course, charge: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          chargeError: validate(
                            "charge",
                            course.charge == "" ? null : course.charge
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
                      {state.chargeError}
                    </p>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
                      label={"Description"}
                      group
                      value={course.description}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          course: { ...prevState.course, description: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          residenceError: validate(
                            "description",
                            course.description == "" ? null : course.description
                          )
                        })
                      }
                      type="textarea"
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
                      {state.descriptionError}
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
                {JSON.stringify(course) !== JSON.stringify(state.oldCourse) ? (
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
                  {course.name ? (
                    <img
                      src={`https://ui-avatars.com/api/?name=${course.name}+${course.charge}&background=01afc4&color=fff&size=256`}
                      alt="..."
                    />
                  ) : (
                    <MDBIcon
                      icon="course-circle"
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
                          <b style={{ fontSize: "1.25em" }}>Course Name</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {capitalize(oldCourse.name)}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Session Fee</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldCourse.charge}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Description</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldCourse.description}
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
                          {oldCourse.createdAt
                            ? moment(oldCourse.createdAt).format("MMM Do YY")
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Updated On</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldCourse.updatedAt
                            ? moment(oldCourse.updatedAt).format("MMM Do YY")
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

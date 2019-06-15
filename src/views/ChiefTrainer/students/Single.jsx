import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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
const parseStudent = student => {
  if (typeof student.phone_number == "object") {
    student = {
      ...student,

      phone_number: student.phone_number.main,
      alt_phone_number: student.phone_number.alt
    };
  }
  student = {
    ...student,
    idno: student.idNumber ? student.idNumber.toString() : ""
  };
  return student;
};
class Single extends React.Component {
  constructor(props) {
    super(props);
    let student = this.props.location.data;
    if (!student) {
      this.props.history.push(`/${this.props.global.user.role}/students`);
      return;
    }
    student = parseStudent(student);
    console.log("{student}", student);
    this.state = {
      //Student info
      student: student,
      oldStudent: student,
      addedBy:
        student.addedBy.length > 0
          ? student.addedBy[0].fname +
            " " +
            (student.addedBy[0].lname ? student.addedBy[0].lname : "")
          : "NA",
      parent:
        student.parent.length > 0
          ? student.parent[0].fname +
            " " +
            (student.parent[0].lname ? student.parent[0].lname : "")
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

      //student erros
      schoolID: student.school[0]._id,
      emailError: null,
      fnameError: null,
      lnameError: null,

      school: "",
      schools: []
    };
  }

  handleChange = event => {
    console.log("value", event.target.value);
    this.setState(prevState => {
      let school =
        prevState.oldStudent.school[0]._id == event.target.value
          ? prevState.oldStudent.school
          : event.target.value;
      let student = { ...prevState.student, school: school };
      return {
        [event.target.name]: event.target.value,
        student,
        schoolID: event.target.value,
        schoolError: validate(
          "school",
          event.target.value === "" ? null : event.target.value
        )
      };
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
        this._snack({ type: "warning", msg: error.toString() });

        console.log(error);
      });
  };
  handleStatus = () => {
    this.setState(prevState => {
      let newStatus =
        prevState.student.status == "active" ? "suspended" : "active";
      let newStudent = { ...prevState.student };
      newStudent.status = newStatus;
      return {
        student: newStudent,
        statusSaved: !prevState.statusSaved
      };
    });
  };
  handleSaveInfo = () => {
    let state = this.state;
    let student = this.state.student;
    const fnameError = validate(
      "fname",
      student.fname === "" ? null : student.fname
    );

    const lnameError = validate(
      "lname",
      student.lname === "" ? null : student.lname
    );

    const schoolError = validate(
      "school",
      student.school === "" ? null : student.school
    );

    this.setState(
      {
        fnameError: fnameError,
        lnameError: lnameError,
        schoolError: schoolError
      },
      () => {
        console.log(fnameError, lnameError, schoolError, student.school);
        if (!fnameError && !lnameError && !schoolError) {
          console.log("No error");
          if (!this.state.savingInfo) {
            this.setState({ savingInfo: true }, () => {
              let data = {
                student: {
                  ...this.state.student
                }
              };

              const SaveAsync = async () =>
                await (await fetch(
                  `${globals.BASE_URL}/api/${this.props.global.user.role}/student_save_info`,
                  {
                    method: "PATCH",
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

              SaveAsync()
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
                    console.log("[newStudent]", data.student);
                    this.setState({
                      serverRes: data.message,
                      savingInfo: false,
                      student: {
                        ...data.student,
                        addedBy: state.addedBy,
                        parent: state.parent
                      },
                      oldStudent: {
                        ...data.student,
                        addedBy: state.addedBy,
                        parent: state.parent
                      }
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

                  this.setState({
                    open: true,
                    savingInfo: false,
                    resType: data.success ? "success" : "warning"
                  });
                  setTimeout(
                    function() {
                      this.setState({ open: false });
                    }.bind(this),
                    9000
                  );
                });
            });
          }
        }
      }
    );
  };
  handleDeleteModal = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  };
  handleDelete = () => {
    this.setState({ deleteModal: !this.state.deleteModal, deleting: true });
    let data = {
      _id: this.state.student._id
    };

    const DeleteAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.student.role}/requestDelete`,
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

  componentWillMount = () => {
    this._fetchSchools();
  };
  render = () => {
    if (!this.props.location.data) {
      return null;
    }
    const gstate = this.props.global;
    const state = this.state;
    const { student } = this.state;
    const { oldStudent } = this.state;
    const { classes } = this.props;

    let items = null;
    if (state.schools.length > 0) {
      console.log("schools", this.state.schools);
      items = state.schools.map(each => {
        let school = unKebab(each.name);

        return <MenuItem value={each._id}>{school}</MenuItem>;
      });
    }

    let edit = null;

    edit = (
      <>
        {/* change account info */}

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info" style={{ backgroundColor: "#2bbbad" }}>
              <h4 className={classes.cardTitleWhite}>
                Change{" "}
                {oldStudent.fname
                  ? oldStudent.fname.charAt(0).toUpperCase() +
                    oldStudent.fname.slice(1) +
                    "'s "
                  : "their"}{" "}
                account info{" "}
              </h4>
              <p className={classes.cardCategoryWhite}>
                Update status , profile info...{" "}
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <h5 style={{ display: "inline" }}>
                    Status :{"\u00A0"}{" "}
                    <span
                      style={{
                        color: student.status == "active" ? "green" : "red"
                      }}
                    >
                      {capitalize(student.status)}
                    </span>
                  </h5>{" "}
                  {"\u00A0"} {"\u00A0"} {"\u00A0"}
                  <MDBBtn
                    style={{ marginTop: -1 }}
                    size="sm"
                    onClick={this.handleStatus}
                  >
                    {student.status == "active" ? "Suspend" : "Activate"}
                  </MDBBtn>
                </GridItem>
              </GridContainer>
              <GridContainer></GridContainer>

              <>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <MDBInput
                      label={"First Name"}
                      group
                      value={student.fname}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          student: { ...prevState.student, fname: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          fnameError: validate(
                            "fname",
                            student.fname == "" ? null : student.fname
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
                      value={student.lname}
                      onChange={event => {
                        let value = event.target.value;
                        this.setState(prevState => ({
                          student: { ...prevState.student, lname: value }
                        }));
                      }}
                      onBlur={() =>
                        this.setState({
                          lnameError: validate(
                            "lname",
                            student.lname == "" ? null : student.lname
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

                  <GridItem xs={12} sm={12} md={8}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel htmlFor="">
                        Learning Venue or School
                      </InputLabel>
                      <Select
                        value={state.schoolID}
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
                        {items}
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
                {JSON.stringify(student) !==
                JSON.stringify(state.oldStudent) ? (
                  <div className="text-center">
                    <MDBBtn style={btnBg} onClick={this.handleSaveInfo}>
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
                  {student.fname ? (
                    <img
                      src={`https://ui-avatars.com/api/?name=${student.fname}+${student.lname}&background=01afc4&color=fff&size=256`}
                      alt="..."
                    />
                  ) : (
                    <MDBIcon
                      icon="student-circle"
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
                          <b style={{ fontSize: "1.25em" }}>Status</b>
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            width: "50%",
                            color:
                              oldStudent.status == "active" ? "green" : "red"
                          }}
                        >
                          {oldStudent.status.charAt(0).toUpperCase() +
                            oldStudent.status.slice(1)}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>First Name</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {capitalize(oldStudent.fname)}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Last Name</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {capitalize(oldStudent.lname)}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>School</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {unKebab(oldStudent.school[0].name)}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Added By</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {capitalize(state.addedBy.split()[0])}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Parent</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {capitalize(state.parent.split()[0])}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Joined</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldStudent.createdAt
                            ? moment(oldStudent.createdAt).format("MMM Do YY")
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <b style={{ fontSize: "1.25em" }}>Updated</b>
                        </td>
                        <td style={{ textAlign: "left", width: "50%" }}>
                          {oldStudent.updatedAt
                            ? moment(oldStudent.updatedAt).format("MMM Do YY")
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

const capitalize = str => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};
const btnBg = {
  backgroundColor: "#01afc4 !important"
};

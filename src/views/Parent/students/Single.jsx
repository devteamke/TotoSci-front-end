import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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

import validate from "./validation";

//antd
import {
  Form,
  Spin,
  Tag,
  Tabs,
  Card,
  Button,
  Icon,
  Statistic,
  Row,
  Badge,
  Col,
  Descriptions,
  Menu,
  Dropdown,
  Modal,
  PageHeader
} from "antd";
import moment from "moment";

const format = "HH:mm";

const { Paragraph } = Typography;
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
const confirm = Modal.confirm;
class Add extends React.Component {
  constructor(props) {
    super(props);
    let _class = this.props.location.data;
    if (!_class) {
      this.props.history.push(`/${this.props.global.user.role}/mystudents`);
      return;
    }

    this.state = {
      _class,
      loading: true,
      selectedRowKeys: [],
      currentDisplay: "Student List",
      //Show instructors
      studentCourses: _class.class,
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
  //Student modals

  handleChange = event => {
    console.log("value", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    let state = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        console.log("Time", moment(values.start_time).format("HH:mm"));

        this.setState({ adding: true });
        let data = {
          ...values
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
              this.props.form.resetFields();
              this.setState({
                adding: false,
                serverRes: data.message,
                //form fields
                name: "",
                nameError: null,
                description: "",
                descriptionError: null,
                charge: "",
                chargeError: null
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
  _addSelectedStudents = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/add_students_to_class`,
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
          body: JSON.stringify({
            students: this.state.selectedRowsModal,
            class_id: this.state._class._id
          })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          this._snack({
            type: data.success ? "success" : "warning",
            msg: data.message
          });
          console.log("[new data]", data);
          let _class = {
            ...this.state._class,
            students: data.newClass.students
          };
          this.setState({
            selectedRowKeys: [],
            addModal: false,
            addingStudents: false,
            _class,
            students: data.students,
            reloading: true
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
        this.setState({ addingStudents: false });
        this._snack({ type: "warning", msg: error.toString() });

        console.log(error);
      });
  };
  _addSelectedInstructors = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/add_instructors_to_class`,
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
          body: JSON.stringify({
            instructors: this.state.selectedRowsI,
            class_id: this.state._class._id
          })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          this._snack({
            type: data.success ? "success" : "warning",
            msg: data.message
          });
          console.log("[new data]", data);
          let _class = {
            ...this.state._class,
            instructors: data.newClass.instructors
          };
          this.setState({
            selectedRowsI: [],
            assignModal: false,
            assigningInstructors: false,
            _class,
            instructors: data.instructors,
            reloadingI: true
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
        this.setState({ addingStudents: false });
        this._snack({ type: "warning", msg: error.toString() });

        console.log(error);
      });
  };
  markAttendance = () => {
    this.setState({ savingAttendance: true });
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/mark_attendance`,
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
          body: JSON.stringify({
            students: this.state.selectedRowsAtt,
            _class: this.state._class,
            values: this.state.values
          })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          this._snack({
            type: data.success ? "success" : "warning",
            msg: data.message
          });
          console.log("[new data]", data);

          this.setState({
            currentStep: 0,
            markModal: false,
            rowSelectionAtt: [],
            savingAttendance: false,
            step1: true
          });
          this._fetchAttendance();
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
        this.setState({ addingStudents: false });
        this._snack({ type: "warning", msg: error.toString() });

        console.log(error);
      });
  };
  onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  _fetchCourse = () => {
    let coursesId = [];
    if (this.props.location.data) {
      let student = this.props.location.data;
      if (student.class.length > 0) {
        student.class.map((each, i) => {
          coursesId.push(each.course);
        });
      } else {
        this.setState({ loading: false });
        return;
      }
    } else {
      return;
    }
    console.log("Courses Id", coursesId);
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_course`,
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
          body: JSON.stringify({ coursesId })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          let currentCourse = [];
          currentCourse = this.state.studentCourses;
          console.log("result", data.result);
          data.result.map((each, i) => {
            currentCourse[i].course = { ...each };
          });

          this.setState({
            studentCourses: currentCourse,
            loading: false
          });
          console.log("Got this courses", this.state.studentCourses);
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
  _fetchTrainer = () => {
    let trainersId = [];
    if (this.props.location.data) {
      let student = this.props.location.data;
      if (student.class.length > 0) {
        student.class.map((each, i) => {
          trainersId.push(each.trainer);
        });
      } else {
        this.setState({ loading: false });
        return;
      }
    } else {
      return;
    }
    // console.log("Courses Id", coursesId);
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_trainer`,
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
          body: JSON.stringify({ trainersId })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          let currentCourse = [];
          currentCourse = this.state.studentCourses;
          console.log("result", data.result);
          data.result.map((each, i) => {
            currentCourse[i].trainer = { ...each };
          });

          this.setState({
            studentCourses: currentCourse,
            loading: false
          });
          console.log("Got this courses", this.state.studentCourses);
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

  _fetchFeedBack = student => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_feed_attendance`,
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
          body: JSON.stringify({ student, _class: this.state._class })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          this.setState({
            loadingFeed: false,
            singleAtt: data.attendance,
            currentFeedback: data.feedback
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
  onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  showRemoveConfirm = () => {
    confirm({
      title: "Are you sure you want to remove this students?",
      onOk: this.removeStudents,
      onCancel() {}
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let state = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ step1: false, currentStep: 1, values });
      }
    });
  };
  componentDidMount = () => {
    this._fetchCourse();
    this._fetchTrainer();
    // this._fetchInstructors(true);
  };

  render() {
    if (!this.props.location.data) {
      return <></>;
    }

    const props = this.props;
    const state = this.state;
    console.log("Got Data", props.location.data);
    const student = props.location.data;
    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }

    return (
      <div
        ref={el => {
          this.myN = el;
        }}
      >
        <Snackbar
          place={this.state.place}
          color={state.resType}
          icon={AddAlert}
          message={state.serverRes}
          open={this.state.open}
          closeNotification={() => this.setState({ open: false })}
          close
        />

        <CssBaseline />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <PageHeader
                onBack={() =>
                  this.props.history.push(
                    `/${this.props.global.user.role}/mystudents`
                  )
                }
                title={student.fname}
              />
              <Descriptions title="Student Information">
                <Descriptions.Item label="Name">
                  {capitalize(student.fname)} {capitalize(student.lname)}
                </Descriptions.Item>

                <Descriptions.Item label="Date Of Birth">
                  {moment(student.DOB).format("dddd, MMMM Do YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Age">
                  {new Date().getFullYear() - moment(student.DOB).year()} Years
                </Descriptions.Item>
                <Descriptions.Item label="Date Of Admission">
                  {moment(student.createdAt).format(
                    "dddd, MMMM Do YYYY , h:mm:ss a"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Registered By">
                  {capitalize(student.addedBy[0].fname) +
                    " " +
                    capitalize(student.addedBy[0].lname)}
                </Descriptions.Item>
                <Descriptions.Item label="E-mail">
                  {student.addedBy[0].email}
                </Descriptions.Item>
              </Descriptions>
              {/** school information**/}
              <Descriptions title="Academic Information">
                <Descriptions.Item label="School">
                  {capitalize(student.school[0].name)}
                </Descriptions.Item>

                <Descriptions.Item label="County">
                  {capitalize(student.school[0].county)}
                </Descriptions.Item>
                <Descriptions.Item label="Sub County">
                  {capitalize(student.school[0].sub_county)}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Product">
                  Cloud Database
                </Descriptions.Item>
                <Descriptions.Item label="Billing Mode">
                  Prepaid
                </Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">
                  YES
                </Descriptions.Item>
                <Descriptions.Item label="Order time">
                  2018-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={3}>
                  2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                  <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">
                  $80.00
                </Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">
                  $60.00
                </Descriptions.Item>
                <Descriptions.Item label="Config Info">
                  Data disk type: MongoDB
                  <br />
                  Database version: 3.4
                  <br />
                  Package: dds.mongo.mid
                  <br />
                  Storage space: 10 GB
                  <br />
                  Replication_factor:3
                  <br />
                  Region: East China 1<br />
                </Descriptions.Item>
              </Descriptions>
              ,
            </Card>
          </GridItem>
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
export default Form.create({ name: "register" })(
  withGlobalContext(withStyles(styles)(Add))
);

const columns = [
  {
    title: "First Name",
    dataIndex: "fname"
  },
  {
    title: "Last Name",
    dataIndex: "lname"
  }
];
const columnsAtt = [
  {
    title: "First Name",
    dataIndex: "fname"
  },
  {
    title: "Last Name",
    dataIndex: "lname"
  }
];
const columnsModal = [
  {
    title: "First Name",
    dataIndex: "fname"
  },
  {
    title: "Last Name",
    dataIndex: "lname"
  }
];
const columnsI = [
  {
    title: "First Name",
    dataIndex: "fname"
  },
  {
    title: "Last Name",
    dataIndex: "lname"
  }
];
//form functions
const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

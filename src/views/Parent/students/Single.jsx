import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
//import Container from "@material-ui/core/Container";

// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";

// import { MDBBtn, MDBInput } from "mdbreact";
// import avatar from "../../../assets/img/faces/marc.jpg";

import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../context/Provider";

import validate from "./validation";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBInput
} from "mdbreact";
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
  Table,
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
      studentCourses: [],
      //other
      adding: false,
      open: false,
      place: "bc",
      resType: "warning"
    };
  }

  _snack = (params) => {
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

  handleChange = (event) => {
    console.log("value", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (e) => {
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
          .then((data) => {
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
          .catch((error) => {
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
        `${globals.BASE_URL}/api/${
          this.props.global.user.role
        }/add_students_to_class`,
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
      .then((data) => {
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
      .catch((error) => {
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
        `${globals.BASE_URL}/api/${
          this.props.global.user.role
        }/add_instructors_to_class`,
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
      .then((data) => {
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
      .catch((error) => {
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
        `${globals.BASE_URL}/api/${
          this.props.global.user.role
        }/mark_attendance`,
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
      .then((data) => {
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
      .catch((error) => {
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
    let studentId = "";
    if (this.props.location.data) {
      let student = this.props.location.data;
      if (student) {
        studentId = student._id;
      } else {
        this.setState({ loading: false });
        return;
      }
    } else {
      return;
    }
    console.log("Courses Id", studentId);
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
          body: JSON.stringify({ studentId })
        }
      )).json();

    FetchAsync()
      .then((data) => {
        if (data.success) {
          let currentCourse = [];
          currentCourse = this.state.studentCourses;
          console.log("result", data.result);

          this.setState({
            studentCourses: data.result,
            loading: false
          });
          console.log("Got this courses", this.state.studentCourses);
        } else {
        }
      })
      .catch((error) => {
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

  handleSubmit = (e) => {
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
    // this._fetchTrainer();
    // this._fetchInstructors(true);
  };

  render() {
    if (!this.props.location.data) {
      return <></>;
    }
    const NestedTable = () => {
      const menu = (
        <Menu>
          <Menu.Item>Action 1</Menu.Item>
          <Menu.Item>Action 2</Menu.Item>
        </Menu>
      );
      const expandedRowRender = () => {
        const columns = [
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Course", dataIndex: "course", key: "course" },
          { title: "Charge", dataIndex: "charge", key: "charge" },
          {
            title: "Description",
            dataIndex: "description",
            key: "description"
          },
          { title: "Trainer", dataIndex: "trainer", 
          key: "trainer" },
          { title: "Day", dataIndex: "day", key: "day" },
          { title: "Time", dataIndex: "time", key: "time" },
          {
            title: "Action",
            key: "operation",
            render: () => <a href="javascript:;">Publish</a>
          }
        ];
        
        const data = [];
        this.state.studentCourses.map((each, i) => {
          data.push({
            key: each.i,
            name: capitalize(each.name),
            course: capitalize(each.course[0].name),
            charge: each.course[0].charge,
            desciption: each.course[0].description,
            trainer:
              capitalize(each.trainer[0].fname) +
              " " +
              capitalize(each.trainer[0].lname),
            day: capitalize(each.day),
            time: moment(each.start_time).format("h:mm:ss a")
          });
        });
        return <Table columns={columns} dataSource={data} pagination={false} />;
      };

      const columns = [
        { title: "Week", dataIndex: "week", key: "week" },
        { title: "Remarks", dataIndex: "remarks", key: "remarks" },
        {
          title: "Status",
          key: "state",
          render: () => (
            <span>
              <Badge status="success" />
              Paid
            </span>
          )
        },

        {
          title: "Action",
          dataIndex: "operation",
          key: "operation",
          render: () => (
            <span className="table-operation">
              <a href="javascript:;">Pause</a>
              <a href="javascript:;">Stop</a>
              <Dropdown overlay={menu}>
                <a href="javascript:;">
                  More <Icon type="down" />
                </a>
              </Dropdown>
            </span>
          )
        }
      ];

      const data = [];
      this.state.studentCourses.map((each, i) => {
        console.log("Ateended", i, each.attendance);
        each.attendance.map((attended, j) => {
          data.push({
            key: j,
            week: unKebab(attended.week),
            remarks: attended.remarks
          });
        });
      });

      return (
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={data}
          dataSource={expandedRowRender}
        />
      );
    };

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
        ref={(el) => {
          this.myN = el;
        }}>
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
                  {capitalize(student.fname)}
                  {capitalize(student.lname)}
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
              {state.studentCourses.length > 0 ? (
                <>{NestedTable()}</>
              ) : (
                <div className="text-center" style={{ height: 300 }}>
                  <p style={{ marginTop: 145 }}>
                    {" "}
                    {state.query
                      ? `No records found matching \" ${state.query}\"`
                      : "No students yet"}
                  </p>{" "}
                </div>
              )}
              ,
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const capitalize = (str) => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};
const unKebab = (string) => {
  if (string) {
    string = string.replace(/-/g, " ").toLowerCase();

    let splitStr = string.toLowerCase().split(" ");
    string = splitStr.map((str) => {
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

//form functions
const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

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
  Radio,
  InputNumber,
  TimePicker,
  Spin,
  Descriptions,
  Table,
  Menu,
  Dropdown,
  Modal,
  Divider,
  Steps,
  List
} from "antd";
import moment from "moment";

const format = "HH:mm";
const { Step } = Steps;
const { Column, ColumnGroup } = Table;
const { Option } = Select;
const { TextArea } = Input;
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
      this.props.history.push(`/${this.props.global.user.role}/classes`);
      return;
    }

    this.state = {
      _class,
      loading: true,
      selectedRowKeys: [],
      currentDisplay: "Student List",
      //Show instructors
      showInstructors: false,
      isHovered: [],
      //Class
      students: [],
      instructors: [],
      //attendance
      loadinga: true,
      attendance: [],
      columnsA: [],
      //student modal
      selectedKeysModal: [],
      modalStudents: [],
      //mark modal
      markModal: false,
      step1: true,
      currentStep: 0,
      //Instructor modal
      selectedKeysI: [],
      modalInstrucors: [],
      //feedback
      singleAtt: [],
      tell: "",
      showExisting: true,
      currentFeedback: "",
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
  showStudentModal = () => {
    this.setState({
      addModal: true,
      loadingStudents: true
    });
    this._fetchStudents();
  };
  handleStudentOk = e => {
    const state = this.state;
    console.log(e);
    this.setState({
      addingStudents: true
    });
    console.log("selectedStudents", state.selectedRowsModal);
    this._addSelectedStudents();
  };
  handleStudentCancel = e => {
    console.log(e);

    console.log();
    this.setState({
      addModal: false
    });
  };
  //Mark Modals
  showMarkModal = () => {
    this.setState({
      markModal: true
    });
  };
  handleMarkOk = e => {
    const state = this.state;
    console.log(e);
    this.setState({
      addingStudents: true
    });
    console.log("selectedStudents", state.selectedRowsModal);
    this._addSelectedStudents();
  };
  handleMarkCancel = e => {
    console.log(e);

    this.setState({
      markModal: false,
      currentStep: 0
    });
  };
  //Assign Modals
  showAssignModal = () => {
    this.setState({
      assignModal: true,
      loadingInstructors: true
    });
    this._fetchInstructors();
  };
  handleAssignOk = e => {
    const state = this.state;
    console.log(e);
    this.setState({
      assigningInstructors: true
    });
    console.log("selectedStudents", state.selectedRowsModal);
    this._addSelectedInstructors();
  };
  handleAssignCancel = e => {
    console.log(e);

    console.log();
    this.setState({
      assignModal: false
    });
  };
  //Feed Modals
  handleFeedOk = e => {
    const state = this.state;
    console.log(e);

    console.log("selectedStudents", state.selectedRowsModal);
    this._addSelectedStudents();
  };
  handleFeedCancel = e => {
    console.log(e);
    this.props.form.resetFields();
    this.setState({
      feedModal: false,
      tell: "",
      savingFeed: false,
      currentFeedback: [],
      showExisting: true
    });
  };

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
  _fetchStudents = (inClass = false) => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_students`,
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
          body: JSON.stringify({ _class: this.state._class, inClass })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          if (!inClass) {
            this.setState({
              modalStudents: data.students,
              loadingStudents: false
            });
          } else {
            this.setState({
              students: data.students,
              loading: false
            });
          }
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
  _fetchInstructors = (inClass = false) => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_${
          inClass ? "class_" : ""
        }instructors`,
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
          body: JSON.stringify({ _class: this.state._class })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          if (!inClass) {
            this.setState({
              modalInstrucors: data.instructors,
              loadingInstructors: false
            });
          } else {
            this.setState({ instructors: data.instructors });
          }
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
  _fetchAttendance = () => {
    this.setState({ loadinga: true });
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_attendance`,
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
          body: JSON.stringify({ _class: this.state._class })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          if (data.attendance.length > 0) {
            this.setState({
              attendance: data.attendance,
              loadinga: false,
              columnsA: data.columnsA
            });
          } else {
            this.setState({ loadinga: false, attendance: data.attendance });
          }

          // if (!inClass) {
          //   // this.setState({
          //   //   modalStudents: data.students,
          //   //   loadingStudents: false
          //   // });
          // } else {
          //   // this.setState({
          //   //   students: data.students,
          //   //   loading: false
          //   // });
          // }
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
  removeStudents = () => {
    return new Promise((resolve, reject) => {
      const FetchAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/remove_students`,
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
              students: this.state.selectedRows,
              class_id: this.state._class._id
            })
          }
        )).json();

      FetchAsync()
        .then(data => {
          this._snack({
            type: data.success ? "success" : "warning",
            msg: data.message
          });
          if (data.success) {
            console.log("[new data]", data);
            let _class = {
              ...this.state._class,
              students: data.newClass.students
            };
            this.setState({
              addModal: false,
              addingStudents: false,
              _class,
              students: data.students,
              reloading: true,
              selectedRowKeys: []
            });

            resolve();
          } else {
            reject();
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
          reject();
        });
    }).catch(() => console.log("Oops errors!"));
  };
  handleRemove = () => {
    return new Promise((resolve, reject) => {
      const FetchAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/remove_instructor`,
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
              instructor: this.state.ins,
              class_id: this.state._class._id
            })
          }
        )).json();

      FetchAsync()
        .then(data => {
          this._snack({
            type: data.success ? "success" : "warning",
            msg: data.message
          });
          if (data.success) {
            // console.log("[new data]", data);
            let _class = {
              ...this.state._class,
              instructors: data.newClass.instructors
            };
            this.setState({
              _class,
              instructors: data.instructors,
              ins: null
              // reloading: true,
              // selectedRowKeys: []
            });

            resolve();
          } else {
            reject();
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
          reject();
        });
    }).catch(() => console.log("Oops errors!"));
  };
  removeInstructor = ins => {
    this.setState({ ins });
    confirm({
      title: `Are you sure you want to remove this instructor(${capitalize(
        ins.fname
      )} ${capitalize(ins.lname)})?`,
      onOk: this.handleRemove,
      onCancel() {}
    });
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
    this.setState({ selectedRowKeys, selectedRows });
  };
  onSelectChangeAtt = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
    this.setState({
      selectedRowKeysAtt: selectedRowKeys,
      selectedRowsAtt: selectedRows
    });
  };
  onSelectModalChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
    this.setState({
      selectedKeysModal: selectedRowKeys,
      selectedRowsModal: selectedRows
    });
  };
  onSelectIChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
    this.setState({
      selectedKeysI: selectedRowKeys,
      selectedRowsI: selectedRows
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
    this._fetchStudents(true);
    this._fetchInstructors(true);
  };

  render() {
    if (!this.props.location.data) {
      return <></>;
    }

    const { classes } = this.props;
    const state = this.state;

    console.log("isHovered", state.isHovered);
    const hasSelected = state.selectedRowKeys.length > 0;
    const {
      selectedRowKeys,
      selectedKeysModal,
      selectedKeysI,
      selectedRowKeysAtt
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const rowSelectionModal = {
      selectedKeysModal,
      onChange: this.onSelectModalChange
    };
    const rowSelectionI = {
      selectedKeysI,
      onChange: this.onSelectIChange
    };
    const rowSelectionAtt = {
      selectedRowKeysAtt,
      onChange: this.onSelectChangeAtt
    };
    //Form stuff
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    const menu = (
      <Menu>
        <Menu.Item
          onClick={() => {
            this.showStudentModal();
          }}
        >
          <Icon type="plus" />
          Add Students
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            this.showMarkModal();
          }}
        >
          <Icon type="check" />
          Mark Attendance
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            this.showAssignModal();
          }}
        >
          Assign Instructor
        </Menu.Item>
      </Menu>
    );
    const cmenu = (
      <Menu>
        <Menu.Item
          onClick={() => {
            this.setState({ currentDisplay: "Student List" });
          }}
        >
          Student List
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            this.setState({ currentDisplay: "Attendance" });
            this._fetchAttendance();
          }}
        >
          Attendance
        </Menu.Item>
      </Menu>
    );
    //  console.log("modalStudents", state.modalStudents);
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
        {/*student select modal*/}

        <Modal
          title="Add Students"
          visible={this.state.addModal}
          onOk={this.handleStudentOk}
          onCancel={this.handleStudentCancel}
          footer={[
            <>
              <Button
                form="myForm"
                key="submit"
                htmlType="submit"
                onClick={this.handleStudentCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleStudentOk}
                loading={state.addingStudents}
                disabled={!(state.selectedKeysModal.length > 0)}
              >
                Add Students
              </Button>
            </>
          ]}
        >
          {this.state.loadingStudents ? (
            <div className="text-center">
              {" "}
              <Spin indicator={antIcon} />{" "}
            </div>
          ) : (
            <Table
              size="small"
              rowSelection={rowSelectionModal}
              columns={columnsModal}
              dataSource={state.modalStudents}
            />
          )}
        </Modal>
        {/*Instructor select modal*/}

        <Modal
          title="Assign Instructors"
          visible={this.state.assignModal}
          onOk={this.handleAssignOk}
          onCancel={this.handleAssignCancel}
          footer={[
            <>
              <Button
                form="myForm"
                key="submit"
                htmlType="submit"
                onClick={this.handleAssignCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleAssignOk}
                loading={state.assigningInstructors}
                disabled={!(state.selectedKeysI.length > 0)}
              >
                Assign instructor(s)
              </Button>
            </>
          ]}
        >
          {this.state.loadingInstructors ? (
            <div className="text-center">
              {" "}
              <Spin indicator={antIcon} />{" "}
            </div>
          ) : (
            <Table
              size="small"
              rowSelection={rowSelectionI}
              columns={columnsI}
              dataSource={state.modalInstrucors}
            />
          )}
        </Modal>

        {/*mark attendance modal*/}
        <Modal
          title="Add Students"
          visible={this.state.markModal}
          onOk={this.handleMarkOk}
          onCancel={this.handleMarkCancel}
          footer={null}
        >
          <Steps size="small" current={state.currentStep}>
            <Step title={"Lesson"} description="Fill in lesson details. " />
            <Step title={"Attendance"} description="Mark attendance." />
          </Steps>

          <>
            {this.state.step1 ? (
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label="Week">
                  {getFieldDecorator("week", {
                    rules: [{ required: true, message: "Please select week!" }]
                  })(
                    <Select style={{ width: "100%" }}>
                      <Option value="week-1">Week 1</Option>
                      <Option value="week-2">Week 2</Option>
                      <Option value="week-3">Week 3</Option>
                      <Option value="week-4">Week 4</Option>
                      <Option value="week-5">Week 5</Option>
                      <Option value="week-6">Week 6</Option>
                      <Option value="week-7">Week 7</Option>
                      <Option value="week-8">Week 8</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="Remarks">
                  {getFieldDecorator("remarks", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your remark!"
                      }
                    ]
                  })(
                    <TextArea
                      placeholder="..."
                      autosize={{ minRows: 3, maxRows: 6 }}
                    />
                  )}
                </Form.Item>
                <Divider />
                <Form.Item>
                  <Button
                    form="myForm"
                    key="submit"
                    htmlType="submit"
                    onClick={this.handleMarkCancel}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleSubmit}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>
                <Divider orientation="left">Student List</Divider>
                <Table
                  size="small"
                  rowSelection={rowSelectionAtt}
                  columns={columnsAtt}
                  dataSource={this.state.students}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    this.setState({ step1: true, currentStep: 0 });
                  }}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={state.savingAttendance}
                  onClick={this.markAttendance}
                >
                  Save
                </Button>
              </div>
            )}
          </>
        </Modal>
        {/*Feedback modal*/}
        <Modal
          title={
            <div style={{ display: "table-cell" }}>
              <p
                style={{
                  float: "left",
                  display: "inline",
                  marginRight: "237px"
                }}
              >
                <b>Feedback</b>
              </p>
              {false ? (
                <Dropdown overlay={menu}>
                  <span>
                    Actions{" "}
                    <Icon
                      style={{
                        float: "right",
                        marginRight: "89px",
                        marginTop: "7px"
                      }}
                      type="down"
                    />
                  </span>
                </Dropdown>
              ) : null}
            </div>
          }
          visible={this.state.feedModal}
          onOk={this.handleFeedOk}
          onCancel={this.handleFeedCancel}
          footer={null}
        >
          {state.showExisting ? (
            <>
              <List
                style={{ height: "350px", overflow: "auto" }}
                loading={state.loadingFeed}
                itemLayout="horizontal"
                dataSource={state.currentFeedback}
                renderItem={item => (
                  <List.Item key={item._id}>
                    <List.Item.Meta
                      avatar={null}
                      title={item.lesson}
                      description={
                        <p style={{ color: "black" }}>{item.remarks}</p>
                      }
                    />
                    <div style={{ marginTop: "24px" }}>
                      {item.addedBy
                        ? capitalize(item.addedBy.fname) +
                          " " +
                          capitalize(item.addedBy.lname)
                        : ""}
                      <p
                        style={{
                          color: "#ad9b9b",
                          display: "inline",
                          marginLeft: "15px"
                        }}
                      >
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <>
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label="Lesson">
                  {getFieldDecorator("lesson", {
                    rules: [
                      { required: true, message: "Please select Lesson!" }
                    ]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      onSelect={this.getSelected}
                    >
                      {state.singleAtt.map((att, i) => {
                        return (
                          <Option key={i + 1} value={att}>
                            Lesson {i + 1}{" "}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <p>{state.tell}</p>
                <Form.Item label="Remarks">
                  {getFieldDecorator("remarks", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your remark!"
                      }
                    ]
                  })(
                    <TextArea
                      placeholder="..."
                      autosize={{ minRows: 3, maxRows: 6 }}
                    />
                  )}
                </Form.Item>
                <Divider />
                <Form.Item>
                  <Button
                    form="myForm"
                    key="submit"
                    htmlType="submit"
                    onClick={() => {
                      this.props.form.resetFields();
                      this.setState({
                        showExisting: true,
                        tell: "",
                        savingFeed: false
                      });
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleSubmit}
                    loading={state.savingFeed}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
        {/*normal page content*/}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card
              title={
                <span>
                  <Icon
                    style={{
                      float: "left",
                      marginTop: "1px",
                      fontSize: "28px"
                    }}
                    onClick={() => {
                      this.props.history.goBack();
                    }}
                    type="left-square"
                  />

                  <h5 style={{ display: "inline", marginLeft: "12px" }}>
                    Class details
                  </h5>
                </span>
              }
              extra={
                <Dropdown overlay={menu}>
                  <span>
                    Actions{" "}
                    <Icon
                      style={{
                        float: "right",
                        marginTop: "6px",
                        marginLeft: "6px"
                      }}
                      type="down"
                    />
                  </span>
                </Dropdown>
              }
              style={{ width: "100%" }}
            >
              <Descriptions title="">
                <Descriptions.Item label="Name">
                  {capitalize(state._class.name)}
                </Descriptions.Item>

                <Descriptions.Item label="Course">
                  {capitalize(
                    state._class.courseName.length > 0
                      ? state._class.courseName[0].name
                      : null
                  )}
                </Descriptions.Item>
                {/* </Descriptions>
              <Descriptions title="">*/}
                <Descriptions.Item label="Day">
                  {capitalize(state._class.day)}
                </Descriptions.Item>

                <Descriptions.Item label="Start Time">
                  {moment(state._class.start_time).format("HH:mm")}
                </Descriptions.Item>
                {/*    </Descriptions>
              <Descriptions title=""> */}
                <Descriptions.Item label="Duration">
                  {state._class.duration} hours
                </Descriptions.Item>

                <Descriptions.Item label="Students">
                  {state._class.students.length}
                </Descriptions.Item>
                {/*    </Descriptions>
              <Descriptions title=""> */}
                <Descriptions.Item label="Instructors">
                  <p>
                    {" "}
                    {state._class.instructors.length}{" "}
                    {state.instructors.length > 0 ? (
                      <Button
                        style={{
                          float: "right",
                          marginLeft: "10px",
                          marginRight: "86px"
                        }}
                        size="small"
                        onClick={() => {
                          this.setState({
                            showInstructors: !state.showInstructors
                          });
                        }}
                      >
                        <Icon
                          style={{ fontSize: 11, float: "right" }}
                          type={state.showInstructors ? "minus" : "plus"}
                        />
                      </Button>
                    ) : null}
                  </p>
                  {state.showInstructors ? (
                    <>
                      {state.instructors.map((each, i) => {
                        return (
                          <>
                            {" "}
                            <p
                              style={{ marginBottom: "-3px", width: 130 }}
                              onMouseEnter={() => {
                                this.setState(prevState => {
                                  console.log(i);
                                  let isHovered = [...prevState.isHovered];
                                  isHovered[i] = true;

                                  return {
                                    ...prevState,
                                    isHovered: isHovered
                                  };
                                });
                              }}
                              onMouseLeave={() => {
                                this.setState(prevState => {
                                  let isHovered = [...prevState.isHovered];
                                  isHovered[i] = false;

                                  return {
                                    ...prevState,
                                    isHovered: isHovered
                                  };
                                });
                              }}
                            >
                              {capitalize(each.fname)} {capitalize(each.lname)}{" "}
                              {state.isHovered[i] ? (
                                <Icon
                                  style={{ float: "right" }}
                                  onClick={() => {
                                    this.removeInstructor(each);
                                  }}
                                  type="delete"
                                />
                              ) : null}{" "}
                            </p>{" "}
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </Descriptions.Item>
              </Descriptions>
              {/*table*/}
              <div style={{ marginBottom: 16 }}>
                <span style={{ marginRight: 8 }}>
                  {hasSelected
                    ? `Selected ${state.selectedRowKeys.length} students`
                    : ""}
                </span>
                {state.currentDisplay == "Student List" ? (
                  <Button
                    type="primary"
                    onClick={this.showRemoveConfirm}
                    disabled={!(state.selectedRowKeys.length > 0)}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
              <Divider orientation="left">
                {" "}
                <span>
                  <Dropdown overlay={cmenu}>
                    <span>
                      {state.currentDisplay}
                      <Icon
                        style={{
                          fontSize: "14px",
                          marginTop: "6px",
                          marginLeft: "4px"
                        }}
                        type="down"
                      />
                    </span>
                  </Dropdown>
                </span>
              </Divider>
              {state.currentDisplay == "Student List" ? (
                <Table
                  size="middle"
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={this.state.students}
                  onRow={record => ({
                    onClick: () => {
                      this._fetchFeedBack(record);
                      this.setState({ currentStudent: record }, () => {
                        this.setState({ feedModal: true, loadingFeed: true });
                      });
                    }
                  })}
                />
              ) : (
                <>
                  {this.state.loadinga ? (
                    <div className="text-center">
                      <div style={{ marginTop: 30 }}>
                        <Spin indicator={antIconLarge} />
                      </div>
                    </div>
                  ) : (
                    <>
                      {state.columnsA.length > 0 ? (
                        <Table
                          size="small"
                          dataSource={state.attendance}
                          scroll={{ x: 1400 }}
                        >
                          <Column
                            title="Name"
                            dataIndex="name"
                            key="name"
                            fixed="left"
                            width={100}
                          />

                          {state.columnsA.map(a => {
                            return (
                              <Column
                                title={a.title}
                                dataIndex={a.dataIndex}
                                key={a.dataIndex}
                                render={bools => (
                                  <span>
                                    {bools ? (
                                      <Icon
                                        type="check"
                                        style={{ color: "green" }}
                                      />
                                    ) : (
                                      <Icon
                                        type="close"
                                        style={{ color: "red" }}
                                      />
                                    )}
                                  </span>
                                )}
                              />
                            );
                          })}
                        </Table>
                      ) : (
                        <div className="text-center">
                          <p>No attendance yet</p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
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
// let columnsA = [
//   { title: "Lesson 0", dataIndex: "0" ,  render: ('0') => (},
//   { title: "Lesson 1", dataIndex: "1" },
//   { title: "Lesson 2", dataIndex: "2" },
//   { title: "Lesson 3", dataIndex: "3" },
//   { title: "Lesson 4", dataIndex: "4" },
//   { title: "Name", dataIndex: "name" }
// ];
// let attendance = [
//   {
//     "0": false,
//     "1": false,
//     "2": false,
//     "3": false,
//     "4": false,
//     key: 0,

//     name: "Ian  Ian "
//   },
//   {
//     "0": true,
//     "1": true,
//     "2": false,
//     "3": true,
//     "4": true,
//     key: 1,

//     name: "IanBro IanBro"
//   },
//   {
//     "0": true,
//     "1": true,
//     "2": true,
//     "3": false,
//     "4": true,
//     key: 2,

//     name: "AnotherSis AnotherSis"
//   }
// ];

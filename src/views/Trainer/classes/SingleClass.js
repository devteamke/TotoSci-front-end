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
  Steps
} from "antd";
import moment from "moment";

const format = "HH:mm";
const { Step } = Steps;

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
      selectedRowKeys: 0,
      //Class
      students: [],
      //modal
      selectedKeysModal: [],
      modalStudents: [],
      //mark modal
      markModal: false,
      step1: true,
      currentStep: 0,
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
      markModal: false
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
  _fetchCourses = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_courses`,
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
        if (data.success) {
          console.log("[Courses]", data.courses);
          this.setState({
            courses: data.courses,
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
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      this.setState({ selectedRowKeys, selectedRows });
    },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  };
  rowSelectionModal = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      this.setState({
        selectedKeysModal: selectedRowKeys,
        selectedRowsModal: selectedRows
      });
    },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  };
  componentDidMount = () => {
    this._fetchStudents(true);
  };

  render() {
    if (!this.props.location.data) {
      return <></>;
    }

    const { classes } = this.props;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log("class details", state._class);
    const hasSelected = state.selectedRowKeys.length > 0;

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
              rowSelection={this.rowSelectionModal}
              columns={columnsModal}
              dataSource={state.modalStudents}
            />
          )}
        </Modal>

        {/*mark attendance modal*/}
        <Modal
          title="Add Students"
          visible={this.state.markModal}
          onOk={this.handleMarkOk}
          onCancel={this.handleMarkCancel}
          footer={[
            <>
              <Button
                form="myForm"
                key="submit"
                htmlType="submit"
                onClick={this.handleMarkCancel}
              >
                Cancel
              </Button>

              {!state.step1 ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    this.setState({ step1: true, currentStep: 0 });
                  }}
                >
                  Back
                </Button>
              ) : null}
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  this.setState({ step1: false, currentStep: 1 });
                }}
              >
                Next
              </Button>
            </>
          ]}
        >
          <Steps size="small" current={state.currentStep}>
            <Step title={"Lesson"} description="Fill in lesson details. " />
            <Step title={"Attendance"} description="Mark attendance." />
          </Steps>
          ,<>{this.state.step1 ? <p>step1</p> : <p>step2</p>}</>
        </Modal>
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Card
              title="Class details"
              extra={
                <Dropdown overlay={menu}>
                  <span>
                    Actions <Icon type="down" />
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
                  {capitalize(state._class.courseName[0].name)}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="">
                <Descriptions.Item label="Day">
                  {capitalize(state._class.day)}
                </Descriptions.Item>

                <Descriptions.Item label="Start Time">
                  {moment(state._class.start_time).format("HH:mm")}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="">
                <Descriptions.Item label="Duration">
                  {state._class.duration}
                </Descriptions.Item>

                <Descriptions.Item label="Students">
                  {state._class.students.length}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="">
                <Descriptions.Item label="Instructors">
                  {state._class.instructors.length}
                </Descriptions.Item>
              </Descriptions>
              {/*table*/}
              <div style={{ marginBottom: 16 }}>
                <span style={{ marginHorizontal: 8 }}>
                  {hasSelected
                    ? `Selected ${state.selectedRowKeys.length} students`
                    : ""}
                </span>

                <Button
                  type="primary"
                  onClick={this.showRemoveConfirm}
                  disabled={!(state.selectedRowKeys.length > 0)}
                >
                  Remove
                </Button>
              </div>
              <Divider orientation="left">Student List</Divider>
              <Table
                rowSelection={this.rowSelection}
                columns={columns}
                dataSource={this.state.students}
              />
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
  left: "50%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};
export default Form.create({ name: "register" })(
  withGlobalContext(withStyles(styles)(Add))
);

//Delete
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
//form functions
const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

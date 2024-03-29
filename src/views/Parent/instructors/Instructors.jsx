import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";

import CardHeader from "../../../components/dcomponents/Card/CardHeader.jsx";
import CardBody from "../../../components/dcomponents/Card/CardBody.jsx";
import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBInput
} from "mdbreact";
import { withGlobalContext } from "../../../context/Provider";
import {
  Icon,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Cascader,
  Select,
  Spin
} from "antd";
import CustomDrawer from "./Drawer";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  btnBg: {
    backgroundColor: "#01afc4!important"
  }
};
class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverRes: "",
      loading: true,
      mainLoad: true,
      loaded: false,
      users: [],
      page: 1,
      limit: 10,
      dvisible: false,
      currentInfo: null,
      //modal
      visible: false,
      fetchingClass: true,
      //skip:0,
      //snack
      open: false,
      place: "bc",
      resType: "warning",
      query: "",
      totalPages: null,
      hasNext: null,
      hasPrev: null,
      totalDocs: null
    };
    this.myRef = React.createRef();
  }
  _fetchUsers = () => {
    let state = this.state;
    let data = {
      limit: state.limit,
      page: state.page,
      query: state.query
    };
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/all_instructors`,
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

    FetchAsync()
      .then(data => {
        //this.setState({currentPlace:data.results})
        if (data.success) {
          console.log("[users]", data);
          this.setState({
            users: data.result.docs,
            page: data.result.page,
            totalPages: data.result.totalPages,
            totalDocs: data.result.totalDocs,
            hasNext: data.result.hasNextPage,
            hasPrev: data.result.hasPrevPage
          });
        } else {
          this._snack({ type: "warning", msg: data.message });
        }
        this.setState({
          loading: false,
          mainLoad: false,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
        if (error == "TypeError: Failed to fetch") {
          this.setState({
            serverRes: "Failed to contact server!"
          });
        } else if (error.message == "Network request failed") {
          // alert('No internet connection')
          this.setState({
            serverRes: "Network request failed"
          });
        }

        console.log(error);
        this.setState({
          open: true,
          resType: data.success ? "success" : "warning"
        });
        setTimeout(
          function() {
            this.setState({ open: false });
          }.bind(this),
          6000 * 9999
        );
      });
  };
  _fetchClass = id => {
    let data = {
      _id: id
    };

    console.log("Received", id);
    let promise = new Promise(async (resolve, reject) => {
      let fetchClass = await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_instructor_class`,
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
      resolve(fetchClass);
    });
    return promise
      .then(data => {
        if (data.success) {
          console.log("[Returned Classes]", data._class);

          return data._class;
        } else {
          this._snack({ type: "warning", msg: data.message });
        }
        console.log(data);
        return data;
      })

      .catch(error => {
        console.log(error);
        if (error == "TypeError: Failed to fetch") {
          this.setState({
            serverRes: "Failed to contact server!"
          });
        } else if (error.message == "Network request failed") {
          // alert('No internet connection')
          this.setState({
            serverRes: "Network request failed"
          });
        }

        console.log(error);
      });
  };
  _handlePrevious = () => {
    this.setState(
      {
        page: this.state.page - 1,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _handleNext = () => {
    // console.log('[offset]',-this.myRef.current.offsetTop)
    //  window.scrollTo(0, -this.myRef.current.offsetTop);
    this.myN.scrollIntoView({ block: "start" });
    this.setState(
      {
        page: this.state.page + 1,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _handleSearch = event => {
    this.setState(
      {
        query: event.target.value,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
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
    } else if (params) {
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
  //Ant Modal
  showDrawer = () => {
    const state = this.state;
    //  console.log("open drawer");

    this.setState({
      dvisible: true
    });
  };
  onClose = () => {
    this.setState({
      dvisible: false
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSave = () => {
    const form = this.formRef;
    const state = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);

      let data = {
        _id: instructor._id,
        fname: values.fname,
        lname: values.lname,
        instructor: values.instructor
      };
      this.setState({ updating: true });
      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/instructor_save_info`,
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
            serverRes: data.message,
            resType: data.success ? "success" : "warning"
          });
          setTimeout(
            function() {
              this.setState({ open: false, updating: false });
            }.bind(this),
            9000
          );

          if (data.success) {
            console.log("[newInstructor]", data.instructor);

            this.setState(prevState => {
              let users = [...prevState.users];
              users[instructor.index] = data.instructor;
              return {
                visible: false,
                users: users
              };
            });
          } else {
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
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
    console.log("save ref", formRef);
  };
  updateIndex = ({ i, obj }) => {
    this.setState(prevState => {
      let users = [...prevState.users];
      users[i] = { ...obj, addedBy: users[i].addedBy, i };
      // console.log("new user", users[i]);
      return {
        users: users,
        currentInfo: users[i]
      };
    });
  };
  removeIndex = (i, data) => {
    this.setState(prevState => {
      let courses = [...prevState.users];
      //console.log("Before Deleting", courses);
      courses.splice(i, 1);
      let total = prevState.totalDocs;
      total--;
      console.log("After Deleting", total);
      return {
        users: courses,
        totalDocs: total
      };
    });
    this.onClose();
    this._snack({
      type: data.success ? "success" : "warning",
      msg: data.message
    });
  };
  componentDidMount = () => {
    this._fetchUsers();
    this._snack();
  };

  render = () => {
    const { classes } = this.props;
    const state = this.state;
    if (state.mainLoad) {
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

        <CustomDrawer
          visible={this.state.dvisible}
          onClose={this.onClose}
          info={this.state.currentInfo}
          loading={this.state.fetchClass}
          infoCopy={this.state.currentInfo}
          onUpdateIndex={this.updateIndex}
          onRemoveIndex={this.removeIndex}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card title="All Instructors" style={{ width: "100%" }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div style={{ width: "15rem", float: "right" }}>
                    <Input
                      value={state.query}
                      onChange={this._handleSearch}
                      suffix={
                        <Button
                          className="search-btn"
                          style={{ marginRight: -12 }}
                          type="primary"
                        >
                          <Icon type="search" />
                        </Button>
                      }
                    />
                  </div>
                </GridItem>
              </GridContainer>
              {state.loading ? (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="text-center" style={{ height: 300 }}>
                      <Spin indicator={antIcon} />
                    </div>
                  </GridItem>
                </GridContainer>
              ) : (
                <>
                  {state.users.length > 0 ? (
                    <MDBTable hover responsive small striped bordered>
                      <MDBTableHead>
                        <tr>
                          <th>No.</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email </th>
                          <th> Phone Number</th>
                          <th>County</th>
                          <th>Sub County</th>
                          <th
                            style={{ textAlign: "center", width: "100px" }}
                          ></th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {state.users.map((instructor, i) => (
                          <tr
                            key={instructor._id}
                            // onClick={() => {
                            //   this.props.history.push({
                            //     pathname: `/${this.props.global.user.role}/instructors/single`,
                            //     data: user
                            //   });
                            // }}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{i + 1}</td>{" "}
                            <td>{capitalize(instructor.fname)}</td>
                            <td>{capitalize(instructor.lname)}</td>
                            <td>{instructor.email}</td>
                            <td>
                              {instructor.phone_number
                                ? instructor.phone_number.main
                                : ""}
                            </td>
                            <td>{capitalize(instructor.county)}</td>
                            <td>{capitalize(instructor.sub_county)}</td>
                            <td
                              onClick={async () => {
                                this.showDrawer();
                                let gotclasses = await this._fetchClass(
                                  instructor._id
                                );
                                console.log("Got Classes", gotclasses);
                                let current = { ...instructor, i, gotclasses };
                                this.setState({
                                  currentInfo: current,
                                  fetchClass: false
                                });
                              }}
                              style={{
                                textAlign: "center",
                                width: "100px",
                                fontsize: "1.3rem"
                              }}
                            >
                              <Icon type="select" />
                            </td>
                          </tr>
                        ))}
                      </MDBTableBody>
                    </MDBTable>
                  ) : (
                    <div className="text-center" style={{ height: 300 }}>
                      <p style={{ marginTop: 145 }}>
                        {" "}
                        {state.query
                          ? `No records found matching \" ${state.query}\"`
                          : "No instructors yet"}
                      </p>{" "}
                    </div>
                  )}
                </>
              )}
              {state.loaded && state.users.length > 0 ? (
                <div className="text-center">
                  {state.hasPrev ? (
                    <Button
                      type="primary"
                      style={{ display: "inline-block" }}
                      onClick={this._handlePrevious}
                    >
                      <MDBIcon size="2x" icon="angle-double-left" />
                    </Button>
                  ) : null}
                  <h4 style={{ display: "inline-block", margin: "25px 30px" }}>
                    {state.page} of {state.totalPages}
                  </h4>
                  {state.hasNext ? (
                    <Button
                      type="primary"
                      style={{ display: "inline-block" }}
                      onClick={this._handleNext}
                    >
                      <MDBIcon size="2x" icon="angle-double-right" />
                    </Button>
                  ) : null}

                  <p style={{ color: "grey" }}>
                    (Showing {state.users.length} of {state.totalDocs} records){" "}
                  </p>
                </div>
              ) : null}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}
let instructor = {};

export default withGlobalContext(withStyles(styles)(AllStudents));

const { Option } = Select;

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  withGlobalContext(
    // eslint-disable-next-line
    class extends React.Component {
      state = { loading: false, edit: false };
      _fetchInstructors = () => {
        const FetchAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_instructors`,
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
              let instructors = data.instructors.map(each => {
                return { value: each._id, label: unKebab(each.name).join(" ") };
              });
              console.log("mapped instructors", instructors);
              this.setState({
                instructors: instructors,
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
            this.props._snack({ type: "warning", msg: error.toString() });

            console.log(error);
          });
      };
      handleChange = value => {
        console.log(`selected ${value}`);
      };
      componentDidMount = () => {
        // this._fetchInstructors();
      };
      render() {
        const state = this.state;
        const { visible, onCancel, onSave, form } = this.props;
        const { getFieldDecorator } = form;
        if (state.loading) {
          return <p>loading</p>;
        }
        return (
          <Modal
            visible={visible}
            title="Instructor details"
            okText="Change"
            onCancel={onCancel}
            onOk={onSave}
            footer={[
              <div className="text-center">
                {this.props.updating ? (
                  <div
                    className="spinner-grow text-info"
                    role="status"
                    style={{ marginBottom: "15px" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    {!state.edit ? (
                      <Button
                        type="danger"
                        form="myForm"
                        key="submit"
                        htmlType="submit"
                        onClick={() => this.setState({ edit: true })}
                      >
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          form="myForm"
                          key="submit"
                          htmlType="submit"
                          onClick={() => {
                            this.setState({ edit: false });
                            onCancel();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={onSave}
                        >
                          Save Changes
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            ]}
          >
            <Form layout="vertical">
              <Form.Item label="First Name">
                {getFieldDecorator("fname", {
                  initialValue: instructor.fname,
                  rules: [
                    {
                      required: true,
                      message: "Please input first name!"
                    }
                  ]
                })(<Input disabled={!state.edit} />)}
              </Form.Item>
              <Form.Item label="Last Name">
                {getFieldDecorator("lname", {
                  initialValue: instructor.lname,
                  rules: [
                    {
                      required: true,
                      message: "Please input last name!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  )
);

const center = {
  position: "absolute",
  left: "50%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
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

const capitalize = str => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

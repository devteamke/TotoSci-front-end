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
        `${globals.BASE_URL}/api/${this.props.global.user.role}/all`,
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

  showModal = () => {
    console.log("show Modal");
    this.setState({ visible: true });
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
        _id: personnel._id,
        fname: values.fname,
        lname: values.lname,
        school: values.school
      };
      this.setState({ updating: true });
      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/personnel_save_info`,
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
            console.log("[newPersonnel]", data.personnel);

            this.setState(prevState => {
              let users = [...prevState.users];
              users[personnel.index] = data.personnel;
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
  updateIndex = ({ i, obj }) => {
    this.setState(prevState => {
      let users = [...prevState.users];
      users[i] = { ...obj, addedBy: users[i].addedBy, i };
      console.log("new user", users[i]);
      return {
        users: users,
        currentInfo: users[i]
      };
    });
  };
  removeIndex = (i, data) => {
    this.setState(prevState => {
      let courses = [...prevState.users];
      console.log("Before Deleting", courses);
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
        <CollectionCreateForm
          updating={this.state.updating}
          _snack={this._snack}
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
        />
        <CustomDrawer
          visible={this.state.dvisible}
          onClose={this.onClose}
          _snack={this._snack}
          info={this.state.currentInfo}
          infoCopy={this.state.currentInfo}
          onUpdateIndex={this.updateIndex}
          onRemoveIndex={this.removeIndex}
        />

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card title="All Personnel" style={{ width: "100%" }}>
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
                    <div
                      className="text-center"
                      style={{ height: 300, marginTop: "9.2rem" }}
                    >
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
                          <th>Role</th>
                          <th
                            style={{ textAlign: "center", width: "100px" }}
                          ></th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {state.users.map((user, i) => (
                          <tr
                            key={user._id}
                            // onClick={() => {
                            //   this.props.history.push({
                            //     pathname: `/${this.props.global.user.role}/personnels/single`,
                            //     data: user
                            //   });
                            // }}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{i + 1}</td> <td>{capitalize(user.fname)}</td>
                            <td>{capitalize(user.lname)}</td>
                            <td>{capitalize(user.role)}</td>
                            <td
                              onClick={() => {
                                let current = { ...user, i };
                                this.setState({ currentInfo: current }, () => {
                                  this.showDrawer();
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
                          : "No personnels yet"}
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
let personnel = {};

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  withGlobalContext(
    // eslint-disable-next-line
    class extends React.Component {
      state = { loading: true, edit: false };
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
              let schools = data.schools.map(each => {
                return { value: each._id, label: unKebab(each.name).join(" ") };
              });
              console.log("mapped schools", schools);
              this.setState({
                schools: schools,
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
        this._fetchSchools();
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
            title="Personnel details"
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
                  initialValue: personnel.fname,
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
                  initialValue: personnel.lname,
                  rules: [
                    {
                      required: true,
                      message: "Please input last name!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Learning Venue/ School">
                {getFieldDecorator("school", {
                  initialValue: personnel.school,
                  rules: [
                    {
                      type: "string",
                      required: true,
                      message: "Please select school/venue!"
                    }
                  ]
                })(
                  <Select
                    style={{ width: "100%" }}
                    onChange={this.handleChange}
                  >
                    {state.schools.map(each => {
                      return (
                        <Option key={each.value} value={each.value}>
                          {each.label}
                        </Option>
                      );
                    })}
                  </Select>
                )}
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
  left: "58.3%",
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
export default withGlobalContext(withStyles(styles)(AllStudents));

const { Option } = Select;

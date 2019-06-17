import React from "react";
import {
  Drawer,
  List,
  Avatar,
  Divider,
  Col,
  Row,
  Icon,
  Form,
  Input,
  Select,
  Button,
  Spin,
  Menu,
  Dropdown,
  Modal
} from "antd";

import { withGlobalContext } from "../../../context/Provider";
import globals from "../../../constants/Globals";
const { Option } = Select;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const confirm = Modal.confirm;
let count = 0;
let copy;
class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor called", props.info);

    this.state = {
      editing: false,
      loading: true,
      infoCopy: null
    };
  }
  _handleEdit = () => {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else {
      let infoCopy = {
        ...this.props.infoCopy,
        school: this.props.infoCopy.school[0]._id
      };
      this.setState({ infoCopy, editing: true });
      copy = infoCopy;
    }
  };
  showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete?",

      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("delete");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  handleSave = () => {
    const state = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let originalData = {
        fname: this.state.infoCopy.fname,
        lname: this.state.infoCopy.lname,
        school: this.state.infoCopy.school
      };
      // console.log("Received values of form: ", values);

      if (JSON.stringify(values) == JSON.stringify(originalData)) {
        return;
      }
      let data = {
        _id: state.infoCopy._id,
        fname: values.fname,
        lname: values.lname,
        school: values.school
      };
      this.setState({ updating: true });
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
            console.log("[newStudent]", data.student);
            this.props.onUpdateIndex({
              i: state.infoCopy.i,
              obj: data.student
            });
            this.setState({ editing: false });
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
        // this.props._snack({ type: "warning", msg: error.toString() });

        console.log(error);
      });
  };
  componentDidMount = () => {
    this._fetchSchools();
  };

  render = () => {
    const state = this.state;
    const props = this.props;
    const info = props.info;
    console.log("drawer props 1", props.visible);

    console.log("info copy", state.infoCopy);
    const { form } = this.props;
    const { getFieldDecorator } = form;
    if (!props.info || state.loading) {
      return <></>;
    }
    let menu = (
      <Menu>
        <Menu.Item style={{ height: "30px" }} onClick={this._handleEdit}>
          <Icon style={{ fontSize: 15 }} type={"edit"} /> Edit
        </Menu.Item>
        <Menu.Item style={{ height: "30px" }} onClick={this.showDeleteConfirm}>
          <Icon style={{ fontSize: 15 }} type={"delete"} /> Delete
        </Menu.Item>
      </Menu>
    );
    return (
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => {
          this.setState({ editing: false }, () => {
            props.onClose();
          });
        }}
        visible={props.visible}
      >
        <div style={{ display: "block", width: "100%  " }}>
          <p
            style={{
              ...pStyle,
              marginBottom: 24,
              fontWeight: 700,
              display: "inline-block"
            }}
          >
            Student Info
          </p>
          <Dropdown style={{ float: "right" }} overlay={menu}>
            <span style={{ float: "right" }}>
              Actions <Icon type="down" />
            </span>
          </Dropdown>{" "}
        </div>{" "}
        {!state.editing ? (
          <>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Full Name"
                  content={
                    capitalize(info.fname) + " " + capitalize(info.lname)
                  }
                />{" "}
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Status"
                  content={capitalize(info.status)}
                />{" "}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="County"
                  content={capitalize(info.school[0].county)}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Sub County"
                  content={capitalize(info.school[0].sub_county)}
                />
              </Col>
            </Row>

            <Divider />
            <p style={{ ...pStyle, fontWeight: 700 }}>School</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Name" content={info.school[0].name} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="County"
                  content={capitalize(info.school[0].county)}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Sub County"
                  content={capitalize(info.school[0].sub_county)}
                />
              </Col>
            </Row>

            <Divider />
            <p style={{ ...pStyle, fontWeight: 700 }}>Added By</p>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Name"
                  content={
                    capitalize(info.addedBy[0].fname) +
                    " " +
                    capitalize(info.addedBy[0].lname)
                  }
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            {state.infoCopy ? (
              <Form layout="vertical">
                <Form.Item label="First Name">
                  {getFieldDecorator("fname", {
                    initialValue: state.infoCopy.fname,
                    rules: [
                      {
                        required: true,
                        message: "Please input first name!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Last Name">
                  {getFieldDecorator("lname", {
                    initialValue: state.infoCopy.lname,
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
                    initialValue: state.infoCopy.school,
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
                        return <Option key={each.value}>{each.label}</Option>;
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <div className="text-center">
                    {state.updating ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <>
                        <Button
                          form="myForm"
                          key="submit"
                          htmlType="submit"
                          onClick={() => {
                            this.setState({ editing: false });
                          }}
                        >
                          Cancel
                        </Button>{" "}
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={this.handleSave}
                        >
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </Form.Item>
              </Form>
            ) : null}
          </>
        )}
      </Drawer>
    );
  };
}

export default withGlobalContext(
  Form.create({ name: "form_in_modal" })(CustomDrawer)
);
const pStyle = {
  fontSize: 16,
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
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

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7,

      color: "rgba(0,0,0,0.65)"
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.85)"
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

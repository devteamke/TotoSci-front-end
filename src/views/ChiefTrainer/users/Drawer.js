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
  Radio,
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
    // console.log("constructor called", props.info);

    this.state = {
      editing: false,
      loading: true,
      infoCopy: null,
      schools: []
    };
  }
  _handleEdit = () => {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else {
      let infoCopy = {
        ...this.props.infoCopy
        //school: this.props.infoCopy.school[0].name
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
    // console.log(values);
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("This is err", err);
        return;
      }
      let originalData = {
        fname: this.state.infoCopy.fname,
        lname: this.state.infoCopy.lname,
        county: this.state.infoCopy.county,
        sub_county: this.state.infoCopy.sub_county
        // role: this.infoCopy.sub_county
      };
      console.log("Received values of form: ", values);
      console.log("ReceivedOriginal: ", originalData);

      if (JSON.stringify(values) == JSON.stringify(originalData)) {
        return;
      }
      let data = {
        _id: state.infoCopy._id,
        fname: values.fname,
        lname: values.lname,
        county: values.county,
        sub_county: values.sub_county
        // role: values.role
      };
      console.log("Changed data", data);
      this.setState({ updating: true });
      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/save_profile`,
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
              obj: data.user
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

  componentDidMount = () => {
    //this._fetchSchools();
  };
  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      role: e.target.value
    });
  };
  render = () => {
    const state = this.state;
    const props = this.props;
    const info = props.info;
    console.log("SChools", state.schools);
    // const isNotChief = info.role == "chief-trainer";
    console.log("info copy", props.info);
    const { form } = this.props;
    const { getFieldDecorator } = form;
    if (!props.info) {
      return <> </>;
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
        visible={props.visible}
        closable={false}
        onClose={() => {
          this.setState({ editing: false }, () => {
            props.onClose();
          });
        }}
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
            Edit User Info
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
                    capitalize(info.salutation) +
                    " " +
                    capitalize(info.fname) +
                    " " +
                    capitalize(info.lname)
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
                <DescriptionItem title="Role" content={capitalize(info.role)} />
              </Col>
            </Row>
            <Divider />
            <p style={{ ...pStyle, fontWeight: 700 }}>Contacts</p>

            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="E-mail"
                  content={capitalize(info.email)}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Phone Number"
                  content={capitalize(info.phone_number.main)}
                />
              </Col>
            </Row>
            <Divider />
            <p style={{ ...pStyle, fontWeight: 700 }}>Location</p>
            <Row></Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="County"
                  content={capitalize(info.county)}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Sub County"
                  content={capitalize(info.sub_county)}
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
                        type: "string",
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
                        type: "string",
                        required: true,
                        message: "Please input last name!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="County">
                  {getFieldDecorator("county", {
                    initialValue: state.infoCopy.county,
                    rules: [
                      {
                        type: "string",
                        required: true,
                        message: "Please input the county!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Sub County">
                  {getFieldDecorator("sub_county", {
                    initialValue: state.infoCopy.sub_county,
                    rules: [
                      {
                        type: "string",
                        required: true,
                        message: "Please select sub county!"
                      }
                    ]
                  })(<Input />)}
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

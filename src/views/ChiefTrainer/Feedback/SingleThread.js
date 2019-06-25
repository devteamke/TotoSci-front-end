import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";

import { MDBBtn, MDBInput } from "mdbreact";
import avatar from "../../../assets/img/faces/marc.jpg";

import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from "../../../context/Provider";

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
const ReactMarkdown = require("react-markdown");
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
    let conversation = this.props.location.data;
    if (!conversation) {
      this.props.history.push(`/${this.props.global.user.role}/feedback`);
      return;
    }

    this.state = {
      conversation,

      //other
      adding: false,
      open: false,
      place: "bc",
      resType: "warning"
    };
    this.item = {};
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

  scrollToBottom = () => {
    console.log("messagesEnd", this.item);
    this.item.scrollIntoView({
      behavior: "smooth"
    });
  };

  componentDidMount = () => {
    if (this.props.location.data) {
      this.scrollToBottom();
    }
  };

  render() {
    if (!this.props.location.data) {
      return <></>;
    }

    const { classes } = this.props;
    const state = this.state;

    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }

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
        <Row gutter={16}>
          <Col span={24}>
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

                  <span style={{ display: "inline", marginLeft: "12px" }}>
                    {capitalize(state.conversation.recipient)}{" "}
                  </span>
                </span>
              }
              bordered={false}
            >
              <List
                style={{ height: "22rem", overflow: "auto" }}
                itemLayout="horizontal"
                dataSource={state.conversation.messages}
                renderItem={(item, i) => (
                  <>
                    <List.Item className="threads">
                      <List.Item.Meta
                        // avatar={
                        //   <Avatar
                        //     src={`https://ui-avatars.com/api/?name=${
                        //       item.recipient.split(" ")[0]
                        //     }+${
                        //       item.recipient.split(" ")[1]
                        //     }K&background=01afc4&color=fff&size=256`}
                        //   />
                        // }
                        // title={capitalize(item.recipient)}
                        description={
                          <ReactMarkdown
                            source={item.content}
                            escapeHtml={false}
                          />
                        }
                      />
                      <div
                        ref={el => {
                          this.item = el;
                        }}
                      >
                        {" "}
                        {moment(item.createdAt).fromNow()}
                      </div>
                    </List.Item>
                    {i == state.conversation.messages.length - 1 ? (
                      <List.Item>
                        <div
                          ref={el => {
                            this.item = el;
                          }}
                        >
                          {" "}
                          reply
                        </div>
                      </List.Item>
                    ) : null}
                  </>
                )}
              />
            </Card>
          </Col>
        </Row>
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

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
    console.log("constructor called", props);

    this.state = {
      editing: false,
      loading: true,
      infoCopy: null
    };
  }

 

  render = () => {
    const state = this.state;
    const props = this.props;
    const info = props.info;
    console.log("drawer props", props);

    console.log("info copy", state.infoCopy);
    const { form } = this.props;
    const { getFieldDecorator } = form;
    let isMobile = false;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
    }
    if (!props.info || state.loading) {
      return <></>;
    }
    let menu = (
      <Menu>
        <Menu.Item style={{ height: "30px" }} >
          <Icon style={{ fontSize: 15 }} type={"edit"} /> Edit
        </Menu.Item>
        <Menu.Item style={{ height: "30px" }} >
          <Icon style={{ fontSize: 15 }} type={"delete"} /> Delete
        </Menu.Item>
      </Menu>
    );
    return (
      <Drawer
        width={isMobile ? "80%" : "40%"}
        placement="right"
        closable={false}
        onClose={() => {
          this.setState({ editing: false }, () => {
            props.onClose();
          });
        }}
        visible={props.visible}>
        <div style={{ display: "block", width: "100%  " }}>
          <p
            style={{
              ...pStyle,
              marginBottom: 24,
              fontWeight: 700,
              display: "inline-block"
            }}>
            School Info
          </p>
          <Dropdown style={{ float: "right" }} overlay={menu}>
            <span style={{ float: "right" }}>
              Actions <Icon type="down" />
            </span>
          </Dropdown>{" "}
        </div>{" "}
       
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

const capitalize = (str) => {
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
    }}>
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.85)"
      }}>
      {title}:
    </p>
    {content}
  </div>
);

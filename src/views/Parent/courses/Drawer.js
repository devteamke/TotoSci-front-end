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
  InputNumber,
  Modal
} from "antd";

import { withGlobalContext } from "../../../context/Provider";
import globals from "../../../constants/Globals";
const { Option } = Select;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const confirm = Modal.confirm;
const { TextArea } = Input;
let count = 0;
let copy;
class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    // console.log("constructor called", props.info);

    this.state = {
      editing: false,
      loading: true,
      deleting: false,
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
  //const pro=this.props;

  componentDidMount = () => {
    //this._fetchSchools();
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
          <Icon style={{ fontSize: 15 }} type={"edit"} /> Query
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
            Course Details
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
                <DescriptionItem title="Name" content={capitalize(info.name)} />{" "}
              </Col>
              <Col span={12}>
                <DescriptionItem title="Charge" content={info.charge} />{" "}
              </Col>
            </Row>

            <Divider />
            <p style={{ ...pStyle, fontWeight: 700 }}>Description</p>

            <Row>
              <Col span={12}>
                <DescriptionItem content={info.description} />
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
              <Col span={12}>
                <DescriptionItem
                  title="Email"
                  content={capitalize(info.addedBy[0].email)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Role"
                  content={capitalize(info.addedBy[0].role)}
                />
              </Col>
            </Row>
          </>
        ) : (
          <></>
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

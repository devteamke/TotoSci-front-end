/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  Col,
  Row,
  Tabs,
  Icon,
  Spin,
  List,
  Badge,
  notification,
  Form,
  Modal,
  Button,
  Input,
  Radio,
  Descriptions
} from "antd";
import globals from "../../../constants/Globals";
import { withGlobalContext } from "../../../context/Provider";
import moment from "moment";
import "./Feedback.css";

const { TabPane } = Tabs;
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
  }
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conversations: [],
      individual: [],
      broadcasts: [],
      approvals: [],

      activeTab: this.props.location.activeTab
        ? this.props.location.activeTab
        : "1",
      //Modal
      info: null,
      saving: false
    };
  }

  _fetchMessages = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_messages`,
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
          body: JSON.stringify({})
        }
      )).json();

    FetchAsync()
      .then(data => {
        console.log("[ ALL conversations]", data);
        if (data.success) {
          this.setState({
            loading: false,
            conversations: data.conversations,
            individual: data.individual,
            broadcasts: data.broadcasts,
            approvals: data.approvals
          });
        } else {
          notification["error"]({
            message: data.message,
            duration: 0,
            description: (
              <Button
                onClick={() => {
                  this.setState({ loading: true });
                  this._fetchMessages();
                  notification.destroy();
                }}
              >
                {" "}
                Retry{" "}
              </Button>
            )
          });
        }
      })
      .catch(error => {
        notification["error"]({
          message: error.toString(),
          duration: 0,
          description: (
            <Button
              onClick={() => {
                this.setState({ loading: true });
                this._fetchMessages();
                notification.destroy();
              }}
            >
              {" "}
              Retry{" "}
            </Button>
          )
        });
        // this.setState({ sending: false });
        console.log(error);
      });
  };
  //Modal form info

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      this.setState({ saving: true });
      let data = {
        remark: values.remark,
        response: values.reqBool,
        requestID: this.state.info._id
      };

      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${
            this.props.global.user.role
          }/request_response`,
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

      SaveAsync()
        .then(data => {
          let type = data.success ? "success" : "error";

          notification[type]({
            message: data.message
          });
          this.setState({
            saving: false
          });
          if (data.success) {
            this.setState({ visible: false });
            form.resetFields();
          } else {
          }
        })
        .catch(error => {
          notification["error"]({
            message: error.toString()
          });

          this.setState({ saving: false });
          console.log(error);
        });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  //Modoal form end

  componentDidMount = () => {
    console.log("[props]", this.props);
    this._fetchMessages();
  };
  render() {
    const { classes } = this.props;
    const { state } = this;
    if (state.loading) {
      return (
        <div style={{ ...center, left: this.props.broken ? "50%" : "58.3%" }}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    return (
      <Row gutter={16}>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          info={this.state.info}
          saving={this.state.saving}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Col span={24}>
          <Card bordered={false}>
            <Tabs defaultActiveKey={state.activeTab} onChange={this.callback}>
              <TabPane
                tab={
                  <p>
                    Messages <Badge count={this.props.unreadMessages} />
                  </p>
                }
                key="1"
              >
                {state.individual.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={state.individual}
                    renderItem={item => (
                      <List.Item
                        className="threads"
                        onClick={() => {
                          this.props.history.push({
                            pathname: `/${
                              this.props.global.user.role
                            }/feedback/single`,
                            data: item
                          });
                        }}
                      >
                        <List.Item.Meta
                          description={
                            <span
                              style={{
                                display: "flex"
                              }}
                            >
                              <span
                                style={{
                                  marginRight: "15px",
                                  fontWeight: item.unread == 0 ? "" : 500,
                                  width: this.props.broken ? "100px" : "175px",
                                  color: "black"
                                }}
                              >
                                {capitalize(item.recipient)}
                              </span>
                              <Badge
                                style={{ marginRight: "20px" }}
                                count={item.unread}
                              />
                              <br />
                              <span
                                style={{
                                  fontWeight: item.unread == 0 ? "" : 500,
                                  color: "black"
                                }}
                              >
                                {capitalize(item.subject)}
                              </span>{" "}
                              -{" "}
                              {item.lastMessage.content
                                .replace(/<[^>]*>?/gm, "")
                                .replace(/&nbsp;/gi, "")
                                .slice(0, 50) + "..."}
                            </span>
                          }
                        />
                        <div style={{ float: "right" }}>
                          {moment(item.updatedAt).fromNow()}
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <div className="text-center" style={{ margin: "50px" }}>
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                      alt="not found"
                    />
                    <p>You have no new messages</p>
                  </div>
                )}
              </TabPane>
              <TabPane
                tab={
                  <p>
                    Approval Requests{" "}
                    <Badge count={this.props.pendingApprovals} />
                  </p>
                }
                key="2"
              >
                {state.approvals.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={state.approvals}
                    renderItem={item => (
                      <List.Item
                        className="threads"
                        // onClick={() => {
                        //   this.props.history.push({
                        //     pathname: `/${
                        //       this.props.global.user.role
                        //     }/feedback/singleApproval`,
                        //     data: item
                        //   });
                        // }}
                      >
                        <List.Item.Meta
                          description={
                            <span
                              style={{
                                display: "flex"
                              }}
                            >
                              <span
                                style={{
                                  marginRight: "15px",
                                  fontWeight: 500,
                                  width: "200px",
                                  color: "black"
                                }}
                              >
                                {capitalize(item.subject)}
                              </span>
                              <span
                                style={{
                                  fontWeight: 500,
                                  color: "black"
                                }}
                              >
                                {capitalize(item.addedBy.fname) +
                                  " " +
                                  capitalize(item.addedBy.lname)}{" "}
                              </span>{" "}
                              &nbsp; has added a new{" "}
                              {capitalize(item.additionalInfo.record.role)}.
                            </span>
                          }
                        />
                        <div style={{ float: "right" }}>
                          <Button
                            style={{
                              float: "right",
                              marginRight: "30px",
                              width: "103px",

                              marginTop: "-22px",
                              marginBottom: "10px"
                            }}
                            type={item.response ? "default" : "primary"}
                            onClick={() => {
                              console.log("[item info]", item);
                              this.setState({ info: item }, () =>
                                this.showModal()
                              );
                            }}
                          >
                            {item.response == null ? "Respond" : "View"}
                          </Button>

                          <p style={{ marginBottom: "0px" }}>
                            {moment(item.updatedAt).fromNow()}
                          </p>
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <div className="text-center" style={{ margin: "50px" }}>
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                      alt="not found"
                    />
                    <p>You have no new requests</p>
                  </div>
                )}
              </TabPane>
              <TabPane tab="Broadcasts" key="3">
                {state.broadcasts.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={state.broadcasts}
                    renderItem={item => (
                      <List.Item
                        className="threads"
                        onClick={() => {
                          this.props.history.push({
                            pathname: `/${
                              this.props.global.user.role
                            }/feedback/single`,
                            data: item
                          });
                        }}
                      >
                        <List.Item.Meta
                          description={
                            <span
                              style={{
                                display: "flex"
                              }}
                            >
                              <span
                                style={{
                                  marginRight: "15px",
                                  fontWeight: 500,
                                  width: "200px",
                                  color: "black"
                                }}
                              >
                                {capitalize(item.recipient)}
                              </span>
                              <span
                                style={{
                                  fontWeight: 500,
                                  color: "black"
                                }}
                              >
                                {capitalize(item.subject)}
                              </span>{" "}
                              -{" "}
                              {item.lastMessage.content
                                .replace(/<[^>]*>?/gm, "")
                                .replace(/&nbsp;/gi, "")
                                .slice(0, 50) + "..."}
                            </span>
                          }
                        />
                        <div>{moment(item.updatedAt).fromNow()}</div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <div className="text-center" style={{ margin: "50px" }}>
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                      alt="not found"
                    />
                    <p>You have no broadcasts</p>
                  </div>
                )}
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withGlobalContext(withStyles(styles)(Notifications));
const center = {
  position: "absolute",
  left: "58.3%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};
const capitalize = str => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};
const { TextArea } = Input;
const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { info } = this.props;

      if (!info) {
        return null;
      }
      let by = null;
      if (info.response) {
        by = info.response.by;
      }
      const { record } = info.additionalInfo;
      return (
        <Modal
          visible={visible}
          title="Approval Request"
          okText="Save"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={onCreate}
          okButtonProps={{ disabled: !info.response ? false : true }}
        >
          <Spin tip="Saving..." spinning={this.props.saving}>
            <p>
              {capitalize(info.addedBy.fname) +
                " " +
                capitalize(info.addedBy.lname)}{" "}
              has added a new <b> {" " + capitalize(record.role) + " "}.</b>
              This action needs your apporval.
            </p>

            <Descriptions
              layout="vertical"
              column={2}
              title={capitalize(record.role) + " Info"}
            >
              <Descriptions.Item label="Name">
                {capitalize(record.fname) + " " + capitalize(record.lname)}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {capitalize(record.gender)}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {record.email}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                {record.phone_number.main}{" "}
              </Descriptions.Item>

              <Descriptions.Item label="County">
                {capitalize(record.county)}
              </Descriptions.Item>
              <Descriptions.Item label="Sub County">
                {capitalize(record.sub_county)}
              </Descriptions.Item>
            </Descriptions>

            {info.response ? (
              <Descriptions title="Response" column={2}>
                <Descriptions.Item label="Response">
                  {" "}
                  <p
                    style={{
                      color: info.response.type == "approved" ? "green" : "red",
                      display: "inline"
                    }}
                  >
                    {capitalize(info.response.type)}
                  </p>
                </Descriptions.Item>
                <Descriptions.Item label="Responded by">
                  {capitalize(by.fname) + " " + capitalize(by.lname)}
                </Descriptions.Item>
                <Descriptions.Item label="Remark">
                  {capitalize(info.response.remark)}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <>
                <h5>Response:</h5>

                <Form layout="vertical">
                  <Form.Item label="Remark">
                    {getFieldDecorator("remark", {
                      rules: [
                        {
                          required: true,
                          message: "Please input a remark"
                        }
                      ]
                    })(<TextArea rows={4} />)}
                  </Form.Item>

                  <Form.Item className="collection-create-form_last-form-item">
                    {getFieldDecorator("reqBool", {})(
                      <Radio.Group>
                        <Radio value="approved">
                          <p style={{ color: "green", display: "inline" }}>
                            Approve
                          </p>
                        </Radio>
                        <Radio value="denied">
                          {" "}
                          <p style={{ color: "red", display: "inline" }}>
                            Deny
                          </p>
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Form>
              </>
            )}
          </Spin>
        </Modal>
      );
    }
  }
);

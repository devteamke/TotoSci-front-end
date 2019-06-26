import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Modal,
  Button,
  Avatar,
  Tabs,
  Badge,
  Divider,
  List
} from "antd";
import { Link, withRouter } from "react-router-dom";
import { withGlobalContext } from "../context/Provider";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes/chiefRoutes";
import globals from "../constants/Globals";
//scrollbar
import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import moment from "moment";
import "./layouts.css";
import io from "socket.io-client";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const confirm = Modal.confirm;
const { TabPane } = Tabs;
let mainRoutes;
class Slider extends React.Component {
  constructor(props) {
    super(props);
    mainRoutes = routes
      .filter(each => each.type == undefined)
      .map(each => {
        return each;
      });

    mainRoutes = mainRoutes.map(main => {
      let child = [];
      routes
        .filter(each => each.type == "nested")
        .map(each => {
          if (each.path.includes(main.path)) {
            child.push(each);
          }
        });
      main.child = child;
      return main;
    });

    console.log("mapped Routes", mainRoutes);

    this.state = {
      collapsed: false,
      messages: [],
      endpoint: `${globals.BASE_URL}`
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  ok = () => {
    console.log("OK");
    this.props.history.push({
      pathname: "/login",
      snack: { type: "success", msg: "Logout successful" }
    });
    this.props.global.onLogout();
  };
  showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to logout?",

      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: this.ok,
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  collapseOnClick = () => {
    if (this.state.broken) {
      this.setState({ collapsed: true });
    }
  };
  callback = key => {
    console.log(key);
  };
  _fetchNotifications = () => {
    this.setState({ sending: true });
    const FetchAsync = async () =>
      await (await fetch(`${globals.BASE_URL}/api/users/fetch_notifications`, {
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
      })).json();

    FetchAsync()
      .then(data => {
        //
        if (data.success) {
          console.log(data.messages);
          this.setState({ messages: data.messages });
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
        //this._snack({ type: "warning", msg: error.toString() });
        //this.setState({ sending: false });
        console.log(error);
      });
  };
  componentDidMount = () => {
    // console.log(
    //   "current route: ",
    //   this.props.location.pathname,
    //   " vs layout: ",
    //   routes[0].layout,
    //   " and  path",
    //   routes[0].path
    // );
    const socket = io(this.state.endpoint, {
      query: {
        token: this.props.global.token
      }
    });
    socket.on("newMessage", data => {
      console.log("newMessage", data);
      // this.setState(prevState => {
      //       let messages = [...state.conversation.messages];
      //       messages.push(data.newMessage);

      //       return {
      //         sending: false,
      //         conversation: { ...state.conversation, messages },
      //         data: "",
      //         dataError: null
      //       };
      //     });
    });
    this._fetchNotifications();
  };
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  render() {
    const role = this.props.global.user.role;
    const { state } = this;
    return (
      <PerfectScrollbar>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            theme="dark"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              this.setState({ broken });
            }}
            collapsed={this.state.collapsed}
            style={{
              boxShadow: this.state.collapsed
                ? ""
                : "5px 0 5px -5px rgba(0,0,0,0.5)"
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
              this.setState({ collapsed });
            }}
            trigger={null}
          >
            <div
              className="logo"
              style={{
                height: this.state.collapsed ? "4.3rem" : "6.3rem",
                padding: "1.3rem",
                backgroundColor: "#fff"
              }}
            >
              <img
                src={require("../assets/img/totosci.png")}
                style={{ height: "36px" }}
              />
              {this.state.collapsed ? null : (
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    textAlign: "center",
                    marginTop: "0.4rem"
                  }}
                >
                  {capitalize(role)}
                </p>
              )}
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[this.props.location.pathname]}
              style={{ borderRight: 0 }}
            >
              {mainRoutes.map(main => {
                if (main.child.length == 0) {
                  return (
                    <Menu.Item
                      onClick={this.collapseOnClick}
                      key={`${main.layout}${main.path}`}
                    >
                      <Link to={`${main.layout}${main.path}`}>
                        <Icon type="dashboard" />
                        <span className="nav-text">{main.name}</span>
                      </Link>
                    </Menu.Item>
                  );
                } else {
                  let items = main.child.map(child => {
                    return (
                      <Menu.Item
                        onClick={this.collapseOnClick}
                        key={`${child.layout}${child.path}`}
                      >
                        <Link to={`${child.layout}${child.path}`}>
                          {child.name}
                        </Link>
                      </Menu.Item>
                    );
                  });
                  items.unshift(
                    <Menu.Item
                      onClick={this.collapseOnClick}
                      key={`${main.layout}${main.path}`}
                    >
                      <Link to={`${main.layout}${main.path}`}>
                        <span className="nav-text">{main.sub}</span>
                      </Link>
                    </Menu.Item>
                  );
                  return (
                    <SubMenu
                      key={`${main.layout}${main.path}`}
                      title={
                        <span>
                          <Icon type={main.icon} />
                          <span>{main.name}</span>
                        </span>
                      }
                      onTitleClick={() => {
                        // this.props.history.push({
                        //   pathname: `${main.layout}${main.path}`
                        // });
                      }}
                    >
                      {items}
                    </SubMenu>
                  );
                }
              })}
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                height: "4.3rem",
                backgroundColor: "#fff",
                padding: "1rem",
                boxShadow: "0 5px 5px -5px #afabab"
              }}
            >
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                style={{ borderBottom: "0" }}
              >
                {this.state.broken ? (
                  <Menu.Item key="sider i" onClick={this.toggle}>
                    <Icon
                      className="trigger"
                      type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                      onClick={this.toggle}
                      style={{ fontSize: 24 }}
                    />
                  </Menu.Item>
                ) : null}

                <SubMenu
                  style={{ float: "right" }}
                  title={
                    <span className="submenu-title-wrapper">
                      <Avatar
                        size={15}
                        style={{
                          backgroundColor: "#00a2ae",
                          verticalAlign: "middle"
                        }}
                        size="large"
                      >
                        {this.props.global.user.fname.charAt(0).toUpperCase()}
                      </Avatar>
                    </span>
                  }
                >
                  <Menu.Item
                    key="setting:1"
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/${role}/profile`
                      });
                    }}
                  >
                    {" "}
                    Profile{" "}
                    <Icon
                      style={{ float: "right", marginTop: "12px" }}
                      type="user"
                    />
                  </Menu.Item>
                  <Menu.Item key="setting:2" onClick={this.showDeleteConfirm}>
                    {" "}
                    Sign Out{" "}
                    <Icon
                      style={{ float: "right", marginTop: "12px" }}
                      type="logout"
                    />
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  visible={true}
                  style={{ float: "right" }}
                  title={
                    <span className="submenu-title-wrapper">
                      <Badge count={state.messages.length}>
                        <Icon type="bell" style={{ fontSize: 24 }} />
                      </Badge>
                    </span>
                  }
                >
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="Messages" key="1">
                      {state.messages.length > 0 ? (
                        <>
                          {" "}
                          {state.messages.map(item => {
                            let sender;
                            if (
                              item.lastMessage.sender ==
                              item.participants[0]._id
                            ) {
                              sender = item.participants[0];
                            } else {
                              sender = item.participants[1];
                            }
                            return (
                              <span
                                className="notifs"
                                style={{
                                  width: "100%",
                                  padding: "1rem",
                                  display: "block"
                                }}
                                key={item._id}
                                onClick={() => {
                                  this.props.history.push({
                                    pathname: `/${this.props.global.user.role}/feedback`,
                                    data: item
                                  });
                                }}
                              >
                                <span style={{}}>
                                  <span
                                    style={{
                                      marginRight: "15px",
                                      fontWeight: 500,
                                      width: "100px",
                                      color: "black"
                                    }}
                                  >
                                    {capitalize(sender.fname) +
                                      " " +
                                      capitalize(sender.lname)}
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
                                    .slice(0, 20) + "..."}{" "}
                                  {moment(item.createdAt).fromNow()}
                                </span>
                              </span>
                            );
                          })}
                        </>
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
                    <TabPane tab="Approval Requests" key="2">
                      <div className="text-center">
                        <img
                          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                          alt="not found"
                        />
                        <p>You have no new requests</p>
                      </div>
                    </TabPane>
                  </Tabs>
                  <Menu.Item key="tabs">
                    <Divider style={{ margin: 0 }} />
                  </Menu.Item>
                  <Menu.Item
                    key="i2"
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/${role}/feedback`
                      });
                    }}
                  >
                    <p style={{ textAlign: "center" }}>View all</p>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <Switch>
                {routes.map((prop, key) => {
                  if (prop.layout === "/chief-trainer") {
                    return (
                      <Route
                        exact
                        path={prop.layout + prop.path}
                        render={props => (
                          <prop.component
                            {...props}
                            broken={this.state.broken}
                          />
                        )}
                        key={key}
                      />
                    );
                  }
                })}
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>©2019 TotoSci Devs</Footer>
          </Layout>
        </Layout>
      </PerfectScrollbar>
    );
  }
}

export default withGlobalContext(withRouter(Slider));
const capitalize = str => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

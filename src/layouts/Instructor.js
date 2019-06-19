import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Modal, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { withGlobalContext } from "../context/Provider";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes/instructorRoutes";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const confirm = Modal.confirm;

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

    // console.log("mapped Routes", mainRoutes);

    this.state = {
      collapsed: false
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

  componentDidMount = () => {
    console.log(
      "current route: ",
      this.props.location.pathname,
      " vs layout: ",
      routes[0].layout,
      " and  path",
      routes[0].path
    );
  };
  render() {
    const role = this.props.global.user.role;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="dark"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          style={{ boxShadow: "5px 0 5px -5px rgba(0,0,0,0.5)" }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div
            className="logo"
            style={{
              height: "6.3rem",
              padding: "1.3rem",
              backgroundColor: "#fff"
            }}
          >
            <img
              src={require("../assets/img/totosci.png")}
              style={{ height: "36px" }}
            />
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
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[this.props.location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {mainRoutes.map(main => {
              if (main.child.length == 0) {
                return (
                  <Menu.Item key={`${main.layout}${main.path}`}>
                    <Link to={`${main.layout}${main.path}`}>
                      <Icon type={main.icon} />
                      <span className="nav-text">{main.name}</span>
                    </Link>
                  </Menu.Item>
                );
              } else {
                let items = main.child.map(child => {
                  return (
                    <Menu.Item key={`${child.layout}${child.path}`}>
                      <Link to={`${child.layout}${child.path}`}>
                        {child.name}
                      </Link>
                    </Menu.Item>
                  );
                });
                items.unshift(
                  <Menu.Item key={`${main.layout}${main.path}`}>
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
              <SubMenu
                style={{ float: "right" }}
                title={
                  <span className="submenu-title-wrapper">
                    <Icon
                      type="setting"
                      theme="filled"
                      style={{ fontSize: 26 }}
                    />
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
            </Menu>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <Switch>
              {routes.map((prop, key) => {
                if (prop.layout === "/instructor") {
                  return (
                    <Route
                      exact
                      path={prop.layout + prop.path}
                      component={prop.component}
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

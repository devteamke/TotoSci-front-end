import React from 'react';
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
  Dropdown
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { withGlobalContext } from '../context/Provider';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../routes/managerRoutes';
import globals from '../constants/Globals';
//scrollbar
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import moment from 'moment';
import './layouts.css';
import io from 'socket.io-client';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const confirm = Modal.confirm;
const { TabPane } = Tabs;
let mainRoutes;
let socket;
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
        .filter(each => each.type == 'nested')
        .map(each => {
          if (each.path.includes(main.path)) {
            child.push(each);
          }
        });
      main.child = child;
      return main;
    });

    console.log('mapped Routes', mainRoutes);

    this.state = {
      collapsed: false,
      messages: [],
      approval: [],
      endpoint: `${globals.BASE_URL}`
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  ok = () => {
    console.log('OK');
    this.props.history.push({
      pathname: '/login',
      snack: { type: 'success', msg: 'Logout successful' }
    });
    this.props.global.onLogout();
  };
  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to logout?',

      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: this.ok,
      onCancel() {
        console.log('Cancel');
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
  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };
  _fetchNotifications = () => {
    this.setState({ sending: true });
    const FetchAsync = async () =>
      await (await fetch(`${globals.BASE_URL}/api/users/fetch_notifications`, {
        method: 'post',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.global.token
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
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
        if (error == 'TypeError: Failed to fetch') {
          //   alert('Server is offline')
        } else if (error.message == 'Network request failed') {
          // alert('No internet connection')
          this.setState({
            serverRes: 'Network request failed'
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
    socket = io(this.state.endpoint, {
      query: {
        token: this.props.global.token
      }
    });
    socket.on('updateNotifications', data => {
      console.log('data from update', data);
      this.setState({ messages: data });
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
    const broken = this.state.broken;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          theme='dark'
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={broken => {
            this.setState({ broken });
          }}
          collapsed={this.state.collapsed}
          style={{
            boxShadow: this.state.collapsed
              ? ''
              : '5px 0 5px -5px rgba(0,0,0,0.5)'
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            this.setState({ collapsed });
          }}
          trigger={null}
        >
          <div
            className='logo'
            style={{
              height: '6.3rem',
              padding: '1.3rem',
              backgroundColor: '#fff'
            }}
          >
            <img
              src={require('../assets/img/totosci.png')}
              style={{ height: '36px' }}
            />

            <p
              style={{
                fontSize: '1.2rem',
                fontWeight: 500,
                textAlign: 'center',
                marginTop: '0.4rem'
              }}
            >
              Management
            </p>
          </div>
          <Menu
            theme='dark'
            mode='inline'
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
                      <Icon type={main.icon} />
                      <span className='nav-text'>{main.name}</span>
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
                      <span className='nav-text'>{main.sub}</span>
                      {main.sub == 'All Feedback' ? (
                        <Badge
                          style={{ marginLeft: '22px' }}
                          count={state.messages.length}
                          overflowCount={9}
                        />
                      ) : null}
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
                        {main.name == 'Feedback' ? (
                          <Badge
                            style={{ marginLeft: '22px', marginTop: '7px' }}
                            dot={state.messages.length > 0 ? true : false}
                          />
                        ) : null}
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
              height: '4.3rem',
              backgroundColor: '#fff',
              padding: '1rem',
              boxShadow: '0 5px 5px -5px #afabab'
            }}
          >
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode='horizontal'
              style={{ borderBottom: '0' }}
            >
              {this.state.broken ? (
                <Menu.Item key='sider i' onClick={this.toggle}>
                  <Icon
                    className='trigger'
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    style={{ fontSize: 24 }}
                  />
                </Menu.Item>
              ) : null}

              <SubMenu
                style={{ float: 'right' }}
                title={
                  <span className='submenu-title-wrapper'>
                    <Avatar
                      size={15}
                      style={{
                        backgroundColor: '#00a2ae',
                        verticalAlign: 'middle'
                      }}
                      size='large'
                    >
                      {this.props.global.user.fname.charAt(0).toUpperCase()}
                    </Avatar>
                  </span>
                }
              >
                <Menu.Item
                  key='setting:1'
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/${role}/profile`
                    });
                  }}
                >
                  {' '}
                  Profile{' '}
                  <Icon
                    style={{ float: 'right', marginTop: '12px' }}
                    type='user'
                  />
                </Menu.Item>
                <Menu.Item key='setting:2' onClick={this.showDeleteConfirm}>
                  {' '}
                  Sign Out{' '}
                  <Icon
                    style={{ float: 'right', marginTop: '12px' }}
                    type='logout'
                  />
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                style={{ float: 'right', marginRight: broken ? '40px' : '0px' }}
              >
                <Dropdown
                  placement={broken ? 'bottomCenter' : 'bottomLeft'}
                  visible={state.visible}
                  onVisibleChange={this.handleVisibleChange}
                  onClick={() => {
                    this.setState({ visible: !state.visible });
                  }}
                  overlay={
                    <Menu>
                      <Tabs
                        defaultActiveKey='1'
                        onChange={this.callback}
                        style={{ width: '20rem' }}
                      >
                        <TabPane tab='Messages' key='1'>
                          {state.messages.length > 0 ? (
                            <span>
                              {' '}
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
                                  <span key={item._id}>
                                    <span
                                      className='notifs'
                                      style={{
                                        width: '100%',
                                        padding: '1rem',
                                        display: 'block'
                                      }}
                                      onClick={() => {
                                        this.setState({
                                          visible: !state.visible
                                        });
                                        this.props.history.push({
                                          pathname: `/${
                                            this.props.global.user.role
                                            }/feedback/`
                                        });
                                        setTimeout(() => {
                                          this.props.history.push({
                                            pathname: `/${
                                              this.props.global.user.role
                                              }/feedback/single`,
                                            data: item
                                          });
                                        }, 10);
                                      }}
                                    >
                                      <span style={{}}>
                                        <span
                                          style={{
                                            marginRight: '15px',
                                            fontWeight: 500,
                                            width: '100px',
                                            color: 'black'
                                          }}
                                        >
                                          {capitalize(sender.fname) +
                                            ' ' +
                                            capitalize(sender.lname)}
                                        </span>
                                        <span
                                          style={{
                                            fontWeight: 500,
                                            color: 'black'
                                          }}
                                        >
                                          {capitalize(item.subject)}
                                        </span>{' '}
                                        -{' '}
                                        {item.lastMessage.content
                                          .replace(/<[^>]*>?/gm, '')
                                          .replace(/&nbsp;/gi, '')
                                          .slice(0, 10) + '...'}{' '}
                                      </span>
                                      <span style={{ float: 'right' }}>
                                        {' '}
                                        {moment(item.createdAt).fromNow()}
                                      </span>
                                    </span>
                                  </span>
                                );
                              })}
                            </span>
                          ) : (
                              <div
                                className='text-center'
                                style={{ margin: '50px' }}
                              >
                                <img
                                  src='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
                                  alt='not found'
                                />
                                <p>You have no new messages</p>
                              </div>
                            )}
                        </TabPane>
                        <TabPane tab='Broadcasts' key='2'>
                          <div className='text-center'>
                            <img
                              src='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
                              alt='not found'
                            />
                            <p>You have no new broadcasts</p>
                          </div>
                        </TabPane>
                      </Tabs>
                      <Menu.Divider />
                      {/* <Divider style={{ margin: 0 }} />
                  </Menu.Item> */}
                      <Menu.Item
                        key='i2'
                        onClick={() => {
                          this.setState({
                            visible: !state.visible
                          });
                          this.props.history.push({
                            pathname: `/${role}/feedback`
                          });
                        }}
                      >
                        <p style={{ textAlign: 'center' }}>View all</p>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <span className='submenu-title-wrapper'>
                    <Badge count={state.messages.length} overflowCount={9}>
                      <Icon
                        type='bell'
                        style={{
                          fontSize: 24
                        }}
                      />
                    </Badge>
                  </span>
                </Dropdown>
              </Menu.Item>

              {/* <SubMenu
              
                  title={
                    <span className='submenu-title-wrapper'>
                      <Badge count={state.messages.length} overflowCount={9}>
                        <Icon type='bell' style={{ fontSize: 24 }} />
                      </Badge>
                    </span>
                  }
                >
                  <Tabs
                    defaultActiveKey='1'
                    onChange={this.callback}
                    style={{ width: '20rem' }}
                  >
                    <TabPane tab='Messages' key='1'>
                      {state.messages.length > 0 ? (
                        <span>
                          {' '}
                          {state.messages.map(item => {
                            let sender;
                            if (
                              item.lastMessage.sender == item.participants[0]._id
                            ) {
                              sender = item.participants[0];
                            } else {
                              sender = item.participants[1];
                            }
                            return (
                              <span key={item._id}>
                                <span
                                  className='notifs'
                                  style={{
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'block'
                                  }}
                                  onClick={e => {
                                    e.stopPropagation();
                                    this.props.history.push({
                                      pathname: `/${
                                        this.props.global.user.role
                                      }/feedback/`
                                    });
                                    setTimeout(() => {
                                      this.props.history.push({
                                        pathname: `/${
                                          this.props.global.user.role
                                        }/feedback/single`,
                                        data: item
                                      });
                                    }, 10);
                                  }}
                                >
                                  <span style={{}}>
                                    <span
                                      style={{
                                        marginRight: '15px',
                                        fontWeight: 500,
                                        width: '100px',
                                        color: 'black'
                                      }}
                                    >
                                      {capitalize(sender.fname) +
                                        ' ' +
                                        capitalize(sender.lname)}
                                    </span>
                                    <span
                                      style={{
                                        fontWeight: 500,
                                        color: 'black'
                                      }}
                                    >
                                      {capitalize(item.subject)}
                                    </span>{' '}
                                    -{' '}
                                    {item.lastMessage.content
                                      .replace(/<[^>]*>?/gm, '')
                                      .replace(/&nbsp;/gi, '')
                                      .slice(0, 20) + '...'}{' '}
                                    {moment(item.createdAt).fromNow()}
                                  </span>
                                </span>
                                <Divider style={{ margin: 0 }} />
                              </span>
                            );
                          })}
                        </span>
                      ) : (
                        <div className='text-center' style={{ margin: '50px' }}>
                          <img
                            src='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
                            alt='not found'
                          />
                          <p>You have no new messages</p>
                        </div>
                      )}
                    </TabPane>
                    <TabPane tab='Approval Requests' key='2'>
                      <div className='text-center'>
                        <img
                          src='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
                          alt='not found'
                        />
                        <p>You have no new requests</p>
                      </div>
                    </TabPane>
                  </Tabs>
                  <Menu.Item key='tabs'>
                    <Divider style={{ margin: 0 }} />
                  </Menu.Item>
                  <Menu.Item
                    key='i2'
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/${role}/feedback`
                      });
                    }}
                  >
                    <p style={{ textAlign: 'center' }}>View all</p>
                  </Menu.Item>
                </SubMenu> */}
            </Menu>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Switch>
              {routes.map((prop, key) => {
                if (prop.layout === '/manager') {
                  return (
                    <Route
                      exact
                      path={prop.layout + prop.path}
                      render={props => (
                        <prop.component
                          {...props}
                          broken={this.state.broken}
                          socket={socket}
                        />
                      )}
                      key={key}
                    />
                  );
                }
              })}
              <Route
                exact
                path='/**/'
                render={(props) => {
                  let prop = routes[0];
                  return (
                    <prop.component
                      {...props}
                      broken={this.state.broken}
                      socket={socket}
                    />
                  )
                }}

                key={111}
              />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2019 TotoSci Devs</Footer>
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

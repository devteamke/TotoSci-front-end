/* eslint-disable */
import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, Col, Row, Tabs, Icon, Spin, List, Badge } from 'antd';
import globals from '../../../constants/Globals';
import { withGlobalContext } from '../../../context/Provider';
import moment from 'moment';
import './Feedback.css';

const { TabPane } = Tabs;
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
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
      broadcasts: []
    };
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
  _fetchMessages = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_messages`,
        {
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
        }
      )).json();

    FetchAsync()
      .then(data => {
        this._snack({
          type: data.success ? 'success' : 'warning',
          msg: data.message
        });
        console.log('conversations', data.conversations);
        if (data.success) {
          this.setState({
            loading: false,
            conversations: data.conversations,
            individual: data.individual,
            broadcasts: data.broadcasts
          });
        } else {
          this.setState({
            sending: false
          });
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
        this._snack({ type: 'warning', msg: error.toString() });
        this.setState({ sending: false });
        console.log(error);
      });
  };
  componentDidMount = () => {
    this._fetchMessages();
  };
  render() {
    const { classes } = this.props;
    const { state } = this;
    if (state.loading) {
      return (
        <div style={{ ...center, left: this.props.broken ? '50%' : '58.3%' }}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={false}>
            <Tabs defaultActiveKey='1' onChange={this.callback}>
              <TabPane tab='Messages' key='1'>
                {state.individual.length > 0 ? (
                  <List
                    itemLayout='horizontal'
                    dataSource={state.individual}
                    renderItem={item => (
                      <List.Item
                        className='threads'
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
                                display: 'flex'
                              }}
                            >
                              <span
                                style={{
                                  marginRight: '15px',
                                  fontWeight: item.lastMessage.read ? 100 : 500,
                                  width: '175px',
                                  color: 'black'
                                }}
                              >
                                {capitalize(item.recipient)}
                              </span>
                              <Badge style={{marginRight:'20px'}}count={item.unread} />
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
                                .slice(0, 50) + '...'}
                            </span>
                          }
                        />
                        <div>{moment(item.createdAt).fromNow()}</div>
                      </List.Item>
                    )}
                  />
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
                <div className='text-center' style={{ margin: '50px' }}>
                  <img
                    src='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
                    alt='not found'
                  />
                  <p>You have no new requests</p>
                </div>
              </TabPane>
              <TabPane tab='Broadcasts' key='3'>
                {state.broadcasts.length > 0 ? (
                  <List
                    itemLayout='horizontal'
                    dataSource={state.broadcasts}
                    renderItem={item => (
                      <List.Item
                        className='threads'
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
                                display: 'flex'
                              }}
                            >
                              <span
                                style={{
                                  marginRight: '15px',
                                  fontWeight: 500,
                                  width: '200px',
                                  color: 'black'
                                }}
                              >
                                {capitalize(item.recipient)}
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
                                .slice(0, 50) + '...'}
                            </span>
                          }
                        />
                        <div>{moment(item.createdAt).fromNow()}</div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <div className='text-center' style={{ margin: '50px' }}>
                    <img
                      src='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
                      alt='not found'
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
  position: 'absolute',
  left: '58.3%',
  top: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
};
const capitalize = str => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

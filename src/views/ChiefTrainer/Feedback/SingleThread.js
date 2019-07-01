import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Snackbar from '../../../components/dcomponents/Snackbar/Snackbar.jsx';

import { MDBBtn, MDBInput } from 'mdbreact';
import avatar from '../../../assets/img/faces/marc.jpg';

import globals from '../../../constants/Globals';
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert';
import { withGlobalContext } from '../../../context/Provider';

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
  List,
  Avatar
} from 'antd';
import moment from 'moment';
//Markdown editor
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//scroll to

import './Thread.css';
const ReactMarkdown = require('react-markdown');
const format = 'HH:mm';
const { Step } = Steps;
const { Column, ColumnGroup } = Table;
const { Option } = Select;
const { TextArea } = Input;
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
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
      loading: true,
      //other
      adding: false,
      open: false,
      place: 'bc',
      resType: 'warning'
    };

    this.item2 = React.createRef();
    this.item = React.createRef();
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
    console.log('messagesEnd', this.item);
    console.log('list', this.item2);
    // const scrollHeight = this.item2.current.scrollHeight;
    // const height = this.item2.current.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // this.item2.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    // console.log(this.item2.current.scrollHeight);
    // console.log(this.item2.current.scrollTop);
    this.item.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    //  this.item2.current.scrollTop = this.item2.current.scrollHeight + 100;
  };

  handleSendMessage = () => {
    const { state } = this;
    let data = {
      conversation: state.conversation,
      message: state.data
    };

    this.setState({ sending: true });
    const FetchAsync = async () =>
      await (await fetch(`${globals.BASE_URL}/api/users/send_message_reply`, {
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
        body: JSON.stringify(data)
      })).json();

    FetchAsync()
      .then(data => {
        this._snack({
          type: data.success ? 'success' : 'warning',
          msg: data.message
        });
        //this.setState({currentPlace:data.results})
        if (data.success) {
          this.setState(prevState => {
            //   let messages = [...state.messages];
            //   messages.push(data.newMessage);

            return {
              data: '',
              dataError: null
            };
          });
          // this.scrollToBottom();
        } else {
          this.setState({
            sending: false,

            serverRes: data.message
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
  _fetchMessages = () => {
    const { state } = this;
    let data = {
      conversation: this.props.location.data._id
    };

    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/users/fetch_conversation_messages`,
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
          body: JSON.stringify(data)
        }
      )).json();

    FetchAsync()
      .then(data => {
        // this._snack({
        //   type: data.success ? 'success' : 'warning',
        //   msg: data.message
        // });
        //this.setState({currentPlace:data.results})
        if (data.success) {
          console.log('messages', data.messages);
          this.setState({ messages: data.messages, loading: false }, () =>
            setTimeout(() => this.scrollToBottom(), 300)
          );
          // this.setState(prevState => {
          //   let messages = [...state.conversation.messages];
          //   messages.push(data.newMessage);
          //   return {
          //     sending: false,
          //     conversation: { ...state.conversation, messages },
          //     data: '',
          //     dataError: null
          //   };
          // });
        } else {
          // this.setState({
          //   sending: false,
          //   serverRes: data.message
          // });
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
    if (this.props.location.data) {
      console.log('Props recieved', this.props);
      this._fetchMessages();
      //   setTimeout(() => this.scrollToBottom(), 300);
      //Socket on new message
      this.props.socket.on('newMessage', data => {
        if (
          window.location.pathname ==
            `/${this.props.global.user.role}/feedback/single` &&
          data.conversation == this.state.conversation._id
        ) {
          console.log('newMessage', data);
          this.setState(prevState => {
            let messages = [...this.state.messages];
            messages.push(data);

            return {
              sending: false,
              messages
            };
          });
          setTimeout(() => this.scrollToBottom(), 300);
        }
      });
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
        <div style={{ ...center, left: this.props.broken ? '50%' : '58.3%' }}>
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
                      float: 'left',
                      marginTop: '1px',
                      fontSize: '28px'
                    }}
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/${this.props.global.user.role}/feedback`
                      });
                    }}
                    type='left-square'
                  />

                  <span style={{ display: 'inline', marginLeft: '12px' }}>
                    {capitalize(state.conversation.subject)}{' '}
                  </span>
                </span>
              }
              bordered={false}
            >
              <div
                style={{ height: '26rem', overflow: 'auto' }}
                ref={this.item2}
              >
                <List
                  itemLayout='horizontal'
                  dataSource={state.messages}
                  renderItem={(item, i) => {
                    let sender;

                    if (state.conversation.participantsFull) {
                      if (
                        item.sender ==
                        state.conversation.participantsFull[0]._id
                      ) {
                        sender = state.conversation.participantsFull[0];
                      } else {
                        sender = state.conversation.participantsFull[1];
                      }
                    } else {
                      if (
                        item.sender == state.conversation.participants[0]._id
                      ) {
                        sender = state.conversation.participants[0];
                      } else {
                        sender = state.conversation.participants[1];
                      }
                    }

                    return (
                      <>
                        <List.Item className='threads'>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={`https://ui-avatars.com/api/?name=${
                                  sender.fname
                                }+${
                                  sender.lname
                                }K&background=01afc4&color=fff&size=256`}
                              />
                            }
                            description={
                              <span>
                                <span
                                  style={{
                                    marginRight: '15px',
                                    fontWeight: 500,
                                    width: '175px',
                                    color: 'black'
                                  }}
                                >
                                  {capitalize(sender.fname) +
                                    ' ' +
                                    capitalize(sender.fname)}
                                  <span
                                    style={{
                                      fontWeight: 200,

                                      color: 'black'
                                    }}
                                  >
                                    {' '}
                                    - {capitalize(sender.role)}
                                  </span>
                                </span>
                                <span
                                  style={{
                                    color: 'black'
                                  }}
                                >
                                  <ReactMarkdown
                                    source={item.content}
                                    escapeHtml={false}
                                  />
                                </span>
                              </span>
                            }
                          />
                          <div style={{ fontSize: '0.8rem' }}>
                            {moment(item.createdAt).format(
                              'MMMM Do YYYY, hh:mm a'
                            )}{' '}
                            ({moment(item.createdAt).fromNow()})
                          </div>
                        </List.Item>
                      </>
                    );
                  }}
                />
                <div style={{ width: '100%' }}>
                  <CKEditor
                    style={{ width: '100%' }}
                    editor={ClassicEditor}
                    data={state.data}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.

                      console.log('Editor is ready to use!', editor);
                    }}
                    config={{
                      toolbar: [
                        'bold',
                        'italic',
                        'bulletedList',
                        'numberedList',
                        'blockQuote',
                        'Heading',
                        'Link'
                      ]
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      if (data == '' && !state.open) {
                        this.setState({
                          dataError: 'Message is required!'
                        });
                      } else {
                        this.setState({ dataError: null });
                      }
                      this.setState({ data });
                      console.log({ event, editor, data });
                    }}
                    onBlur={editor => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={editor => {
                      console.log('Focus.', editor);
                    }}
                  />
                  <p style={{ color: 'red' }}>{state.dataError}</p>
                  <br />
                  <div
                    ref={el => {
                      this.item = el;
                    }}
                    className='text-center'
                  >
                    {state.sending ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <Button type='primary' onClick={this.handleSendMessage}>
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </div>
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
    string = string.replace(/-/g, ' ').toLowerCase();

    let splitStr = string.toLowerCase().split(' ');
    string = splitStr.map(str => {
      return str.charAt(0).toUpperCase() + str.slice(1) + ' ';
    });
  }

  return string;
};

const center = {
  position: 'absolute',
  left: '58.3%',
  top: '50%',
  '-webkit-transform': 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
};
export default Form.create({ name: 'register' })(
  withGlobalContext(withStyles(styles)(Add))
);

const columns = [
  {
    title: 'First Name',
    dataIndex: 'fname'
  },
  {
    title: 'Last Name',
    dataIndex: 'lname'
  }
];
const columnsAtt = [
  {
    title: 'First Name',
    dataIndex: 'fname'
  },
  {
    title: 'Last Name',
    dataIndex: 'lname'
  }
];
const columnsModal = [
  {
    title: 'First Name',
    dataIndex: 'fname'
  },
  {
    title: 'Last Name',
    dataIndex: 'lname'
  }
];
const columnsI = [
  {
    title: 'First Name',
    dataIndex: 'fname'
  },
  {
    title: 'Last Name',
    dataIndex: 'lname'
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

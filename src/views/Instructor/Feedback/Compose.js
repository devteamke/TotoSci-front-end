import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Snackbar from '../../../components/dcomponents/Snackbar/Snackbar.jsx';
import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';
import CustomInput from '../../../components/dcomponents/CustomInput/CustomInput.jsx';

import globals from '../../../constants/Globals';
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert';
import { withGlobalContext } from '../../../context/Provider';
//Markdown editor
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
///antd
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
  Spin,
  DatePicker
} from 'antd';
import moment from 'moment';

const AutoCompleteOption = AutoComplete.Option;
const { Option } = Select;
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

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      //other
      addingUser: false,
      open: false,
      place: 'bc',
      resType: 'warning',
      autoCompleteResult: [],
      recipients: [],
      //markdown
      data: ''
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

  handleSubmit = e => {
    e.preventDefault();
    const state = this.state;
    if (state.data == '') {
      this.setState({ dataError: 'Message is required!' });
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && state.data !== '') {
        console.log('Received values of form: ', values);

        let data = {
          type: values.type,
          to: values.to,
          subject: values.subject.trim().toLowerCase(),
          message: state.data
        };

        this.setState({ sending: true });
        const FetchAsync = async () =>
          await (await fetch(`${globals.BASE_URL}/api/users/send_message`, {
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
              this.props.form.resetFields();
              this.setState({
                sending: false,
                serverRes: data.message,
                data: '',
                dataError: null,
                selectedRecipient: false,
                selected: null
              });
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
      }
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.props.form.setFields({
      to: {
        value: ''
      }
    });
    this.setState({
      value: e.target.value,
      type: e.target.value
    });
  };
  handleToChange = value => {
    if (value.length == '5d0231026accc00c57f14281'.length) {
      return;
    }
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      this.setState({
        searching: true,
        searchStr: value,
        selectedRecipient: false,
        selected: null
      });
      this.props.form.setFields({
        to: {
          value: value,
          errors: [new Error('Please select recipient')]
        }
      });
      const SearchAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${
            this.props.global.user.role
          }/search_recipient`,
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
            body: JSON.stringify({ query: value })
          }
        )).json();

      SearchAsync()
        .then(data => {
          //this.setState({currentPlace:data.results})
          if (data.success) {
            autoCompleteResult = data.parents;
            this.setState({
              autoCompleteResult,
              searching: false,
              plength: data.parents.length
            });
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
          this._snack({ type: 'warning', msg: error.toString() });
          this.setState({ searching: false });
          console.log(error);
        });
    }
  };
  _fetchRecipients = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${
          this.props.global.user.role
        }/fetch_recipients`,
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
        //this.setState({currentPlace:data.results})
        if (data.success) {
          this.setState({ recipients: data.result });
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
        this._snack({ type: 'warning', msg: error.toString() });
        // this.setState({ searching: false });
        console.log(error);
      });
  };
  componentDidMount = () => {
    this._fetchRecipients();
  };

  render() {
    const { classes } = this.props;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;

    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '254'
    })(
      <Select style={{ width: 90 }}>
        <Option value='254'>+254</Option>
      </Select>
    );

    const recipientOptions = autoCompleteResult.map(each => (
      <AutoCompleteOption
        key={each._id}
        onClick={() => {
          this.setState({ selectedRecipient: true, selected: each });
        }}
      >
        {capitalize(each.fname) + ' ' + capitalize(each.lname)} (
        {capitalize(each.role)})
      </AutoCompleteOption>
    ));
    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
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
            <Card title='Compose' bordered={false}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label='Type'>
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: 'Please select type!'
                      }
                    ]
                  })(
                    <Radio.Group
                      style={{ float: 'left' }}
                      onChange={this.onChange}
                      value={state.type}
                    >
                      <Radio value={'individual'}>Individual</Radio>
                      {/* <Radio value={"broadcast"}>Broadcast</Radio> */}
                    </Radio.Group>
                  )}
                </Form.Item>{' '}
                {state.type == 'broadcast' ? (
                  <Form.Item label='To'>
                    {getFieldDecorator('to', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: 'Please select recepient!'
                        }
                      ]
                    })(
                      <Select
                        style={{ width: 120 }}
                        onChange={this.handleChangeTo}
                      >
                        <Option value='trainer'>Trainers</Option>
                        <Option value='instructor'>Instructors</Option>
                        <Option value='parent'>Parents</Option>
                        <Option value='disabled' disabled>
                          All
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                ) : (
                  <Form.Item label='To'>
                    {getFieldDecorator('to', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: 'Please select recepient!'
                        }
                      ]
                    })(
                      <Select
                        style={{ width: 250 }}
                        onChange={this.handleChangeTo}
                      >
                        {state.recipients.map(each => {
                          return (
                            <Option value={each._id}>
                              {capitalize(each.fname)} {capitalize(each.lname)}{' '}
                              - {capitalize(each.role)}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                )}
                <Form.Item label='Subject'>
                  {getFieldDecorator('subject', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input subject!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Message'>
                  <CKEditor
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
                        this.setState({ dataError: 'Message is required!' });
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
                </Form.Item>
                <div className='text-center'>
                  {state.sending ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <Button type='primary' htmlType='submit'>
                      Send
                    </Button>
                  )}
                </div>
              </Form>
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

export default withGlobalContext(
  Form.create({ name: 'register' })(withStyles(styles)(AddUser))
);

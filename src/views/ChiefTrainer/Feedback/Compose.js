import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Snackbar from '../../../components/dcomponents/Snackbar/Snackbar.jsx';
import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';
import CustomInput from '../../../components/dcomponents/CustomInput/CustomInput.jsx';
import { TweenOneGroup } from 'rc-tween-one';
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
  Tag,
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
  DatePicker,
  Upload,
  message
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
      //markdown
      data: '',
      fileList: [],
      //tags
      tRecipients: [],
      inputVisible: false,
      inputValue: ''
    };
  }
  // props = {
  //   name: 'file',
  //   accept:
  //     '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //   action: this.upload

  //   // onChange(info) {
  //   //   if (info.file.status !== 'uploading') {
  //   //     console.log(info.file, info.fileList);
  //   //   }
  //   //   if (info.file.status === 'done') {
  //   //     message.success(`${info.file.name} file uploaded successfully`);
  //   //   } else if (info.file.status === 'error') {
  //   //     message.error(`${info.file.name} file upload failed.`);
  //   //   }
  //   // }
  // };
  //tags
  handleClose = removedTag => {
    const tags = this.state.tRecipients.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tRecipients: tags });
  };
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleRecipientConfirm = newR => {
    // console.log('[newR]', newR);
    // const { inputValue } = this.state;
    let { tRecipients } = this.state;
    //console.log('[has newR]', );
    if (newR && !tRecipients.some(el => el._id === newR._id)) {
      tRecipients.push(newR);
      // tRecipients = [...tRecipients, newR];
    }
    console.log(tRecipients);
    this.setState({
      tRecipients,
      inputVisible: false,
      inputValue: ''
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {capitalize(tag.fname) + ' ' + capitalize(tag.lname)} (
        {capitalize(tag.role)})
      </Tag>
    );
    return (
      <span key={tag._id} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
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
    if (state.tRecipients.length == 0) {
      this.setState({ recipientError: 'Please select recipient!' });
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && state.data !== '' && state.tRecipients.length > 0) {
        console.log('Received values of form: ', values);
        console.log('file list values of form: ', state.fileList);

        let data = {
          type: values.type,
          to: state.tRecipients,
          subject: values.subject.trim().toLowerCase(),
          message: state.data,
          attachments: state.fileList
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
                tRecipients: [],
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
  componentDidMount = () => {};

  render() {
    const { classes } = this.props;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const { tRecipients, inputVisible, inputValue } = this.state;
    const tagChild = tRecipients.map(this.forMap);
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
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
          this.setState({ recipientError: null });
          this.handleRecipientConfirm(each);
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
                      <Radio value={'broadcast'}>Broadcast</Radio>
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
                    <div style={{ marginBottom: 0 }}>
                      <TweenOneGroup
                        enter={{
                          scale: 0.8,
                          opacity: 0,
                          type: 'from',
                          duration: 100,
                          onComplete: e => {
                            e.target.style = '';
                          }
                        }}
                        leave={{
                          opacity: 0,
                          width: 0,
                          scale: 0,
                          duration: 200
                        }}
                        appear={false}
                      >
                        {tagChild}
                      </TweenOneGroup>
                    </div>
                    {inputVisible && (
                      <>
                        {getFieldDecorator('to', {
                          rules: [
                            {
                              required: true,
                              message: 'Please select recipient!'
                            }
                          ]
                        })(
                          <AutoComplete
                            dataSource={recipientOptions}
                            onChange={this.handleToChange}
                            placeholder='Search recipient by name...'
                          >
                            <Input ref={this.saveInputRef} />
                          </AutoComplete>
                        )}

                        {state.searchStr &&
                        state.autoCompleteResult.length == 0 &&
                        !state.searching ? (
                          <p style={{ margin: '10px' }}>
                            No user found matching "{state.searchStr}"
                          </p>
                        ) : null}
                        {state.searching ? (
                          <div className='text-center'>
                            <Spin indicator={antIcon} />
                          </div>
                        ) : null}
                      </>
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type='plus' /> New Recipient
                      </Tag>
                    )}
                    <p style={{ color: 'red' }}>{state.recipientError}</p>
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
                <Form.Item label='Attachment(optional)'>
                  <Upload
                    name='file'
                    accept='*'
                    //fileList={state.fileList}
                    action={`${globals.BASE_URL}/api/users/upload`}
                    headers={{
                      Authorization: this.props.global.token
                    }}
                    onChange={({ file, fileList }) => {
                      if (file.status !== 'uploading') {
                        console.log('[file]', file, fileList);
                        this.setState({ fileList: [...fileList] });
                      }
                    }}
                  >
                    <Button>
                      <Icon type='upload' /> Click to Upload
                    </Button>
                  </Upload>
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

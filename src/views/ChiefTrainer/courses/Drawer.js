import React from 'react';
import {
  Drawer,
  Divider,
  Col,
  Row,
  Icon,
  Form,
  Input,
  Select,
  Button,
  Spin,
  notification,
  Radio,
  Menu,
  Dropdown,
  InputNumber,
  Modal
} from 'antd';

import { withGlobalContext } from '../../../context/Provider';
import globals from '../../../constants/Globals';
const { Option } = Select;
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
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
  showDeleteConfirm = () => {
    let info = this.props.infoCopy;

    console.log(info);
    const act = this;
    const state = this.state;
    confirm({
      title: 'Are you sure you want to delete?',

      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('Info  On delete', info.i);
        let data = { _id: info._id };

        act.setState({ updating: true });
        const deleteAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${
              act.props.global.user.role
            }/delete_course`,
            {
              method: 'DELETE',
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                Authorization: act.props.global.token,
                'Access-Control-Allow-Origin': `${globals.BASE_URL}`
                // "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
              body: JSON.stringify(data)
            }
          )).json();

        deleteAsync()
          .then(data => {
            //this.setState({currentPlace:data.results})
            let type = data.success ? 'success' : 'error';
            notification[type]({
              message: data.message
            });
            act.setState({
              open: true,
              updating: false
            });

            if (data.success) {
              console.log('[Course removed]', data);

              act.props.onRemoveIndex(info.i, data);
            } else {
            }
          })
          .catch(error => {
            console.log('Got error', error);
            act.setState({ updating: false });
            notification['error']({
              message: error.toString()
            });
          });
      },

      onCancel() {
        console.log('Cancel');
      }
    });
  };
  handleSave = () => {
    const state = this.state;
    // console.log(values);
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('This is err', err);
        return;
      }
      let originalData = {
        fname: this.state.infoCopy.name,
        lname: this.state.infoCopy.charge,
        county: this.state.infoCopy.description
        // sub_county: this.state.infoCopy.sub_county
        // role: this.infoCopy.sub_county
      };
      console.log('Received values of form: ', values);
      console.log('ReceivedOriginal: ', originalData);

      if (JSON.stringify(values) == JSON.stringify(originalData)) {
        return;
      }
      let data = {
        _id: state.infoCopy._id,
        name: values.name,
        charge: values.charge,
        description: values.description
      };
      console.log('Changed data', data);
      this.setState({ updating: true });
      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${
            this.props.global.user.role
          }/update_course`,
          {
            method: 'PATCH',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.props.global.token,
              'Access-Control-Allow-Origin': `${globals.BASE_URL}`
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data)
          }
        )).json();

      SaveAsync()
        .then(data => {
          //this.setState({currentPlace:data.results})
          let type = data.success ? 'success' : 'error';
          notification[type]({
            message: data.message
          });
          this.setState({
            open: true,
            updating: false
          });

          if (data.success) {
            console.log('[newStudent]', data.student);
            this.props.onUpdateIndex({
              i: state.infoCopy.i,
              obj: data.course
            });
            this.setState({ editing: false });
          } else {
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ updating: false });
          notification['error']({
            message: error.toString()
          });
        });
    });
  };

  componentDidMount = () => {
    //this._fetchSchools();
  };

  render = () => {
    const state = this.state;
    const props = this.props;
    const info = props.info;
    console.log('SChools', state.schools);
    // const isNotChief = info.role == "chief-trainer";
    console.log('info copy', props.info);
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
    if (!props.info) {
      return <> </>;
    }
    let menu = (
      <Menu>
        <Menu.Item style={{ height: '30px' }} onClick={this._handleEdit}>
          <Icon style={{ fontSize: 15 }} type={'edit'} /> Edit
        </Menu.Item>
        <Menu.Item style={{ height: '30px' }} onClick={this.showDeleteConfirm}>
          <Icon style={{ fontSize: 15 }} type={'delete'} /> Delete
        </Menu.Item>
      </Menu>
    );
    return (
      <Drawer
        width={isMobile ? '80%' : '50%'}
        placement='right'
        visible={props.visible}
        closable={false}
        onClose={() => {
          this.setState({ editing: false }, () => {
            props.onClose();
          });
        }}
      >
        <div style={{ display: 'block', width: '100%  ' }}>
          <p
            style={{
              ...pStyle,
              marginBottom: 24,
              fontWeight: 700,
              display: 'inline-block'
            }}
          >
            Course Details
          </p>
          <Dropdown style={{ float: 'right' }} overlay={menu}>
            <span style={{ float: 'right' }}>
              Actions <Icon type='down' />
            </span>
          </Dropdown>{' '}
        </div>{' '}
        {!state.editing ? (
          <>
            <Row>
              <Col span={12}>
                <DescriptionItem title='Name' content={capitalize(info.name)} />{' '}
              </Col>
              <Col span={12}>
                <DescriptionItem title='Charge' content={info.charge} />{' '}
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
                  title='Name'
                  content={
                    capitalize(info.addedBy[0].fname) +
                    ' ' +
                    capitalize(info.addedBy[0].lname)
                  }
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title='Email'
                  content={capitalize(info.addedBy[0].email)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title='Role'
                  content={capitalize(info.addedBy[0].role)}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            {state.infoCopy ? (
              <Form layout='vertical'>
                <Form.Item label='Name'>
                  {getFieldDecorator('name', {
                    initialValue: state.infoCopy.name,
                    rules: [
                      {
                        type: 'string',
                        required: true,
                        message: 'Please input Course name!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Charge'>
                  {getFieldDecorator('charge', {
                    initialValue: state.infoCopy.charge,
                    rules: [
                      {
                        type: 'number'
                      },
                      {
                        required: true,
                        message: 'Please input session charge!'
                      }
                    ]
                  })(<InputNumber />)}
                </Form.Item>
                <Form.Item label='Description'>
                  {getFieldDecorator('description', {
                    initialValue: state.infoCopy.description,
                    rules: [
                      {
                        type: 'string',
                        required: true,
                        message: 'Please input course description!'
                      }
                    ]
                  })(
                    <TextArea
                      placeholder='Describe the course here...'
                      autosize={{ minRows: 3, maxRows: 6 }}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <div className='text-center'>
                    {state.updating ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <>
                        <Button
                          form='myForm'
                          key='submit'
                          htmlType='submit'
                          onClick={() => {
                            this.setState({ editing: false });
                          }}
                        >
                          Cancel
                        </Button>{' '}
                        <Button
                          type='primary'
                          htmlType='submit'
                          onClick={this.handleSave}
                        >
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </Form.Item>
              </Form>
            ) : null}
          </>
        )}
      </Drawer>
    );
  };
}

export default withGlobalContext(
  Form.create({ name: 'form_in_modal' })(CustomDrawer)
);
const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16
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
      lineHeight: '22px',
      marginBottom: 7,

      color: 'rgba(0,0,0,0.65)'
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)'
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

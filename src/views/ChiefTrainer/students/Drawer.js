import React from 'react';
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
  Menu,
  Dropdown,
  Modal,
  notification
} from 'antd';

import { withGlobalContext } from '../../../context/Provider';
import globals from '../../../constants/Globals';
import moment from 'moment';
const { Option } = Select;
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
const confirm = Modal.confirm;
let count = 0;
let copy;
class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    // console.log("constructor called", props.info);

    this.state = {
      editing: false,
      loading: true,
      infoCopy: null,
      schools: []
    };
  }
  _handleEdit = () => {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else {
      let infoCopy;
      if (this.props.infoCopy.school[0]) {
        infoCopy = {
          ...this.props.infoCopy,
          school: this.props.infoCopy.school[0].name
        };
      } else {
        infoCopy = {
          ...this.props.infoCopy
        };
      }

      this.setState({ infoCopy, editing: true });
      copy = infoCopy;
    }
  };

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
            }/remove_student`,
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
            if (data.success) {
              console.log('[Course removed]', data);

              act.props.onRemoveIndex(info.i, data);
            } else {
            }
          })
          .catch(error => {
            console.log('Got error', error);
            act.setState({  updating: false });
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

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // let originalData = {
      //   fname: this.state.infoCopy.fname,
      //   lname: this.state.infoCopy.lname,
      //   school: this.props.info.school[0]._id
      // };
      // console.log("Received values of form: ", values);

      // if (JSON.stringify(values) == JSON.stringify(originalData)) {
      //   return;
      // }
      let sch;

      sch = values.school;

      let data = {
        _id: state.infoCopy._id,
        fname: values.fname,
        lname: values.lname,
        school: sch
      };
      console.log('This is the data', data);
      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${
            this.props.global.user.role
          }/student_save_info`,
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

          if (data.success) {
            console.log('[newStudent]', data.student);
            this.props.onUpdateIndex({
              i: state.infoCopy.i,
              obj: data.student
            });
            this.setState({ editing: false, updating: false });
          } else {
          }
        })
        .catch(error => {
          notification['error']({
            message: error.toString()
          });
        });
    });
  };
  _fetchSchools = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_schools`,
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
          body: JSON.stringify({ data: 'hello server' })
        }
      )).json();

    FetchAsync()
      .then(data => {
        //this.setState({currentPlace:data.results})
        if (data.success) {
          let schools = data.schools.map(each => {
            return { value: each._id, label: unKebab(each.name) };
          });
          console.log('Not set', schools);
          this.setState({
            schools: schools,
            loading: false
          });
        } else {
        }
      })
      .catch(error => {
        console.log(error);

        notification['error']({
          message: error.toString()
        });
        // this.props._snack({ type: "warning", msg: error.toString() });

        console.log(error);
      });
  };

  componentDidMount = () => {
    this._fetchSchools();
  };

  render = () => {
    const state = this.state;
    const props = this.props;
    const info = props.info;
    //   console.log("SChools", state.schools);

    console.log('info copy', props.info);
    const { form } = this.props;
    const { getFieldDecorator } = form;
    if (!props.info || state.loading) {
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
    let isMobile;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
    }
    return (
      <Drawer
        width={isMobile ? '100%' : 640}
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
          <Icon
            type='close'
            style={{
              marginRight: '20px',
              marginTop: '3px',
              float: 'left',
              fontSize: '19px'
            }}
            onClick={() => {
              this.setState({ editing: false }, () => {
                props.onClose();
              });
            }}
          />
          <p
            style={{
              ...pStyle,
              marginBottom: 24,
              fontWeight: 700,
              display: 'inline-block'
            }}
          >
            Student Info
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
                <DescriptionItem
                  title='Full Name'
                  content={
                    capitalize(info.fname) + ' ' + capitalize(info.lname)
                  }
                />{' '}
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title='Status'
                  content={capitalize(info.status)}
                />{' '}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title='Gender'
                  content={capitalize(info.gender)}
                />{' '}
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title='Date of birth'
                  content={
                    info.DOB ? moment(info.DOB).format('DD/MM/YYYY') : 'NA'
                  }
                />{' '}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title='County'
                  content={
                    info.school[0] ? capitalize(info.school[0].county) : ''
                  }
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title='Sub County'
                  content={
                    info.school[0] ? capitalize(info.school[0].sub_county) : ''
                  }
                />
              </Col>
            </Row>

            <Divider />
            <p style={{ ...pStyle, fontWeight: 700 }}>School</p>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title='Name'
                  content={info.school[0] ? unKebab(info.school[0].name) : ''}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title='County'
                  content={
                    info.school[0] ? capitalize(info.school[0].county) : ''
                  }
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title='Sub County'
                  content={
                    info.school[0] ? capitalize(info.school[0].sub_county) : ''
                  }
                />
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
            </Row>
          </>
        ) : (
          <>
            {state.infoCopy ? (
              <Form layout='vertical'>
                <Form.Item label='First Name'>
                  {getFieldDecorator('fname', {
                    initialValue: state.infoCopy.fname,
                    rules: [
                      {
                        required: true,
                        message: 'Please input first name!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>

                <Form.Item label='Last Name'>
                  {getFieldDecorator('lname', {
                    initialValue: state.infoCopy.lname,
                    rules: [
                      {
                        required: true,
                        message: 'Please input last name!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Learning Venue/ School'>
                  {getFieldDecorator('school', {
                    initialValue: state.infoCopy.school
                      ? unKebab(state.infoCopy.school)
                      : '',
                    rules: [
                      {
                        type: 'string',
                        required: true,
                        message: 'Please select school/venue!'
                      }
                    ]
                  })(
                    <Select
                      style={{ width: '100%' }}
                      onChange={this.handleChange}
                    >
                      {state.schools.map(each => {
                        return <Option key={each.value}>{each.label}</Option>;
                      })}
                    </Select>
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
  } else {
    str = 'NA';
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

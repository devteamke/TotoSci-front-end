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
  Radio,
  Menu,
  Dropdown,
  Modal
} from 'antd';
import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';
import { withGlobalContext } from '../../../context/Provider';
import globals from '../../../constants/Globals';
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
      let infoCopy = {
        ...this.props.infoCopy
        //school: this.props.infoCopy.school[0].name
      };
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
            }/remove_instructor`,
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
            act.setState({
              open: true,
              updating: false,
              serverRes: data.message,
              resType: data.success ? 'success' : 'warning'
            });
            setTimeout(
              function() {
                act.setState({ open: false, updating: false });
              }.bind(act),
              9000
            );

            if (data.success) {
              console.log('[Course removed]', data);

              act.props.onRemoveIndex(info.i, data);
            } else {
            }
          })
          .catch(error => {
            console.log('Got error', error);
            if (error == 'TypeError: Failed to fetch') {
              //   alert('Server is offline')
              this.setState({
                serverRes: 'Failed to contact server!'
              });
            } else if (error.message == 'Network request failed') {
              // alert('No internet connection')
              this.setState({
                serverRes: 'Network request failed'
              });
            }

            act.setState({
              open: true,
              savingInfo: false,
              resType: data.success ? 'success' : 'warning'
            });
            setTimeout(
              function() {
                act.setState({ open: false });
              }.bind(act),
              9000
            );
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
          this.setState({
            open: true,
            updating: false,
            serverRes: data.message,
            resType: data.success ? 'success' : 'warning'
          });
          setTimeout(
            function() {
              this.setState({ open: false, updating: false });
            }.bind(this),
            9000
          );

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
          if (error == 'TypeError: Failed to fetch') {
            //   alert('Server is offline')
            this.setState({
              serverRes: 'Failed to contact server!'
            });
          } else if (error.message == 'Network request failed') {
            // alert('No internet connection')
            this.setState({
              serverRes: 'Network request failed'
            });
          }

          this.setState({
            open: true,
            savingInfo: false,
            resType: data.success ? 'success' : 'warning'
          });
          setTimeout(
            function() {
              this.setState({ open: false });
            }.bind(this),
            9000
          );
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
    // console.log('SChools', state.schools);
    // const isNotChief = info.role == "chief-trainer";
    console.log('info copy', props.info);
    const { form } = this.props;
    const { getFieldDecorator } = form;
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
    let isMobile = false;
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
          {props.loading ? (
            <>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className='text-center' style={{ height: 300 }}>
                    <Spin indicator={antIcon} />
                  </div>
                </GridItem>
              </GridContainer>
            </>
          ) : (
            <>
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
                User Info
              </p>
              <Dropdown style={{ float: 'right' }} overlay={menu}>
                <span style={{ float: 'right' }}>
                  Actions <Icon type='down' />
                </span>
              </Dropdown>{' '}
              {!state.editing ? (
                <>
                  <Row>
                    <Col span={8}>
                      <DescriptionItem
                        title='Full Name'
                        content={
                          capitalize(info.fname) + ' ' + capitalize(info.lname)
                        }
                      />{' '}
                    </Col>
                    <Col span={8}>
                      <DescriptionItem
                        title='Status'
                        content={capitalize(info.status)}
                      />{' '}
                    </Col>
                    <Col span={8}>
                      <DescriptionItem
                        title='Role'
                        content={capitalize(info.role)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={10}>
                      <DescriptionItem title='E-mail' content={info.email} />{' '}
                    </Col>
                    <Col span={8}>
                      <DescriptionItem
                        title='Phone Number'
                        content={
                          info.phone_number ? info.phone_number.main : ''
                        }
                      />{' '}
                    </Col>
                  </Row>

                  <Divider />
                  <p style={{ ...pStyle, fontWeight: 700 }}>School Details</p>
                  {info.gotclasses.length > 0 ? (
                    <>
                      {info.gotclasses.map((_class, i) => (
                        <Row>
                          <Col span={1}>
                            <DescriptionItem title={i + 1} />{' '}
                          </Col>
                          <Col span={11}>
                            <DescriptionItem
                              title='Name'
                              content={_class.name}
                            />{' '}
                          </Col>
                          <Col span={11}>
                            <DescriptionItem
                              title='Students '
                              content={_class.students.length}
                            />{' '}
                          </Col>
                        </Row>
                      ))}
                    </>
                  ) : (
                    <>
                      <p>
                        This instructor has not yet been assigned to a class
                      </p>
                    </>
                  )}

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
                        content={info.addedBy[0].email}
                      />{' '}
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  {state.infoCopy ? (
                    <Form layout='vertical'>
                      <Form.Item label='First Name'>
                        {getFieldDecorator('fname', {
                          initialValue: unKebab(state.infoCopy.fname),
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
                          initialValue: state.infoCopy.school,
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
                              {
                              }
                              return (
                                <Option key={each.value}>{each.label}</Option>
                              );
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
            </>
          )}
        </div>{' '}
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

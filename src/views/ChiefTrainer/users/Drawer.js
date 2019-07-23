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
  notification,
  Menu,
  Dropdown,
  Modal,
  Table
} from 'antd';

import { withGlobalContext } from '../../../context/Provider';
import moment from 'moment';
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
      schools: [],
      //Instructor modal
      selectedRowKeys: [],
      modalInstrucors: []
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

      okText: 'Ok',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return new Promise((resolve, reject) => {
          console.log('Info  On delete', info.i);
          let data = { role: info.role, _id: info._id };
          if (info.role == 'chief-trainer') {
            notification['error']({
              message: 'You are not permitted to perform this operation'
            });

            return;
          }
          act.setState({ updating: true });
          const deleteAsync = async () =>
            await (await fetch(
              `${globals.BASE_URL}/api/${
                act.props.global.user.role
              }/remove_user`,
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
                resolve();
              } else {
              }
            })
            .catch(error => {
              act.setState({ updating: false });
              console.log('Got error', error);
              notification['error']({
                message: error.toString()
              });
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
        county: this.state.infoCopy.description,
        sub_county: this.state.infoCopy.sub_county
        // role: this.infoCopy.sub_county
      };
      console.log('Received values of form: ', values);
      console.log('ReceivedOriginal: ', originalData);

      if (JSON.stringify(values) == JSON.stringify(originalData)) {
        return;
      }
      let data = {
        _id: state.infoCopy._id,
        fname: values.fname,
        lname: values.lname,
        county: values.county,
        sub_county: values.sub_county
      };
      console.log('Changed data', data);
      this.setState({ updating: true });
      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${this.props.global.user.role}/update_user`,
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
              obj: data.user
            });
            this.setState({ editing: false, updating: false });
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

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
    this.setState({ selectedRowKeys, selectedRows });
  };
  //Assign Modals
  showAssignModal = () => {
    this.setState({
      assignModal: true,
      loadingInstructors: true
    });
    this._fetchInstructors();
  };
  handleAssignOk = e => {
    const state = this.state;
    console.log(e);
    this.setState({
      assigningInstructors: true
    });
    console.log('selectedStudents', state.selectedRows);
    this._addSelectedInstructors();
  };
  _addSelectedInstructors = () => {
    const state = this.state;
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${
          this.props.global.user.role
        }/assign_instructor_to_trainer`,
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
          body: JSON.stringify({
            instructors: this.state.selectedRows,
            trainer: this.props.info._id
          })
        }
      )).json();

    FetchAsync()
      .then(data => {
        let type = data.success ? 'success' : 'error';

        notification[type]({
          message: data.message
        });
        if (data.success) {
          this.props.onUpdateIndex({
            i: this.props.infoCopy.i,
            obj: data.newTrainer
          });
          this.setState({
            selectedRowKeys: [],
            assignModal: false,
            assigningInstructors: false
          });
          console.log('[new data]', data);
          // let _class = {
          //   ...this.state._class,
          //   instructors: data.newClass.instructors
          // };
          // this.setState({
          //   selectedRowsI: [],
          //   assignModal: false,
          //   assigningInstructors: false,
          //   _class,
          //   instructors: data.instructors,
          //   reloadingI: true
          // });
        } else {
          this.setState({ assigningInstructors: false });
        }
      })
      .catch(error => {
        console.log(error);

        this.setState({ assigningInstructors: false });
        notification['error']({
          message: error.toString()
        });
      });
  };
  handleAssignCancel = e => {
    console.log(e);

    console.log();
    this.setState({
      assignModal: false,
      assigningInstructors: false
    });
  };
  _fetchInstructors = (inClass = false) => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_${
          inClass ? 'class_' : ''
        }instructors`,
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
          body: JSON.stringify({ trainer: this.props.info._id })
        }
      )).json();

    FetchAsync()
      .then(data => {
        if (data.success) {
          if (!inClass) {
            this.setState({
              modalInstrucors: data.instructors,
              loadingInstructors: false
            });
          } else {
            this.setState({ instructors: data.instructors });
          }
        } else {
        }
      })
      .catch(error => {
        console.log(error);

        notification['error']({
          message: error.toString()
        });

        console.log(error);
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
    const { selectedRowKeys } = this.state;
    let isMobile = false;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    if (!props.info) {
      return <> </>;
    }
    let menu = (
      <Menu>
        <Menu.Item style={{ height: '30px' }} onClick={this._handleEdit}>
          <Icon style={{ fontSize: 15 }} type={'edit'} /> Edit
        </Menu.Item>
        {info.role == 'trainer' ? (
          <Menu.Item style={{ height: '30px' }} onClick={this.showAssignModal}>
            Assign Instructor
          </Menu.Item>
        ) : null}
        <Menu.Item style={{ height: '30px' }} onClick={this.showDeleteConfirm}>
          <Icon style={{ fontSize: 15 }} type={'delete'} /> Delete
        </Menu.Item>
      </Menu>
    );

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
        {/*Instructor assign modal*/}
        <Modal
          title='Assign Instructors'
          visible={this.state.assignModal}
          onOk={this.handleAssignOk}
          onCancel={this.handleAssignCancel}
          footer={[
            <>
              <Button
                form='myForm'
                key='submit'
                htmlType='submit'
                onClick={this.handleAssignCancel}
              >
                Cancel
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                onClick={this.handleAssignOk}
                loading={state.assigningInstructors}
                disabled={!(state.selectedRowKeys.length > 0)}
              >
                Assign instructor(s)
              </Button>
            </>
          ]}
        >
          {this.state.loadingInstructors ? (
            <div className='text-center'>
              {' '}
              <Spin indicator={antIcon} />{' '}
            </div>
          ) : (
            <Table
              size='small'
              rowSelection={rowSelection}
              columns={columns}
              dataSource={state.modalInstrucors}
            />
          )}
        </Modal>
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
            Edit User Info
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
                    capitalize(info.salutation) +
                    ' ' +
                    capitalize(info.fname) +
                    ' ' +
                    capitalize(info.lname)
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
                <DescriptionItem title='Role' content={capitalize(info.role)} />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title='Residence'
                  content={capitalize(info.residence)}
                />
              </Col>
              {info.role == 'chief-trainer' ? (
                <>
                  <Col span={12}>
                    <DescriptionItem
                      title='County'
                      content={capitalize(info.county)}
                    />
                  </Col>
                </>
              ) : (
                <></>
              )}
            </Row>
            <Divider />
            <p style={{ ...pStyle, fontWeight: 700 }}>Contacts</p>

            <Row>
              <Col span={12}>
                <DescriptionItem
                  title='E-mail'
                  content={capitalize(info.email)}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title='Phone Number'
                  content={info.phone_number ? info.phone_number.main : ''}
                />
              </Col>
            </Row>
            <Divider />
            {info.role != 'chief-trainer' ? (
              <>
                <p style={{ ...pStyle, fontWeight: 700 }}>School Details</p>
                <Row />
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title='Name'
                      content={capitalize(info.county)}
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title='Sub County'
                      content={capitalize(info.sub_county)}
                    />
                  </Col>
                </Row>

                <Divider />
              </>
            ) : (
              <></>
            )}
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
                        type: 'string',
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
                        type: 'string',
                        required: true,
                        message: 'Please input last name!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                {state.infoCopy.role != 'chief-trainer' ? (
                  <>
                    <Form.Item label='County'>
                      {getFieldDecorator('county', {
                        initialValue: state.infoCopy.county,
                        rules: [
                          {
                            type: 'string',
                            required: true,
                            message: 'Please input the county!'
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label='Sub County'>
                      {getFieldDecorator('sub_county', {
                        initialValue: state.infoCopy.sub_county,
                        rules: [
                          {
                            type: 'string',
                            required: true,
                            message: 'Please select sub county!'
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                  </>
                ) : (
                  <></>
                )}
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

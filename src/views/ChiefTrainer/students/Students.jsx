import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';

import CardHeader from '../../../components/dcomponents/Card/CardHeader.jsx';
import CardBody from '../../../components/dcomponents/Card/CardBody.jsx';
import globals from '../../../constants/Globals';
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBInput
} from 'mdbreact';
import { withGlobalContext } from '../../../context/Provider';
import {
  Icon,
  Alert,
  Card,
  Button,
  Modal,
  Form,
  notification,
  Radio,
  Input,
  Cascader,
  Switch as SwitchAnt,
  Select,
  Spin,
  AutoComplete,
  Table
} from 'antd';
//Drawer
import CustomDrawer from './Drawer';
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const AutoCompleteOption = AutoComplete.Option;
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
  },
  btnBg: {
    backgroundColor: '#01afc4!important'
  }
};
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

class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverRes: '',
      loading: true,
      mainLoad: true,
      loaded: false,
      users: [],
      page: 1,
      limit: 10,
      parentExisting: false,
      //drawer
      dvisible: false,
      currentInfo: null,
      modalVisible: false,
      //modal
      visible: false,
      currentStudent: '',
      //skip:0,
      //snack
      showWithoutParents: false,
      open: false,
      place: 'bc',
      resType: 'warning',
      query: '',
      totalPages: null,
      hasNext: null,
      hasPrev: null,
      totalDocs: null,
      //ant table
      withoutParents: false,
      pagination: { current: 1 },
      columns: [
        {
          title: 'Ref Id',
          dataIndex: 'refID',
          render: refID => (refID ? refID : 'NA'),
          sorter: true
        },
        {
          title: 'First Name',
          dataIndex: 'fname',
          sorter: true
        },
        {
          title: 'Last Name',
          dataIndex: 'lname',
          sorter: true
        },
        {
          title: 'School',
          dataIndex: 'school',
          render: school => capitalize(school[0].name),
          sorter: true,
          filters: [],
          width: '20%'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          sorter: true,
          render: gender => capitalize(gender),
          filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' }
          ],
          width: '20%'
        },

        {
          title: 'More',
          render: (text, user, i) => (
            <span
              onClick={() => {
                let current = { ...user, i };
                this.setState({ currentInfo: current }, () => {
                  this.showDrawer();
                });
              }}
            >
              <Icon type='select' />
            </span>
          )
        }
      ]
    };
    this.myRef = React.createRef();
  }

  _fetchUsers = () => {
    let state = this.state;
    let data = {
      withoutParents: state.withoutParents,
      filters: state.filters,
      sorter: state.sorter,
      limit: state.limit,
      page: state.pagination.current,
      query: state.query
    };
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/all_students`,
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
        //this.setState({currentPlace:data.results})
        if (data.success) {
          //ant design
          const pagination = { ...this.state.pagination };
          pagination.total = data.students.totalDocs;
          console.log('[users]', data);
          this.setState({
            users: data.students.docs,
            page: data.students.page,
            totalPages: data.students.totalPages,
            totalDocs: data.students.totalDocs,
            hasNext: data.students.hasNextPage,
            hasPrev: data.students.hasPrevPage,
            pagination
          });
        } else {
          notification['error']({
            message: data.message,
            description: (
              <Button
                onClick={() => {
                  this.setState({ loading: true });
                  this._fetchUsers();
                  notification.destroy();
                }}
              >
                {' '}
                Retry{' '}
              </Button>
            ),
            duration: 0
          });
        }
        this.setState({
          loading: false,
          mainLoad: false,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);

        notification['error']({
          message: error.toString(),
          duration: 0,
          description: (
            <Button
              onClick={() => {
                this.setState({ loading: true });
                this._fetchUsers();
                notification.destroy();
              }}
            >
              {' '}
              Retry{' '}
            </Button>
          )
        });
      });
  };
  _updateUsers = (index) => {
    let users = this.state.users.splice(index, 1)
    this.setState({ users })
  }
  _handleSearch = event => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState(
      {
        query: event.target.value,
        loading: true,
        loaded: false,
        pagination: pager
      },
      () => {
        this._fetchUsers();
      }
    );
  };

  //Ant Modal

  showModal = () => {
    console.log('show Modal');
    this.setState({ visible: true });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
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
            return { value: each._id, text: unKebab(each.name).join() };
          });

          let columns = [...this.state.columns];
          columns[3].filters = schools;
          console.log('[columns]', columns);
          console.log('Filter Schools', schools);
          this.setState({
            schools: schools,
            loading: false,
            columns
          });
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
  removeIndex = (i, data) => {
    this.setState(prevState => {
      let courses = [...prevState.users];
      console.log('Before Deleting', courses);
      courses.splice(i, 1);
      let total = prevState.totalDocs;
      total--;
      console.log('After Deleting', total);
      return {
        users: courses,
        totalDocs: total
      };
    });
    // saveFormRef = formRef => {
    //   this.formRef = formRef;
    // };
    this.onClose();
    notification[data.success ? 'success' : 'error']({
      message: data.message
    });
  };
  showDrawer = () => {
    const state = this.state;
    console.log('open drawer');

    this.setState({
      dvisible: true
    });
  };
  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  onClose = () => {
    this.setState({
      dvisible: false
    });
  };
  componentDidMount = () => {
    this._fetchSchools();
    this._fetchUsers();
  };
  onToggleParents = () => {
    if (!this.state.withoutParents) {
      this.state.columns.splice(
        5,
        0,
        {
          title: 'Add',
          render: (text, user, i) => (
            <Button
              type='primary'
              onClick={() => {
                this.setState(
                  { currentStudent: user._id },
                  () => {
                    this.showModal();
                  }
                );
              }}
            >
              Add Parent
                                </Button>
          )
        }
      )
    } else {
      this.state.columns.splice(5, 1)
    }
    this.setState(
      {
        withoutParents: !this.state.withoutParents,
        loading: true
      },
      () => {
        this._fetchUsers();

      }
    );
  };
  handleTableChange = (pagination, filters, sorter) => {
    console.log(
      '[pagination]',
      pagination,
      ' [filters]',
      filters,
      '[sorter]',
      sorter
    );
    const pager = { ...this.state.pagination };
    this.myN.scrollIntoView({ block: 'start' });
    pager.current = pagination.current;
    this.setState(
      {
        filters,
        sorter,
        pagination: pager,
        loading: true
      },
      () => {
        this._fetchUsers();
      }
    );

    // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters
    // });
  };
  updateIndex = ({ i, obj }) => {
    this.setState(prevState => {
      let users = [...prevState.users];
      users[i] = { ...obj, addedBy: users[i].addedBy, i };
      console.log('new user', users[i]);
      return {
        users: users,
        currentInfo: users[i]
      };
    });
  };
  render = () => {
    const { classes } = this.props;
    const state = this.state;
    //const { visible, onCancel, onCreate, form } = this.props;
    // const { getFieldDecorator } = form;

    let isMobile = false;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
    }

    if (state.mainLoad) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    return (
      <div
        ref={el => {
          this.myN = el;
        }}
      >
        <CustomDrawer
          broken={this.props.broken}
          visible={this.state.dvisible}
          onClose={this.onClose}
          info={this.state.currentInfo}
          infoCopy={this.state.currentInfo}
          onUpdateIndex={this.updateIndex}
          onRemoveIndex={this.removeIndex}
        />
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          props={this.props}
          users={this.state.users}
          student={this.state.currentStudent}
          saveParent={this.saveParent}
          updateUsers={this._updateUsers}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card title='All Students' style={{ width: '100%' }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div
                    style={{
                      width: '100%',
                      marginTop: '3px',
                      marginBottom: '3px',
                      float: 'left'
                    }}
                  />
                  <div style={{ width: '15rem', float: 'left' }}>
                    <SwitchAnt size='small' onChange={this.onToggleParents} />{' '}
                    Show without Parents Only
                  </div>

                  <div style={{ width: '15rem', float: 'right' }}>
                    <Input
                      value={state.query}
                      onChange={this._handleSearch}
                      suffix={
                        <Button
                          className='search-btn'
                          style={{ marginRight: -12 }}
                          type='primary'
                        >
                          <Icon type='search' />
                        </Button>
                      }
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <Table
                scroll={{ x: '100%' }}
                size='middle'
                columns={this.state.columns}
                rowKey={record => record._id}
                dataSource={state.users}
                expandedRowRender={record => {
                  console.log('[record]', record);
                  let parent = record.parent[0];
                  if (parent) {
                    return (
                      <>
                        <p style={{ margin: 0 }}>
                          <b>Parent: </b> {capitalize(parent.fname)}{' '}
                          {capitalize(parent.lname)}
                        </p>
                        <p style={{ margin: 0 }}>
                          <b>Email: </b> {parent.email}
                        </p>
                      </>
                    );
                  } else {
                    return (
                      <p style={{ margin: 0 }}>
                        No additional information available.
                      </p>
                    );
                  }
                }}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
              />
              <div className='text-center' style={{ marginTop: '-43px' }}>
                <p style={{ color: 'grey' }}>
                  (Showing {state.users.length} of {state.totalDocs} records){' '}
                </p>
              </div>
              {/* 
              {state.loading ? (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div
                      className='text-center'
                      style={{ height: 300, marginTop: '9.2rem' }}
                    >
                      <Spin indicator={antIcon} />
                    </div>
                  </GridItem>
                </GridContainer>
              ) : (
                <>
                  {state.users.length > 0 ? (
                    <MDBTable hover responsive small striped bordered>
                      <MDBTableHead>
                        <tr>
                          <th>No.</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>School</th>
                          <th />
                          <th style={{ textAlign: 'center', width: '100px' }} />
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {state.users.map((user, i) => (
                          <tr key={user._id}>
                            <td>{i + 1}</td> <td>{capitalize(user.fname)}</td>
                            <td>{capitalize(user.lname)}</td>
                            <td>
                              {user.school[0]
                                ? unKebab(user.school[0].name)
                                : ''}
                            </td>
                            <td>
                              {user.parent.length == 0 && user.isSponsored ? (
                                <Button
                                  type='primary'
                                  onClick={() => {
                                    this.setState(
                                      { currentStudent: user._id },
                                      () => {
                                        this.showModal();
                                      }
                                    );
                                  }}
                                >
                                  Add Parent
                                </Button>
                              ) : (
                                <></>
                              )}
                            </td>
                            <td
                              onClick={() => {
                                let current = { ...user, i };
                                this.setState({ currentInfo: current }, () => {
                                  this.showDrawer();
                                });
                              }}
                              style={{
                                textAlign: 'center',
                                width: '100px',
                                fontsize: '1.3rem'
                              }}
                            >
                              <Icon type='select' />
                            </td>
                          </tr>
                        ))}
                      </MDBTableBody>
                    </MDBTable>
                  ) : (
                    <div className='text-center' style={{ height: 300 }}>
                      <p style={{ marginTop: 145 }}>
                        {' '}
                        {state.query
                          ? `No records found matching \" ${state.query}\"`
                          : 'No students yet'}
                      </p>{' '}
                    </div>
                  )}
                </>
              )}
              {state.loaded && state.users.length > 0 ? (
                <div className='text-center'>
                  {state.hasPrev ? (
                    <Button
                      type='primary'
                      style={{ display: 'inline-block' }}
                      onClick={this._handlePrevious}
                    >
                      <MDBIcon size='2x' icon='angle-double-left' />
                    </Button>
                  ) : null}
                  <h4 style={{ display: 'inline-block', margin: '25px 30px' }}>
                    {state.page} of {state.totalPages}
                  </h4>
                  {state.hasNext ? (
                    <Button
                      type='primary'
                      style={{ display: 'inline-block' }}
                      onClick={this._handleNext}
                    >
                      <MDBIcon size='2x' icon='angle-double-right' />
                    </Button>
                  ) : null}

                  <p style={{ color: 'grey' }}>
                    (Showing {state.users.length} of {state.totalDocs} records){' '}
                  </p>
                </div>
              ) : null} */}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

export default withGlobalContext(withStyles(styles)(AllStudents));

const { Option } = Select;

const center = {
  position: 'absolute',
  left: '58.5%',
  top: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
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
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line

  class AddParent extends React.Component {
    constructor(props) {
      super(props);
      console.log('This props', props);

      this.state = {
        saving: false,
        selected: '',
        gender: '',
        parentExisting: false,
        searching: false,
        searchStr: '',
        existingSelected: false,
        autoCompleteResult: []
      };
    }

    _handleSearch = () => {
      this.setState({ searching: true });
      const SearchAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${
          this.props.global.user.role
          }/search_parent`,
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
            body: JSON.stringify({ query: this.state.searchStr })
          }
        )).json();

      SearchAsync()
        .then(data => {
          //this.setState({currentPlace:data.results})
          if (data.success) {

            this.setState({
              parentList: data.parents,
              searching: false
            });
          } else {
          }
        })
        .catch(error => {
          console.log(error);

          notification['error']({
            message: error.toString()
          });
          this.setState({ searching: false });
          console.log(error);
        });
    };
    handleParentChange = value => {
      if (value.length == '5d0231026accc00c57f14281'.length) {
        return;
      }
      console.log('Typing Something');
      console.log(this.props);
      // console.log(this.props.global.user.role)
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        this.setState({
          searching: true,
          searchStr: value,
          existingSelected: false,
          selected: null
        });
        const SearchAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${
            this.props.props.global.user.role
            }/search_parent`,
            {
              method: 'post',
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                Authorization: this.props.props.global.token
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

            notification['error']({
              message: error.toString()
            });
            this.setState({ searching: false });
            console.log(error);
          });
      }
    };
    onChangeG = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
        gender: e.target.value
      });
    };
    onChange = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        parentExisting: e.target.value
      });
    };
    saveParent = async () => {
      const { form } = this.props;
      form.validateFields(async (err, values) => {
        if (err) {
          // console.log(err)
          return;
        } else {
          let data = {};
          if (!this.state.parentExisting) {
            console.log('Mwanaza', this.props.student);
            data = {
              _id: this.props.student,
              existing: false,
              parent: {
                fname: values.fname,
                lname: values.lname,
                email: values.email,
                gender: values.gender
              }
            };
          } else {
            data = {
              _id: this.props.student,
              existing: true,
              parent: values.psearch
            };
          }
          this.setState({ saving: true });
          const save = async () =>
            await (await fetch(
              `${globals.BASE_URL}/api/${
              this.props.props.global.user.role
              }/add_parent`,
              {
                method: 'post',
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.props.props.global.token
                  // "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data)
              }
            )).json();

          save()
            .then(data => {
              let type = data.success ? 'success' : 'error';

              notification[type]({
                message: data.message
              });
              //this.setState({currentPlace:data.results})
              if (data.success) {
                let students = this.props.users;
                let index = students.findIndex(each => each._id === this.props.student);
                this.props.updateUsers(index)
                this.props.form.resetFields();
                this.setState({ saving: false });
                this.props.onCancel();
              } else {
                this.setState({
                  adding: false,
                  saving: false,
                  serverRes: data.message
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.setState({ updating: false });
              notification['error']({
                message: error.toString()
              });
              // this._snack({ type: "warning", msg:  });
              this.setState({ adding: false });
              console.log(error);
            });
        }
      });
    };

    render() {
      const { autoCompleteResult } = this.state;
      const parentOptions = autoCompleteResult.map(parent => (
        <AutoCompleteOption
          key={parent._id}
          onClick={() => {
            this.setState({ existingSelected: true, selected: parent });
            console.log(this.state.parent);
          }}
        >
          {capitalize(parent.fname) + ' ' + capitalize(parent.lname)}
        </AutoCompleteOption>
      ));
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const state = this.state;
      return (
        <div>
          <Modal
            visible={visible}
            title='Add Parent To student'
            okText='Save'
            onCancel={onCancel}
            onOk={this.saveParent}
          >
            <Spin indicator={antIcon} spinning={state.saving}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label='School Type'>
                  <Radio.Group
                    onChange={this.onChange}
                    value={this.state.parentExisting}
                  >
                    <Radio value={false}>New Parent</Radio>
                    <Radio value={true}>Existing </Radio>
                  </Radio.Group>
                </Form.Item>
                {this.state.parentExisting ? (
                  <>
                    <Form.Item label='Search Parent'>
                      {getFieldDecorator('psearch', {
                        rules: [
                          {
                            required: true,
                            message: 'Please search and select parent!'
                          }
                        ]
                      })(
                        <AutoComplete
                          dataSource={parentOptions}
                          onChange={this.handleParentChange}
                          placeholder='parent'
                        >
                          <Input />
                        </AutoComplete>
                      )}
                    </Form.Item>
                    {state.searching ? (
                      <div className='text-center'>
                        <Spin indicator={antIcon} />
                      </div>
                    ) : state.searchStr && state.plength == 0 ? (
                      <div
                        className='text-center'
                        style={{
                          marginRight: '1rem',
                          marginTop: '-1.5rem'
                        }}
                      >
                        <p style={{ marginTop: 50 }}>
                          {' '}
                          No parent found matching "{state.searchStr}"
                        </p>{' '}
                      </div>
                    ) : null}
                  </>
                ) : (
                    <>
                      <Form.Item label='First Name'>
                        {getFieldDecorator('fname', {
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
                          rules: [
                            {
                              required: true,
                              message: 'Please input  last  name!'
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label='Email'>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input email'
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label='Phone Number'>
                        {getFieldDecorator('phone_number', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input phone Number'
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label='Gender'>
                        {getFieldDecorator('gender', {
                          rules: [
                            {
                              required: true,
                              message: 'Please select the students gender!'
                            }
                          ]
                        })(
                          <Radio.Group
                            style={{ float: 'left' }}
                            onChange={this.onChangeG}
                          >
                            <Radio value={'male'}>Male</Radio>
                            <Radio value={'female'}>Female</Radio>
                          </Radio.Group>
                        )}
                      </Form.Item>
                    </>
                  )}
              </Form>
            </Spin>
          </Modal>
        </div>
      );
    }
  }
);

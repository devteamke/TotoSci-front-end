import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';

import globals from '../../../constants/Globals';
// @material-ui/icons

import CustomDrawer from './Drawer';
import { withGlobalContext } from '../../../context/Provider';
import { Icon, Card, Button, Input, notification, Table, Spin } from 'antd';

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
  },
  btnBg: {
    backgroundColor: '#01afc4!important'
  }
};
class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverRes: '',
      loading: true,
      loaded: false,
      mainLoad: false,
      users: [],
      page: 1,
      limit: 10,

      //modal
      visible: false,
      //skip:0,
      //snack
      //Drawer

      dvisible: false,
      currentInfo: null,

      open: false,
      place: 'bc',
      resType: 'warning',
      query: '',
      totalPages: null,
      hasNext: null,
      hasPrev: null,
      totalDocs: null
    };
    this.myRef = React.createRef();
  }
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: description => capitalize(description)
    },
    {
      title: 'Charge',
      dataIndex: 'charge',
      sorter: true
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
  ];
  _fetchUsers = () => {
    let state = this.state;
    let data = {
      filters: state.filters,
      sorter: state.sorter,
      limit: state.limit,
      page: state.page,
      query: state.query
    };
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/all_courses`,
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
          pagination.total = data.result.totalDocs;
          console.log('[users]', data);
          this.setState({
            users: data.result.docs,
            page: data.result.page,
            totalPages: data.result.totalPages,
            totalDocs: data.result.totalDocs,
            hasNext: data.result.hasNextPage,
            hasPrev: data.result.hasPrevPage,
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

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSave = () => {
    const form = this.formRef;
    const state = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);

      let data = {
        _id: course._id,
        fname: values.fname,
        lname: values.lname,
        school: values.school
      };
      this.setState({ updating: true });
      const SaveAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${
            this.props.global.user.role
          }/course_save_info`,
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
            console.log('[newCourse]', data.course);

            this.setState(prevState => {
              let users = [...prevState.users];
              users[course.index] = data.course;
              return {
                visible: false,
                users: users
              };
            });
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
  saveFormRef = formRef => {
    this.formRef = formRef;
    console.log('save ref', formRef);
  };
  showDrawer = () => {
    const state = this.state;
    //  console.log("open drawer");

    this.setState({
      dvisible: true
    });
  };
  onClose = () => {
    this.setState({
      dvisible: false
    });
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
    this.onClose();
    notification[data.success ? 'success' : 'error']({
      message: data.message
    });
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
  };
  componentDidMount = () => {
    this._fetchUsers();
  };

  render = () => {
    const { classes } = this.props;
    const state = this.state;
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
          visible={this.state.dvisible}
          onClose={this.onClose}
          users={this.state.users}
          info={this.state.currentInfo}
          infoCopy={this.state.currentInfo}
          onUpdateIndex={this.updateIndex}
          onRemoveIndex={this.removeIndex}
          loading={this.state.mainLoad}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card title='All Courses' style={{ width: '100%' }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                columns={this.columns}
                rowKey={record => record._id}
                dataSource={state.users}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
              />
              <div className='text-center' style={{ marginTop: '-43px' }}>
                <p style={{ color: 'grey' }}>
                  (Showing {state.users.length} of {state.totalDocs} records){' '}
                </p>
              </div>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}
let course = {};

export default withGlobalContext(withStyles(styles)(AllStudents));

const center = {
  position: 'absolute',
  left: '50%',
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
  } else {
    str = 'NA';
  }
  return str;
};

import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import Snackbar from '../../../components/dcomponents/Snackbar/Snackbar.jsx';
import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';
import CustomInput from '../../../components/dcomponents/CustomInput/CustomInput.jsx';

//import Card from "../../../components/dcomponents/Card/Card.jsx";
import CardHeader from '../../../components/dcomponents/Card/CardHeader.jsx';
import CardAvatar from '../../../components/dcomponents/Card/CardAvatar.jsx';
import CardBody from '../../../components/dcomponents/Card/CardBody.jsx';
import CardFooter from '../../../components/dcomponents/Card/CardFooter.jsx';
import {
  MDBBtn,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBIcon
} from 'mdbreact';
import validate from '../students/validation';
import avatar from '../../../assets/img/faces/marc.jpg';
//import Select from "@material-ui/core/Select";
import globals from '../../../constants/Globals';
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert';
import InvoiceData from './genInvoiceData';
import { withGlobalContext } from '../../../context/Provider';
//Form components

import '../students/register.css';
//ant design
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Table,
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
  notification,
  DatePicker
} from 'antd';
import moment from 'moment';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
const { MonthPicker, RangePicker } = DatePicker;

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
const { Search } = Input;

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedRowKeys: [],
      school: '',
      students: [],
      isSelected: false,
      onNextPage: false,
      //Existing parent
      isExisting: true,
      searchStr: '',
      searching: false,
      parentList: [],
      existingSelected: false,

      //sponsor
      isSponsored: true,

      loading: true,
      //other
      addingUser: false,
      open: false,
      place: 'bc',
      resType: 'warning'
    };
  }

  _snack = params => {
    if (this.props.location.snack) {
      let snack = this.props.location.snack;
      this.setState({ open: true, resType: snack.type, serverRes: snack.msg });
      setTimeout(
        function () {
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
        function () {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    }
  };

  handleChange = event => {
    console.log('value', event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };



  _handleSearch = (event) => {
    //  this.setState({  });
    this.setState({
      [event.target.name]: event.target.value, searching: true
    });
    const SearchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_invoiced_students`,
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
        if (data.success) {
          //data.students.docs.map((each, i) => { return { ...each, key: i } })
          this.setState({
            students: data.students.docs,
            searching: false
          });
        } else {
          this.setState({

            searching: false
          });
          notification['error']({
            message: data.message
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
        notification['error']({
          message: error.toString()
        });

        console.log(error);
      });
  };
  _fetchStudents = () => {
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/fetch_invoiced_students`,
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
        console.log('Result', data.students)
        if (data.success) {
          data.students.docs.map((each, i) => { return { ...each, key: i } })
          this.setState({
            students: data.students.docs,
            loading: false
          });
        } else {
          this.setState({

            loading: false
          });
          notification['error']({
            message: data.message
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
        notification['error']({
          message: error.toString()
        });

        console.log(error);
      });
  };


  _handleSelect = obj => {
    this.setState({ selected: obj, existingSelected: true });
  };
  componentDidMount = () => {
    this._snack();
    this._fetchStudents();
  };
  //ant design

  onSelectChange = selectedRowKeys => {

    console.log('selectedRowKeys changed: ', selectedRowKeys);
    let isSelected = selectedRowKeys.length > 0 ? true : false;
    this.setState({ selectedRowKeys, isSelected });
  };

  disabledDate = current => {
    // Can not select days before today and today
    return current && current > moment().subtract(1825, 'days');
  };
  render() {
    const { classes } = this.props;
    const { students } = this.state;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const columns = [

      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
      },
      {
        title: 'School',
        dataIndex: 'school',
      },
      {
        title: 'Parent',
        dataIndex: 'parent',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      }
    ];

    const data = [];
    students.map((each, i) => {
      data.push({
        key: i,
        name: each.fname + ' ' + each.lname,
        gender: each.gender,
        school: each.parent[0] ? unKebab(each.school[0].name) : '',
        parent: each.parent[0] ? each.parent[0].fname + ' ' + each.parent[0].fname : '',
        email: each.parent[0] ? each.parent[0].email : ''

      });
    })

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,

      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
            let isSelected = selectedRowKeys.length > 0 ? true : false;
            this.setState({
              selectedRowKeys: [...Array(students.length).keys()], isSelected
            });
          },
        },
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            let isSelected = selectedRowKeys.length > 0 ? true : false;
            this.setState({ selectedRowKeys: newSelectedRowKeys, isSelected });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            let isSelected = selectedRowKeys.length > 0 ? true : false;
            this.setState({ selectedRowKeys: newSelectedRowKeys, isSelected });
          },
        },
      ],
    };
    const ButtonGroup = Button.Group;
    const { Search } = Input;
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

        <GridContainer>
          <GridItem xs={12} sm={12} md={11}>
            <Card title='Generate Invoice' style={{ width: '100%' }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div style={{ float: 'left' }}>
                    <ButtonGroup size={"large"}>
                      {state.onNextPage ? (

                        <Button type="primary">
                          <Icon type="left" />

                          Back
          </Button>
                      ) : null}
                      {state.isSelected ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            let selectedUsers = [];

                            state.selectedRowKeys.map(each => {
                              data.find(student => { if (student.key == each) selectedUsers.push(student) })
                            })
                            console.log('Selected students', selectedUsers)
                            this.props.history.push(`/${this.props.global.user.role}/invoices/new`, { selectedUsers: selectedUsers })
                          }}
                        >
                          Next
            <Icon type="right" />
                        </Button>
                      ) : (<p> Select students</p>)}
                    </ButtonGroup>
                  </div>
                  <div style={{ width: '15rem', float: 'right' }}>
                    <Input
                      placeholder="Basic usage" />,
                </div>
                </GridItem>
              </GridContainer>
              <GridItem xs={12} sm={12} md={12}>


                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
              </GridItem>
            </Card>
          </GridItem>


        </GridContainer>
      </div >
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

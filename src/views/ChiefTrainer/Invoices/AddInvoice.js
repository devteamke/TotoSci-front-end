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

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedRowKeys: [],
      school: '',
      students: [],

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

  handleSubmit = e => {
    const state = this.state;
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.setState({ registering: true });
        let data = {
          studentFname: values.fname,
          studentLname: values.lname,
          school: values.school[0],
          isSponsored: state.isSponsored,
          gender: values.gender,
          DOB: values.dob
        };
        if (!state.isSponsored) {
          if (!state.isExisting) {
            data = {
              ...data,
              parentFname: values.pfname,
              parentLname: values.plname,
              email: values.email,
              phone_number: { main: values.phone },
              existingParent: false
            };
          } else {
            data = { ...data, existingParent: state.selected._id };
          }
        }
        console.log(data);
        this.setState({ registering: true });
        const AddAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${
            this.props.global.user.role
            }/new_student`,
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

        AddAsync()
          .then(data => {
            this._snack({
              type: data.success ? 'success' : 'warning',
              msg: data.message
            });

            //this.setState({currentPlace:data.results})
            if (data.success) {
              this.props.form.resetFields();
              this.setState({
                registering: false,

                selected: null,
                existingSelected: false,
                searchStr: '',
                //Sponsored
                isSponsored: true,

                school: '',
                registering: false
              });
            } else {
              this.setState({
                registering: false,

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
            this.setState({ registering: false });
            console.log(error);
          });
      }
    });
  };

  _handleSearch = () => {
    this.setState({ searching: true });
    const SearchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/search_parent`,
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
          this.setState({
            students: data.students.docs,
            loading: false
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

        console.log(error);
      });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      isSponsored: !this.state.isSponsored
    });
  };
  onChange2 = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      isExisting: !this.state.isExisting
    });
  };
  onChangeG = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      gender: e.target.value
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
  handleStudentChange = value => {
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
        existingSelected: false,
        selected: null
      });
      const SearchAsync = async () =>
        await (await fetch(
          `${globals.BASE_URL}/api/${
          this.props.global.user.role
          }/search_student`,
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
            autoCompleteResult = data.students;
            console.log(data.students)
            this.setState({
              autoCompleteResult,
              searching: false,
              plength: data.students.length
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
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
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
            this.setState({ selectedRowKeys: newSelectedRowKeys });
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
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
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
              <GridItem xs={12} sm={12} md={12} />
              <GridItem xs={12} sm={12} md={12}>


                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
              </GridItem>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4} />
        </GridContainer>
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

import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components

import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';

import globals from '../../../constants/Globals';
// @material-ui/icons

import { withGlobalContext } from '../../../context/Provider';
// //Form components
// import TrainerForm from './forms/Trainer';
// import InstructorForm from './forms/Instructor';

//antd
import {
  Form,
  Input,
  Icon,
  Cascader,
  Select,
  Button,
  notification,
  Card,
  Radio,
  Spin,
  DatePicker
} from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
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
      loading: true,
      //other
      addingUser: false,
      open: false,
      place: 'bc',
      resType: 'warning'
    };
  }

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
          console.log('mapped schools', schools);
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
      });
  };
  handleSubmit = e => {
    e.preventDefault();
    const state = this.state;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ registering: true });
        let data = {
          role: state.role,
          email: values.email,

          fname: values.fname,
          lname: values.lname,
          gender: values.gender,
          DOB: values.dob,
          school: values.school,
          phone_number: { main: values.phone, alt: '' }
        };
        console.log(data);
        this.setState({ registering: true });
        const AddAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${this.props.global.user.role}/register`,
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
            let type = data.success ? 'success' : 'error';

            notification[type]({
              message: data.message
            });
            //this.setState({currentPlace:data.results})
            if (data.success) {
              this.props.form.resetFields();
              this.setState({
                registering: false,
                serverRes: data.message
              });
            } else {
              this.setState({
                registering: false,

                serverRes: data.message
              });
            }
          })
          .catch(error => {
            notification['error']({
              message: error.toString()
            });
            this.setState({ registering: false });
            console.log(error);
          });
      }
    });
  };
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      role: e.target.value
    });
  };
  onChangeG = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      gender: e.target.value
    });
  };
  disabledDate = current => {
    // Can not select days before today and today
    return current && current > moment().subtract(6570, 'days');
  };
  componentDidMount = () => {
    this._fetchSchools();
  };

  render() {
    const { classes } = this.props;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
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
      <Select style={{ width: 150 }}>
        <Option value='254'>+254</Option>
      </Select>
    );

    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={11}>
            <Card title='Add new personnel' style={{ width: '100%' }}>
              <GridItem xs={12} sm={12} md={12} />
              <GridItem xs={12} sm={12} md={12}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label='Role'>
                    {getFieldDecorator('role', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select role!'
                        }
                      ]
                    })(
                      <Radio.Group
                        style={{ float: 'left' }}
                        onChange={this.onChange}
                        value={state.role}
                      >
                        <Radio value={'trainer'}>Trainer</Radio>
                        <Radio value={'instructor'}>Instructor</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>{' '}
                  <Form.Item label='First Name'>
                    {getFieldDecorator('fname', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input  first name!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='Last Name'>
                    {getFieldDecorator('lname', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input last  name!'
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
                  <Form.Item label='DOB'>
                    {getFieldDecorator('dob', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select the students date of birth!'
                        }
                      ]
                    })(
                      <DatePicker
                        disabledDate={this.disabledDate}
                        format={'DD/MM/YYYY'}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label='E-mail'>
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!'
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='Phone Number'>
                    {getFieldDecorator('phone', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your phone number!'
                        }
                      ]
                    })(
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label='Learning Venue/ School'>
                    {getFieldDecorator('school', {
                      rules: [
                        {
                          type: 'array',
                          required: true,
                          message: 'Please select school/venue!'
                        }
                      ]
                    })(<Cascader options={state.schools} />)}
                  </Form.Item>
                  <div className='text-center'>
                    {state.registering ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <Button type='primary' htmlType='submit'>
                        Register
                      </Button>
                    )}
                  </div>
                </Form>
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

export default Form.create({ name: 'register' })(
  withGlobalContext(withStyles(styles)(AddUser))
);

import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components

import GridItem from '../../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../../components/dcomponents/Grid/GridContainer.jsx';

import globals from '../../../constants/Globals';
// @material-ui/icons

import { withGlobalContext } from '../../../context/Provider';
//Form components

//antd
import {
  Form,
  Input,
  Icon,
  Select,
  Button,
  Card,
  InputNumber,
  Spin,
  notification
} from 'antd';
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
const { Option } = Select;
const { TextArea } = Input;
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

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //form fields

      //other
      adding: false,
      open: false,
      place: 'bc',
      resType: 'warning'
    };
  }

  handleChange = event => {
    console.log('value', event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let state = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.setState({ adding: true });
        let data = {
          name: values.name,
          description: values.description,
          charge: values.charge
        };
        console.log(data);
        this.setState({ serverRes: null });
        const AddAsync = async () =>
          await (await fetch(
            `${globals.BASE_URL}/api/${this.props.global.user.role}/new_course`,
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
                adding: false,
                serverRes: data.message,
                //form fields
                name: '',
                nameError: null,
                description: '',
                descriptionError: null,
                charge: '',
                chargeError: null
              });
            } else {
              this.setState({
                adding: false,

                serverRes: data.message
              });
            }
          })
          .catch(error => {
            notification['error']({
              message: error.toString()
            });

            this.setState({ adding: false });
            console.log(error);
          });
      }
    });
  };

  componentDidMount = () => {};

  render() {
    const { classes } = this.props;
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
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

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Card title='Add a new course' style={{ width: '100%' }}>
              <GridItem xs={12} sm={12} md={12}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label='Name'>
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input name!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='Session Charge'>
                    {getFieldDecorator('charge', {
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
                      rules: [
                        {
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

                  <div className='text-center'>
                    {state.adding ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <Button type='primary' htmlType='submit'>
                        Add Course
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
  left: '50%',
  top: '50%',
  '-webkit-transform': 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
};
export default Form.create({ name: 'register' })(
  withGlobalContext(withStyles(styles)(Add))
);

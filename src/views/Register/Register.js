import React from 'react';
// @material-ui/core components
import { Helmet } from "react-helmet";
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
// core components
//import Snackbar from '../../../components/dcomponents/Snackbar/Snackbar.jsx';
import GridItem from '../../components/dcomponents/Grid/GridItem.jsx';
import GridContainer from '../../components/dcomponents/Grid/GridContainer.jsx';

import {

    MDBTable,
    MDBTableBody,

} from 'mdbreact';

//import Select from "@material-ui/core/Select";
import globals from '../../constants/Globals';
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert';
import { withGlobalContext } from '../../context/Provider';
//Form components

import './register.css';
//ant design
import {
    Form,
    Input,
    Tooltip,
    Icon,
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
    DatePicker,
    notification
} from 'antd';
import moment from 'moment';
//import { warningColor } from '../../../assets/jss/material-dashboard-react.jsx';
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
        fontFamily: 'Lato',
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

            mode: '',

            school: '',
            schools: [],

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
                    //mode: state.mode,
                    //addLater: !state.isNow,
                    student: {
                        fname: values.fname,
                        lname: values.lname,
                        DOB: values.dob,
                        school: values.school[0],
                        isSponsored: false,
                    },
                    parent: {
                        lname: values.pfname,
                        fname: values.plname,
                        gender: values.pgender,
                        email: values.email,
                        phone_number: { main: values.phone },
                    }


                };

                console.log('[data sent]', data);
                this.setState({ registering: true });
                const AddAsync = async () =>
                    await (await fetch(
                        `${globals.BASE_URL}/api/users/new_application`,
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
                            msg: data.message
                        });
                        let type = data.success ? 'success' : 'error';
                        notification[type]({
                            message: data.message,
                            description: '',
                            duration: 6
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
                        notification['error']({
                            message: error.message.toString(),
                            description: '',
                            duration: 6
                        });
                        this.setState({ registering: false });
                        console.log(error);
                    });
            }
        });
    };


    _fetchSchools = () => {
        const FetchAsync = async () =>
            await (await fetch(
                `${globals.BASE_URL}/api/users/fetch_schools`,
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
                    //console.log('mapped schoolBased', schoolBased);

                    this.setState({
                        schools: schools,
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
    onChangeNow = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
            isNow: e.target.value
        });
    };
    onChangeG = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
            gender: e.target.value
        });
    };

    onChangeGP = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
            genderP: e.target.value
        });
    };
    _handleSelect = obj => {
        this.setState({ selected: obj, existingSelected: true });
    };
    componentDidMount = () => {
       
    this._fetchSchools();
    };

    //ant design


    onChangeMode = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            mode: e.target.value
        });
    };

    disabledDate = current => {
        // Can not select days before today and today
        return current && current > moment().subtract(1456 + 4, 'days');
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
            <Select style={{ width: 90 }}>
                <Option value='254'>+254</Option>
            </Select>
        );

        const parentOptions = autoCompleteResult.map(parent => (
            <AutoCompleteOption
                key={parent._id}
                onClick={() => {
                    this.setState({ existingSelected: true, selected: parent });
                }}
            >
                {capitalize(parent.fname) + ' ' + capitalize(parent.lname)}
            </AutoCompleteOption>
        ));

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
                        <Card title='Apply to TotoSci Academy' style={{ width: '100%' }}>
                            <GridItem xs={12} sm={12} md={12} />
                            <GridItem xs={12} sm={12} md={12}>
                                <GridItem xs={12} sm={12} md={12}>
                                    <h5>Student Details</h5>
                                </GridItem>

                                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                    <Form.Item label='First Name'>
                                        {getFieldDecorator('fname', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input student's last name!"
                                                }
                                            ]
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label='Last Name'>
                                        {getFieldDecorator('lname', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input student's last  name!"
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
                                   



                                    <GridItem xs={12} sm={12} md={12}>
                                        <h5>Parent Details</h5>
                                    </GridItem>



                                    <Form.Item label='First Name'>
                                        {getFieldDecorator('pfname', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input parent's first name!"
                                                }
                                            ]
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label='Last Name'>
                                        {getFieldDecorator('plname', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input parent's last  name!"
                                                }
                                            ]
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label='Gender'>
                                        {getFieldDecorator('pgender', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please select the parents gender!'
                                                }
                                            ]
                                        })(
                                            <Radio.Group
                                                style={{ float: 'left' }}
                                                onChange={this.onChangeGP}
                                            >
                                                <Radio value={'male'}>Male</Radio>
                                                <Radio value={'female'}>Female</Radio>
                                            </Radio.Group>
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
                                                    max: 10,
                                                    min: 9,
                                                    whitespace: true,
                                                    required: true,
                                                   
                                                    message: 'Please input your phone number correctly'
                                                }
                                            ]
                                        })(
                                            <Input
                                                addonBefore={prefixSelector}
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                    </Form.Item>



                                    {state.mode !== 'school-based' ? (
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
                                    ) : null}

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

export default withGlobalContext(
    Form.create({ name: 'register' })(withStyles(styles)(AddUser))
);

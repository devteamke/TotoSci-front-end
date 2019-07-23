import React from "react";
// @material-ui/core components
import ReactDOMServer from "react-dom/server";
import withStyles from "@material-ui/core/styles/withStyles";
// core components

import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";

import CardHeader from "../../../components/dcomponents/Card/CardHeader.jsx";
import CardBody from "../../../components/dcomponents/Card/CardBody.jsx";
import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { Switch, Route, Redirect } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { withGlobalContext } from "../../../context/Provider";
import { Icon, Row, Col, Card, Select, Button, Divider, Spin } from "antd";
//Drawer
//import CustomDrawer from "./Drawer";
import moment from "moment";
import * as jsPDF from 'jspdf';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  btnBg: {
    backgroundColor: "#01afc4!important"
  }
};
class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverRes: "",
      loading: true,
      mainLoad: false,
      loaded: false,
      users: [],
      page: 1,
      limit: 10,
      //drawer
      dvisible: false,
      currentInfo: null,

      //modal
      visible: false,
      //skip:0,
      //snack
      open: false,
      place: "bc",
      resType: "warning",
      query: "",
      totalPages: null,
      hasNext: null,
      hasPrev: null,
      totalDocs: null
    };
    this.myRef = React.createRef();
  }

  _fetchUsers = () => {
    let state = this.state;
    let data = {
      limit: state.limit,
      page: state.page,
      query: state.query
    };
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/my_students`,
        {
          method: "post",
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.global.token
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data)
        }
      )).json();

    FetchAsync()
      .then((data) => {
        //this.setState({currentPlace:data.results})
        if (data.success) {
          console.log("[users]", data);
          this.setState({
            users: data.result,
            page: data.result.page,
            totalPages: data.result.totalPages,
            totalDocs: data.result.totalDocs,
            hasNext: data.result.hasNextPage,
            hasPrev: data.result.hasPrevPage
          });
        } else {
          this._snack({ type: "warning", msg: data.message });
        }
        this.setState({
          loading: false,
          mainLoad: false,
          loaded: true
        });
      })
      .catch((error) => {
        console.log(error);
        if (error == "TypeError: Failed to fetch") {
          this.setState({
            serverRes: "Failed to contact server!"
          });
        } else if (error.message == "Network request failed") {
          // alert('No internet connection')
          this.setState({
            serverRes: "Network request failed"
          });
        }

        console.log(error);
        this.setState({
          open: true,
          resType: data.success ? "success" : "warning"
        });
        setTimeout(
          function () {
            this.setState({ open: false });
          }.bind(this),
          6000 * 9999
        );
      });
  };
  printDocument = () => {
    var doc = new jsPDF();
    doc.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
    doc.save("myDocument.pdf");
  }
  _handlePrevious = () => {
    this.setState(
      {
        page: this.state.page - 1,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _handleNext = () => {
    // console.log('[offset]',-this.myRef.current.offsetTop)
    //  window.scrollTo(0, -this.myRef.current.offsetTop);
    this.myN.scrollIntoView({ block: "start" });
    this.setState(
      {
        page: this.state.page + 1,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _handleSearch = (event) => {
    this.setState(
      {
        query: event.target.value,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _snack = (params) => {
    if (this.props.location.snack) {
      let snack = this.props.location.snack;
      this.setState({ open: true, resType: snack.type, serverRes: snack.msg });
      setTimeout(
        function () {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    } else if (params) {
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
  //Ant Modal

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount = () => {
    // this._fetchUsers();
    //this._snack();
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

    // const invoice = invoiceIt.create(recipient, emitter);
    return (
      <div
        ref={(el) => {
          this.myN = el;
        }}>
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
          <GridItem xs={12} sm={12} md={12}>
            <Card id='mydoc'>
              <Row>
                <Col
                  xs={{ span: 5, offset: 1 }}
                  lg={{ span: 6, offset: 2 }}
                  pull={1}>
                  <img
                    src={require("../../../assets/img/totosci.png")}
                    style={{ height: "50px" }}
                  />
                </Col>

                <Col
                  xs={{ span: 5, offset: 1 }}
                  lg={{ span: 6, offset: 2 }}
                  push={6}>
                  <h4>TotoSci Academy</h4>
                  <span>Nairobi National Museum</span>
                  <br />
                  <span>Kenya</span>
                  <br />
                  <span>tosciacademy@gmail.com</span>
                  <br />
                  <span>072455245</span>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col
                  xs={{ span: 5, offset: 1 }}
                  lg={{ span: 6, offset: 2 }}
                  pull={1}>
                  <div className="clearfix">
                    <h5>INVOICE TO:</h5>
                    <span>Name:Ken chirchir</span>
                    <br />
                    <span>Email:kipkogei@gmail.com</span>
                    <br />
                    <span>Phone:07275675675</span>
                    <br />
                  </div>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                  <h5>STUDENT</h5>
                  <span>Name:Ken chirchir</span>
                  <br />
                  <span>Age:6 years</span>
                  <br />
                  <span>Class:Robotics</span>
                  <br />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                  <h5>PAYMENT DETAILS</h5>
                  <span>
                    <strong>Invoice Number:3656343435</strong>
                  </span>
                  <br />
                  <span>
                    <strong>Bill Amount:Ksh 900</strong>
                  </span>
                  <br />
                  <span>Payment Status:Paid</span>
                  <br />
                  <span>Invoice Date:12th June 2019</span>
                  <br />
                </Col>
              </Row>
              <Divider />
              <Row>
                <MDBTable striped bordered hover>
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      <th>Week</th>
                      <th>Date</th>
                      <th>Course</th>
                      <th>Charge</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>week 1</td>
                      <td>12th May 2019</td>
                      <td>Robotics</td>
                      <td>1500</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>week 2</td>
                      <td>12th May 2019</td>
                      <td>Robotics</td>
                      <td>1500</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>week 3</td>
                      <td>12th May 2019</td>
                      <td>Robotics</td>
                      <td>1500</td>
                    </tr>
                  </MDBTableBody>
                  <tfoot>
                    <tr>
                      <td colspan={3} />
                      <td><strong>TOTAL</strong></td>
                      <td><strong>Ksh 6000.00</strong></td>
                    </tr>

                  </tfoot>
                </MDBTable>
              </Row>
              <Divider />
              <Row>
                <h5>Important</h5>
                <ol>
                  <li>This is an electronic generated invoice so doesn't require any signature.</li>
                  <li>Please read all terms and polices on www.totosciacademy.com/policy for returns, replacement and other issues.</li>
                </ol>

              </Row>
            </Card>
            <Button type="primary" shape="round" icon="download" onClick={this.printDocument}>Print</Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

export default withGlobalContext(withStyles(styles)(AllStudents));

const { Option } = Select;

const center = {
  position: "absolute",
  left: "58.5%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};
const unKebab = (string) => {
  if (string) {
    string = string.replace(/-/g, " ").toLowerCase();

    let splitStr = string.toLowerCase().split(" ");
    string = splitStr.map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1) + " ";
    });
  }

  return string;
};

const capitalize = (str) => {
  if (str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

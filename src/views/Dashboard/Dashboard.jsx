import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import Snackbar from "../../components/dcomponents/Snackbar/Snackbar.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import ListAlt from "@material-ui/icons/ListAlt";

// core components
import GridItem from "../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../components/dcomponents/Grid/GridContainer.jsx";

import { MDBIcon } from "mdbreact";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import "../../../node_modules/react-vis/dist/style.css";
import globals from "../../constants/Globals";
//Nivo charts
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { Card, Col, Row, Icon, Spin } from "antd";
import { withGlobalContext } from "../../context/Provider";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type="loading" style={{ fontSize: 40 }} spin />;
class Dashboard extends React.Component {
  state = {
    value: 0,
    students: 0,
    students_male: 0,
    students_female: 0,
    trainers: 0,
    trainers_male: 0,
    trainers_female: 0,
    instructors: 0,
    instructors_male: 0,
    instructors_female: 0,
    courses: 0,
    loading: true,
    studentsRegistrations: [
      { x: "June", y: 4 },
      { x: "May", y: 0 },
      { x: "April", y: 0 },
      { x: "March", y: 0 },
      { x: "February", y: 0 },
      { x: "January", y: 0 },
      { x: "December", y: 0 }
    ]
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  _snack = params => {
    if (this.props.location.snack) {
      let snack = this.props.location.snack;
      this.setState({ open: true, resType: snack.type, serverRes: snack.msg });
      setTimeout(
        function() {
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
        function() {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    }
  };
  _fetchDashData = () => {
    const FetchAsync = async () =>
      await (await fetch(`${globals.BASE_URL}/api/users/dash_data`, {
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
        body: JSON.stringify({})
      })).json();

    FetchAsync()
      .then(data => {
        //this.setState({currentPlace:data.results})
        if (data.success) {
          this.setState({
            students: data.students,
            students_male: data.students_male,
            students_female: data.students_female,
            trainers: data.trainers,
            trainers_male: data.trainers_male,
            trainers_female: data.trainers_female,
            instructors: data.instructors,
            instructors_male: data.instructors_male,
            instructors_female: data.instructors_female,
            courses: data.courses,
            studentsRegistrations: data.studentsRegistrations.reverse(),
            loading: false
          });
        } else {
          this._snack({ type: "warning", msg: data.message });
        }
      })
      .catch(error => {
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
          function() {
            this.setState({ open: false });
          }.bind(this),
          6000 * 9999
        );
      });
  };
  componentDidMount = () => {
    this._fetchDashData();
  };
  render() {
    const { classes } = this.props;
    const { state } = this;
    const datax = [
      {
        id: "Students",
        color: "greeen",
        data: state.studentsRegistrations
      }
    ];
    if (state.loading) {
      return (
        <div style={center}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    return (
      <div>
        <Row gutter={10}>
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <Card
              bordered={false}
              style={{ backgroundColor: "#1890ff", marginTop: "10px " }}
            >
              <MDBIcon
                icon="graduation-cap"
                style={{ fontSize: "60px", color: "#ffffff" }}
              />
              <div style={{ float: "right", color: "#ffffff" }}>
                <h5 style={{ color: "#ffffff" }}>{state.students}</h5>
                <p style={{ color: "#ffffff" }}> Students </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <Card
              bordered={false}
              style={{ backgroundColor: "#1890ff", marginTop: "10px " }}
            >
              <MDBIcon
                icon="user-friends"
                style={{ fontSize: "60px", color: "#ffffff" }}
              />
              <div style={{ float: "right" }}>
                <h5 style={{ color: "#ffffff" }}>{state.trainers}</h5>
                <p style={{ color: "#ffffff" }}>Trianers </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <Card
              bordered={false}
              style={{ backgroundColor: "#1890ff", marginTop: "10px " }}
            >
              <MDBIcon
                icon="users"
                style={{ fontSize: "60px", color: "#ffffff" }}
              />
              <div style={{ float: "right" }}>
                <h5 style={{ color: "#ffffff" }}>{state.instructors}</h5>
                <p style={{ color: "#ffffff" }}> Instructors </p>
              </div>
            </Card>
          </Col>{" "}
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <Card
              bordered={false}
              style={{ backgroundColor: "#1890ff", marginTop: "10px " }}
            >
              <MDBIcon
                fab
                icon="readme"
                style={{ fontSize: "60px", color: "#ffffff" }}
              />
              <div style={{ float: "right" }}>
                <h5 style={{ color: "#ffffff" }}>{state.courses}</h5>
                <p style={{ color: "#ffffff" }}>Courses </p>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "#fff",
                marginTop: "15px "
              }}
            >
              <h5 style={{ textAlign: "center" }}>Students comparison</h5>
              <div style={{ height: "250px" }}>
                <ResponsivePie
                  data={[
                    {
                      id: "male",
                      label: "Male",
                      value: 10 || state.students_male,
                      color: "blue"
                    },
                    {
                      id: "female",
                      label: "Female",
                      value: state.students_female,
                      color: "green"
                    }
                  ]}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={0}
                  colors={{ scheme: "category10" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: "color" }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                    }
                  ]}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#999",
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000"
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </Card>
          </Col>{" "}
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "#fff",
                marginTop: "15px "
              }}
            >
              <h5 style={{ textAlign: "center" }}>Trainers comparison</h5>
              <div style={{ height: "250px" }}>
                <ResponsivePie
                  data={[
                    {
                      id: "male",
                      label: "Male",
                      value: 10 || state.trainers_male,
                      color: "blue"
                    },
                    {
                      id: "female",
                      label: "Female",
                      value: state.trainers_female,
                      color: "green"
                    }
                  ]}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={0}
                  colors={{ scheme: "category10" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: "color" }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                    }
                  ]}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#999",
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000"
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </Card>
          </Col>{" "}
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "#fff",
                marginTop: "15px "
              }}
            >
              <h5 style={{ textAlign: "center" }}>Instructors comparison</h5>
              <div style={{ height: "250px" }}>
                <ResponsivePie
                  data={[
                    {
                      id: "male",
                      label: "Male",
                      value: 10 || state.instructors_male,
                      color: "blue"
                    },
                    {
                      id: "female",
                      label: "Female",
                      value: state.instructors_female,
                      color: "green"
                    }
                  ]}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={0}
                  colors={{ scheme: "category10" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: "color" }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                    }
                  ]}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#999",
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000"
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </Card>
          </Col>{" "}
        </Row>
        <Row>
          {" "}
          <Col sm={{ span: 24 }} md={{ span: 12 }}>
            {" "}
            <Card
              bordered={false}
              style={{
                backgroundColor: "#fff",
                marginTop: "15px "
              }}
            >
              <h5 style={{ textAlign: "center" }}>
                Students admissions in the past 6 months
              </h5>
              <div style={{ height: "300px" }}>
                {" "}
                <ResponsiveLine
                  data={datax}
                  curve="cardinal"
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    stacked: true,
                    min: "auto",
                    max: "auto"
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Months",
                    legendOffset: 36,
                    legendPosition: "middle"
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "No.",
                    legendOffset: -40,
                    legendPosition: "middle"
                  }}
                  colors={{ scheme: "category10" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="y"
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </Card>
          </Col>{" "}
          <Col sm={{ span: 24 }} md={{ span: 12 }}>
            {" "}
            <Card
              bordered={false}
              style={{
                backgroundColor: "#fff",
                marginTop: "15px "
              }}
            >
              <h5 style={{ textAlign: "center" }}>
                Students admissions by gender comparison
              </h5>
              <div style={{ height: "300px" }}>
                {" "}
                <ResponsiveLine
                  data={data3}
                  curve="cardinal"
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    stacked: true,
                    min: "auto",
                    max: "auto"
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Months",
                    legendOffset: 36,
                    legendPosition: "middle"
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "No.",
                    legendOffset: -40,
                    legendPosition: "middle"
                  }}
                  colors={{ scheme: "category10" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="y"
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withGlobalContext(withStyles(dashboardStyle)(Dashboard));
const center = {
  position: "absolute",
  left: "58.5%",
  top: "50%",
  "-webkit-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};
const data = [
  {
    id: "male",
    label: "Male",
    value: 150,
    color: "blue"
  },
  {
    id: "female",
    label: "female",
    value: 150,
    color: "green"
  }
];

const data2 = [
  {
    id: "Students",
    color: "greeen",
    data: [
      {
        x: "january",
        y: 17
      },
      {
        x: "february",
        y: 10
      },
      {
        x: "march",
        y: 27
      },
      {
        x: "april",
        y: 17
      },
      {
        x: "may",
        y: 120
      },
      {
        x: "june",
        y: 78
      }
    ]
  }
];

const data3 = [
  {
    id: "Female",
    color: "green",
    data: [
      {
        x: "january",
        y: 5
      },
      {
        x: "february",
        y: 8
      },
      {
        x: "march",
        y: 12
      },
      {
        x: "april",
        y: 11
      },
      {
        x: "may",
        y: 22
      },
      {
        x: "june",
        y: 50
      }
    ]
  },
  {
    id: "Male",
    color: "green",
    data: [
      {
        x: "january",
        y: 17
      },
      {
        x: "february",
        y: 10
      },
      {
        x: "march",
        y: 27
      },
      {
        x: "april",
        y: 17
      },
      {
        x: "may",
        y: 60
      },
      {
        x: "june",
        y: 30
      }
    ]
  }
];

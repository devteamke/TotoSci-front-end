/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, Col, Row, Tabs } from "antd";
import globals from "../../constants/Globals";
import { withGlobalContext } from "../../context/Provider";
// core components
import GridItem from "../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../components/dcomponents/Grid/GridContainer.jsx";
const { TabPane } = Tabs;
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
  }
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Notifications" bordered={false}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Approval Requests" key="1">
                <div className="text-center">
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                    alt="not found"
                  />
                  <p>You have no new requests</p>
                </div>
              </TabPane>
              <TabPane tab="Feedback" key="2">
                <div className="text-center">
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                    alt="not found"
                  />
                  <p>You have no new messages</p>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withGlobalContext(withStyles(styles)(Notifications));

/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "../components/dcomponents/Navbars/Navbar.jsx";
import Footer from "../components/dcomponents//Footer/Footer.jsx";
import Sidebar from "../components/dcomponents//Sidebar/Sidebar.jsx";
import FixedPlugin from "../components/dcomponents//FixedPlugin/FixedPlugin.jsx";

import routes from "../routes/trainerRoutes";

import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/totosci.png";

import { withGlobalContext } from '../context/Provider';

//Modal logout 
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";


const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/trainer"  ) {
        return (
          <Route
			exact 
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);
let lRoutes = [];
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
		//
		logoutModal:false,
    };
  }
 //Weed out nested routes
  _lRoutes = () => {
	  lRoutes =[];
	 routes.map((r)=>{if(r.type!=='nested'){lRoutes.push(r)}else{}});
	  console.log(lRoutes);
	  
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  handleLogoutModal = () => {
	this.setState({logoutModal:!this.state.logoutModal});
  }

  componentWillMount =  () => {
	  this._lRoutes()
  }
  componentDidMount() {
	
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
		 <MDBModal isOpen={this.state.logoutModal} toggle={this.handleLogoutModal} centered>
			  <MDBModalHeader toggle={this.handleLogoutModal}>Logout Confirmation</MDBModalHeader>
			  <MDBModalBody>
			   Are you sure you want to logout?
			  </MDBModalBody>
			  <MDBModalFooter>
				<MDBBtn
					onClick={this.handleLogoutModal}>Cancel</MDBBtn>
				<MDBBtn color="danger" onClick={this.props.global.onLogout}>Yes</MDBBtn>
			  </MDBModalFooter>
		 </MDBModal>	
        <Sidebar
          routes={lRoutes}
          logoText={"Trainer"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
		  handleLogoutModal={this.handleLogoutModal}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
			brandRoutes={routes}  
            routes={lRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
			handleLogoutModal={this.handleLogoutModal}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
         
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withGlobalContext(withStyles(dashboardStyle)(Dashboard));

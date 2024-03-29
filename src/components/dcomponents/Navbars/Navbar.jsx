import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import ManagerNavbarLinks from "./ManagerNavbarLinks.jsx";
import Icon from "@material-ui/core/Icon";
import Button from "../CustomButtons/Button.jsx";
import { withGlobalContext } from '../../../context/Provider';

import headerStyle from "../../../assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.brandRoutes.map((prop, key) => {
		
      if (prop.layout + prop.path === props.location.pathname) {
        name =  prop.name;
      }
		// console.log('[lay]',prop.layout,'[path]', prop.path, '[location]', props.location.pathname )
	//To handle embeded routes
	
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const user = props.global.user;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {user.role=="admin"?
				<AdminNavbarLinks handleLogoutModal={props.handleLogoutModal} />:
				<ManagerNavbarLinks handleLogoutModal={props.handleLogoutModal} />
		  }
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withGlobalContext(withStyles(headerStyle)(Header));

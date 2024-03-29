/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link,withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, Home, Lock, ExitToApp } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.jsx";
import Button from "../CustomButtons/Button.jsx";

import headerLinksStyle from "../../../assetsweb/jss/material-kit-react/components/headerLinksStyle.jsx";

//Context
import { withGlobalContext } from "../../../context/Provider";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  const context = props.global;
	console.log('{context}', context);
  let route = props.location.pathname
  const  active ={
	  color:'green'
  } 
  return (
    <List className={classes.list}>
{ /*     <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <Link
          to="/"
         /* color="transparent"
          target="_self"*/
		  style={route=="/"?active:null}
          className={classes.navLink}
        >
          <Home className={classes.icons} /> Home
		  </Link>
     </ListItem>
		  
		{context.isAuthenticated? (
		  <ListItem className={classes.listItem}>
        <div
          
          className={classes.navLink}
		  onClick={context.onLogout}
        >
          <ExitToApp className={classes.icons} /> Logout
        </div>
      </ListItem>
		  
		  ):(
		  <ListItem className={classes.listItem}>
        <Link
          to="/login"
            style={route=="/login"?active:null}
          className={classes.navLink}
        >
          <Lock className={classes.icons} /> Login
        </Link>
      </ListItem>
		  
		  )}
		  
		  
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}


export default withGlobalContext(withRouter(withStyles(headerLinksStyle)(HeaderLinks)));

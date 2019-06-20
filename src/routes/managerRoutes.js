// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/Manager/users/AddUser.js";
import Users from "../views/Manager/users/Users.jsx";
import Single from "../views/Manager/users/Single";

import Profile from "../views/profile/Profile.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",

    icon: "dashboard",
    component: DashboardPage,
    layout: "/manager"
  },

  {
    path: "/profile",
    name: "My Profile",

    type: "hidden",
    icon: Person,
    component: Profile,
    layout: "/manager"
  }
];

export default dashboardRoutes;

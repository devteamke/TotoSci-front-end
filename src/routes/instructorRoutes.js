// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import Classes from "../views/Instructor/classes/Classes";
import SingleClass from "../views/Instructor/classes/SingleClass";

import Profile from "../views/profile/Profile.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",

    icon: "dashboard",
    component: DashboardPage,
    layout: "/instructor"
  },
  //Classes routes
  {
    path: "/classes",
    name: "Classes",
    sub: "All Classes",
    icon: "profile",
    component: Classes,
    layout: "/instructor"
  },

  {
    path: "/classes/Single",
    name: "Single Class",

    component: SingleClass,
    layout: "/instructor",
    type: "omit"
  },

  {
    path: "/profile",
    name: "My Profile",

    type: "hidden",
    icon: Person,
    component: Profile,
    layout: "/instructor"
  }
];

export default dashboardRoutes;

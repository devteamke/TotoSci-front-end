// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import ListAlt from "@material-ui/icons/ListAlt";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/Manager/users/AddUser.js";
import Users from "../views/Manager/users/Users.jsx";
import Single from "../views/Manager/users/Single";

import Courses from "../views/Manager/courses/Courses";
import AddCourse from "../views/Manager/courses/Add";

import Profile from "../views/profile/Profile.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",

    icon: Dashboard,
    component: DashboardPage,
    layout: "/manager"
  },

  {
    path: "/users",
    name: "Personnel",

    icon: SupervisedUserCircle,
    component: Users,
    layout: "/manager"
  },

  {
    path: "/users/add",
    name: "Personnel : Add",

    component: AddUser,
    layout: "/manager",
    type: "nested"
  },

  {
    path: "/courses",
    name: "Courses",

    icon: ListAlt,
    component: Courses,
    layout: "/manager"
  },
  {
    path: "/courses/add",
    name: "Courses : Add",

    component: AddCourse,
    layout: "/manager",
    type: "nested"
  },
  {
    path: "/users/single",
    name: "Users : Single",

    icon: SupervisedUserCircle,
    type: "nested",
    component: Single,
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

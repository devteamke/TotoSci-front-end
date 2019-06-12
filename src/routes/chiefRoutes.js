// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import School from "@material-ui/icons/School";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/ChiefTrainer/users/AddUser.js";
import Users from "../views/ChiefTrainer/users/Users.jsx";

import Students from "../views/ChiefTrainer/students/Students";
import Register from "../views/ChiefTrainer/students/Register";

import Single from "../views/ChiefTrainer/users/Single";
import Profile from "../views/profile/Profile.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",

    icon: Dashboard,
    component: DashboardPage,
    layout: "/chief-trainer"
  },
  //Student routes
  {
    path: "/students",
    name: "Students",

    icon: School,
    component: Students,
    layout: "/chief-trainer"
  },
  {
    path: "/students/register",
    name: "Students : Register",

    component: Register,
    layout: "/chief-trainer",
    type: "nested"
  },
  {
    path: "/students/single",
    name: "Students: Single",

    icon: SupervisedUserCircle,
    type: "nested",
    component: Single,
    layout: "/chief-trainer"
  },
  //Personell routes
  {
    path: "/users",
    name: "Personnel",

    icon: SupervisedUserCircle,
    component: Users,
    layout: "/chief-trainer"
  },
  {
    path: "/users/add",
    name: "Personnel : Add",

    component: AddUser,
    layout: "/chief-trainer",
    type: "nested"
  },
  {
    path: "/users/single",
    name: "Users : Single",

    icon: SupervisedUserCircle,
    type: "nested",
    component: Single,
    layout: "/chief-trainer"
  },

  {
    path: "/profile",
    name: "My Profile",

    type: "hidden",
    icon: Person,
    component: Profile,
    layout: "/chief-trainer"
  }
];

export default dashboardRoutes;

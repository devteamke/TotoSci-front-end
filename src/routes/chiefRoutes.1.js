// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import School from "@material-ui/icons/School";
import ListAlt from "@material-ui/icons/ListAlt";
import AccountBalance from "@material-ui/icons/AccountBalance";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/ChiefTrainer/users/AddUser.js";
import Users from "../views/ChiefTrainer/users/Users.jsx";

import Students from "../views/ChiefTrainer/students/Students";
import Register from "../views/ChiefTrainer/students/Register";
import SingleStudent from "../views/ChiefTrainer/students/Single";

import Schools from "../views/ChiefTrainer/School/Schools";
import SingleSchool from "../views/ChiefTrainer/School/Single";
import AddSchool from "../views/ChiefTrainer/School/Add";

import Courses from "../views/ChiefTrainer/courses/Courses";
import SingleCourse from "../views/ChiefTrainer/courses/Single";
import AddCourse from "../views/ChiefTrainer/courses/Add";

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
    component: SingleStudent,
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
  //Courses routes

  {
    path: "/courses",
    name: "Courses",

    icon: ListAlt,
    component: Courses,
    layout: "/chief-trainer"
  },
  {
    path: "/courses/add",
    name: "Courses : Add",

    component: AddCourse,
    layout: "/chief-trainer",
    type: "nested"
  },
  {
    path: "/courses/single",
    name: "Courses : Single",

    component: SingleCourse,
    layout: "/chief-trainer",
    type: "nested"
  },

  //Schools routes
  {
    path: "/schools",
    name: "Schools",

    icon: AccountBalance,
    component: Schools,
    layout: "/chief-trainer"
  },
  {
    path: "/schools/add",
    name: "School : Add",

    component: AddSchool,
    layout: "/chief-trainer",
    type: "nested"
  },
  {
    path: "/Schools/single",
    name: "School : Single",

    component: SingleSchool,
    layout: "/chief-trainer",
    type: "nested"
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

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
import Notifications from "../views/Notifications/Notifications.jsx";

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

import Compose from "../views/ChiefTrainer/Feedback/Compose";
import Feedback from "../views/ChiefTrainer/Feedback/Feedback";
import SingleThread from "../views/ChiefTrainer/Feedback/SingleThread";


import AddInvoice from "../views/ChiefTrainer/Invoices/AddInvoice";
import InvoiceDetails from "../views/ChiefTrainer/Invoices/genInvoiceData";

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
    sub: "All Students",
    icon: "read",
    component: Students,
    layout: "/chief-trainer"
  },
  {
    path: "/students/register",
    name: "Add Student",

    component: Register,
    layout: "/chief-trainer",
    type: "nested"
  },

  //Personell routes
  {
    path: "/users",
    name: "Personnel",
    sub: "All Personnel",
    icon: "team",
    component: Users,
    layout: "/chief-trainer"
  },
  {
    path: "/users/add",
    name: "Add Personnel",

    component: AddUser,
    layout: "/chief-trainer",
    type: "nested"
  },

  //Courses routes

  {
    path: "/courses",
    name: "Courses",
    sub: "All Courses",
    icon: "unordered-list",
    component: Courses,
    layout: "/chief-trainer"
  },
  {
    path: "/courses/add",
    name: "Add Course",

    component: AddCourse,
    layout: "/chief-trainer",
    type: "nested"
  },

  //Schools routes
  {
    path: "/schools",
    name: "Schools",
    sub: "All Schools",
    icon: "appstore",
    component: Schools,
    layout: "/chief-trainer"
  },
  {
    path: "/schools/add",
    name: "Add School",

    component: AddSchool,
    layout: "/chief-trainer",
    type: "nested"
  },
  //Feedback
  {
    path: "/feedback",
    name: "Feedback",
    sub: "All Feedback",
    icon: "mail",
    component: Feedback,
    layout: "/chief-trainer"
  },
  {
    path: "/feedback/compose",
    name: "Compose",

    component: Compose,
    layout: "/chief-trainer",
    type: "nested"
  },
  {
    path: "/feedback/single",
    name: "Single Thread",

    component: SingleThread,
    layout: "/chief-trainer",
    type: "hidden"
  },
  //Profile
  {
    path: "/profile",
    name: "My Profile",

    type: "hidden",
    icon: Person,
    component: Profile,
    layout: "/chief-trainer"
  },
  //Notifications
  {
    path: "/notifications",
    name: "My Notifications",

    type: "hidden",

    component: Notifications,
    layout: "/chief-trainer"
  },
  //Invoice generation
  //Notifications
  // {
  //   path: "/invoices",
  //   name: "Invoices",

  //   icon: AccountBalance,
  //   component: AddInvoice,
  //   layout: "/chief-trainer"
  // },
  // {
  //   path: "/invoices/new",
  //   name: "newInvoice",
  // type:'hidden',
  //   // icon: AccountBalance,
  //   component: InvoiceDetails,
  //   layout: "/chief-trainer"
  // }
];

export default dashboardRoutes;

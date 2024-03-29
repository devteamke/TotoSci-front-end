// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import Single from "../views/Parent/students/Single";
import Profile from "../views/profile/Profile.jsx";
import Schools from "../views/Parent/School/Schools";
import Classes from "../views/Parent/classes/Classes";
// import SingleClass from "../views/Parent/classes/SingleClass";
// import AddClasses from "../views/Parent/classes/Add";
import Students from "../views/Parent/students/Students";
import Courses from "../views/Parent/courses/Courses";

import Invoices from "../views/Parent/Account/Invoices";

//import Compose from "../views/Parent/Feedback/Compose";

import Compose from "../views/Parent/Feedback/Compose";
import Feedback from "../views/Parent/Feedback/Feedback";
import SingleThread from "../views/Parent/Feedback/SingleThread";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",

    icon: "dashboard",
    component: DashboardPage,
    layout: "/parent"
  },

  {
    path: "/profile",
    name: "My Profile",

    type: "hidden",
    icon: Person,
    component: Profile,
    layout: "/parent"
  },
  //Student routes
  {
    path: "/mystudents",
    name: "My Students",
    sub: "All Students",
    icon: "read",
    component: Students,
    layout: "/parent"
  },
  {
    path: "/mystudents/single",
    name: "My Students",
    sub: "All Students",
    icon: "read",
    component: Single,
    layout: "/parent",
    type: "omit"
  },
  //Courses routes

  {
    path: "/courses",
    name: "Courses",
    sub: "All Courses",
    icon: "unordered-list",
    component: Courses,
    layout: "/parent"
  },
  //Schools routes
  {
    path: "/schools",
    name: "Schools",
    sub: "All Schools",
    icon: "appstore",
    component: Schools,
    layout: "/parent"
  },
  {
    path: "/account",
    name: "Account",

    icon: "appstore",
    component: Invoices,
    layout: "/parent"
  },
  //Notifications
  // {
  //   path: "/notifications",
  //   name: "My Notifications",

  //   type: "hidden",

  //   component: Notifications,
  //   layout: "/chief-trainer"
  // }
  //Feedback
  {
    path: "/feedback",
    name: "Feedback",
    sub: "All Feedback",
    icon: "mail",
    component: Feedback,
    layout: "/parent"
  },
  {
    path: "/feedback/compose",
    name: "Compose",

    component: Compose,
    layout: "/parent",
    type: "nested"
  },
  {
    path: "/feedback/single",
    name: "Single Thread",

    component: SingleThread,
    layout: "/parent",
    type: "hidden"
  }
];

export default dashboardRoutes;

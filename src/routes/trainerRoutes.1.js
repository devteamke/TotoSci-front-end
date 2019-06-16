// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddInstructor from "../views/Trainer/instructors/AddInstructor.js";
import Instructors from "../views/Trainer/instructors/Instructors.jsx";
import Single from "../views/Trainer/instructors/Single";
import Profile from "../views/profile/Profile.jsx";

import Classes from "../views/Trainer/classes/Classes";
import SingleClass from "../views/Trainer/classes/Single";
import AddClasses from "../views/Trainer/classes/Add";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",

    icon: Dashboard,
    component: DashboardPage,
    layout: "/trainer"
  },

  //Instructors

  {
    path: "/instructors",
    name: "Instructors",

    icon: SupervisedUserCircle,
    component: Instructors,
    layout: "/trainer"
  },
  {
    path: "/instructors/single",
    name: "Instructors : Single",

    type: "nested",
    component: Single,
    layout: "/trainer"
  },

  {
    path: "/instructors/Add",
    name: "Instructors : Add",

    component: AddInstructor,
    layout: "/trainer",
    type: "nested"
  },

  //Classes routes
  {
    path: "/classes",
    name: "Classes",

    icon: LibraryBooks,
    component: Classes,
    layout: "/trainer"
  },
  {
    path: "/classes/add",
    name: "Classes : Add",

    component: AddClasses,
    layout: "/trainer",
    type: "nested"
  },
  {
    path: "/Classes/single",
    name: "Classe : Single",

    component: SingleClass,
    layout: "/trainer",
    type: "nested"
  },

  {
    path: "/profile",
    name: "My Profile",

    type: "hidden",
    icon: Person,
    component: Profile,
    layout: "/trainer"
  }
];

export default dashboardRoutes;

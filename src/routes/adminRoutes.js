// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/addUser/AddUser.js";
import Users from "../views/users/Users.jsx";
import Single from "../views/users/Single";
import Profile from  "../views/profile/Profile.jsx";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/addUsers",
    name: "Add Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Add,
    component: AddUser,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "قائمة الجدول",
    icon: SupervisedUserCircle,
    component: Users,
    layout: "/admin"
  },  
	{
    path: "/users/single",
    name: "Users : Single",
    rtlName: "قائمة الجدول",
    icon: SupervisedUserCircle,
	type:'nested',
    component: Single,
    layout: "/admin"
  }, 

	{
    path: "/profile",
    name: "My Profile",
    rtlName: "قائمة الجدول",
	type:'hidden',
    icon: Person,
    component: Profile,
    layout: "/admin"
  },

  
 

];

export default dashboardRoutes;

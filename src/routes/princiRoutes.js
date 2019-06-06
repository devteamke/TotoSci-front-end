// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import NoteAdd from "@material-ui/icons/NoteAdd";

// core components/views for Prinicipal layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddStaff from "../views/addStaff/AddStaff.js";
import Enroll from "../views/enroll/Enroll";
import AllStaff from  "../views/allStaff/AllStaff.jsx";
import Profile from  "../views/profile/Profile.jsx";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/princi"
  },
	{
    path: "/enroll",
    name: "Enroll Student",
    rtlName: "ملف تعريفي للمستخدم",
    icon: NoteAdd
		,
    component: Enroll,
    layout: "/princi"
  },
  {
    path: "/addStaff",
    name: "Add Staff",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Add,
    component: AddStaff,
    layout: "/princi"
  },
	
  {
    path: "/allStaff",
    name: "All Staff",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: AllStaff,
    layout: "/princi"
  },


  
 

];

export default dashboardRoutes;

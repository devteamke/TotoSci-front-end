// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/Admin/addUser/AddUser.js";
import Users from "../views/Admin/users/Users.jsx";
import Single from "../views/Admin/users/Single";
import Profile from  "../views/profile/Profile.jsx";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/addUsers",
    name: "Add Users",
 
    icon: Add,
    component: AddUser,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    
    icon: SupervisedUserCircle,
    component: Users,
    layout: "/admin"
  },  
	{
    path: "/users/single",
    name: "Users : Single",
    
    icon: SupervisedUserCircle,
	type:'nested',
    component: Single,
    layout: "/admin"
  }, 

	{
    path: "/profile",
    name: "My Profile",
   
	type:'hidden',
    icon: Person,
    component: Profile,
    layout: "/admin"
  },

  
 

];

export default dashboardRoutes;

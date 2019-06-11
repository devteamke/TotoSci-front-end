// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/Trainer/addUser/AddUser.js";
import Users from "../views/Trainer/users/Users.jsx";
import Single from "../views/Trainer/users/Single";
import Profile from  "../views/profile/Profile.jsx";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    
    icon: Dashboard,
    component: DashboardPage,
    layout: "/trainer"
  },
  {
    path: "/addUsers",
    name: "Add Users",
 
    icon: Add,
    component: AddUser,
    layout: "/trainer"
  },
  {
    path: "/users",
    name: "Users",
    
    icon: SupervisedUserCircle,
    component: Users,
    layout: "/trainer"
  },  
	{
    path: "/users/single",
    name: "Users : Single",
    
    icon: SupervisedUserCircle,
	type:'nested',
    component: Single,
    layout: "/trainer"
  }, 

	{
    path: "/profile",
    name: "My Profile",
   
	type:'hidden',
    icon: Person,
    component: Profile,
    layout: "/trainer"
  },

  
 

];

export default dashboardRoutes;

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

import AddUser from "../views/ChiefTrainer/addUser/AddUser.js";
import Users from "../views/ChiefTrainer/users/Users.jsx";
import Single from "../views/ChiefTrainer/users/Single";
import Profile from  "../views/profile/Profile.jsx";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    
    icon: Dashboard,
    component: DashboardPage,
    layout: "/chief-trainer"
  },
  {
    path: "/addUsers",
    name: "Add Users",
 
    icon: Add,
    component: AddUser,
    layout: "/chief-trainer"
  },
  {
    path: "/users",
    name: "Users",
    
    icon: SupervisedUserCircle,
    component: Users,
    layout: "/chief-trainer"
  },  
	{
    path: "/users/single",
    name: "Users : Single",
    
    icon: SupervisedUserCircle,
	type:'nested',
    component: Single,
    layout: "/chief-trainer"
  }, 

	{
    path: "/profile",
    name: "My Profile",
   
	type:'hidden',
    icon: Person,
    component: Profile,
    layout: "/chief-trainer"
  },

  
 

];

export default dashboardRoutes;

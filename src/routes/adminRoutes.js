// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Add from '@material-ui/icons/Add';
import Person from '@material-ui/icons/Person';

// core components/views for Admin layout
import DashboardPage from '../views/Dashboard/Dashboard.jsx';

import AddUser from '../views/Admin/users/AddUser.js';
import Users from '../views/Admin/users/Users.jsx';
import Single from '../views/Admin/users/Single';
import Profile from '../views/profile/Profile.jsx';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',

    icon: 'dashboard',
    component: DashboardPage,
    layout: '/admin'
  },

  {
    path: '/users',
    name: 'Users',
    sub: 'All Personnel',
    icon: 'team',
    component: Users,
    layout: '/admin'
  },

  {
    path: '/users/add',
    name: 'Add Users',

    type: 'nested',
    component: AddUser,
    layout: '/admin'
  },
  {
    path: '/profile',
    name: 'My Profile',

    type: 'hidden',

    component: Profile,
    layout: '/admin'
  }
];

export default dashboardRoutes;

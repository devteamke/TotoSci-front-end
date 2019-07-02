// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Add from '@material-ui/icons/Add';
import Person from '@material-ui/icons/Person';

// core components/views for Admin layout
import DashboardPage from '../views/Dashboard/Dashboard.jsx';

import Compose from '../views/Parent/Feedback/Compose';
import Feedback from '../views/Parent/Feedback/Feedback';
import SingleThread from '../views/Parent/Feedback/SingleThread';

import Profile from '../views/profile/Profile.jsx';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',

    icon: 'dashboard',
    component: DashboardPage,
    layout: '/manager'
  },

  {
    path: '/profile',
    name: 'My Profile',

    type: 'hidden',
    icon: Person,
    component: Profile,
    layout: '/manager'
  },
  //Feedback
  {
    path: '/feedback',
    name: 'Feedback',
    sub: 'All Feedback',
    icon: 'mail',
    component: Feedback,
    layout: '/manager'
  },
  {
    path: '/feedback/compose',
    name: 'Compose',

    component: Compose,
    layout: '/manager',
    type: 'nested'
  },
  {
    path: '/feedback/single',
    name: 'Single Thread',

    component: SingleThread,
    layout: '/manager',
    type: 'hidden'
  }
];

export default dashboardRoutes;

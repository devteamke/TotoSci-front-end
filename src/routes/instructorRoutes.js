// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Add from '@material-ui/icons/Add';
import Person from '@material-ui/icons/Person';

// core components/views for Admin layout
import DashboardPage from '../views/Dashboard/Dashboard.jsx';
import Classes from '../views/Instructor/classes/Classes';
import SingleClass from '../views/Instructor/classes/SingleClass';

import Compose from '../views/Instructor/Feedback/Compose';
import Feedback from '../views/Instructor/Feedback/Feedback';
import SingleThread from '../views/Instructor/Feedback/SingleThread';

import Profile from '../views/profile/Profile.jsx';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',

    icon: 'dashboard',
    component: DashboardPage,
    layout: '/instructor'
  },
  //Classes routes
  {
    path: '/classes',
    name: 'Classes',
    sub: 'All Classes',
    icon: 'profile',
    component: Classes,
    layout: '/instructor'
  },

  {
    path: '/classes/Single',
    name: 'Single Class',

    component: SingleClass,
    layout: '/instructor',
    type: 'omit'
  },

  {
    path: '/profile',
    name: 'My Profile',

    type: 'hidden',
    icon: Person,
    component: Profile,
    layout: '/instructor'
  },

  //Feedback
  {
    path: '/feedback',
    name: 'Feedback',
    sub: 'All Feedback',
    icon: 'mail',
    component: Feedback,
    layout: '/instructor'
  },
  {
    path: '/feedback/compose',
    name: 'Compose',

    component: Compose,
    layout: '/instructor',
    type: 'nested'
  },
  {
    path: '/feedback/single',
    name: 'Single Thread',

    component: SingleThread,
    layout: '/instructor',
    type: 'hidden'
  }
];

export default dashboardRoutes;

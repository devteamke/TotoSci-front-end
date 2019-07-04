// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Add from '@material-ui/icons/Add';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
// core components/views for Admin layout
import DashboardPage from '../views/Dashboard/Dashboard.jsx';

import AddInstructor from '../views/Trainer/instructors/AddInstructor.js';
import Instructors from '../views/Trainer/instructors/Instructors.jsx';
import Single from '../views/Trainer/instructors/Single';
import Profile from '../views/profile/Profile.jsx';

import Classes from '../views/Trainer/classes/Classes';
import SingleClass from '../views/Trainer/classes/SingleClass';
import AddClasses from '../views/Trainer/classes/Add';

import Compose from '../views/Trainer/Feedback/Compose';
import Feedback from '../views/Trainer/Feedback/Feedback';
import SingleThread from '../views/Trainer/Feedback/SingleThread';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',

    icon: Dashboard,
    component: DashboardPage,
    layout: '/trainer'
  },

  //Instructors

  {
    path: '/instructors',
    name: 'Instructors',
    sub: 'All Instructors',
    icon: 'team',

    component: Instructors,
    layout: '/trainer'
  },

  {
    path: '/instructors/Add',
    name: 'Add Instructor',

    component: AddInstructor,
    layout: '/trainer',
    type: 'nested'
  },

  //Classes routes
  {
    path: '/classes',
    name: 'Classes',
    sub: 'All Classes',
    icon: 'profile',
    component: Classes,
    layout: '/trainer'
  },
  {
    path: '/classes/add',
    name: 'Add Class',

    component: AddClasses,
    layout: '/trainer',
    type: 'nested'
  },

  {
    path: '/classes/Single',
    name: 'Single Class',

    component: SingleClass,
    layout: '/trainer',
    type: 'omit'
  },
  {
    path: '/profile',
    name: 'My Profile',

    type: 'hidden',
    icon: Person,
    component: Profile,
    layout: '/trainer'
  },
  //Feedback
  {
    path: '/feedback',
    name: 'Feedback',
    sub: 'All Feedback',
    icon: 'mail',
    component: Feedback,
    layout: '/trainer'
  },
  {
    path: '/feedback/compose',
    name: 'Compose',

    component: Compose,
    layout: '/trainer',
    type: 'nested'
  },
  {
    path: '/feedback/single',
    name: 'Single Thread',

    component: SingleThread,
    layout: '/trainer',
    type: 'hidden'
  }
];

export default dashboardRoutes;

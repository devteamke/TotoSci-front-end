import React from 'react';

import './App.css';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
//custom pages with no layout
import Home from './views/LandingPage/LandingPage';
import About from './views/about/About';
import Login from './views/login/Login';
import Register from './views/Register/Register';
import Reset from './views/reset/Reset';
import ResetPassword from './views/reset/ResetPassword';
import Nav from './components/navbar/Navbar';
import CompleteProfile from './views/completeProfile/CompleteProfile';
//Tromas
import Tromas from './views/Index/Index2';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './assets/scss/mdb.scss';
import 'antd/dist/antd.css';
import { withGlobalContext } from './context/Provider';
import Admin from './layouts/Admin';
import Manager from './layouts/Manager';
import Chief from './layouts/Chief';
import Trainer from './layouts/Trainer';
import Instructor from './layouts/Instructor';
import Parent from './layouts/Parent';
import Original from './layouts/Original';
import { Spin, Icon } from 'antd';
const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
class App extends React.Component {
  render() {
    const gstate = this.props.global;
    if (gstate.loadingState) {
      return (
        <div style={{ ...center, left: this.props.broken ? '50%' : '58.3%' }}>
          <Spin indicator={antIconLarge} />
        </div>
      );
    }
    if (gstate.isAuthenticated) {
      if (gstate.user.role == 'admin') {
        return (
          <Router>
            <div>
              {/*<Nav/>*/}

              <Switch>
                <Route path='/original' component={Original} />

                <Route path='/admin' component={Admin} />
                <Route path='/**/' component={Admin} />
              </Switch>
            </div>
          </Router>
        );
      }
      //Other users
      if (gstate.user.role !== 'admin' && !gstate.user.isSetUp) {
        return (
          <Router>
            <div>
              <Switch>
                {/* duplicate and modify admin layout */}
                <Route path='/completeprofile' component={CompleteProfile} />
                <Route path='/**/' component={CompleteProfile} />
              </Switch>
            </div>
          </Router>
        );
      } else {
        if (gstate.user.role == 'manager') {
          return (
            <Router>
              <div>
                <Switch>
                  <Route path='/manager' component={Manager} />
                  <Route path='/**/' component={Manager} />
                </Switch>
              </div>
            </Router>
          );
        } else if (gstate.user.role == 'chief-trainer') {
          return (
            <Router>
              <Switch>
                <Route path='/chief-trainer' component={Chief} />
                <Route path='/**/' component={Chief} />
              </Switch>
            </Router>
          );
        } else if (gstate.user.role == 'trainer') {
          return (
            <Router>
              <div>
                <Switch>
                  <Route path='/trainer' component={Trainer} />
                  <Route path='/**/' component={Trainer} />
                </Switch>
              </div>
            </Router>
          );
        } else if (gstate.user.role == 'instructor') {
          return (
            <Router>
              <div>
                <Switch>
                  <Route path='/trainer' component={Instructor} />
                  <Route path='/**/' component={Instructor} />
                </Switch>
              </div>
            </Router>
          );
        } else if (gstate.user.role == 'parent') {
          return (
            <Router>
              <div>
                <Switch>
                  <Route path='/parent' component={Parent} />
                  <Route path='/**/' component={Parent} />
                </Switch>
              </div>
            </Router>
          );
        }
      }
    } else {
      return (
        <Router>
          <div>
            {/*<Nav/>*/}
            <Switch>
              <Route path='/login/' component={Login} />
              {/* <Route path='/(|home|)/' component={Home} /> */}
              <Route path='/(|home|)/' component={Tromas} />
              <Route path='/register/' component={Register} />
              <Route path='/original' component={Original} />
              <Route exact path='/reset' component={Reset} />
              <Route
                path='/reset/:id'
                render={props => <ResetPassword {...props} />}
              />
              {/* <Route path='/' component={Tromas} /> */}
              <Route path='/**/' component={Login} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default withGlobalContext(App);
const center = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
};

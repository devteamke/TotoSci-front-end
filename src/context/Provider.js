import React from 'react';

//import globals from '../constants/Globals';
import jwt_decode from 'jwt-decode';
const GlobalContext = React.createContext({});

const parseUser = user => {
  if (typeof user.phone_number == 'object') {
    user = {
      ...user,

      phone_number: user.phone_number.main,
      alt_phone_number: user.phone_number.alt
    };
  }
  user = { ...user, idno: user.idNumber ? user.idNumber.toString() : '' };
  return user;
};

export class GlobalContextProvider extends React.Component {
  state = {
    check: 'context is working',
    isOnline: 'true',
    isAuthenticated: false,
    loadingState: true,
    user: {},
    token: '',
    location: '',
    headerSearch: '',
    fullPlaceId: ''
  };
  _storeData = async token => {
    try {
      await localStorage.setItem('token', token);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  _deleteStoredData = async token => {
    try {
      await localStorage.removeItem('token');
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  // onUpdateSetUp = () => {
  //   const UpdateSetUpAsync = async () =>
  //     await (await fetch(`${globals.BASE_URL}/api/users/new_token`, {
  //       method: 'post',
  //       mode: 'cors', // no-cors, cors, *same-origin
  //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: 'same-origin', // include, *same-origin, omit
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: this.state.token
  //       },
  //       redirect: 'follow', // manual, *follow, error
  //       referrer: 'no-referrer', // no-referrer, *client
  //       body: JSON.stringify({ hello: 'me' })
  //     })).json();

  //   UpdateSetUpAsync()
  //     .then(data => {
  //       console.log(data);

  //       if (data.success) {
  //         const user = jwt_decode(data.token);
  //         console.log('[new user]', user);
  //         this.setState({ token: data.token, user: user });
  //         this._storeData(data.token);
  //       } else {
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   // this.setState(prevState => ({
  //   //   user:{...prevState.user,
  //   //     isSetUp:true
  //   //   }
  //   // }))
  //   // console.log('[user]', this.state.user)
  // };

  onLogin = (token, user) => {
    this.setState({
      isAuthenticated: true,
      token: token,
      user: parseUser(user)
    });

    this._storeData(token);

    //this.setState({isAuthenticated:true})
  };
  onLogout = () => {
    this.setState({ isAuthenticated: false, token: '', user: '' });
    this._deleteStoredData();
  };
  onSetHeaderSearch = headerSearch => {
    this.setState({ headerSearch });
  };
  onSetFullPlace = fullPlaceId => {
    return new Promise(resolve => {
      this.setState({ fullPlaceId }, () => resolve());
    });
  };
  onUpdateUser = (user, token) => {
    this.setState({ user: parseUser(user) });
    this._storeData(token);
  };
  componentDidMount = () => {
    // const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const token = localStorage.getItem('token');

    if (token) {
      const user = parseUser(jwt_decode(token));

      console.log(user.exp, ' vs ', Date.now() / 1000)
      if (user.exp < Date.now() / 1000) {

        this.onLogout()
      } else {

        this.onLogin(token, user);
      }

    }
    this.setState({ loadingState: false });
  };
  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          onLogout: this.onLogout,
          onLogin: this.onLogin,

          setFullPlace: this.onSetFullPlace,
          updateUser: this.onUpdateUser
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

// create the consumer as higher order component
export const withGlobalContext = ChildComponent => props => (
  <GlobalContext.Consumer>
    {context => <ChildComponent {...props} global={context} />}
  </GlobalContext.Consumer>
);

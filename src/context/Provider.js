import React from 'react';

//import globals from '../constants/Globals';
import jwt_decode from 'jwt-decode';
const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  state = {
	check:'context is working',
    isOnline: 'true',
    isAuthenticated: false,
    user: {
     
    },
    token: '',
    location: '',
    headerSearch: '',
    fullPlaceId: ''
  };
  _storeData = async token => {
    try {
      await localStorage.setItem('token', token);
    }
	  catch (error) {
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
    this.setState({ isAuthenticated: true, token: token, user: user });
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
  componentDidMount = () => {
	 // const rememberMe = localStorage.getItem('rememberMe') === 'true';
	  const token = localStorage.getItem('token');
	  
	  if(token){
		  const user = jwt_decode(token)
		   this.onLogin(token, user);
	  }
  }
  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          onLogout: this.onLogout,
          onLogin: this.onLogin,
          
          setFullPlace: this.onSetFullPlace,
          updateSetUp: this.onUpdateSetUp
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

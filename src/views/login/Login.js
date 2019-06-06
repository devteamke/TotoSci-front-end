import React from "react";
import { MDBAlert, MDBCard, MDBContainer, MDBRow,  MDBInput, MDBBtn } from 'mdbreact';
import { Link } from "react-router-dom";
import { withGlobalContext } from '../../context/Provider';
import validate from './validation';
import jwt_decode from 'jwt-decode';
import globals from '../../constants/Globals';
//Material kit header
import Header from "../../components/webcomponents/Header/Header.jsx";
import HeaderLinks from "../../components/webcomponents/Header/HeaderLinks.jsx";

const dashboardRoutes = [];


class App extends React.Component {
  
	state={
		isStudent:false,
		email:'',
		emailError:null,
		password:'',
		passwordError:null,
		serverRes:null,
		
	}

  
	handleSubmit = ()=>{
		console.log('submit clicked')
		let state = this.state;
		  const emailError = !state.email?"Please enter your email address!":null||validate('email', state.email);
  		  const passwordError = validate('password', state.password)||!state.password?"Please enter your password!":null;
		
		    this.setState(
      {
        emailError: emailError,
        passwordError: passwordError
      },
      () => {
        
        if (!passwordError && !emailError) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
            email: this.state.email,
            password: this.state.password,
			 
          };
          console.log(data);
          this.setState({ checkingDetails: true, serverRes:null });
          const LoginAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/users/login`, {
              method: 'post',
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
                // "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
              body: JSON.stringify(data)
            })).json();

          LoginAsync()
            .then(data => {
              //this.setState({currentPlace:data.results})
              if (data.success) {
                const user = jwt_decode(data.token);
                console.log(user);
				  //add role based redirection
				  if(user.role=='admin'){
					  this.props.history.push({pathname:'/admin/AddUsers', snack:{type:'success', msg:'Login was successful'}});  
				  }else{
					  this.props.history.push({pathname:'/users/AddUsers', snack:{type:'success', msg:'Login was successful'}});
				  }
				
                this.props.global.onLogin(data.token, user);
                // this.props.global._logoutHelper(user.exp - user.iat);
				
              } else {
                this.setState({
                  checkingDetails: false,
                  serverRes:data.message 
                });
              }
            })
            .catch(error => {
              console.log(error);
              if (error == "TypeError: Failed to fetch") {
                //   alert('Server is offline')
                this.setState({
                  serverRes:"Failed to contact server!"
                });
              } else if (error.message == 'Network request failed') {
                // alert('No internet connection')
                this.setState({
                   serverRes:"Network request failed"
                });
              }
              this.setState({ checkingDetails: false });
              console.log(error);
            });
        }
      }
    );
	}
 
render() {
	 const { classes, ...rest } = this.props;
	const state = this.state
  return (
    <MDBContainer>
      <MDBRow>
		   <Header
          color="white"
          routes={dashboardRoutes}
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
		<MDBCard style={{ margin:'18% auto', width: "30rem" , padding:'30px 60px'}}>
			  
		
				  
			  <form>
				  
				<p className="h5 text-center mb-4">Sign in  {console.log(this.props.global.check)}</p>
				  {state.serverRes?<MDBAlert color="danger" >
       {state.serverRes}
      </MDBAlert>:<div style={{height:'43px'}}></div>}
				  {	 /*<MDBBtn outline={this.state.isStudent} color="primary"
						 	 onClick={()=>{ this.setState({isStudent:false});}}
					>Staff </MDBBtn>
			 <MDBBtn   outline={!this.state.isStudent}color="primary"
				 onClick={()=>{ this.setState({isStudent:true});}}
				 >Student </MDBBtn>*/}
				<div className="grey-text">
				  <MDBInput
				
					label={this.state.isStudent?"Type your admission number":"Type your email"}
					icon="envelope"
					group
					value={state.email}
					  onChange={(event)=>{ this.setState({email:event.target.value})}}
					type="email"
					onBlur={()=>this.setState({emailError:validate('email', state.email?state.email:null)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.emailError}</p>
				  <MDBInput
					label="Type your password"
					icon="lock"
					group
					  value={state.password}
					  onChange={(event)=>{ this.setState({password:event.target.value})}}
					  onBlur={()=>this.setState({passwordError:validate('password', state.password?state.password:null)})}
					  onKeyPress={(event)=>{
							
							if(event.key=='Enter' &&!state.checkingDetails){this.handleSubmit()}}}
					type="password"
					
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.passwordError}</p>
				</div>
				  <div style={{height:'40px'}}>
						<Link style={{    position: "absolute",
    right: '10%'}} to={`/reset`} >Forgot your password?</Link>
				 </div>
				<div className="text-center">
				 {state.checkingDetails?  <div className="spinner-grow text-info" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> :<MDBBtn onClick={this.handleSubmit}>Login</MDBBtn>}
				</div>
			  </form>
				
			
		  </MDBCard>
		 
		    
      </MDBRow>
    </MDBContainer>
  );
 };
};

export default withGlobalContext(App);
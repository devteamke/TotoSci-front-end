import React from "react";
import { MDBAlert, MDBCard, MDBContainer, MDBRow,  MDBInput, MDBBtn } from 'mdbreact';
import { withGlobalContext } from '../../context/Provider';
import validate from './validation';
import jwt_decode from 'jwt-decode';
import globals from '../../constants/Globals';

class App extends React.Component {
  
	state={
		_id:null,
		token:this.props.match.params.id,
		checkingToken:true,
		valid:null,
		password:'',
		passwordError:null,	
		cpassword:'',
		cpasswordError:null,
		serverRes:null,
		savingPass:false,
		saved:false,
	}

  
handleSubmit = ()=>{
	
		let state = this.state;
	
  		  const passwordError = validate('password', state.password)||!state.password?"Please enter password!":null;
  		  const cpasswordError = (state.password!==state.cpassword)?'Confirm password does not match password':null;
		
		    this.setState(
      {
        
        passwordError: passwordError,
        cpasswordError: cpasswordError
      },
      () => {
        
        if (!passwordError && !cpasswordError) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
            _id:this.state._id,
			token:this.state.token,
            password: this.state.password,
			 
          };
          console.log(data);
          this.setState({ savingPass: true, serverRes:null });
          const SaveAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/users/resetPassword`, {
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

          SaveAsync()
            .then(data => {
              //this.setState({currentPlace:data.results})
              if (data.success) {
                this.setState({
                  saved: true,
                  serverRes:data.message 
                });
              } else {
                this.setState({
                  savingPass: false,
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
_checkToken = () => {
	let token = this.state.token
	console.log('[token]', token);
	        let data = {
           
            token:token,
			 
          };
          console.log(data);
          this.setState({ checkingDetails: true, serverRes:null });
          const CheckAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/users/checkingToken`, {
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

          CheckAsync()
            .then(data => {
              //this.setState({currentPlace:data.results})
              if (data.success) {
               this.setState({
				   checkingToken:false,
				   valid:true,
				   _id:data._id
			   })
              } else {
                this.setState({
                  checkingToken:false,
                  valid:false,
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
componentDidMount = () => {
	this._checkToken();
}
render() {
  const state = this.state
  if(state.checkingToken){
	  return (
		  	<div style={center}>
				<div className="spinner-grow text-info" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> 
			</div> 
	  )
  }	
  if(!state.valid){
	  return (
		    <MDBContainer>
			  <MDBRow>
				<MDBCard style={{ margin:'40% auto', width: "30rem" , padding:'30px 60px'}}>
				  <MDBAlert color="danger" >
				   {state.serverRes}
				  </MDBAlert>
				  </MDBCard>
			  </MDBRow>
		  </MDBContainer>
	  )
  }
	if(state.saved){
	  return (
		    <MDBContainer>
			  <MDBRow>
				<MDBCard style={{ margin:'40% auto', width: "30rem" , padding:'30px 60px'}}>
				  <MDBAlert color="success" >
				   {state.serverRes}
				  </MDBAlert>
				  </MDBCard>
			  </MDBRow>
		  </MDBContainer>
	  )
  }
  
  return (
    <MDBContainer>
      <MDBRow>
		<MDBCard style={{ margin:'18% auto', width: "30rem" , padding:'30px 60px'}}>
			  
		
				  
			
				
				
				<form>
				  
				<p className="h5 text-center mb-4">Reset Password  {console.log(this.props.global.check)}</p>
				  {state.serverRes?<MDBAlert color="danger" >
       {state.serverRes}
      </MDBAlert>:<div style={{height:'43px'}}></div>}
				
				<div className="grey-text">
				 
				  <MDBInput
					label="Type your new password"
					icon="lock"
					group
					  value={state.password}
					  onChange={(event)=>{ this.setState({password:event.target.value})}}
					  onBlur={()=>this.setState({passwordError:validate('rpassword', state.password?state.password:null)})}
					
					type="password"
					
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.passwordError}</p>
					<MDBInput
					label="Confirm new password"
					icon="lock"
					group
					  value={state.cpassword}
					  onChange={(event)=>{ this.setState({cpassword:event.target.value})}}
					  onBlur={()=>this.setState({cpasswordError:(state.password!==state.cpassword)?'Confirm password does not match password':null})}
					  onKeyPress={(event)=>{
							
							if(event.key=='Enter' &&!state.savingPass){this.handleSubmit()}}}
					type="password"
					
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.cpasswordError}</p>
				</div>
				  <div style={{height:'30px'}}></div>
				<div className="text-center">
				 {state.savingPass?  <div className="spinner-grow text-info" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> :<MDBBtn onClick={this.handleSubmit}>Reset</MDBBtn>}
				</div>
			  </form>
				
			
		  </MDBCard>
		 
		    
      </MDBRow>
    </MDBContainer>
  );
 };
};
const center = {
	position: 'absolute',
  left: '50%',
  top: '50%',
  '-webkit-transform': 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)',
}
export default withGlobalContext(App);
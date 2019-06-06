import React from "react";
import { MDBAlert, MDBCard, MDBContainer, MDBRow,  MDBInput, MDBBtn } from 'mdbreact';
import { withGlobalContext } from '../../context/Provider';
import validate from './validation';
import jwt_decode from 'jwt-decode';
import globals from '../../constants/Globals';


class App extends React.Component {
  
	state={
		
		email:'',
		emailError:null,
		sending:false,
		showMessage:false
		
	}

  
	handleSubmit = ()=>{
		console.log('submit clicked')
		let state = this.state;
		  const emailError = !state.email?"Please enter email!":null||validate('email', state.email);
  		
		
		    this.setState(
      {
        emailError: emailError,
      
      },
      () => {
        
        if ( !emailError) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
            email: this.state.email,
         
			 
          };
      
          this.setState({ checkingDetails: true, serverRes:null });
          const LoginAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/users/resetToken`, {
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
              this.setState({
                  sending: false,
                  serverRes:data.message, 
				  showMessage:true
                });
              } else {
                this.setState({
                  sending: false,
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
	const state = this.state
  return (
    <MDBContainer>
      <MDBRow>
		<MDBCard style={{ margin:'18% auto', width: "30rem" , padding:'30px 60px'}}>
			  
		
				  
		{state.showMessage?	 ((
						<MDBAlert color="success" >
					   {state.serverRes}
						  </MDBAlert>)) :
			(<form>
				  
				<p className="h5 text-center mb-4">Reset Password </p>
				  <p className="mb-4">Your will receive an email with your password <b>reset link</b> </p>
				  {state.serverRes?
						(
						<MDBAlert color="danger" >
					   {state.serverRes}
						  </MDBAlert>)
					:<div style={{height:'43px'}}></div>}
			
				<div className="grey-text">
				  <MDBInput
				
					label={"Type your email"}
					icon="envelope"
					group
					value={state.email}
					onChange={(event)=>{ this.setState({email:event.target.value})}}
					onKeyPress={(event)=>{
							
							if(event.key=='Enter' &&!state.checkingDetails){ event.preventDefault();this.handleSubmit()}}}
					type="email"
					onBlur={()=>this.setState({emailError:validate('email', state.email)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.emailError}</p>
				 
				</div>
				  <div style={{height:'30px'}}></div>
				<div className="text-center">
				 {state.checkingDetails?  <div className="spinner-grow text-info" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> :<MDBBtn onClick={this.handleSubmit}>Send</MDBBtn>}
				</div>
			  </form>)}
				
			
		  </MDBCard>
		 
		    
      </MDBRow>
    </MDBContainer>
  );
 };
};

export default withGlobalContext(App);
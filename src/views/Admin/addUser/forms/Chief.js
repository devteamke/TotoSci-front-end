import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components

import GridItem from "../../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../../components/dcomponents/Grid/GridContainer.jsx";

import Button from "../../../../components/dcomponents/CustomButtons/Button.jsx";

import { MDBBtn, MDBInput } from 'mdbreact';
//mport avatar from "../../assets/img/faces/marc.jpg";
import validate from './validation';
import globals from '../../../../constants/Globals';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from '../../../../context/Provider';






class Admin  extends React.Component  {
	  constructor(props) {
    super(props);
		  console.log('[super props]',props);
    this.state = {
		//form fields
     	role:'chief-trainer',
     
	 	email:'',
	 	emailError:null,
		fname:'',
		fnameError:null,
	 	lname:'',
	 	lnameError:null,
		idno:'',
		idnoError:null,
		residence:'',
		residenceError:null,
		
		phone_number:'',
		phone_numberError:null,
		alt_phone_number:'',
		alt_phone_numberError:null,
		
		//other
		addingUser:false,
		open: false,
        place: 'bc',
		resType:'warning',
    };
  } 
   handleSubmit= ()=> {
	
		let state = this.state;
		 const fnameError = validate('fname', state.fname===''?null:state.fname);
		 const emailError = validate('email', state.email===''?null:state.email);
		 const lnameError = validate('lname', state.lname===''?null:state.lname);
		 const salutationError = validate('salutation', state.salutation===''?null:state.salutation)||this._validateSal();
		 const residenceError = validate('residence', state.residence===''?null:state.residence);
		 const countyError = validate('county', state.county===''?null:state.county);
		 const sub_countyError = validate('sub_county', state.sub_county===''?null:state.sub_county);
	
		 const phoneError = validate('phone', state.phone_number===''?null:state.phone_number);
		 const idnoError = validate('idno', state.idno===''?null:state.idno);
		 const alt_phoneError = validate('alt_phone', state.alt_phone_number===''?null:state.alt_phone_number);
		
 
		
		    this.setState(
      {
        emailError: emailError,
        fnameError:fnameError,
        lnameError:lnameError,
        idnoError:idnoError,
        salutationError:salutationError,
        residenceError:residenceError,
        phone_numberError:phoneError,
        alt_phone_numberError:alt_phoneError,
        
      },
      () => {
        
        if ( !emailError && !fnameError && !lnameError && !salutationError  && !phoneError  && !idnoError  &&!residenceError &&!alt_phoneError ) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
			role:state.role,
            email: state.email,
			salutation:state.salutation,
            fname:state.fname,
            lname:state.lname,
          	idNumber:state.idno,
			  
            residence:state.residence,
            phone_number:{ main: state.phone_number,
           				  alt:state.alt_phone_number
						 },
			 
          };
          console.log(data);
          this.setState({ addingUser: true, serverRes:null });
          const AddAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/admin/register`, {
              method: 'post',
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
				   'Authorization': this.props.global.token
                // "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
              body: JSON.stringify(data)
            })).json();

          AddAsync()
            .then(data => {

			  
			  this.props.snack({type:data.success?'success':'warning', msg:data.message})
              //this.setState({currentPlace:data.results})
              if (data.success) {
               this.setState({
                  addingUser: false,
                  serverRes:data.message, 
				
				
					email:'',
					emailError:null,
					fname:'',
					fnameError:null,
					lname:'',
					lnameError:null,
				   	salutation:'',
					idno:'',
					idnoError:null,
					residence:'',
					residenceError:null,
					phone_number:'',
					phone_numberError:null,
					alt_phone_number:'',
					alt_phone_numberError:null,
				
                });
              } else {
                this.setState({
                  addingUser: false,
	
				  
                  serverRes:data.message 
                });
              }
            })
            .catch(error => {
              console.log(error);
              if (error == "TypeError: Failed to fetch") {
                //   alert('Server is offline')
              
              } else if (error.message == 'Network request failed') {
                // alert('No internet connection')
                this.setState({
                   serverRes:"Network request failed"
                });
              }
			   this.props.snack({type:'warning', msg:error.toString()})
              this.setState({ addingUser: false });
              console.log(error);
            });
        }
      }
    );
}
_validateSal = (passed) =>{
	let val = passed||this.state.salutation.toLowerCase();
	const sal =['mr', 'mrs', 'miss', 'dr', 'prof', 'other','NA']
	if(sal.includes(val)){
		return null;
	}else{
		return 'Salutation must be either Mr, Mrs, Miss, Dr, Prof';
	}
	
}
render() {
  const { classes } = this.props; 
  const state = this.state
  return (
	  		<>

				  			   
			  <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
           			 <h1>Chief Trainer</h1>
		  	</GridItem>
               
             	 <GridItem xs={12} sm={12} md={2}>
                  <MDBInput
				
					label={"Salutaion"}
					
					group
					value={state.salutation}
				    onChange={(event)=>{ this.setState({salutation:event.target.value})}}
				    onBlur={()=>this.setState({salutationError:validate('salutation', state.salutation===''?null:state.salutation) ||this._validateSal()})}
					error="Whoops!"
					success="right"
				  />
				
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.salutationError}</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <MDBInput
				
					label={"First Name"}
					
					group
					value={state.fname}
					 onChange={(event)=>{ this.setState({fname:event.target.value})}}
					onBlur={()=>this.setState({fnameError:validate('fname', state.fname==''?null:state.fname)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.fnameError}</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
				
					label={"Last Name"}
					
					group
					value={state.lname}
					  onChange={(event)=>{ this.setState({lname:event.target.value})}}
					type="email"
					onBlur={()=>this.setState({lnameError:validate('lname', state.lname==''?null:state.lname)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.lnameError}</p>
                </GridItem>
		
		 	  <GridItem xs={12} sm={12} md={6}>
                 	  <MDBInput
				
					label={"Email Address"}
					
					group
					value={state.email}
					onChange={(event)=>{ this.setState({email:event.target.value})}}
				    onBlur={()=>this.setState({emailError:validate('email', state.email==''?null:state.email)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.emailError}</p>
                </GridItem>
				  <GridItem xs={12} sm={12} md={6}>
                 <MDBInput
				
					label={"Residence"}
					
					group
					value={state.residence}
					onChange={(event)=>{ this.setState({residence:event.target.value})}}
					onBlur={()=>this.setState({residenceError:validate('residence', state.residence==''?null:state.residence)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.residenceError}</p>
                </GridItem>
				  <GridItem xs={12} sm={12} md={6}>	   
				<MDBInput
				
					label={"ID Number"}
					
					group
					value={state.idno}
					onChange={(event)=>{ this.setState({idno:event.target.value})}}
					onBlur={()=>this.setState({idnoError:validate('idno', state.idno==''?null:state.idno)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.idnoError}</p>
                </GridItem>
		  
		
             
                <GridItem xs={12} sm={12} md={6}>
                   <MDBInput
				
					label={"Phone Number"}
					
					group
					value={state.phone_number}
					 onChange={(event)=>{ this.setState({phone_number:event.target.value,phone_numberError:validate('phone', event.target.value==''?null:event.target.value)})}}
					onBlur={()=>this.setState({phone_numberError:validate('phone', state.phone_number==''?null:state.phone_number)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.phone_numberError}</p>
                </GridItem>
			    <GridItem xs={12} sm={12} md={6}>
                   <MDBInput
				
					label={"Alternative Phone Number"}
					
					group
					value={state.alt_phone_number}
					 onChange={(event)=>{ this.setState({alt_phone_number:event.target.value, alt_phone_numberError:validate('alt_phone', event.target.value==''?null:event.target.value)})}}
					onBlur={()=>this.setState({alt_phone_numberError:validate('alt_phone', state.alt_phone_number==''?null:state.alt_phone_number)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.alt_phone_numberError}</p>
                </GridItem>
        
              </GridContainer>
	 		  <GridContainer>
				  <GridItem xs={12} sm={12} md={6}>
					<div className="text-center">
				 {state.addingUser?  <div className="spinner-grow text-info" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> :<MDBBtn onClick={this.handleSubmit}>Add user</MDBBtn>}
				</div>
				   </GridItem>
        
              	</GridContainer>
	  
	         </>
				 
  );
}
}

export default withGlobalContext((Admin));

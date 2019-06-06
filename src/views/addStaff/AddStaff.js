import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Snackbar from "../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../components/dcomponents/Grid/GridContainer.jsx";
import CustomInput from "../../components/dcomponents/CustomInput/CustomInput.jsx";
import Button from "../../components/dcomponents/CustomButtons/Button.jsx";
import Card from "../../components/dcomponents/Card/Card.jsx";
import CardHeader from "../../components/dcomponents/Card/CardHeader.jsx";
import CardAvatar from "../../components/dcomponents/Card/CardAvatar.jsx";
import CardBody from "../../components/dcomponents/Card/CardBody.jsx";
import CardFooter from "../../components/dcomponents/Card/CardFooter.jsx";
import { MDBBtn, MDBInput } from 'mdbreact';
import avatar from "../../assets/img/faces/marc.jpg";
import validate from './validation';
import globals from '../../constants/Globals';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from '../../context/Provider';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class AddUser  extends React.Component  {
	  constructor(props) {
    super(props);
    this.state = {
     	role:null,
     	roleError:null,
	 	email:'',
	 	emailError:null,
		fname:'',
		fnameError:null,
	 	sname:'',
	 	snameError:null,
		oname:'',
		onameError:null,
		residence:'',
		residenceError:null,
		phone_number:'',
		phone_numberError:null,
		addingUser:false,
		open: false,
        place: 'bc',
		resType:'',
    };
  } 
   handleSubmit= ()=> {
	
		let state = this.state;
		 const fnameError = validate('fname', state.fname===''?null:state.fname);
		 const emailError = validate('email', state.email===''?null:state.email);
		 const snameError = validate('sname', state.email===''?null:state.sname);
		 const onameError = validate('oname', state.oname===''?null:state.oname);
		 const residenceError = validate('residence', state.residence===''?null:state.residence);
		 const phoneError = validate('phone', state.phone_number===''?null:state.phone_number);
		
 
		
		    this.setState(
      {
        emailError: emailError,
        fnameError:fnameError,
        snameError:snameError,
        onameError:onameError,
        residenceError:residenceError,
        phone_numberError:phoneError,
        
      },
      () => {
        
        if ( !emailError && !fnameError && !snameError && !snameError && !onameError && !residenceError && !phoneError  ) {
          // alert('Details are valid!'+globals.BASE_URL)
          let data = {
			role:state.role,
            email: state.email,
            fname:state.fname,
            sname:state.sname,
            oname:state.oname,
            residence:state.residence,
            phone_number:state.phone_number,
			 
          };
          console.log(data);
          this.setState({ addingUser: true, serverRes:null });
          const AddAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/users/register/staff`, {
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
			  this.setState({open: true, resType:data.success?'success':'warning' });
        setTimeout(function(){
            this.setState({open: false});
        }.bind(this),6000);
              //this.setState({currentPlace:data.results})
              if (data.success) {
               this.setState({
                  addingUser: false,
                  serverRes:data.message, 
				  role:null,
				  roleError:null,
				  email:'',
				  emailError:null,
				  fname:'',
				  fnameError:null,
				  sname:'',
				  snameError:null,
				  oname:'',
				  onameError:null,
				  residence:'',
				  residenceError:null,
				  phone_number:'',
				  phone_numberError:null,
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
                this.setState({
                  serverRes:"Server is offline!"
                });
              } else if (error.message == 'Network request failed') {
                // alert('No internet connection')
                this.setState({
                   serverRes:"Network request failed"
                });
              }
              this.setState({ addingUser: false });
              console.log(error);
            });
        }
      }
    );
}
   		

render() {
  const { classes } = this.props; 
  const state = this.state
  return (
    <div>
		  <Snackbar
                    place={this.state.place}
                    color={state.resType}
                    icon={AddAlert}
                    message={state.serverRes}
                    open={this.state.open}
                    closeNotification={() => this.setState({open:false})}
                    close
                />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add a user of the system</h4>
              <p className={classes.cardCategoryWhite}>Fill in their details below</p>
            </CardHeader>
			   <CardBody>
			  <GridContainer>
				
					<MDBBtn outline={state.role!=='teacher'} color="primary"
						 	 onClick={()=>{ this.setState({role:'teacher'});}}
					> Teacher</MDBBtn>
					<MDBBtn outline={state.role!=='receptionist'} color="primary"
						 	 onClick={()=>{this.setState({role:'receptionist'}); }}
					>Receptionist</MDBBtn>	
					
			 </GridContainer>
            {state.role?
				  
				
					
					<>
				 
				   
              <GridContainer>
             
            
				  
                <GridItem xs={12} sm={12} md={4}>
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
				
					label={"First Name"}
					
					group
					value={state.lname}
					 onChange={(event)=>{ this.setState({fname:event.target.value})}}
					onBlur={()=>this.setState({fnameError:validate('fname', state.fname==''?null:state.fname)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.fnameError}</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <MDBInput
				
					label={"Surname"}
					
					group
					value={state.sname}
					  onChange={(event)=>{ this.setState({sname:event.target.value})}}
					type="email"
					onBlur={()=>this.setState({snameError:validate('sname', state.sname==''?null:state.sname)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.snameError}</p>
                </GridItem>
				 <GridItem xs={12} sm={12} md={6}>
                  <MDBInput
				
					label={"Other Name"}
					
					group
					value={state.oname}
				    onChange={(event)=>{ this.setState({oname:event.target.value})}}
				    onBlur={()=>this.setState({onameError:validate('oname', state.oname==''?null:state.oname)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.onameError}</p>
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
             
                <GridItem xs={12} sm={12} md={4}>
                   <MDBInput
				
					label={"Phone Number"}
					
					group
					value={state.phone_number}
					 onChange={(event)=>{ this.setState({phone_number:event.target.value})}}
					onBlur={()=>this.setState({phone_numberError:validate('phone', state.phone_number==''?null:state.phone_number)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.phone_numberError}</p>
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
					:null}
				   </CardBody>
          </Card>
        </GridItem>
		  
		  
        <GridItem xs={12} sm={12} md={4}>
         
        </GridItem>
      </GridContainer>
    </div>
  );
}
}

export default withGlobalContext( withStyles(styles)(AddUser));

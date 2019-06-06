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
import { MDBInput, MDBBtn, MDBIcon, MDBTable, MDBTableBody } from "mdbreact"
import avatar from "../../assets/img/faces/marc.jpg";
import { withGlobalContext } from '../../context/Provider';
import validate from './validation.js';
import globals from '../../constants/Globals';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";

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

class Profile extends React.Component{
 state ={
	 old_password:'',
	 old_passwordError:null,
	 new_password:'',
	 new_passwordError:null,
	
	 //snack
	open: false,
    place: 'bc',
	resType:'',
	 serverRes:'',
	updating:false,
 }
handleSubmit = () => {
	const state = this.state;

	const oldErr = validate('password',state.old_password==''?null:state.old_password);
	const newErr = validate('opassword',state.new_password==''?null:state.new_password);
	this.setState({
		old_passwordError:oldErr,
		new_passwordError:newErr,
	},
      () => {
   
        if (!oldErr && !newErr) {
          // alert('Details are valid!'+globals.BASE_URL)
		this.setState({updating:true})
          let data = {
            opass: this.state.old_password,
            newpass: this.state.new_password,
			 
          };
          console.log(state.updating);
             
			console.log(state.updating);
          const UpdateAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/users/update_password`, {
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

          UpdateAsync()
            .then(data => {
              //this.setState({currentPlace:data.results})
			   this.setState({open: true, updating:false,resType:data.success?'success':'warning' });
					setTimeout(function(){
						this.setState({open: false, updating:false});
					}.bind(this),9000);
			  
              if (data.success) {
               this.setState({
                  serverRes:data.message
                });
              } else {
               this.setState({
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
              this.setState({ updating: false });
              console.log(error);
			   this.setState({open: true,updating:false, resType:data.success?'success':'warning' });
					setTimeout(function(){
						this.setState({open: false});
					}.bind(this),9000);
            });
        }
      }
    );
	
}
render = () => {
  const gstate = this.props.global;	
  const state = this.state;
  const { classes } = this.props;
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

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={`https://ui-avatars.com/api/?name=${gstate.user.fname}+${gstate.user.sname}&background=0D8ABC&color=fff&size=256`} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
             	 <GridItem xs={12} sm={10} md={10} style={{margin:'0 auto'}}>
				
						  <MDBTable borderless hover small >

							  <MDBTableBody>
								<tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Account Role</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{gstate.user.role.charAt(0).toUpperCase()+gstate.user.role.slice(1)}</td>
								</tr>
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>First Name</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{gstate.user.fname?(gstate.user.fname.charAt(0).toUpperCase() + gstate.user.fname.slice(1)):null}</td>
								</tr>
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Surname</b></td>
								  <td style={{textAlign:'left', width:'50%'}}> {gstate.user.sname?(gstate.user.sname.charAt(0).toUpperCase() + gstate.user.sname.slice(1)):null}</td>
								</tr> 
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Other Name</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{gstate.user.oname?(gstate.user.oname.charAt(0).toUpperCase() + gstate.user.oname.slice(1)):null}</td>
								</tr>  
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Email</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{gstate.user.email?(gstate.user.email):null}</td>
								</tr> 
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Residence</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{gstate.user.residence?(gstate.user.residence):null}</td>
								</tr>
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Phone_number</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{gstate.user.phone_number?(gstate.user.phone_number):null}</td>
								</tr>
							  </MDBTableBody>	  
							</MDBTable>
				
				</GridItem>
				
            </CardBody>
          </Card>
        </GridItem>
		  
		          <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change Password</h4>
              <p className={classes.cardCategoryWhite}>Set a new password for accessing your account</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                 <MDBInput
					label="Your old password"
					
					group
					  value={state.old_password}
					  onChange={(event)=>{ this.setState({old_password:event.target.value})}}
					  onBlur={()=>this.setState({old_passwordError:validate('password',state.old_password==''?null:state.old_password)})}
					type="password"
					
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.old_passwordError}</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                   <MDBInput
					label="Your new password"
					
					group
					  value={state.new_password}
					  onChange={(event)=>{ this.setState({new_password:event.target.value})}}
					  onBlur={()=>this.setState({new_passwordError:validate('opassword', state.new_password==''?null:state.new_password)})}
					type="password"
					
				  />
										<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.new_passwordError}</p>
      
                </GridItem>
                
              </GridContainer>
              
            
            </CardBody>
			  {state.updating?<div className="text-center">
				  <div className="spinner-grow text-info" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> 
			  </div>:	
			  <div className="text-center">
				  <MDBBtn onClick={this.handleSubmit}>Update Password</MDBBtn>
				</div>}
            <CardFooter>
            
				
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
 } 
}

export default withGlobalContext( withStyles(styles)(Profile) );

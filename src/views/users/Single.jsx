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
import { MDBInput, MDBBtn, MDBIcon, MDBTable, MDBTableBody, MDBDropdown, MDBDropdownItem, MDBDropdownToggle,MDBDropdownMenu, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact"
import avatar from "../../assets/img/faces/marc.jpg";
import { withGlobalContext } from '../../context/Provider';
import validate from './validation.js';
import globals from '../../constants/Globals';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
//Moment 
import moment from 'moment';

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

class Single extends React.Component{
	 constructor(props) {
  	     super(props);
   		 this.state ={
			 old_password:'',
			 old_passwordError:null,
			 new_password:'',
			 new_passwordError:null,
			//User info
			 user:this.props.location.data,
			 oldUser:this.props.location.data,
			 //snack
			open: false,
			place: 'bc',
			resType:'warning',
			 serverRes:'',
			updating:false,
			 
			 //Account Status 
			savingInfo:false,
			 //delete Modal
			 deleteModal:false,
			 deleting:false,
			
		 }

		if(!this.props.location.data){
			this.props.history.push('/admin/users')
		}
	 }
handleSubmit = () => {
	const state = this.state;
console.log('[user]', state.user)

	const newErr = validate('opassword',state.new_password==''?null:state.new_password);
	this.setState({
	
		new_passwordError:newErr,
	},
      () => {
   
        if (!newErr) {
          // alert('Details are valid!'+globals.BASE_URL)
		this.setState({updating:true})
          let data = {
			  _id:this.state.user._id,
          
            password: this.state.new_password,
			 
          };
    
          const UpdatePassAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/admin/password`, {
              method: 'PATCH',
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

          UpdatePassAsync()
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
handleStatus = () => {
	this.setState((prevState)=>{
	let newStatus	= prevState.user.status=='active'?'suspended':'active';
	let newUser = {...prevState.user};
		newUser.status= newStatus;
		return ({
			user:newUser,
			statusSaved:!prevState.statusSaved
			})
	})
}
handleSaveInfo = () => {

          let data = {
			user:this.state.user
			 
          };
         
          const SaveAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/admin/save_profile`, {
              method: 'PATCH',
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.global.token,
				'Access-Control-Allow-Origin':`${globals.BASE_URL}`,
                // "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
              body: JSON.stringify(data)
            })).json();

          SaveAsync()
            .then(data => {
              //this.setState({currentPlace:data.results})
			   this.setState({open: true, updating:false,resType:data.success?'success':'warning' });
					setTimeout(function(){
						this.setState({open: false, updating:false});
					}.bind(this),9000);
			  
              if (data.success) {
				  console.log('[newUser]', data.user)
               this.setState({
				   serverRes:data.message,
                   savingInfo:false,
				   user:data.user,
				   oldUser:data.user,
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
            
			   this.setState({open: true,savingInfo:false, resType:data.success?'success':'warning' });
					setTimeout(function(){
						this.setState({open: false});
					}.bind(this),9000);
            });
	
}
handleDeleteModal = () => {
	this.setState({deleteModal:!this.state.deleteModal});
}
handleDelete = () => {
	this.setState({deleteModal:!this.state.deleteModal, deleting:true});
	 let data = {
			_id:this.state.user._id
			 
          };
         
          const DeleteAsync = async () =>
            await (await fetch(`${globals.BASE_URL}/api/admin/account`, {
              method: 'DELETE',
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.global.token,
				'Access-Control-Allow-Origin':`${globals.BASE_URL}`,
                // "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
              body: JSON.stringify(data)
            })).json();

          DeleteAsync()
            .then(data => {
              //this.setState({currentPlace:data.results})
			   this.setState({open: true, updating:false,resType:data.success?'success':'warning' });
					setTimeout(function(){
						this.setState({open: false, updating:false});
					}.bind(this),9000);
			  
              if (data.success) {
              	 this.props.history.push({pathname: '/admin/users', snack:{type:'success', msg:data.message}})
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
componentWillMount = ()=> {
 
}
render = () => {
	if(!this.props.location.data){
		
			return (null)
	}
	
  const gstate = this.props.global;	
  const state = this.state;
  const { user } = this.state;
  const { oldUser } = this.state;
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
  			 <GridItem xs={12} sm={12} md={12}>
				   <MDBBtn color="primary" onClick={()=>{	this.props.history.goBack()}}>Back</MDBBtn>
		  </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
				  {user.fname?(<img src={`https://ui-avatars.com/api/?name=${user.fname}+${user.sname}&background=0D8ABC&color=fff&size=256`} alt="..." />):<MDBIcon icon="user-circle" className="blue-grey-text"  size="9x" />}
              </a>
            </CardAvatar>
			 
            <CardBody profile>
				
				 <GridItem xs={12} sm={10} md={10} style={{margin:'0 auto'}}>
				
						  <MDBTable borderless hover small >

							  <MDBTableBody>
								<tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Account Status</b></td>
								  <td style={{textAlign:'left', width:'50%', color: (oldUser.status=='active') ? ('green') :('red') }}>{oldUser.status.charAt(0).toUpperCase()+oldUser.status.slice(1)}</td>
								  </tr>
									<tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Account Role</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.role.charAt(0).toUpperCase()+oldUser.role.slice(1)}</td>
								</tr>
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>First Name</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.fname?(oldUser.fname.charAt(0).toUpperCase() + oldUser.fname.slice(1)):null}</td>
								</tr>
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Surname</b></td>
								  <td style={{textAlign:'left', width:'50%'}}> {oldUser.sname?(oldUser.sname.charAt(0).toUpperCase() + oldUser.sname.slice(1)):null}</td>
								</tr> 
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Other Name</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.oname?(oldUser.oname.charAt(0).toUpperCase() + oldUser.oname.slice(1)):null}</td>
								</tr>  
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Email</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.email?(oldUser.email):null}</td>
								</tr> 
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Residence</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.residence?(oldUser.residence):null}</td>
								</tr>
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Phone_number</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.phone_number?(oldUser.phone_number):null}</td>
								</tr>
								 <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Joined</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.createdAt?(moment(oldUser.createdAt).format("MMM Do YY")):null}</td>
								</tr> 
								  <tr>
								  <td style={{ width:'50%'}} ><b style={{ fontSize:'1.25em'}}>Updated</b></td>
								  <td style={{textAlign:'left', width:'50%'}}>{oldUser.updatedAt?(moment(oldUser.updatedAt).format("MMM Do YY")):null}</td>
								</tr>
							  </MDBTableBody>	  
							</MDBTable>
				
				</GridItem>
				
            
            </CardBody>
          </Card>
        </GridItem>
		  
		    {/* change account info */}
		  
		  
		<GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change {oldUser.fname?(oldUser.fname.charAt(0).toUpperCase() + oldUser.fname.slice(1)+'\'s '):'their'} account info </h4>
              <p className={classes.cardCategoryWhite}>Update status , profile info... </p>
            </CardHeader>
            <CardBody>
				
              <GridContainer>
               <GridItem xs={12} sm={12} md={10}>
				
						<h5 style={{display:'inline'}}>Status :{'\u00A0'} <span style={{color:user.status=='active'?'green':'red'}}>{user.status.charAt(0).toUpperCase()+user.status.slice(1)}</span></h5> {'\u00A0'} {'\u00A0'} {'\u00A0'} 
				   <MDBBtn  style={{marginTop:-1}}size="sm" color="primary" onClick={this.handleStatus}>{user.status=="active"?'Suspend':'Activate'}</MDBBtn>
				  </GridItem>
				
                
                
              </GridContainer>
             <GridContainer>
               <GridItem xs={12} sm={12} md={10}>
				  	<div style={{display:'inline-flex'}} >
						<h5>Role :{'\u00A0'}</h5>
							<MDBDropdown   size="sm">
							<MDBDropdownToggle caret color="primary" style={{marginTop:-1, fontSize:'0.8em',display:'inline',}} >
								  {user.role}
								  </MDBDropdownToggle>
								  <MDBDropdownMenu left basic>
									<MDBDropdownItem 
									  onClick={()=>{ 
										this.setState((prevState)=>({user:{ ...prevState.user, role:'admin' }})
										  )} }
									>admin</MDBDropdownItem>
									<MDBDropdownItem 
									  onClick={()=>{ 
										this.setState((prevState)=>({user:{ ...prevState.user, role:'other' }})
										  )} }
									>other</MDBDropdownItem>
									
								  </MDBDropdownMenu>
							</MDBDropdown>
						
				  </div>
				</GridItem>
                
                
              </GridContainer>
              			
					<>
				 
				   
              <GridContainer>
             
            
				  
                <GridItem xs={12} sm={12} md={8}>
                 	  <MDBInput
				
					label={"Email Address"}
					
					group
					value={user.email}
					onChange={(event)=>{ 
							let value =event.target.value;
							this.setState((prevState)=>({user:{ ...prevState.user, email:value }})
							  )}
							 }
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
					value={user.fname}
					onChange={(event)=>{ 
							let value =event.target.value;
							this.setState((prevState)=>({user:{ ...prevState.user, fname:value }})
							  )}
							 }
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
					value={user.sname}
					onChange={(event)=>{ 
							let value =event.target.value;
							this.setState((prevState)=>({user:{ ...prevState.user, sname:value }})
							  )}
							 }
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
					value={user.oname}
				    onChange={(event)=>{ 
							let value =event.target.value;
							this.setState((prevState)=>({user:{ ...prevState.user, oname:value }})
							  )}
							 }
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
					value={user.residence}
					onChange={(event)=>{ 
							let value =event.target.value;
							this.setState((prevState)=>({user:{ ...prevState.user, residence:value }})
							  )}
							 }
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
					value={user.phone_number}
					 onChange={(event)=>{ 
							let value =event.target.value;
							this.setState((prevState)=>({user:{ ...prevState.user, phone_number:value }})
							  )}
							 }
					onBlur={()=>this.setState({phone_numberError:validate('phone', state.phone_number==''?null:state.phone_number)})}
					error="Whoops!"
					success="right"
				  />
					<p style={{color:'red', fontSize:'0.8rem', textAlign:'center'}}>{state.phone_numberError}</p>
                </GridItem>
        
              </GridContainer>
             
            
           		
					</>
            
            </CardBody>
			  {state.savingInfo?
				  <div className="text-center">
				  <div className="spinner-grow text-info" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> 
			  </div>:	
			  <>
			  {JSON.stringify(user)!==JSON.stringify(state.oldUser)?
			   (<div className="text-center">
				  <MDBBtn onClick={()=>{	this.setState({savingInfo:true},()=>this.handleSaveInfo())}}>Save</MDBBtn>
				</div>)
			   :null}
			   </>
			  }
            <CardFooter>
            
				
            </CardFooter>
          </Card>
        </GridItem>	
		  {/* update password*/}
		  <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change {oldUser.fname?(oldUser.fname.charAt(0).toUpperCase() + oldUser.fname.slice(1)+'\'s '):'their'} Password</h4>
              <p className={classes.cardCategoryWhite}>Set a new password for them</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
               
                <GridItem xs={12} sm={12} md={12}>
                   <MDBInput
					label="New password"
					
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
		  
		    {/* Delete account*/}
		  
		  <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Delete {oldUser.fname?(oldUser.fname.charAt(0).toUpperCase() + oldUser.fname.slice(1)+'\'s '):'their'} Account </h4>
              <p className={classes.cardCategoryWhite}>This cannot be undone, make sure the this is what you intend to do</p>
            </CardHeader>
            <CardBody>
          <MDBModal isOpen={this.state.deleteModal} toggle={this.handleDeleteModal} centered>
          <MDBModalHeader toggle={this.handleDeleteModal}>Delete Confirmation</MDBModalHeader>
          <MDBModalBody>
           Are you sure you want to delete this account?
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" onClick={this.handleDeleteModal}>Cancel</MDBBtn>
            <MDBBtn color="danger" onClick={this.handleDelete}>Yes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
              
            
            </CardBody>
			  {state.deleting?<div className="text-center">
				  <div className="spinner-grow text-danger" role="status" style={{marginBottom:'15px'}}>
					<span className="sr-only">Loading...</span>
				  </div> 
			  </div>:	
			  <div className="text-center">
				  <MDBBtn color="danger" onClick={this.handleDeleteModal}>Delete Account</MDBBtn>
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

export default withGlobalContext( withStyles(styles)(Single) );

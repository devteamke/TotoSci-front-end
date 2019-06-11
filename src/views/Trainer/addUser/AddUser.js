import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";
import CustomInput from "../../../components/dcomponents/CustomInput/CustomInput.jsx";
import Button from "../../../components/dcomponents/CustomButtons/Button.jsx";
import Card from "../../../components/dcomponents/Card/Card.jsx";
import CardHeader from "../../../components/dcomponents/Card/CardHeader.jsx";
import CardAvatar from "../../../components/dcomponents/Card/CardAvatar.jsx";
import CardBody from "../../../components/dcomponents/Card/CardBody.jsx";
import CardFooter from "../../../components/dcomponents/Card/CardFooter.jsx";
import { MDBBtn, MDBInput } from 'mdbreact';
import avatar from "../../../assets/img/faces/marc.jpg";

import globals from '../../../constants/Globals';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { withGlobalContext } from '../../../context/Provider';
//Form components

import InstructorForm from './forms/Instructor';
import ParentForm from './forms/Parent';


import validate from './validation';
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
		//form fields
     	
		
		//other
		addingUser:false,
		open: false,
        place: 'bc',
		resType:'warning',
    };
  } 
   
_snack = (params) => {
		if(this.props.location.snack){
			let snack = this.props.location.snack
			 this.setState({open: true, resType:snack.type, serverRes:snack.msg});
					setTimeout(function(){
						this.setState({open: false});
					}.bind(this),9000);
		}
		if(params){
			 this.setState({open: true, resType:params.type, serverRes:params.msg});
					setTimeout(function(){
						this.setState({open: false});
					}.bind(this),9000);
		}
}	
componentDidMount = () => {
		
		this._snack();
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
        <GridItem xs={12} sm={12} md={11}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Add a user of the system</h4>
              <p className={classes.cardCategoryWhite}>Fill in their details below</p>
            </CardHeader>
			   <CardBody>
			  <GridContainer>
			
				 
			
				  <MDBBtn outline={state.role!=='instructor'} color="primary"
						 	 onClick={()=>{ this.setState({role:'instructor'});}}
					> Instructor</MDBBtn>
				  <MDBBtn outline={state.role!=='parent'} color="primary"
						 	 onClick={()=>{ this.setState({role:'parent'});}}
					> Parent</MDBBtn>
					
			 </GridContainer>
            {state.role?(
				  <>
				  {state.role=="instructor"?
				   (
				   <InstructorForm snack={this._snack}/>
				   ):state.role=="parent"?(
				   <parentForm snack={this._snack}/>
				   ):null
				   
				   }
				
					
					<>
				 
				   
             
            
           		
					
				</>
					    </>
					   )
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

export default withGlobalContext(withStyles(styles)(AddUser));

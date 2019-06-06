import validation from 'validate.js'

export default function validate(fieldName, value) {
    var constraints = {

        email: {
            
              email: {
                message: '^Please enter a valid email address!'
              },
			presence:{
				 message: '^Email is required!'
			}
			
        }, 
		fname: {
            
             
			presence:{
				 message: '^First Name is required!'
			}
			
        },
		pfname: {
            
             
			presence:{
				 message: '^Parent first Name is required!'
			}
			
        },
		
		sname: {
            
             
			presence:{
				 message: '^Surname is required!'
			}
			
        },
		oname: {
            
             
			presence:{
				 message: '^Other  Name is required!'
			}
			
        },
		poname: {
            
             
			presence:{
				 message: '^Parent other  Name is required!'
			}
			
        },
		residence: {
            
             
			presence:{
				 message: '^Residence is required!'
			}
			
        },
		phone: {
            
             
			presence:{
				 message: '^Phone number is required!'
			}
			
        },
      
     
	
    };

    var formValues = {}
    formValues[fieldName] = value

    var formFields = {}
    formFields[fieldName] = constraints[fieldName]


    const result = validation(formValues, formFields)

    if (result) {
	return result[fieldName][0]
    }
    return null
}
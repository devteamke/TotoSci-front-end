import validation from 'validate.js'

export default function validate(fieldName, value) {
    var constraints = {

      
     	email: {
            
              email: {
                message: '^Please enter a valid email address!'
              },
			presence: {
                message: '^Please enter an email address!'
              },
        },
        rpassword: {
           
            // length: {
            //     minimum: 5,
            //     message: '^Your password must be at least 5 characters!'
            // },
			 presence: {
                message: '^Please enter your password!'
              }
        },  
	
      rcpassword: {
           
            // length: {
           
		 presence: {
                message: '^Please confirm your password!'
              },
		 
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
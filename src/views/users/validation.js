import validation from 'validate.js'

export default function validate(fieldName, value) {
    var constraints = {
    password: {
           
            // length: {
            //     minimum: 5,
            //     message: '^Your password must be at least 5 characters!'
            // },
			 presence: {
                message: '^Old password is required!'
              }
        },
		opassword: {
           

			 presence: {
                message: '^New password is required!'
              }
        },
 
        // confirmPassword: {
        //     presence: true,
        //     equality: 'password'
        // },
	
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
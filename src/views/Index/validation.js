import validation from 'validate.js';

export default function validate(fieldName, value) {
  var constraints = {
    name: {
      presence: {
        message: '^Please input your name!'
      }
    },

    email: {
      email: {
        message: '^Please input  a valid email address!'
      },
      presence: {
        message: '^Please input  your email address!'
      }
    },
    subject: {
      presence: {
        message: '^Please input  subject!'
      }
    },
    message: {
      presence: {
        message: '^Please input  message!'
      }
    }
  };

  var formValues = {};
  formValues[fieldName] = value;

  var formFields = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validation(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }
  return null;
}

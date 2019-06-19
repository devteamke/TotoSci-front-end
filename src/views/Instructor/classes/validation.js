import validation from "validate.js";

export default function validate(fieldName, value) {
  var constraints = {
    name: {
      presence: {
        message: "^Class Name is required!"
      }
    },
    course: {
      presence: {
        message: "^Course is required!"
      }
    },
    start_time: {
      presence: {
        message: "^Start Time is required!"
      }
    },
    day: {
      presence: {
        message: "^Day of week  is required!"
      }
    },
    duration: {
      presence: {
        message: "^Duration is required!"
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

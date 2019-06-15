import validation from "validate.js";

export default function validate(fieldName, value) {
  var constraints = {
    name: {
      presence: {
        message: "^School Name is required!"
      }
    },
    county: {
      presence: {
        message: "^County Name is required!"
      }
    },
    sub_county: {
      presence: {
        message: "^Sub County Name is required!"
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

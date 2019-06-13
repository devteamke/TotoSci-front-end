import validation from "validate.js";

export default function validate(fieldName, value) {
  var constraints = {
    email: {
      email: {
        message: "^Please enter a valid email address!"
      },
      presence: {
        message: "^Email is required!"
      }
    },
    name: {
      presence: {
        message: "^Course Name is required!"
      }
    },

    description: {
      presence: {
        message: "^Course description is required!"
      }
    },
    salutation: {
      presence: {
        message: "^Salutation is required!"
      }
    },
    residence: {
      presence: {
        message: "^Residence is required!"
      }
    },
    idno: {
      presence: {
        message: "^ID number is required!"
      },
      length: {
        minimum: 7,
        tooShort: "^ID number needs to have %{count} digits or more",
        maximum: 8,
        tooLong: "^ID number needs to have less than %{count} digits "
      },
      numericality: {
        onlyInteger: true,
        notInteger: "^ID number must be a number"
      }
    },
    phone: {
      presence: {
        message: "^Phone number is required!"
      },
      length: {
        minimum: 10,
        tooShort: "^Phone number needs to have %{count} digits or more",
        maximum: 15,
        tooLong: "^Phone number needs to have less than %{count} digits "
      },
      numericality: {
        onlyInteger: true,
        notInteger: "^ Phone number must be a number"
      }
    },
    alt_phone: {
      presence: {
        message: "^Alternative phone number is required!"
      },
      length: {
        minimum: 10,
        tooShort:
          "^Alternative phone number needs to have %{count} digits or more",
        maximum: 15,
        tooLong:
          "^Alternative phone number needs to have less than %{count} digits "
      },
      numericality: {
        onlyInteger: true,
        notInteger: "^Alternative phone number must be a number"
      }
    },
    charge: {
      presence: {
        message: "^Session charge is required!"
      },

      numericality: {
        onlyInteger: true,
        notInteger: "^Session charge must be a number"
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

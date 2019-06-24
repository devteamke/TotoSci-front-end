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
    fname: {
      presence: {
        message: "^First Name is required!"
      }
    },

    lname: {
      presence: {
        message: "^Last Name is required!"
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
    county: {
      presence: {
        message: "^County is required!"
      }
    },
    sub_county: {
      presence: {
        message: "^Sub County is required!"
      }
    },
    idno: {
      presence: {
        message: "^ID number is required!"
      },
      numericality: {
        onlyInteger: true,
        notInteger: "^ID number must be a number"
      },
      length: {
        minimum: 7,
        maximum: 8,
        tooLong: "^ID number needs to have less than %{count} digits  ",
        tooShort: "^ID number needs to have %{count} digits or more"
      }
    },
    phone: {
      presence: {
        message: "^Phone number is required!"
      },
      numericality: {
        onlyInteger: true,
        notInteger: "^ Phone number must be a number"
      },
      length: {
        minimum: 10,
        maximum: 15,
        tooLong: "^Phone number needs to have less than %{count} digits  ",
        tooShort: "^Phone number needs to have %{count} digits or more"
      }
    },
    alt_phone: {
      presence: {
        message: "^Alternative phone number is required!"
      },
      numericality: {
        onlyInteger: true,
        notInteger: "^Alternative phone number must be a number"
      },
      length: {
        minimum: 10,
        maximum: 15,
        tooLong: "^Phone number needs to have less than %{count} digits  ",
        tooShort:
          "^Alternative phone number needs to have %{count} digits or more"
      }
    },
    school: {
      presence: {
        message: "^This field is required!"
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

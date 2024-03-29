export const yupErrors = {
  mixed: {
    default: "This field is not valid",
    required: "This is a required field",
    defined: "This field must be defined",
    notNull: "This field cannot be null",
    oneOf: "This field must be one of the following values: ${values}",
    notOneOf: "This field must not be one of the following values: ${values}",
    notType: ({ type }) => {
      let msg;

      if (type == "number") {
        msg = "This field must be a number without letters";
      } else {
        msg = "This field is not valid";
      }
      return msg;
    },
  },
  string: {
    length: "This field must be exactly ${length} characters",
    min: "This field must be at least ${min} characters",
    max: "This field must be at most ${max} characters",
    matches: 'This field must match the following: "${regex}"',
    email: "This field must be a valid email",
    url: "This field must be a valid URL",
    uuid: "This field must be a valid UUID",
    trim: "This field must be a trimmed string",
    lowercase: "This field must be a lowercase string",
    uppercase: "This field must be a upper case string",
  },
  number: {
    min: "This field must be greater than or equal to ${min}",
    max: "This field must be less than or equal to ${max}",
    lessThan: "This field must be less than ${less}",
    moreThan: "This field must be greater than ${more}",
    positive: "This field must be a positive number",
    negative: "This field must be a negative number",
    integer: "This field must be an integer",
  },
  date: {
    min: "This field must be later than ${min}",
    max: "This field must be at earlier than ${max}",
  },
  boolean: {
    isValue: "This field must be ${value}",
  },
  object: {
    noUnknown: "This field has unspecified keys: ${unknown}",
  },
  array: {
    min: "This field must have at least ${min} items",
    max: "This field must have less than or equal to ${max} items",
    length: "This field must have ${length} items",
  },
};

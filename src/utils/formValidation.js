export const registerValidation = (inputDetails) => {
  const errors = {};
  const emailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!inputDetails.email.match(emailFormat)) {
    errors.email = "Incorrect email format";
  }
  if (!inputDetails.email) {
    errors.email = "Must not be empty";
  }
  if (!inputDetails.password) {
    errors.password = "Must not be empty";
  }
  if (!inputDetails.repeatPassword) {
    errors.repeatPassword = "Must not be empty";
  }
  if (!inputDetails.userName) {
    errors.userName = "Must not be empty";
  }
  if (inputDetails.password !== inputDetails.repeatPassword) {
    errors.repeatPassword = "Password do not match";
  }

  if (Object.keys(errors).length === 0) {
    return false;
  } else {
    return errors;
  }
};

export const loginValidation = (inputDetails) => {
  const errors = {};
  const emailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!inputDetails.email.match(emailFormat)) {
    errors.email = "Incorrect email format";
  }
  if (!inputDetails.email) {
    errors.email = "Must not be empty";
  }
  if (!inputDetails.password) {
    errors.password = "Must not be empty";
  }
  if (Object.keys(errors).length === 0) {
    return false;
  } else {
    return errors;
  }
};

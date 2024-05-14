import validator from 'validator';

function userValidation(data, users, isEdit = false) {
  const errors = {};

  if (validator.isEmpty(data.name.trim()))
    errors.name = 'Name is required.';

  if (validator.isEmpty(data.email.trim())) errors.email = 'Email is required.';
  else if (!validator.isEmail(data.email)) errors.email = 'Please enter a valid email.';
  else if (!isEdit && users.some(user => user.email === data.email)) errors.email = 'Email already exists.';


  if (validator.isEmpty(data.mobile.trim()))
    errors.mobile = 'Mobile number is required.';
  else if (!validator.isMobilePhone(data.mobile))
    errors.mobile = 'Please enter valid mobile number.';

  if (!data?.dob) {
    errors.dob = 'Date of birth is required.';
  } else {
    const dobDate = new Date(data.dob);
    const now = new Date();
    const ageDiff = now - dobDate;
    const ageDate = new Date(ageDiff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (years < 18) errors.dob = 'Must be at least 18 years old.';
  }

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default userValidation;

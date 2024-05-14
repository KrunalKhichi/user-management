import React, { forwardRef, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../redux/userSlice';
import useInput from '../hooks/useInput';
import Input from './Common/Input';
import userValidation from '../validations/userValidation';
import { NUMBER_REGEX } from '../utils/constants';
import { successToast } from '../utils/helper';

const UserForm = forwardRef(({ user, onClose, allUsers }, ref) => {
  const dispatch = useDispatch();

  const name = useInput(user ? user.name : '', 50);
  const email = useInput(user ? user.email : '', 50);
  const mobile = useInput(user ? user.mobile : '', 10, NUMBER_REGEX);
  const dob = useInput(user ? user.dob : '', 10);

  const formData = {
    name: name.value,
    email: email.value,
    mobile: mobile.value,
    dob: dob.value,
  }

  const handleSubmit = () => {
    const { errors, isValid } = userValidation(formData, allUsers, user);

    if(isValid){
      const newUser = {
        id: user ? user.id : new Date().getTime(),
        name: name.value,
        email: email.value,
        mobile: mobile.value,
        dob: dob.value,
        createdAt: user ? user.createdAt : new Date().toISOString(),
      };
    
      if (user) {
        dispatch(editUser({ id: user.id, user: newUser }));
        successToast('User updated successfully')
      } else {
        dispatch(addUser(newUser));
        successToast('User added successfully')
      }
  
      onClose();
    } else {
        const errorMap = {
          name: name?.setError,
          email: email?.setError,
          mobile: mobile?.setError,
          dob: dob?.setError,
        };
          
        for (const key in errors) {
          if (errors.hasOwnProperty(key) && errorMap[key]) {
            errorMap[key](errors[key]);
          }
        }
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const { setError: nameSetError, ...filteredNameProps } = name;
  const { setError: emailSetError, ...filteredEmailProps } = email;
  const { setError: mobileSetError, ...filteredMobileProps } = mobile;
  const { setError: dobSetError, ...filteredDobProps } = dob;

  return (
    <div className='overflow-y-auto max-h-[500px]'>
        <Input
            isRequired
            type="text"
            label="Name"
            wrapperClass='!mt-0'
            placeholder="Name"
            {...filteredNameProps}
            
        />

        <Input
            isRequired
            type="email"
            label="Email"
            placeholder="Email"
            {...filteredEmailProps}
        />
        
        <Input
            isRequired
            type="text"
            label="Mobile"
            placeholder="Mobile number"
            min={0}
            {...filteredMobileProps}
        />
        
        <Input
            isRequired
            type="date"
            label="Date of Birth"
            placeholder="Date of Birth"
            max={new Date().toISOString().split('T')[0]}
            {...filteredDobProps}
        />
    </div>
  );
});

export default UserForm;

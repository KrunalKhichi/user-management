import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helper';

const Input = ({ type, wrapperClass, label, className, placeholder, error, isRequired, ...props }) => {
  return (
    <div className={`mt-4 p-1 ${wrapperClass}`}>
        <label>
          {label} {isRequired && <span className='text-red-500 pe-1'>&#42;</span>}
        </label>
        <input
          type={type}
          className={classNames(className,
              'w-full mt-1.5 border  p-4 rounded-lg',
              error ? '!border-red-500 outline-none': 'border-gray-300'
          )}
          placeholder={placeholder}
          {...props}
          required
        />

      {error && (
        <div className='text-red-500 text-sm font-normal mt-1.5'>{error}</div>
      )}
    </div>
    
  );
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  wrapperClass: PropTypes.string,
  placeholder: PropTypes.string, 
  error: PropTypes.string, 
  isRequired: PropTypes.bool
};


export default Input;

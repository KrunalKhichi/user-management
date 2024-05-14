import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helper';

const Button = ({
  type = 'submit',
  className = '',
  onClick,
  size = 'md',
  children,
  ...rest
}) => {
  const handleClassName = () => {
    const sizeClass = {
      md: 'py-2.5 px-4 text-sm',
      lg: 'py-2.5 px-[18px] text-base',
      xl: 'py-3 px-5 text-base',
      xxl: 'py-4 px-7 text-lg',
    };

    return sizeClass[size] || 'py-2 px-3.5 text-sm';
  };

  return (
    <button
      {...rest}
      type={type}
      className={classNames(
        'outline-none font-semibold rounded-lg hover:opacity-90 disabled:cursor-not-allowed border',
        handleClassName(),
        'border-transparent',
        className
      )}
      onClick={(e) => {
        onClick(e);
      }}
    >
      <div className='flex items-center justify-center gap-2'>
        {children}
      </div>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['md', 'lg', 'xl', 'xxl']),
  children: PropTypes.any,
};

export default Button;

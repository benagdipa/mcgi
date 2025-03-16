import React from 'react';
import { Input as MaterialInput } from '@material-tailwind/react';

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <MaterialInput
      className={`focus:border-primary ${className}`}
      {...props}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

export { Input }; 
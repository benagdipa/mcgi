import React from 'react';
import { Select as MaterialSelect, Option as MaterialOption } from '@material-tailwind/react';

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <MaterialSelect
      className={`focus:border-primary ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </MaterialSelect>
  );
});

const Option = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <MaterialOption
      className={className}
      {...props}
      ref={ref}
    >
      {children}
    </MaterialOption>
  );
});

Select.displayName = 'Select';
Option.displayName = 'Option';

export { Select, Option }; 
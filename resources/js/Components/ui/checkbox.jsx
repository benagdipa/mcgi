import React from 'react';
import { Checkbox as MaterialCheckbox } from '@material-tailwind/react';

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <MaterialCheckbox
      className={`text-primary focus:ring-primary ${className}`}
      {...props}
      ref={ref}
    />
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox }; 
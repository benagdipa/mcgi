import React from 'react';
import { Textarea as MaterialTextarea } from '@material-tailwind/react';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <MaterialTextarea
      className={`min-h-[100px] ${className}`}
      {...props}
      ref={ref}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea }; 
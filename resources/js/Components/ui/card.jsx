import React from 'react';
import { Card as MaterialCard } from '@material-tailwind/react';

const Card = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <MaterialCard
      className={`shadow-lg rounded-lg p-6 ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </MaterialCard>
  );
});

const CardBody = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className={`p-4 ${className}`} {...props} ref={ref}>
      {children}
    </div>
  );
});

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className={`p-4 mt-4 border-t ${className}`} {...props} ref={ref}>
      {children}
    </div>
  );
});

const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={`px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});

Card.displayName = 'Card';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';
Button.displayName = 'Button';

export { Card, CardBody, CardFooter, Button }; 
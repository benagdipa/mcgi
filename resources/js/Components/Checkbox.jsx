import { forwardRef } from 'react';

export default forwardRef(function Checkbox({ className = '', ...props }, ref) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-primary shadow-sm focus:ring focus:ring-primary/20 focus:ring-offset-0 transition duration-150 ease-in-out ' +
                className
            }
            ref={ref}
        />
    );
});

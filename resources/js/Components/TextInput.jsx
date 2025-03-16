import { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, hasError = false, ...props },
    ref
) {
    const inputRef = useRef(null);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
        
        // Check if input has value on initial render
        setIsFilled(inputRef.current?.value?.length > 0);
    }, [isFocused]);

    const handleInput = (e) => {
        setIsFilled(e.target.value.length > 0);
        if (props.onInput) {
            props.onInput(e);
        }
    };

    return (
        <div className="relative">
            <input
                {...props}
                type={type}
                className={`
                    w-full rounded-md border px-4 py-3 text-base shadow-sm transition-colors duration-200
                    ${hasError 
                        ? 'border-red-500 focus:border-red-500 focus:ring focus:ring-red-200' 
                        : 'border-gray-300 focus:border-primary focus:ring focus:ring-primary/20'
                    }
                    ${isFilled ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    ${className}
                `}
                ref={(e) => {
                    // Handle both the ref passed from parent and our local ref
                    if (ref) {
                        if (typeof ref === 'function') {
                            ref(e);
                        } else {
                            ref.current = e;
                        }
                    }
                    inputRef.current = e;
                }}
                aria-invalid={hasError}
                onInput={handleInput}
            />
        </div>
    );
});

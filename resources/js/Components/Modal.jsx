import { Fragment, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ 
    children, 
    show = false, 
    maxWidth = '2xl', 
    closeable = true, 
    onClose = () => {},
    title = null,
    showCloseButton = true,
    initialFocus = null
}) {
    const closeButtonRef = useRef(null);
    
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        xxl: 'lg:max-w-5xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
        '6xl': 'sm:max-w-6xl',
        '7xl': 'sm:max-w-7xl',
        full: 'sm:max-w-full',
    }[maxWidth];

    const handleEscapeKey = (e) => {
        if (e.key === 'Escape' && closeable) {
            onClose();
        }
    };

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog 
                as="div"
                id="modal"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={close}
                initialFocus={initialFocus || closeButtonRef}
                onKeyDown={handleEscapeKey}
                aria-labelledby={title ? "modal-title" : undefined}
                aria-modal="true"
                role="dialog"
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={`
                            inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg ${maxWidthClass}
                        `}>
                            {title && (
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                                    id="modal-title"
                                >
                                    {title}
                                </Dialog.Title>
                            )}
                            
                            <div className="mt-2">
                                {children}
                            </div>

                            {closeable && (
                                <div className="absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        ref={closeButtonRef}
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        onClick={close}
                                        aria-label="Close modal"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

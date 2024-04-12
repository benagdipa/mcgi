export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-red-600 dark:text-red-400 font-poppins capitalize ' + className}>
            {message}
        </p>
    ) : null;
}

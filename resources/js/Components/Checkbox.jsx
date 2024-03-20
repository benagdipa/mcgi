export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded  border-gray-300 text-yellow-600 shadow-sm focus:ring-yellow-500 dark:focus:ring-0  ' +
                className
            }
        />
    );
}

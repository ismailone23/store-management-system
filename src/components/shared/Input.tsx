import clsx from 'clsx'

export default function Input({
    title,
    className,
    type,
    name,
    placeholder,
    value,
    required,
    readOnly
}: {
    title: string;
    type: 'text' | 'password' | 'email' | 'number';
    className?: string;
    name: string;
    placeholder: string;
    readOnly?: boolean
    value?: string | number;
    required?: boolean;
}) {
    return (
        <div className='flex flex-col w-full'>
            <label className="text-[0.9rem]" htmlFor={name}>{title}</label>
            <input defaultValue={value} autoComplete='off'
                required={required}
                readOnly={readOnly}
                placeholder={placeholder}
                className={clsx(className, 'outline-none focus:border-blue-400 text-black border-2 ease-in-out placeholder:text-gray-400 border-gray-100 rounded py-1 px-2')}
                type={type} name={name} id={name}
            />
        </div>
    )
}

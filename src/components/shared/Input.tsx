import clsx from 'clsx'
import { ChangeEvent } from 'react';

export default function Input({
    title,
    className,
    type,
    name,
    placeholder,
    value,
    required,
    readOnly,
    onChange,
    dval,
}: {
    title: string;
    type: 'text' | 'password' | 'email' | 'number';
    className?: string;
    name: string;
    placeholder: string;
    readOnly?: boolean;
    dval?: string | number;
    value?: string | number;
    required?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className='flex flex-col w-full'>
            <label className="text-[0.9rem]" htmlFor={name}>{title}</label>
            <input defaultValue={value} autoComplete='off'
                required={required}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={placeholder}
                value={dval}
                className={clsx(className, 'outline-none focus:border-blue-400 text-black border-2 ease-in-out placeholder:text-gray-400 border-gray-100 rounded py-1 px-2')}
                type={type} name={name} id={name}
            />
        </div>
    )
}

import clsx from 'clsx'

export default function Input({
    title,
    className,
    type,
    name,
    placeholder
}: {
    title: string;
    type: 'text' | 'password' | 'email';
    className?: string;
    name: string;
    placeholder: string
}) {
    return (
        <div className='flex flex-col w-full'>
            <label className="text-[0.9rem]" htmlFor={name}>{title}</label>
            <input autoComplete='off' placeholder={placeholder} className={clsx(className, 'outline-none text-black border placeholder:text-gray-400 border-gray-100 rounded-sm py-1 px-2')} type={type} name={name} id={name} />
        </div>
    )
}

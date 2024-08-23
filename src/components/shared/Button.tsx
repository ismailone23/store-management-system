import { ComponentProps, MouseEventHandler, ReactNode } from 'react'

export default function Button({
    title,
    type,
    onClick,
    Icon,
    disabled,
    className
}: {
    title?: string;
    type: 'submit' | 'button';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    Icon?: ReactNode;
    disabled?: boolean;
    className?: string;
}) {
    return (
        <button disabled={disabled} onClick={onClick} className={className} type={type}>
            {Icon && Icon}
            {disabled ? `${title}...` : title}
        </button>
    )
}

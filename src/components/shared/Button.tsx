import { ComponentProps, MouseEventHandler } from 'react'

export default function Button({
    title,
    type,
    onClick,
    Icon,
    disabled,
    className,
    iconClas
}: {
    title: string;
    type: 'submit' | 'button';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    Icon?: (props: ComponentProps<"svg">) => JSX.Element;
    disabled?: boolean;
    className: string;
    iconClas?: string;
}) {
    return (
        <button onClick={onClick} className={className} type={type}>{Icon && <Icon className={iconClas} />}{title}</button>
    )
}

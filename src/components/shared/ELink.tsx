import Link from 'next/link'
import { MouseEventHandler } from 'react'

export default function ELink({
    title,
    href,
    className,
    onClick
}: {
    title: string;
    href: string;
    className?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
}) {
    return (
        <Link href={href} onClick={onClick} className={className}>{title}</Link>
    )
}

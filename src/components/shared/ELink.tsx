'use client'
import useMessage from '@/context/useMessage';
import clsx from 'clsx';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps, ElementType, MouseEvent, ReactNode } from 'react'

export default function ELink({
    title,
    href,
    className,
    isActivelink,
    Icon
}: {
    title: string;
    href: string;
    className?: string;
    isActivelink: boolean
    Icon?: JSX.Element;
}) {
    const { setPageLoading, setMessage } = useMessage()
    const router = useRouter()
    const path = usePathname()

    const handleMouse = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setMessage(null)
        setPageLoading(true)
        router.push(href)
        setTimeout(() => {
            setPageLoading(false)
        }, 500)
    }
    return (
        <Link href={href} onClick={(e) => handleMouse(e)}
            className={clsx(className, (isActivelink && `${path === href ? 'bg-blue-500 text-white' : ''}`))}>
            {Icon && Icon}
            <span className={`${Icon ? 'sm:block hidden' : ''}`}>{title}</span>
        </Link>
    )
}

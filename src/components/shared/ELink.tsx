'use client'
import useMessage from '@/context/useMessage';
import clsx from 'clsx';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { MouseEvent, MouseEventHandler } from 'react'

export default function ELink({
    title,
    href,
    className,
}: {
    title: string;
    href: string;
    className?: string
}) {
    const { setPageLoading, setMessage } = useMessage()
    const router = useRouter()
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
        <Link href={href} onClick={(e) => handleMouse(e)} className={clsx(className)}>{title}</Link>
    )
}

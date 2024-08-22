'use client'
import {
    ArrowTrendingUpIcon,
    BanknotesIcon,
    ChartBarIcon,
    CircleStackIcon,
    DocumentIcon,
    GlobeAltIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline"
import React from 'react'
import ELink from './ELink'
import { useSession } from "next-auth/react"
const dashboardRoutes = [
    { title: 'Overview', href: '/dashboard', icon: <CircleStackIcon className="w-5" /> },
    { title: 'Invoices', href: '/dashboard/invoices', icon: <DocumentIcon className="w-5" /> },
    { title: 'Reports', href: '/dashboard/reports', icon: <ArrowTrendingUpIcon className="w-5" /> },
    { title: 'Collection', href: '/dashboard/collections', icon: <BanknotesIcon className="w-5" /> },
    { title: 'Stocks', href: '/dashboard/stocks', icon: <ChartBarIcon className="w-5" /> },
    { title: 'Customers', href: '/dashboard/customers', icon: <GlobeAltIcon className="w-5" /> },
    { title: 'Users', href: '/dashboard/users', icon: <IdentificationIcon className="w-5" />, },
]
export default function Sidebar() {
    const session = useSession();
    return (
        <div className='w-full flex sm:flex-col border-r h-full border-gray-100'>
            {
                dashboardRoutes.map(({ href, icon, title }, i) => <ELink
                    className={`${((session.data?.user.role !== 'OWNER') && (title === 'Users')) ? 'hidden' : 'flex'} w-full sm:pl-4 gap-1 items-center sm:justify-start justify-center py-2 text-sm`}
                    isActivelink={true}
                    Icon={icon} key={i} href={href}
                    title={title}
                />)
            }
        </div>
    )
}

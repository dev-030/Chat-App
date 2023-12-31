'use client'

import clsx from "clsx"
import Link from 'next/link'


interface DesktopItemProps {
    lable : string 
    icon : any
    href : string
    onClick ?: () => void
    active?: boolean
}

export default function DesktopItem ({lable,icon:Icon,href,onClick,active}:DesktopItemProps) {

    const handleClick = () => {
        if(onClick){
            return onClick(); 
        }
    }

    return(
        <li onClick={handleClick}>
            <Link href={href} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`, active && 'bg-gray-100 text-black')}>
                <Icon className='h-6 w-6 shrint-0'/>
                <span className="sr-only">{lable}</span>
            </Link>
        </li>
    )
}
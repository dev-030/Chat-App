'use client'
import {IconType} from 'react-icons'




interface SocialButtonProps {
    icon : IconType 
    onClick : () => void
}

export function SocialButton({icon:Icon,onClick}:SocialButtonProps){
    return(
        <button type="button" onClick={onClick} className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 hover:bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
            <Icon/>
        </button>
    )
}
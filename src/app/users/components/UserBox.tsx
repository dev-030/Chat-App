'use client'

import Avatar from "@/app/components/sidebar/Avatar"
import { User } from "@prisma/client"
import axios from "axios"
import {useRouter} from 'next/navigation'
import { useCallback, useState } from "react"



interface UserBoxProps {
    data : User
}

export default function UserBox({data}:UserBoxProps){

    const router = useRouter()
    const [isLoading, setLoading] = useState<boolean>(false)


    const handleClick = useCallback(()=> {
        setLoading(true)

        axios.post('/api/conversations', {
            userId: data.id 
        })
        .then((data)=> {
            router.push(`/conversation/${data.data.id}`);
        })
        .finally(()=> setLoading(false));
    },[data, router])

    return(
        <div className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer" onClick={handleClick}>
            <Avatar user={data}/>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">{data.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
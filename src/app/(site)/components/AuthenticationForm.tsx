'use client'
import { useCallback, useEffect, useState } from "react"
import { FieldValues , useForm , SubmitHandler } from "react-hook-form";
import {BsGithub,BsGoogle} from 'react-icons/bs'
import { Input } from "../../components/input/input";
import { Button } from "../../components/button";
import { SocialButton } from "./SocialButton";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn ,useSession , getSession} from "next-auth/react";
import {useRouter} from 'next/navigation'


export default function AuthForm(){

    type variant = 'LOGIN' | 'REGISTER' ;

    const session = useSession()

    const [variant,setVariant]= useState<variant>('LOGIN')
    const [loading,setLoading]= useState<boolean>(false)
    const router = useRouter()


    useEffect(()=>{
        if(session?.status === 'authenticated'){
            router.push('/users')
        }
    },[session?.status,router])

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    },[variant])


    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            password : ''
        }
    })

    const onSubmit :SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        if(variant === 'REGISTER'){
            axios.post('/api/register', data)
            .then(()=>signIn('credentials',data))
            .catch(()=> toast.error('Something went wrong.'))
            .finally(()=> setLoading(false))
        }
        if (variant === 'LOGIN'){
            // next auth signint
            signIn('credentials', {
                ...data,
                redirect : false
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error('Invalid credentials')
                }
                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                    router.push('/users')
                }
            }).finally(()=> setLoading(false))
        }
    }   

    const socialLogin = (action:string) => {
        setLoading(true)
        
        signIn(action , {redirect:false})
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials')
            }

            if(callback?.ok && !callback?.error){
                toast.success('Logged in')
            }
        }).finally(()=> setLoading(false))
    }

    

    return(
        <>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {variant === 'REGISTER' && (
                            <Input id="name" label="Name" register={register} errors={errors} disabled={loading}/>
                        )}
                        <Input id="email" label="Email address" type="email" register={register}  disabled={loading} errors={errors}/>
                        <Input id="password" label="password" type="password"  disabled={loading} register={register} errors={errors}/>
                            
                        <div>
                            <Button disabled={loading} fullWidth type='submit'>
                                {variant ==='LOGIN' ? 'Sign in' : 'Register'}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <SocialButton icon={BsGoogle} onClick={()=> socialLogin('google')} />
                            <SocialButton icon={BsGithub} onClick={()=> socialLogin('github')}/>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>
                            {variant === 'LOGIN' ? 'New to Messeger ?' : 'Already have an account ?'}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === 'LOGIN' ? 'Create an account ' : 'Login'}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
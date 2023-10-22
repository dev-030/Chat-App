'use client'

import { useCallback, useState } from "react"
import { FieldValues , useForm , SubmitHandler ,FieldErrors , UseFormRegister} from "react-hook-form";

import clsx from "clsx";
import {IconType} from 'react-icons'

import {BsGithub,BsGoogle} from 'react-icons/bs'



interface InputProps {
    label : string 
    id : string 
    type?: string
    required?: boolean
    register : UseFormRegister<FieldValues>
    errors : FieldErrors
    disabled?: boolean
} 


export function Input ({label,id,type,required,register,errors,disabled}:InputProps){

    return (
        <div>
            <label htmlFor={id}
            className="block text-sm font-medium leading-6 text-gray-900"
            >{label}</label>
            <div className="mt-2">
                <input type={type} id={id} autoComplete={id} disabled={disabled} {...register(id , {required})}
                className={clsx(`form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:rign-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`, errors[id] && 'focus:ring-rose-500',disabled && 'opacity-50 cursor-default')}
                />
            </div>
        </div>
    )
}




interface ButtonProps {
    type ? : 'button' | 'submit' | 'reset' | undefined
    fullWidth?: boolean
    children?: React.ReactNode
    onClick?: ()=> void
    secondary?: boolean
    danger?: boolean
    disabled?: boolean
}

export function Button({type,fullWidth,children,danger,disabled,onClick,secondary}:ButtonProps) {
    return(
        <button onClick={onClick} type={type} disabled={disabled} className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2` , disabled && 'opacity-50 cursor-default', fullWidth && 'w-full', secondary ? 'text-gray-900':'text-white',danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600', !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600')}>
            {children}
        </button>
    )
}





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







export default function AuthForm(){

     type variant = 'LOGIN' | 'REGISTER' ;
    

    const [variant,setVariant]= useState<variant>('LOGIN')
    const [loading,setLoading]= useState<boolean>(false)

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
            // axios register
        }
        if (variant === 'LOGIN'){
            // next auth signint
        }

    }  

    const socialLogin = (value:string) =>{
        setLoading(true)
    }

    return(
        <>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    >
                        {variant === 'REGISTER' && (
                            <Input id="name" label="Name" register={register} errors={errors} disabled={loading}/>
                        )}

                        <Input id="Email" label="Email address" type="email" register={register}  disabled={loading} errors={errors}/>

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
                            {variant === 'LOGIN' ? 'Create and account ?' : 'Login'}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
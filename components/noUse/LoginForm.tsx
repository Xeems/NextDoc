'use client'

import UIInput from '@/components/UI/UIInput'
import UIButton from '@/components/UI/UIButton'
import { signIn } from 'next-auth/react'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const userLoginSchema = z.object({
    email: z
        .string()
        .email({ message: 'This should be an Email' })
        .trim()
        .toLowerCase(),
    password: z.string().min(7, { message: 'At least 7 characters' }),
})

function LoginForm() {
    const { data: session } = useSession()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(userLoginSchema),
    })

    function onSubmit(data: FieldValues) {
        const userCredentilas = {
            email: data.email as string,
            password: data.password as string,
        }

        const result = signIn('credentials', {
            email: userCredentilas.email,
            password: userCredentilas.password,
            redirect: true,
            callbackUrl: `user/${session?.user.name}`,
        })
        redirect(`user/${session?.user.name}`)
    }

    return (
        <form
            className="flex w-full flex-col gap-y-3 "
            onSubmit={handleSubmit(onSubmit)}>
            <UIInput
                placeholder="Enter email"
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message?.toString()}
            />
            <UIInput
                placeholder="Enter password"
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message?.toString()}
            />
            <UIButton variant="primary" className="mt-2 w-full" type="submit">
                Sign in
            </UIButton>
        </form>
    )
}
export default LoginForm

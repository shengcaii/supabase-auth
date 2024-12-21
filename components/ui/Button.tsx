'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'outline'
    size?: 'default' | 'sm' | 'lg'
    href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'default', size = 'default', href, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50'

        const variants = {
            default: 'bg-primary text-white hover:bg-primary-dark',
            secondary: 'bg-secondary text-slate-800 hover:opacity-90',
            outline: 'border border-muted bg-background hover:bg-surface-2'
        }

        const sizes = {
            default: 'px-4 py-2 text-sm',
            sm: 'px-3 py-1.5 text-sm',
            lg: 'px-6 py-3 text-base'
        }

        const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

        if (href) {
            return (
                <Link href={href} className={combinedClassName}>
                    {props.children}
                </Link>
            )
        }

        return (
            <button
                className={combinedClassName}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export { Button } 
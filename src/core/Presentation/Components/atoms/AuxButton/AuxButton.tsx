import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import './AuxButton.scss'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
}

const AuxButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            size = 'default',
            asChild = false,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button'

        return (
            <Comp
                ref={ref}
                className={[
                    'button',
                    `button--${variant}`,
                    `button--size-${size}`,
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')}
                {...props}
            />
        )
    },
)

AuxButton.displayName = 'Button'

export { AuxButton }

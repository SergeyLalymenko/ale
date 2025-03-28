'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

function Button({ children, ...props }: IProps) {
    return (
        <button
            className="mt-4 px-4 py-2 bg-sky-600 cursor-pointer transition-colors duration-200 rounded hover:bg-sky-700 font-semibold"
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;

'use client'

import { Icon } from "@mui/material";
import { FC } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<ButtonProps> = ({ label, disabled, outline, small, custom, icon, onClick }) => {
    return (
        <button disabled={disabled}
            className={`
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-md
                        hover:opacity-80
                        transition
                        w-full
                        border-slate-700
                        flex items-center
                        justify-center gap-2
                        ${outline ? 'bg-white' : 'bg-slate-700'}
                        ${outline ? 'text-slate-700' : ' text-white'}
                        ${small ? 'text-sm font-light' : 'text-md font-semibold'}
                        ${small ? 'py-1 px-2' : 'py-3 px-4 border-2'}
                }
`}>
            {Icon && <Icon />}
            {label}
        </button>
    );
}

export default Button;
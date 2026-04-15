import type {ButtonHTMLAttributes, ReactNode} from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    variant?: 'default' | 'ghost' | 'plus' | 'minus' | 'remove';
}
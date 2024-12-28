import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {colors} from '../../constants/Palette';

export const buttonVariants = cva(
  "btn inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `btn-${colors.primary}`, 
        destructive: `btn-${colors.danger}`,
        outline: `btn-outline-${colors.secondary}`,
        secondary: `btn-${colors.secondary}`,
        ghost: `btn-${colors.light}`,
        link: "btn-link",
      },
      size: {
        default: "btn-md",
        sm: "btn-sm",
        lg: "btn-lg",
        icon: "btn-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

  export interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; 
  label?: string; 
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
}

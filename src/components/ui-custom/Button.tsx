
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    icon, 
    iconPosition = 'left', 
    loading = false, 
    fullWidth = false,
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
      outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      glass: "glass-panel glass-button text-foreground"
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-sm rounded-md",
      lg: "px-5 py-2.5 text-base rounded-lg",
      xl: "px-6 py-3 text-lg rounded-lg"
    };
    
    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          loading && "opacity-80 pointer-events-none",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="mr-2 animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : icon && iconPosition === 'left' ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        
        {children}
        
        {icon && iconPosition === 'right' && !loading && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

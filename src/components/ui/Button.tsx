import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wider uppercase text-xs transition-all duration-300 select-none whitespace-nowrap cursor-pointer rounded-none';
  
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-[11px] tracking-[0.14em]',
    md: 'px-7 py-3.5 text-xs tracking-[0.16em]',
    lg: 'px-9 py-4 text-xs tracking-[0.18em]',
  };

  const variantStyles = {
    primary: 'bg-[#f5f2eb] text-[#0e0f12] hover:bg-[#c5a880] hover:text-[#0e0f12] border border-[#f5f2eb] hover:border-[#c5a880] shadow-sm',
    secondary: 'bg-transparent text-[#f5f2eb] border border-[#f5f2eb]/30 hover:border-[#f5f2eb] hover:bg-[#f5f2eb]/10',
    outline: 'bg-transparent text-[#c5a880] border border-[#c5a880]/40 hover:border-[#c5a880] hover:bg-[#c5a880]/10',
    ghost: 'bg-transparent text-[#e5e5e0] hover:text-[#c5a880] border-b border-transparent hover:border-[#c5a880] px-0 py-1',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          onClick={props.onClick as any}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedClasses} onClick={props.onClick as any}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

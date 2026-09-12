import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'neutral' | 'outline' | 'status';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const base = 'inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] uppercase whitespace-nowrap';
  
  const variants = {
    gold: 'bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30',
    neutral: 'bg-white/5 text-[#a8a9b0] border border-white/10',
    outline: 'border border-white/20 text-[#f5f2eb]',
    status: 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

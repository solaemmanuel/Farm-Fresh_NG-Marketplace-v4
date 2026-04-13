import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    success: 'bg-[#d1fae5] text-[#065f46] border-[#6ee7b7]',
    warning: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
    danger: 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]',
    info: 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]',
    default: 'bg-[#f5f3f0] text-[#1a1a1a] border-[#e5e5e5]'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${styles[variant]}`}>
      {children}
    </span>
  );
}

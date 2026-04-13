import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'rounded-lg transition-colors duration-200 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-[#2d7a3e] text-white hover:bg-[#246831] active:bg-[#1d5327]',
    secondary: 'bg-[#f5f3f0] text-[#1a1a1a] hover:bg-[#ebe9e5] active:bg-[#e1dfd9]',
    outline: 'border-2 border-[#2d7a3e] text-[#2d7a3e] hover:bg-[#f0f9f3] active:bg-[#e1f3e6]',
    success: 'bg-[#2d7a3e] text-white hover:bg-[#246831]',
    destructive: 'bg-[#dc2626] text-white hover:bg-[#b91c1c]'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle}`}
    >
      {children}
    </button>
  );
}

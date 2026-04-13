import { ReactNode } from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  disabled = false
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-[#1a1a1a]">
          {label} {required && <span className="text-[#dc2626]">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e] focus:border-transparent ${
            icon ? 'pl-10' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );
}

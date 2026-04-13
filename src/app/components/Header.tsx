import { ArrowLeft, Menu } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  onMenu?: () => void;
}

export function Header({ title, onBack, rightAction, onMenu }: HeaderProps) {
  return (
    <div className="bg-white border-b border-[#e5e5e5] px-4 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 flex-1">
        {onBack && (
          <button onClick={onBack} className="p-1 hover:bg-[#f5f3f0] rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#1a1a1a]" />
          </button>
        )}
        {onMenu && (
          <button onClick={onMenu} className="p-1 hover:bg-[#f5f3f0] rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-[#1a1a1a]" />
          </button>
        )}
        <h1 className="text-xl font-medium text-[#1a1a1a]">{title}</h1>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
}

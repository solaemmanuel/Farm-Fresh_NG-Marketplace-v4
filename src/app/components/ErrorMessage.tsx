import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="bg-[#fee2e2] border border-[#fca5a5] rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
      <p className="text-sm text-[#991b1b] flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-[#fca5a5]/20 rounded transition-colors"
        >
          <X className="w-4 h-4 text-[#dc2626]" />
        </button>
      )}
    </div>
  );
}

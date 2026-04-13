import { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#e1f3e6] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-[#fee2e2] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Something went wrong</h2>
            <p className="text-[#6b7280] mb-6">
              We encountered an unexpected error. Please try again.
            </p>
            {this.state.error && (
              <div className="bg-[#f5f3f0] rounded-lg p-4 mb-6 text-left">
                <p className="text-xs text-[#6b7280] font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <Button variant="primary" size="lg" fullWidth onClick={this.handleReset}>
              Return to Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ErrorMessage } from '../components/ErrorMessage';
import { Smartphone, ArrowLeft } from 'lucide-react';

interface USSDLoginProps {
  onLogin: (phone: string) => void;
  onBack: () => void;
}

export function USSDLogin({ onLogin, onBack }: USSDLoginProps) {
  const [step, setStep] = useState<'welcome' | 'phone' | 'verify'>('welcome');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePhoneSubmit = () => {
    setError('');
    try {
      if (phoneNumber.length < 10) {
        throw new Error('Please enter a valid 11-digit phone number');
      }
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid phone number');
    }
  };

  const handleVerify = async () => {
    setError('');
    setIsVerifying(true);

    try {
      if (verificationCode.length !== 4) {
        throw new Error('Please enter the 4-digit verification code');
      }

      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 500));

      onLogin(phoneNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2d7a3e] flex flex-col">
      <div className="p-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-10 h-10 text-[#2d7a3e]" />
            </div>
            <h1 className="text-3xl font-medium text-white mb-2">
              Farm Fresh NG
            </h1>
            <p className="text-white/80">USSD Login</p>
          </div>

          <Card className="bg-white">
            {error && (
              <div className="mb-4">
                <ErrorMessage message={error} onDismiss={() => setError('')} />
              </div>
            )}

            {step === 'welcome' && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-lg mb-4">📱 Simple Phone Login</p>
                  <p className="text-sm text-[#6b7280] mb-6">
                    No internet needed. Use your phone number to access Farm Fresh NG
                  </p>
                </div>

                <div className="bg-[#f5f3f0] rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium mb-3">How it works:</p>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 bg-[#2d7a3e] text-white rounded-full flex items-center justify-center flex-shrink-0">1</span>
                    <p className="text-[#6b7280]">Enter your phone number</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 bg-[#2d7a3e] text-white rounded-full flex items-center justify-center flex-shrink-0">2</span>
                    <p className="text-[#6b7280]">Receive SMS code</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 bg-[#2d7a3e] text-white rounded-full flex items-center justify-center flex-shrink-0">3</span>
                    <p className="text-[#6b7280]">Enter code to login</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setStep('phone')}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 'phone' && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <p className="text-lg font-medium mb-2">Enter Phone Number</p>
                  <p className="text-sm text-[#6b7280]">
                    We'll send you a verification code
                  </p>
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="0801 234 5678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-4 text-center text-2xl bg-[#f9fafb] border-2 border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e] focus:border-transparent"
                    maxLength={11}
                  />
                  <p className="text-xs text-[#6b7280] text-center mt-2">
                    Enter 11-digit phone number (e.g., 08012345678)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPhoneNumber(prev => prev + num)}
                      className="py-4 bg-[#f5f3f0] rounded-lg text-xl font-medium hover:bg-[#e5e5e5] active:bg-[#d5d5d5] transition-colors"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => setPhoneNumber('')}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handlePhoneSubmit}
                    disabled={phoneNumber.length < 10}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 'verify' && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <p className="text-lg font-medium mb-2">Enter Verification Code</p>
                  <p className="text-sm text-[#6b7280] mb-1">
                    Code sent to {phoneNumber}
                  </p>
                  <button
                    onClick={() => setStep('phone')}
                    className="text-sm text-[#2d7a3e] hover:underline"
                  >
                    Change number
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="* * * *"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full px-4 py-4 text-center text-3xl tracking-widest bg-[#f9fafb] border-2 border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e] focus:border-transparent"
                    maxLength={4}
                  />
                  <p className="text-xs text-[#6b7280] text-center mt-2">
                    Enter the 4-digit code from SMS
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((num, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (num === '⌫') {
                          setVerificationCode(prev => prev.slice(0, -1));
                        } else if (num !== '') {
                          setVerificationCode(prev => prev.length < 4 ? prev + num : prev);
                        }
                      }}
                      className={`py-4 rounded-lg text-xl font-medium transition-colors ${
                        num === ''
                          ? 'bg-transparent cursor-default'
                          : 'bg-[#f5f3f0] hover:bg-[#e5e5e5] active:bg-[#d5d5d5]'
                      }`}
                      disabled={num === ''}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="bg-[#fef3c7] rounded-lg p-3 border border-[#fcd34d]">
                  <p className="text-xs text-[#92400e]">
                    💡 Didn't receive code? Check your messages or{' '}
                    <button className="font-medium underline">resend code</button>
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleVerify}
                  disabled={verificationCode.length < 4 || isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Login'}
                </Button>
              </div>
            )}
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-white/80">
              Available on any phone • No internet required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from '../components/Button';
import { Sprout, ShoppingBag, Truck, Smartphone } from 'lucide-react';

interface WelcomeProps {
  onSelectRole: (role: 'farmer' | 'buyer' | 'logistics') => void;
  onUSSDLogin: () => void;
  onLogin: () => void;
  onTermsClick?: () => void;
}

export function Welcome({ onSelectRole, onUSSDLogin, onLogin, onTermsClick }: WelcomeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/images.jfif')" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-[#2d7a3e] rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-black/30">
          <Sprout className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-medium text-white mb-3 text-center">
          Farm Fresh NG
        </h1>

        <p className="text-lg text-slate-100 text-center mb-12 max-w-md">
          Connecting Nigerian farmers directly with consumers for fresher produce and better income
        </p>

        <div className="w-full max-w-md space-y-4">
          <div
            onClick={() => onSelectRole('farmer')}
            className="bg-white/95 rounded-xl p-6 border border-white/40 backdrop-blur-sm hover:border-white/60 cursor-pointer transition-all hover:shadow-2xl hover:shadow-black/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#e1f3e6] rounded-full flex items-center justify-center">
                <Sprout className="w-7 h-7 text-[#2d7a3e]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">I'm a Farmer</h3>
                <p className="text-sm text-[#6b7280]">
                  Sell your produce directly to customers
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => onSelectRole('buyer')}
            className="bg-white/95 rounded-xl p-6 border border-white/40 backdrop-blur-sm hover:border-white/60 cursor-pointer transition-all hover:shadow-2xl hover:shadow-black/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#e1f3e6] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#2d7a3e]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">I'm a Buyer</h3>
                <p className="text-sm text-[#6b7280]">
                  Get fresh produce from local farmers
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => onSelectRole('logistics')}
            className="bg-white/95 rounded-xl p-6 border border-white/40 backdrop-blur-sm hover:border-white/60 cursor-pointer transition-all hover:shadow-2xl hover:shadow-black/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#e1f3e6] rounded-full flex items-center justify-center">
                <Truck className="w-7 h-7 text-[#2d7a3e]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">I'm a Delivery Partner</h3>
                <p className="text-sm text-[#6b7280]">
                  Earn by delivering farm-fresh produce
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-[#e5e5e5]"></div>
            <span className="text-sm text-[#6b7280]">Or</span>
            <div className="flex-1 h-px bg-[#e5e5e5]"></div>
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-white text-[#2d7a3e] rounded-xl p-4 border-2 border-[#2d7a3e] font-medium hover:bg-[#f0f9f7] transition-all mb-3"
          >
            Sign In
          </button>

          <button
            onClick={onUSSDLogin}
            className="w-full bg-[#2d7a3e] text-white rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-[#246831] transition-all"
          >
            <Smartphone className="w-6 h-6" />
            <div className="text-left">
              <p className="font-medium">USSD Login</p>
              <p className="text-sm opacity-90">Login with any phone</p>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-[#6b7280]">
          <p>Supporting Nigerian agriculture 🇳🇬</p>
          <p className="mt-1">Reducing post-harvest losses • Increasing farmer income</p>
        </div>
      </div>

      <div className="p-6 text-center text-xs text-[#6b7280] space-y-2">
        <p>Farm Fresh NG v1.0.0</p>
        <button
          onClick={onTermsClick}
          className="text-[#2d7a3e] hover:text-[#246831] underline transition-colors"
        >
          Terms & Conditions
        </button>
      </div>
    </div>
  );
}

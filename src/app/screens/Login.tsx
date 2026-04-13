import { useState } from 'react';
import { ArrowLeft, Sprout, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { dataService } from '../services/dataService';

interface LoginProps {
  onLoginComplete: (userId: string, role: 'farmer' | 'buyer' | 'logistics') => void;
  onBack: () => void;
}

type UserRole = 'farmer' | 'buyer' | 'logistics' | null;

export function Login({ onLoginComplete, onBack }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleConfig = {
    farmer: {
      name: 'Farmer',
      icon: Sprout,
      color: 'bg-[#2d7a3e]',
      lightColor: 'bg-[#e1f3e6]',
      description: 'Sign in to your farmer account'
    },
    buyer: {
      name: 'Buyer',
      icon: ShoppingBag,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      description: 'Sign in to your buyer account'
    },
    logistics: {
      name: 'Delivery Partner',
      icon: Truck,
      color: 'bg-orange-600',
      lightColor: 'bg-orange-50',
      description: 'Sign in to your delivery account'
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!selectedRole) {
        setError('Please select a role');
        setLoading(false);
        return;
      }

      if (!email || !password) {
        setError('Please enter email and password');
        setLoading(false);
        return;
      }

      // Fetch all users and validate credentials
      const allUsers = await dataService.getUsers();
      const user = allUsers.find(
        (u: any) => u.email === email && u.password === password && u.role === selectedRole
      );

      if (user) {
        onLoginComplete(user.id, selectedRole);
      } else {
        // Fallback to demo credentials for testing
        const validCredentials: Record<string, { email: string; password: string; userId: string }> = {
          farmer: { email: 'farmer@test.com', password: 'password', userId: 'u1' },
          buyer: { email: 'buyer@test.com', password: 'password', userId: 'u4' },
          logistics: { email: 'logistics@test.com', password: 'password', userId: 'u7' }
        };

        const creds = validCredentials[selectedRole];
        if (email === creds.email && password === creds.password) {
          onLoginComplete(creds.userId, selectedRole);
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/images.jfif')" }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">Sign In</h1>
            <p className="text-white/80 text-center mb-8">Select your account type</p>

            <div className="space-y-3">
              {(['farmer', 'buyer', 'logistics'] as const).map((role) => {
                const config = roleConfig[role];
                const Icon = config.icon;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className="w-full bg-white/95 rounded-xl p-4 border-2 border-transparent hover:border-white hover:shadow-2xl transition-all backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${config.lightColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${config.color}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg text-[#1f2937]">{config.name}</h3>
                        <p className="text-sm text-[#6b7280]">{config.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const config = roleConfig[selectedRole];
  const Icon = config.icon;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/images.jfif')" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button
            onClick={() => setSelectedRole(null)}
            className="flex items-center gap-2 text-white mb-8 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Change Role
          </button>

          <div className="bg-white/95 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 ${config.lightColor} rounded-full flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${config.color}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${config.color}`}>
                  {config.name}
                </h1>
                <p className="text-xs text-[#6b7280]">Sign In</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1f2937] mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1f2937] mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${config.color} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-[#1f2937] font-medium mb-2">Demo Credentials:</p>
              <div className="text-xs text-[#6b7280] space-y-1">
                <p><strong>Farmer:</strong> farmer@test.com / password</p>
                <p><strong>Buyer:</strong> buyer@test.com / password</p>
                <p><strong>Logistics:</strong> logistics@test.com / password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

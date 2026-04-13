import { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { User, Phone, MapPin, Sprout, Mail, Lock } from 'lucide-react';

interface FarmerOnboardingProps {
  onComplete: (data: { name: string; email: string; password: string }) => void;
  onCancel?: () => void;
}

export function FarmerOnboarding({ onComplete, onCancel }: FarmerOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    farmLocation: '',
    state: 'Lagos',
    produceType: [] as string[]
  });

  const produceOptions = [
    'Vegetables', 'Grains', 'Tubers', 'Fruits', 'Legumes', 'Spices'
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  const toggleProduce = (produce: string) => {
    setFormData(prev => ({
      ...prev,
      produceType: prev.produceType.includes(produce)
        ? prev.produceType.filter(p => p !== produce)
        : [...prev.produceType, produce]
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({ name: formData.fullName, email: formData.email, password: formData.password });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header title="Farmer Registration" />

      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full mx-1 ${
                  s <= step ? 'bg-[#2d7a3e]' : 'bg-[#e5e5e5]'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-center text-[#6b7280]">
            Step {step} of 3
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-[#e1f3e6] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#1a1a1a]">
                👋 <strong>Welcome!</strong> Let's get your farmer profile set up.
                This will help buyers find your fresh produce.
              </p>
            </div>

            <Input
              label="Full Name"
              placeholder="Adebayo Okonkwo"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              icon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="farmer@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="0801 234 5678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              icon={<Phone className="w-5 h-5" />}
              required
            />

            <div className="bg-[#f5f3f0] rounded-lg p-4">
              <p className="text-xs text-[#6b7280]">
                📱 We'll send you SMS updates about orders and payments
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-[#e1f3e6] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#1a1a1a]">
                📍 <strong>Farm Location:</strong> This helps buyers know where your produce comes from
              </p>
            </div>

            <Input
              label="Farm Location (City/Town)"
              placeholder="Ibadan"
              value={formData.farmLocation}
              onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
              icon={<MapPin className="w-5 h-5" />}
              required
            />

            <div>
              <label className="block mb-2">
                State <span className="text-[#dc2626]">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e]"
                required
              >
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-[#e1f3e6] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#1a1a1a]">
                🌾 <strong>What do you grow?</strong> Select all that apply
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {produceOptions.map((produce) => (
                <button
                  key={produce}
                  type="button"
                  onClick={() => toggleProduce(produce)}
                  className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer active:scale-95 ${
                    formData.produceType.includes(produce)
                      ? 'border-[#2d7a3e] bg-[#f0f9f3] shadow-md'
                      : 'border-[#e5e5e5] bg-white hover:border-[#2d7a3e]/50'
                  }`}
                >
                  <Sprout className={`w-6 h-6 mb-2 transition-colors ${
                    formData.produceType.includes(produce) ? 'text-[#2d7a3e]' : 'text-[#6b7280]'
                  }`} />
                  <p className="font-medium text-sm">{produce}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            disabled={
              (step === 1 && (!formData.fullName || !formData.email || !formData.password || !formData.phone)) ||
              (step === 2 && (!formData.farmLocation || !formData.state)) ||
              (step === 3 && formData.produceType.length === 0)
            }
          >
            {step === 3 ? 'Complete Registration' : 'Continue'}
          </Button>

          {step > 1 && (
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onCancel}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Cancel Registration
          </Button>
        </div>
      </div>
    </div>
  );
}

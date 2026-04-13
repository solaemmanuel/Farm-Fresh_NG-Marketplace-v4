import { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { User, Phone, MapPin, MapPinIcon } from 'lucide-react';

interface BuyerOnboardingProps {
  onComplete: () => void;
  onCancel?: () => void;
}

export function BuyerOnboarding({ onComplete, onCancel }: BuyerOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Lagos'
  });

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header title="Buyer Registration" />

      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full mx-1 ${
                  s <= step ? 'bg-[#2d7a3e]' : 'bg-[#e5e5e5]'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-center text-[#6b7280]">
            Step {step} of 2
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-[#e1f3e6] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#1a1a1a]">
                👋 <strong>Welcome to Farm Fresh!</strong> Let's get your buyer profile set up.
                This will help farmers deliver fresh produce to you.
              </p>
            </div>

            <Input
              label="Full Name"
              placeholder="Folake Adeyemi"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              icon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="folake@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<User className="w-5 h-5" />}
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
                📱 We'll send you SMS and email updates about your orders and deliveries
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-[#e1f3e6] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#1a1a1a]">
                📍 <strong>Delivery Address:</strong> This helps farmers deliver your fresh produce
              </p>
            </div>

            <Input
              label="Street Address"
              placeholder="123 Lekki Road"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              icon={<MapPin className="w-5 h-5" />}
              required
            />

            <Input
              label="City/Town"
              placeholder="Lagos"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              icon={<MapPinIcon className="w-5 h-5" />}
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

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            disabled={
              (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) ||
              (step === 2 && (!formData.address || !formData.city || !formData.state))
            }
          >
            {step === 2 ? 'Complete Registration' : 'Continue'}
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

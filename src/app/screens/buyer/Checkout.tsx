import { useState } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { ErrorMessage } from '../../components/ErrorMessage';
import { MapPin, Phone, User, CreditCard, Smartphone } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function Checkout({ onBack, onPlaceOrder }: CheckoutProps) {
  const [formData, setFormData] = useState({
    fullName: 'Folake Adeyemi',
    phone: '0801 234 5678',
    address: '45 Allen Avenue, Ikeja',
    city: 'Lagos',
    state: 'Lagos State'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'mobile'>('mobile');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = 23500;
  const deliveryFee = 2000;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      // Validation
      if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
        throw new Error('Please fill in all delivery information');
      }

      if (formData.phone.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      onPlaceOrder();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-32">
      <Header title="Checkout" onBack={onBack} />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {error && (
          <ErrorMessage message={error} onDismiss={() => setError('')} />
        )}

        <Card>
          <h3 className="font-medium mb-3">Delivery Information</h3>
          <div className="space-y-3">
            <Input
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              icon={<User className="w-5 h-5" />}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              icon={<Phone className="w-5 h-5" />}
              required
            />
            <Input
              label="Delivery Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              icon={<MapPin className="w-5 h-5" />}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
              <div>
                <label className="block mb-2">State</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e]"
                  required
                >
                  <option value="Lagos State">Lagos State</option>
                  <option value="Abuja FCT">Abuja FCT</option>
                  <option value="Rivers State">Rivers State</option>
                  <option value="Oyo State">Oyo State</option>
                  <option value="Kano State">Kano State</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-medium mb-3">Payment Method</h3>
          <div className="space-y-2">
            <div
              onClick={() => setPaymentMethod('mobile')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === 'mobile'
                  ? 'border-[#2d7a3e] bg-[#f0f9f3]'
                  : 'border-[#e5e5e5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-[#2d7a3e]" />
                <div>
                  <p className="font-medium">Mobile Money</p>
                  <p className="text-sm text-[#6b7280]">Pay with mobile money transfer</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod('transfer')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === 'transfer'
                  ? 'border-[#2d7a3e] bg-[#f0f9f3]'
                  : 'border-[#e5e5e5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-[#2d7a3e]" />
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-[#6b7280]">Transfer to bank account</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#2d7a3e] bg-[#f0f9f3]'
                  : 'border-[#e5e5e5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-[#2d7a3e]" />
                <div>
                  <p className="font-medium">Debit/Credit Card</p>
                  <p className="text-sm text-[#6b7280]">Pay with card</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-medium mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Subtotal (2 items)</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Delivery Fee</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-[#e5e5e5] pt-2 mt-2">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-[#2d7a3e]">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-[#fef3c7] rounded-lg p-4 border border-[#fcd34d]">
          <p className="text-sm text-[#92400e]">
            💡 <strong>Delivery Time:</strong> Your order will be delivered within 24-48 hours
          </p>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] p-4">
        <Button type="submit" variant="primary" size="lg" fullWidth onClick={handleSubmit} disabled={isProcessing}>
          {isProcessing ? 'Processing Order...' : `Place Order • ₦${total.toLocaleString()}`}
        </Button>
      </div>
    </div>
  );
}

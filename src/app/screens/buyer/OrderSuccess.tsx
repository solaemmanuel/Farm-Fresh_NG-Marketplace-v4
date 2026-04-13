import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { CheckCircle, Package, MapPin, Clock } from 'lucide-react';

interface OrderSuccessProps {
  onBackToHome: () => void;
  onViewOrders: () => void;
}

export function OrderSuccess({ onBackToHome, onViewOrders }: OrderSuccessProps) {
  const orderId = 'FF-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-[#2d7a3e]" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Order Placed Successfully!</h2>
          <p className="text-[#6b7280]">
            Your order has been confirmed and the farmer has been notified
          </p>
        </div>

        <Card>
          <div className="text-center mb-4">
            <p className="text-sm text-[#6b7280] mb-1">Order ID</p>
            <p className="text-xl font-medium text-[#2d7a3e]">{orderId}</p>
          </div>
          <div className="border-t border-[#e5e5e5] pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Package className="w-5 h-5 text-[#6b7280]" />
              <div>
                <p className="font-medium">Items</p>
                <p className="text-[#6b7280]">Fresh Tomatoes, Fresh Yams</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-5 h-5 text-[#6b7280]" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-[#6b7280]">45 Allen Avenue, Ikeja, Lagos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-[#6b7280]" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-[#6b7280]">24-48 hours</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-[#e1f3e6] rounded-lg p-4">
          <p className="text-sm text-[#1a1a1a]">
            📱 <strong>Next Steps:</strong> You'll receive SMS updates about your order status.
            You can also track your order in the Orders section.
          </p>
        </div>

        <div className="space-y-3">
          <Button variant="primary" size="lg" fullWidth onClick={onViewOrders}>
            View My Orders
          </Button>
          <Button variant="outline" size="lg" fullWidth onClick={onBackToHome}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

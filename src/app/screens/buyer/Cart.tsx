import { useState } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartProps {
  onBack: () => void;
  onCheckout: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  farmerName: string;
}

export function Cart({ onBack, onCheckout }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      price: 1500,
      quantity: 5,
      unit: 'kg',
      farmerName: 'Adebayo Okonkwo'
    },
    {
      id: '4',
      name: 'Fresh Yams',
      price: 8000,
      quantity: 2,
      unit: 'tubers',
      farmerName: 'Adebayo Okonkwo'
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2000;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-32">
      <Header title="Shopping Cart" onBack={onBack} />

      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-[#6b7280] mx-auto mb-4 opacity-50" />
            <p className="text-[#6b7280] mb-4">Your cart is empty</p>
            <Button variant="primary" onClick={onBack}>
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <div className="flex gap-3 mb-3">
                    <div className="w-16 h-16 bg-[#f5f3f0] rounded-lg flex items-center justify-center">
                      <span className="text-2xl">
                        {item.name.includes('Tomato') ? '🍅' : '🍠'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.name}</h4>
                      <p className="text-sm text-[#6b7280] mb-1">{item.farmerName}</p>
                      <p className="font-medium text-[#2d7a3e]">
                        ₦{item.price.toLocaleString()}/{item.unit}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-[#fee2e2] rounded-lg h-fit"
                    >
                      <Trash2 className="w-5 h-5 text-[#dc2626]" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-[#f5f3f0] rounded-lg flex items-center justify-center hover:bg-[#e5e5e5]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity} {item.unit}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-[#f5f3f0] rounded-lg flex items-center justify-center hover:bg-[#e5e5e5]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-medium">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6b7280]">Subtotal</span>
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
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] p-4">
          <Button variant="primary" size="lg" fullWidth onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

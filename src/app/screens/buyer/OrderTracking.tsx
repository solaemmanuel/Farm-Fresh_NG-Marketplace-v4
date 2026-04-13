import { useState } from 'react';
import { Header } from '../../components/Header';
import { BottomNav } from '../../components/BottomNav';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Package, CheckCircle, Truck, MapPin, Phone, Star } from 'lucide-react';
import { mockOrders } from '../../data/mockData';

interface OrderTrackingProps {
  onNavigate: (screen: string) => void;
}

export function OrderTracking({ onNavigate }: OrderTrackingProps) {
  const [activeTab, setActiveTab] = useState('orders');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const myOrders = mockOrders;
  const filteredOrders = filter === 'all'
    ? myOrders
    : filter === 'active'
    ? myOrders.filter(o => ['pending', 'confirmed', 'picked-up', 'in-transit'].includes(o.status))
    : myOrders.filter(o => o.status === 'delivered');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'picked-up': return 'info';
      case 'in-transit': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { id: 'pending', label: 'Order Placed', icon: Package },
      { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { id: 'picked-up', label: 'Picked Up', icon: Package },
      { id: 'in-transit', label: 'In Transit', icon: Truck },
      { id: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const statusIndex = steps.findIndex(s => s.id === currentStatus);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= statusIndex,
      active: index === statusIndex
    }));
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20">
      <Header title="My Orders" />

      <div className="p-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#2d7a3e] text-white'
                : 'bg-white text-[#6b7280] border border-[#e5e5e5]'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'active'
                ? 'bg-[#2d7a3e] text-white'
                : 'bg-white text-[#6b7280] border border-[#e5e5e5]'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-[#2d7a3e] text-white'
                : 'bg-white text-[#6b7280] border border-[#e5e5e5]'
            }`}
          >
            Completed
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <Package className="w-16 h-16 text-[#6b7280] mx-auto mb-4 opacity-50" />
            <p className="text-[#6b7280]">No orders found</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{order.productName}</h4>
                    <p className="text-sm text-[#6b7280] mb-2">{order.quantity}</p>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#2d7a3e] text-lg">
                      ₦{order.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#6b7280] mt-1">{order.date}</p>
                  </div>
                </div>

                <div className="border-t border-[#e5e5e5] pt-3 mt-3">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#6b7280]" />
                      <span className="text-[#6b7280]">{order.buyerLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#6b7280]" />
                      <span className="text-[#6b7280]">{order.buyerPhone}</span>
                    </div>
                  </div>

                  {order.status === 'delivered' && (
                    <button className="w-full py-2 bg-[#f5f3f0] rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors">
                      <Star className="w-4 h-4 inline mr-2" />
                      Rate Your Experience
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav active={activeTab} onNavigate={setActiveTab} userType="buyer" />
    </div>
  );
}

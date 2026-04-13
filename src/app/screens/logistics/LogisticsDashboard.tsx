import { useState } from 'react';
import { Header } from '../../components/Header';
import { BottomNav } from '../../components/BottomNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { MapPin, Package, TrendingUp, Wallet, Navigation } from 'lucide-react';

interface LogisticsDashboardProps {
  onNavigate: (screen: string) => void;
}

interface DeliveryJob {
  id: string;
  orderId: string;
  items: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  earnings: number;
  status: 'available' | 'active' | 'completed';
}

export function LogisticsDashboard({ onNavigate }: LogisticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  const availableJobs: DeliveryJob[] = [
    {
      id: 'd1',
      orderId: 'FF-XY789',
      items: '10kg Fresh Tomatoes',
      pickupLocation: 'Ibadan, Oyo State',
      dropoffLocation: 'Ikeja, Lagos',
      distance: '125 km',
      earnings: 3500,
      status: 'available'
    },
    {
      id: 'd2',
      orderId: 'FF-AB123',
      items: '5kg Yellow Peppers',
      pickupLocation: 'Enugu, Enugu State',
      dropoffLocation: 'Victoria Island, Lagos',
      distance: '280 km',
      earnings: 5500,
      status: 'available'
    }
  ];

  const todayEarnings = 8500;
  const totalDeliveries = 12;

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20">
      <Header title="Farm Fresh NG" />

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-[#2d7a3e] to-[#3d9a52] rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Today's Earnings</p>
          <div className="flex items-center justify-between">
            <p className="text-4xl">₦{todayEarnings.toLocaleString()}</p>
            <Wallet className="w-12 h-12 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mt-3">{totalDeliveries} deliveries completed</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <Package className="w-8 h-8 text-[#2d7a3e] mx-auto mb-2" />
            <p className="text-2xl mb-1">{availableJobs.length}</p>
            <p className="text-sm text-[#6b7280]">Available Jobs</p>
          </Card>
          <Card className="text-center">
            <TrendingUp className="w-8 h-8 text-[#2d7a3e] mx-auto mb-2" />
            <p className="text-2xl mb-1">4.9</p>
            <p className="text-sm text-[#6b7280]">Rating</p>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-medium">Available Delivery Jobs</h3>
        </div>

        {availableJobs.map((job) => (
          <Card key={job.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{job.items}</h4>
                  <Badge variant="success">New</Badge>
                </div>
                <p className="text-sm text-[#6b7280] mb-1">Order: {job.orderId}</p>
              </div>
              <p className="font-medium text-[#2d7a3e] text-xl">
                ₦{job.earnings.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#2d7a3e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#6b7280]">Pickup</p>
                  <p className="font-medium">{job.pickupLocation}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#dc2626] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#6b7280]">Drop-off</p>
                  <p className="font-medium">{job.dropoffLocation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Navigation className="w-4 h-4 text-[#6b7280]" />
                <span className="text-[#6b7280]">Distance: {job.distance}</span>
              </div>
            </div>

            <Button variant="primary" size="md" fullWidth>
              Accept Job
            </Button>
          </Card>
        ))}
      </div>

      <BottomNav active={activeTab} onNavigate={setActiveTab} userType="logistics" />
    </div>
  );
}

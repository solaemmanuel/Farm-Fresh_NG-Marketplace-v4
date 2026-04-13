import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { User, Phone, MapPin, Star, Package, Settings, LogOut, ChevronRight } from 'lucide-react';

interface ProfileProps {
  userType: 'farmer' | 'buyer' | 'logistics';
  onBack: () => void;
  onLogout: () => void;
}

export function Profile({ userType, onBack, onLogout }: ProfileProps) {
  const profiles = {
    farmer: {
      name: 'Adebayo Okonkwo',
      phone: '0801 234 5678',
      location: 'Ibadan, Oyo State',
      rating: 4.8,
      stats: [
        { label: 'Products Listed', value: '12' },
        { label: 'Orders Completed', value: '24' },
        { label: 'Total Earnings', value: '₦33,000' }
      ]
    },
    buyer: {
      name: 'Folake Adeyemi',
      phone: '0801 234 5678',
      location: 'Ikeja, Lagos',
      rating: 4.9,
      stats: [
        { label: 'Orders Placed', value: '8' },
        { label: 'Total Spent', value: '₦45,000' },
        { label: 'Saved Farmers', value: '5' }
      ]
    },
    logistics: {
      name: 'Chidi Nwosu',
      phone: '0803 456 7890',
      location: 'Lagos',
      rating: 4.9,
      stats: [
        { label: 'Deliveries', value: '156' },
        { label: 'Total Earnings', value: '₦185,000' },
        { label: 'Success Rate', value: '98%' }
      ]
    }
  };

  const profile = profiles[userType];

  const menuItems = [
    { icon: User, label: 'Edit Profile', action: 'edit' },
    { icon: Settings, label: 'Settings', action: 'settings' },
    { icon: Phone, label: 'Help & Support', action: 'support' },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header title="Profile" onBack={onBack} />

      <div className="p-4 space-y-4">
        <Card className="text-center">
          <div className="w-24 h-24 bg-[#2d7a3e] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-medium">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="text-2xl font-medium mb-2">{profile.name}</h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="success">
              {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
              <span>{profile.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-[#6b7280]">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          {profile.stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <p className="text-xl font-medium text-[#2d7a3e] mb-1">{stat.value}</p>
              <p className="text-xs text-[#6b7280]">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="cursor-pointer hover:bg-[#f5f3f0] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#6b7280]" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#6b7280]" />
                </div>
              </Card>
            );
          })}
        </div>

        <button
          onClick={onLogout}
          className="w-full py-3 px-4 bg-white border border-[#e5e5e5] rounded-lg flex items-center justify-center gap-2 text-[#dc2626] font-medium hover:bg-[#fee2e2] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        <div className="bg-[#e1f3e6] rounded-lg p-4 text-center">
          <p className="text-sm text-[#1a1a1a]">
            🌾 <strong>Farm Fresh NG</strong>
          </p>
          <p className="text-xs text-[#6b7280] mt-1">
            Supporting Nigerian agriculture • Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}

import { Home, ShoppingBag, User, Package } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
  userType: 'farmer' | 'buyer' | 'logistics';
}

export function BottomNav({ active, onNavigate, userType }: BottomNavProps) {
  const farmerTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'listings', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const buyerTabs = [
    { id: 'home', label: 'Market', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const logisticsTabs = [
    { id: 'home', label: 'Jobs', icon: Home },
    { id: 'active', label: 'Active', icon: Package },
    { id: 'earnings', label: 'Earnings', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const tabs = userType === 'farmer' ? farmerTabs : userType === 'buyer' ? buyerTabs : logisticsTabs;

  return (
    <div className="bg-white border-t border-[#e5e5e5] px-2 py-2 flex items-center justify-around fixed bottom-0 left-0 right-0 z-10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'text-[#2d7a3e] bg-[#f0f9f3]' : 'text-[#6b7280] hover:bg-[#f5f3f0]'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

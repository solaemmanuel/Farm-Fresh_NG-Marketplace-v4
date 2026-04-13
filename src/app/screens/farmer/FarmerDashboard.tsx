import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { BottomNav } from '../../components/BottomNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Plus, Package, TrendingUp, Wallet, Bell } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Product, Order, Transaction } from '../../data/mockData';

interface FarmerDashboardProps {
  onNavigate: (screen: string) => void;
  userName?: string;
}

export function FarmerDashboard({ onNavigate, userName = 'Farmer' }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, orderData, transactionData] = await Promise.all([
          dataService.getProducts(),
          dataService.getOrders(),
          dataService.getTransactions()
        ]);

        setProducts(productData);
        setOrders(orderData);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const myProducts = products.filter(p => p.farmerId === 'f1');
  const myOrders = orders.filter(o => o.farmerId === 'f1');
  const myTransactions = transactions.filter(t => t.userId === 'f1');

  const totalEarnings = myTransactions
    .filter(t => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingOrders = myOrders.filter(o => o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20">
      <Header
        title="Farm Fresh NG"
        rightAction={
          <button className="p-2 hover:bg-[#f5f3f0] rounded-lg relative">
            <Bell className="w-6 h-6 text-[#1a1a1a]" />
            {pendingOrders > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc2626] rounded-full"></span>
            )}
          </button>
        }
      />

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-[#2d7a3e] to-[#3d9a52] rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Welcome back,</p>
          <h2 className="text-2xl mb-4">{userName}</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Earnings</p>
              <p className="text-3xl">₦{totalEarnings.toLocaleString()}</p>
            </div>
            <Wallet className="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <Package className="w-8 h-8 text-[#2d7a3e] mx-auto mb-2" />
            <p className="text-2xl mb-1">{myProducts.length}</p>
            <p className="text-sm text-[#6b7280]">Active Listings</p>
          </Card>
          <Card className="text-center">
            <TrendingUp className="w-8 h-8 text-[#2d7a3e] mx-auto mb-2" />
            <p className="text-2xl mb-1">{myOrders.length}</p>
            <p className="text-sm text-[#6b7280]">Total Orders</p>
          </Card>
        </div>

        {pendingOrders > 0 && (
          <Card className="bg-[#fef3c7] border-[#fcd34d]">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-[#92400e] mt-0.5" />
              <div>
                <p className="font-medium text-[#92400e]">New Orders!</p>
                <p className="text-sm text-[#92400e] mt-1">
                  You have {pendingOrders} new order{pendingOrders > 1 ? 's' : ''} waiting for confirmation
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex items-center justify-between">
          <h3 className="font-medium">Quick Actions</h3>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onNavigate('add-product')}
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>

        <div className="flex items-center justify-between mt-6">
          <h3 className="font-medium">Recent Orders</h3>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-sm text-[#2d7a3e]"
          >
            View All
          </button>
        </div>

        {myOrders.slice(0, 3).map((order) => (
          <Card key={order.id} onClick={() => onNavigate(`order-details-${order.id}`)}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium mb-1">{order.productName}</h4>
                <p className="text-sm text-[#6b7280]">{order.quantity}</p>
              </div>
              <Badge
                variant={
                  order.status === 'pending'
                    ? 'warning'
                    : order.status === 'confirmed'
                    ? 'info'
                    : order.status === 'delivered'
                    ? 'success'
                    : 'default'
                }
              >
                {order.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6b7280]">{order.buyerName}</span>
              <span className="font-medium text-[#2d7a3e]">₦{order.price.toLocaleString()}</span>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav active={activeTab} onNavigate={onNavigate} userType="farmer" />
    </div>
  );
}

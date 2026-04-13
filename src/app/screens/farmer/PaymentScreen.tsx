import { useState } from 'react';
import { Header } from '../../components/Header';
import { BottomNav } from '../../components/BottomNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle, CreditCard } from 'lucide-react';
import { mockTransactions } from '../../data/mockData';

interface PaymentScreenProps {
  onNavigate: (screen: string) => void;
}

export function PaymentScreen({ onNavigate }: PaymentScreenProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const totalBalance = 33000;
  const pendingAmount = 8000;
  const availableBalance = totalBalance - pendingAmount;

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20">
      <Header title="Earnings & Payments" />

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-[#2d7a3e] to-[#3d9a52] rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-6 h-6" />
            <p className="text-sm opacity-90">Available Balance</p>
          </div>
          <p className="text-4xl mb-1">₦{availableBalance.toLocaleString()}</p>
          <p className="text-sm opacity-75">
            ₦{pendingAmount.toLocaleString()} pending clearance
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <TrendingUp className="w-8 h-8 text-[#2d7a3e] mx-auto mb-2" />
            <p className="text-2xl mb-1">₦{totalBalance.toLocaleString()}</p>
            <p className="text-sm text-[#6b7280]">Total Earnings</p>
          </Card>
          <Card className="text-center">
            <ArrowUpCircle className="w-8 h-8 text-[#2d7a3e] mx-auto mb-2" />
            <p className="text-2xl mb-1">24</p>
            <p className="text-sm text-[#6b7280]">Completed Sales</p>
          </Card>
        </div>

        <Button variant="primary" size="lg" fullWidth>
          <CreditCard className="w-5 h-5" />
          Withdraw to Bank Account
        </Button>

        <div className="flex items-center justify-between mt-6">
          <h3 className="font-medium">Transaction History</h3>
        </div>

        <div className="space-y-3">
          {mockTransactions.map((transaction) => (
            <Card key={transaction.id}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit' ? 'bg-[#d1fae5]' : 'bg-[#fee2e2]'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownCircle className="w-5 h-5 text-[#2d7a3e]" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5 text-[#dc2626]" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{transaction.description}</h4>
                  <p className="text-sm text-[#6b7280]">
                    {new Date(transaction.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium text-lg ${
                    transaction.type === 'credit' ? 'text-[#2d7a3e]' : 'text-[#dc2626]'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </p>
                  <Badge
                    variant={
                      transaction.status === 'completed' ? 'success' :
                      transaction.status === 'pending' ? 'warning' : 'danger'
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-[#e1f3e6] rounded-lg p-4 mt-4">
          <p className="text-sm text-[#1a1a1a]">
            💡 <strong>Payment Info:</strong> Payments are processed within 24 hours after delivery
            confirmation. Withdraw your earnings anytime to your registered bank account.
          </p>
        </div>
      </div>

      <BottomNav active={activeTab} onNavigate={setActiveTab} userType="farmer" />
    </div>
  );
}

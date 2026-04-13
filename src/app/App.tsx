import { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { dataService } from './services/dataService';
import { Welcome } from './screens/Welcome';
import { Login } from './screens/Login';
import { USSDLogin } from './screens/USSDLogin';
import { Profile } from './screens/Profile';
import { FarmerDashboard } from './screens/farmer/FarmerDashboard';
import { FarmerOnboarding } from './screens/farmer/FarmerOnboarding';
import { AddProduct } from './screens/farmer/AddProduct';
import { MyListings } from './screens/farmer/MyListings';
import { PaymentScreen } from './screens/farmer/PaymentScreen';
import { BuyerMarketplace } from './screens/buyer/BuyerMarketplace';
import { BuyerOnboarding } from './screens/buyer/BuyerOnboarding';
import { ProductDetails } from './screens/buyer/ProductDetails';
import { Cart } from './screens/buyer/Cart';
import { Checkout } from './screens/buyer/Checkout';
import { OrderSuccess } from './screens/buyer/OrderSuccess';
import { OrderTracking } from './screens/buyer/OrderTracking';
import { TermsAndConditions } from './screens/TermsAndConditions';

type UserRole = 'farmer' | 'buyer' | 'logistics' | null;
type Screen = string;

function AppContent() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('u1');

  const handleSelectRole = (role: UserRole) => {
    try {
      setUserRole(role);
      if (role === 'farmer') {
        setCurrentScreen('farmer-onboarding');
      } else if (role === 'buyer') {
        setCurrentScreen('buyer-onboarding');
      } else if (role === 'logistics') {
        setCurrentScreen('logistics-dashboard');
      }
    } catch (error) {
      console.error('Error selecting role:', error);
    }
  };

  const handleLogin = () => {
    try {
      setCurrentScreen('login');
    } catch (error) {
      console.error('Error navigating to login:', error);
    }
  };

  const handleUSSDLogin = () => {
    try {
      setCurrentScreen('ussd-login');
    } catch (error) {
      console.error('Error navigating to USSD login:', error);
    }
  };

  const handleLoginComplete = (loginUserId: string, role: 'farmer' | 'buyer' | 'logistics') => {
    try {
      setUserId(loginUserId);
      setUserRole(role);
      if (role === 'farmer') {
        setCurrentScreen('farmer-dashboard');
      } else if (role === 'buyer') {
        setCurrentScreen('buyer-marketplace');
      } else if (role === 'logistics') {
        setCurrentScreen('logistics-dashboard');
      }
    } catch (error) {
      console.error('Error completing login:', error);
    }
  };

  const handleUSSDComplete = (phone: string) => {
    try {
      setUserRole('farmer');
      setCurrentScreen('farmer-dashboard');
    } catch (error) {
      console.error('Error completing USSD login:', error);
    }
  };

  const handleOnboardingComplete = async (data: { name: string; email: string; password: string }) => {
    try {
      const generatedId = `u${Math.floor(Math.random() * 10000)}`;
      
      // Save user to Supabase with correct field structure
      const newUser = {
        id: generatedId,
        name: data.name,
        email: data.email,
        password: data.password,
        phone: '',
        role: 'farmer',
        location: '',
        rating: 0
      };
      
      console.log('Registering new farmer:', newUser);
      await dataService.createUser(newUser as any);
      console.log('Farmer successfully saved to database');
      
      setUserId(generatedId);
      setUserName(data.name);
      setUserEmail(data.email);
      setCurrentScreen('farmer-dashboard');
    } catch (error) {
      console.error('Failed to register farmer:', error);
      // Show error message to user - don't proceed without proper registration
      alert('Failed to register. Please try again.');
    }
  };

  const handleBuyerOnboardingComplete = () => {
    setCurrentScreen('buyer-marketplace');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('welcome');
  };

  const handleNavigate = (screen: Screen) => {
    try {
      if (screen.startsWith('product-')) {
        setSelectedProductId(screen.replace('product-', ''));
        setCurrentScreen('product-details');
      } else if (screen === 'profile') {
        setCurrentScreen('profile');
      } else if (screen === 'home') {
        if (userRole === 'farmer') {
          setCurrentScreen('farmer-dashboard');
        } else if (userRole === 'buyer') {
          setCurrentScreen('buyer-marketplace');
        } else if (userRole === 'logistics') {
          setCurrentScreen('logistics-dashboard');
        }
      } else if (screen === 'listings') {
        setCurrentScreen('farmer-listings');
      } else if (screen === 'orders') {
        setCurrentScreen('buyer-orders');
      } else if (screen === 'cart') {
        setCurrentScreen('cart');
      } else {
        setCurrentScreen(screen);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleBack = () => {
    if (userRole === 'farmer') {
      setCurrentScreen('farmer-dashboard');
    } else if (userRole === 'buyer') {
      setCurrentScreen('buyer-marketplace');
    } else if (userRole === 'logistics') {
      setCurrentScreen('logistics-dashboard');
    } else {
      setCurrentScreen('welcome');
    }
  };

  const handleAddProductSuccess = () => {
    setCurrentScreen('farmer-listings');
  };

  const handleAddToCart = () => {
    setCurrentScreen('buyer-marketplace');
  };

  const handleCheckout = () => {
    setCurrentScreen('checkout');
  };

  const handlePlaceOrder = () => {
    setCurrentScreen('order-success');
  };

  const handleBackToHome = () => {
    setCurrentScreen('buyer-marketplace');
  };

  const handleTermsClick = () => {
    setCurrentScreen('terms');
  };

  if (currentScreen === 'welcome') {
    return <Welcome onSelectRole={handleSelectRole} onUSSDLogin={handleUSSDLogin} onLogin={handleLogin} onTermsClick={handleTermsClick} />;
  }

  if (currentScreen === 'login') {
    return <Login onLoginComplete={handleLoginComplete} onBack={() => setCurrentScreen('welcome')} />;
  }

  if (currentScreen === 'ussd-login') {
    return <USSDLogin onLogin={handleUSSDComplete} onBack={() => setCurrentScreen('welcome')} />;
  }

  if (currentScreen === 'profile' && userRole) {
    return <Profile userType={userRole} onBack={handleBack} onLogout={handleLogout} />;
  }

  if (currentScreen === 'terms') {
    return <TermsAndConditions onBack={() => setCurrentScreen('welcome')} />;
  }

  if (userRole === 'farmer') {
    if (currentScreen === 'farmer-onboarding') {
      return <FarmerOnboarding onComplete={handleOnboardingComplete} onCancel={() => setCurrentScreen('welcome')} />;
    }
    if (currentScreen === 'farmer-dashboard') {
      return <FarmerDashboard onNavigate={handleNavigate} userName={userName} />;
    }
    if (currentScreen === 'add-product') {
      return <AddProduct onBack={handleBack} onSuccess={handleAddProductSuccess} userId={userId} userName={userName} />;
    }
    if (currentScreen === 'farmer-listings') {
      return <MyListings onNavigate={handleNavigate} userId={userId} />;
    }
    if (currentScreen === 'farmer-payments') {
      return <PaymentScreen onNavigate={handleNavigate} />;
    }
  }

  if (userRole === 'buyer') {
    if (currentScreen === 'buyer-onboarding') {
      return <BuyerOnboarding onComplete={handleBuyerOnboardingComplete} onCancel={() => setCurrentScreen('welcome')} />;
    }
    if (currentScreen === 'buyer-marketplace') {
      return <BuyerMarketplace onNavigate={handleNavigate} />;
    }
    if (currentScreen === 'product-details') {
      return (
        <ProductDetails
          productId={selectedProductId}
          onBack={handleBack}
          onAddToCart={handleAddToCart}
        />
      );
    }
    if (currentScreen === 'cart') {
      return <Cart onBack={handleBack} onCheckout={handleCheckout} />;
    }
    if (currentScreen === 'checkout') {
      return <Checkout onBack={handleBack} onPlaceOrder={handlePlaceOrder} />;
    }
    if (currentScreen === 'order-success') {
      return <OrderSuccess onBackToHome={handleBackToHome} onViewOrders={handleViewOrders} />;
    }
    if (currentScreen === 'buyer-orders') {
      return <OrderTracking onNavigate={handleNavigate} />;
    }
  }

  if (userRole === 'logistics') {
    if (currentScreen === 'logistics-dashboard') {
      return <LogisticsDashboard onNavigate={handleNavigate} />;
    }
  }

  return <Welcome onSelectRole={handleSelectRole} onUSSDLogin={handleUSSDLogin} onLogin={handleLogin} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
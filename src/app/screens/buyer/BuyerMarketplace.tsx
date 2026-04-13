import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { BottomNav } from '../../components/BottomNav';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Search, MapPin, Star, ShoppingCart } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Product } from '../../data/mockData';

interface BuyerMarketplaceProps {
  onNavigate: (screen: string) => void;
}

export function BuyerMarketplace({ onNavigate }: BuyerMarketplaceProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await dataService.getProducts();
        setProducts(productData);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'grains', name: 'Grains' },
    { id: 'tubers', name: 'Tubers' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'seafood', name: 'Seafood' },
  ];

  const availableProducts = products.filter(p => p.status === 'available');
  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20">
      <Header
        title="Farm Fresh NG"
        rightAction={
          <button
            onClick={() => onNavigate('cart')}
            className="p-2 hover:bg-[#f5f3f0] rounded-lg relative"
          >
            <ShoppingCart className="w-6 h-6 text-[#1a1a1a]" />
            <span className="absolute -top-1 -right-1 bg-[#2d7a3e] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        }
      />

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-[#2d7a3e] to-[#3d9a52] rounded-xl p-6 text-white">
          <h2 className="text-2xl mb-2">Fresh from the Farm</h2>
          <p className="text-sm opacity-90">
            Get farm-fresh produce delivered to your doorstep
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
          <input
            type="text"
            placeholder="Search for tomatoes, rice, yams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-[#2d7a3e] text-white'
                  : 'bg-white text-[#6b7280] border border-[#e5e5e5]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-3">Available Products</h3>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredProducts.map((product) => (
                <Card key={product.id} onClick={() => onNavigate(`product-${product.id}`)}>
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-[#f5f3f0] rounded-lg overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl">
                            {product.name.includes('Tomato') ? '🍅' :
                             product.name.includes('Pepper') ? '🌶️' :
                             product.name.includes('Rice') ? '🌾' :
                             product.name.includes('Yam') ? '🍠' :
                             product.name.includes('Cassava') ? '🥔' : '🥬'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <Badge variant="success">Fresh</Badge>
                      </div>
                      <p className="text-sm text-[#6b7280] mb-2">
                        {product.quantity} {product.unit} available
                      </p>
                      <div className="flex items-center gap-1 text-sm text-[#6b7280] mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{product.farmerLocation}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                          <span className="text-sm">{product.farmerRating}</span>
                          <span className="text-sm text-[#6b7280]">• {product.farmerName}</span>
                        </div>
                        <p className="font-medium text-[#2d7a3e]">
                          ₦{product.price.toLocaleString()}/{product.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav active={activeTab} onNavigate={setActiveTab} userType="buyer" />
    </div>
  );
}

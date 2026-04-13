import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { BottomNav } from '../../components/BottomNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Package, Calendar, Plus } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Product } from '../../data/mockData';

interface MyListingsProps {
  onNavigate: (screen: string) => void;
  userId?: string;
}

export function MyListings({ onNavigate, userId = 'u1' }: MyListingsProps) {
  const [activeTab, setActiveTab] = useState('listings');
  const [filter, setFilter] = useState<'all' | 'available' | 'sold'>('all');
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

  const myProducts = products.filter(p => p.farmerId === userId);
  const filteredProducts = filter === 'all'
    ? myProducts
    : myProducts.filter(p => p.status === filter);

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20">
      <Header title="My Products" />

      <div className="p-4 space-y-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onNavigate('add-product')}
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#2d7a3e] text-white'
                : 'bg-white text-[#6b7280] border border-[#e5e5e5]'
            }`}
          >
            All ({myProducts.length})
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'available'
                ? 'bg-[#2d7a3e] text-white'
                : 'bg-white text-[#6b7280] border border-[#e5e5e5]'
            }`}
          >
            Available ({myProducts.filter(p => p.status === 'available').length})
          </button>
          <button
            onClick={() => setFilter('sold')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'sold'
                ? 'bg-[#2d7a3e] text-white'
                : 'bg-white text-[#6b7280] border border-[#e5e5e5]'
            }`}
          >
            Sold ({myProducts.filter(p => p.status === 'sold').length})
          </button>
        </div>

        {loading ? (
          <Card className="text-center py-12">
            <Package className="w-16 h-16 text-[#6b7280] mx-auto mb-4 opacity-50" />
            <p className="text-[#6b7280] mb-4">Loading products...</p>
          </Card>
        ) : filteredProducts.length === 0 ? (
          <Card className="text-center py-12">
            <Package className="w-16 h-16 text-[#6b7280] mx-auto mb-4 opacity-50" />
            <p className="text-[#6b7280] mb-4">No products in this category</p>
            <Button variant="primary" onClick={() => onNavigate('add-product')}>
              <Plus className="w-5 h-5" />
              Add Your First Product
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-[#f5f3f0] rounded-lg overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-[#6b7280]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{product.name}</h4>
                      <Badge variant={product.status === 'available' ? 'success' : 'default'}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6b7280] mb-1">
                      {product.quantity} {product.unit} • ₦{product.price.toLocaleString()}/{product.unit}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-[#6b7280]">
                      <Calendar className="w-4 h-4" />
                      <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" fullWidth>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" fullWidth>
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav active={activeTab} onNavigate={setActiveTab} userType="farmer" />
    </div>
  );
}

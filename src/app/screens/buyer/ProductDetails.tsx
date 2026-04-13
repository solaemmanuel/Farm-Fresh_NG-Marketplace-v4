import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { MapPin, Star, Calendar, Shield, Minus, Plus, ShoppingCart } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Product } from '../../data/mockData';

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
  onAddToCart: () => void;
}

export function ProductDetails({ productId, onBack, onAddToCart }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await dataService.getProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <Header title="Product Details" onBack={onBack} />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <Header title="Product Details" onBack={onBack} />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Product not found</p>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header title="Product Details" onBack={onBack} />

      <div className="pb-24">
        <div className="bg-[#f5f3f0] h-64 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-8xl">
              {product.name.includes('Tomato') ? '🍅' :
               product.name.includes('Pepper') ? '🌶️' :
               product.name.includes('Rice') ? '🌾' :
               product.name.includes('Yam') ? '🍠' :
               product.name.includes('Cassava') ? '🥔' : '🥬'}
            </span>
          )}
        </div>

        <div className="p-4 space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-medium">{product.name}</h2>
              <Badge variant="success">Fresh</Badge>
            </div>
            <p className="text-3xl text-[#2d7a3e] mb-2">
              ₦{product.price.toLocaleString()}
              <span className="text-base text-[#6b7280]">/{product.unit}</span>
            </p>
            <p className="text-sm text-[#6b7280]">
              {product.quantity} {product.unit} available
            </p>
          </div>

          <Card>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#2d7a3e] text-white rounded-full flex items-center justify-center font-medium text-lg">
                {product.farmerName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{product.farmerName}</h4>
                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    <span>{product.farmerRating} rating</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{product.farmerLocation}</span>
                  </div>
                </div>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="text-center">
              <Calendar className="w-6 h-6 text-[#2d7a3e] mx-auto mb-2" />
              <p className="text-xs text-[#6b7280] mb-1">Harvested</p>
              <p className="text-sm font-medium">
                {new Date(product.harvestDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </Card>
            <Card className="text-center">
              <Shield className="w-6 h-6 text-[#2d7a3e] mx-auto mb-2" />
              <p className="text-xs text-[#6b7280] mb-1">Quality</p>
              <p className="text-sm font-medium">Premium</p>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-[#6b7280]">
              {product.description || `Fresh ${product.name.toLowerCase()} directly from the farm. Harvested recently and delivered fresh to maintain quality and nutritional value.`}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Select Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-white border border-[#e5e5e5] rounded-lg flex items-center justify-center hover:bg-[#f5f3f0]"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center">
                <p className="text-2xl font-medium">{quantity}</p>
                <p className="text-sm text-[#6b7280]">{product.unit}</p>
              </div>
              <button
                onClick={() => setQuantity(Math.min(parseInt(product.quantity), quantity + 1))}
                className="w-12 h-12 bg-white border border-[#e5e5e5] rounded-lg flex items-center justify-center hover:bg-[#f5f3f0]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#6b7280]">Total Price</span>
          <span className="text-2xl font-medium text-[#2d7a3e]">
            ₦{totalPrice.toLocaleString()}
          </span>
        </div>
        <Button variant="primary" size="lg" fullWidth onClick={onAddToCart}>
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

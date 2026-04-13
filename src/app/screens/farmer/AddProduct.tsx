import { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Package, Calendar, DollarSign } from 'lucide-react';
import { dataService } from '../../services/dataService';

interface AddProductProps {
  onBack: () => void;
  onSuccess: () => void;
  userId?: string;
  userName?: string;
}

export function AddProduct({ onBack, onSuccess, userId = 'u1', userName = 'Farmer' }: AddProductProps) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    price: '',
    harvestDate: ''
  });
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.name || !formData.quantity || !formData.price || !formData.harvestDate) {
        throw new Error('Please fill in all required fields');
      }

      if (parseInt(formData.quantity) <= 0) {
        throw new Error('Quantity must be greater than 0');
      }

      if (parseInt(formData.price) <= 0) {
        throw new Error('Price must be greater than 0');
      }

      // Create product object with snake_case field names for Supabase
      const newProduct = {
        id: `p${Date.now()}`,
        name: formData.name,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        price: parseInt(formData.price),
        harvest_date: formData.harvestDate,
        farmer_id: userId || 'u1',
        farmer_name: userName || 'Farmer',
        farmer_location: 'Your Farm Location',
        farmer_rating: 4.8,
        image: '/images/fresh-onion-500x500.webp',
        status: 'available',
        description: `Fresh ${formData.name} harvested on ${formData.harvestDate}`,
        category: 'vegetables'
      };

      console.log('Creating product:', newProduct);

      // Save to Supabase
      const result = await dataService.createProduct(newProduct as any);
      console.log('Product created successfully:', result);

      onSuccess();
    } catch (err) {
      console.error('Product creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const produceOptions = [
    'Tomatoes', 'Peppers', 'Onions', 'Yams', 'Cassava',
    'Rice', 'Beans', 'Corn', 'Plantain', 'Okra'
  ];

  const unitOptions = ['kg', 'bags', 'tubers', 'bunches', 'pieces'];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header title="Add New Product" onBack={onBack} />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="bg-[#e1f3e6] rounded-lg p-4 mb-4">
          <p className="text-sm text-[#1a1a1a]">
            📱 <strong>Simple Steps:</strong> Fill in your product details below.
            Buyers will see this information in the marketplace.
          </p>
        </div>

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError('')} />
        )}

        <div>
          <label className="block mb-2">
            Product Name <span className="text-[#dc2626]">*</span>
          </label>
          <select
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e]"
            required
          >
            <option value="">Select product</option>
            {produceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quantity"
            type="number"
            placeholder="50"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            icon={<Package className="w-5 h-5" />}
            required
          />
          <div>
            <label className="block mb-2">
              Unit <span className="text-[#dc2626]">*</span>
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d7a3e]"
              required
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Price per unit (₦)"
          type="number"
          placeholder="1500"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          icon={<DollarSign className="w-5 h-5" />}
          required
        />

        <Input
          label="Harvest Date"
          type="date"
          value={formData.harvestDate}
          onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
          icon={<Calendar className="w-5 h-5" />}
          required
        />

        <div className="pt-4 space-y-3">
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Adding Product...' : 'Add Product to Market'}
          </Button>
          <Button type="button" variant="outline" size="lg" fullWidth onClick={onBack} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>

        <div className="bg-[#f5f3f0] rounded-lg p-4 mt-4">
          <p className="text-xs text-[#6b7280]">
            💡 <strong>Tip:</strong> Fresh products with recent harvest dates sell faster!
            Make sure your price is competitive.
          </p>
        </div>
      </form>
    </div>
  );
}

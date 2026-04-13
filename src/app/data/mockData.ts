export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'buyer' | 'logistics';
  location: string;
  rating: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: string;
  unit: string;
  harvestDate: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerRating: number;
  image?: string;
  status: 'available' | 'sold' | 'pending';
  description?: string;
  category?: string;
  createdAt?: string;
}

export interface Order {
  id: string;
  productName: string;
  quantity: string;
  price: number;
  buyerId?: string;
  buyerName: string;
  buyerPhone: string;
  buyerLocation: string;
  farmerId?: string;
  pickupTime: string;
  status: 'pending' | 'confirmed' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  date: string;
  createdAt?: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  userId?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 1500,
    quantity: '50',
    unit: 'kg',
    harvestDate: '2026-04-10',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/fresh-onion-500x500.webp',
    status: 'available',
    description: 'Fresh red tomatoes, harvested yesterday'
  },
  {
    id: '2',
    name: 'Yellow Peppers',
    price: 2000,
    quantity: '30',
    unit: 'kg',
    harvestDate: '2026-04-11',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/cucumber.png',
    status: 'available',
    description: 'Organic yellow peppers'
  },
  {
    id: '3',
    name: 'White Rice',
    price: 45000,
    quantity: '100',
    unit: 'kg',
    harvestDate: '2026-04-05',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/fresh vegetable.png',
    status: 'available',
    description: 'Premium quality white rice'
  },
  {
    id: '4',
    name: 'Fresh Yams',
    price: 8000,
    quantity: '20',
    unit: 'tubers',
    harvestDate: '2026-04-09',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/carrot.png',
    status: 'available',
    description: 'Large fresh yams'
  },
  {
    id: '5',
    name: 'Fresh Fish',
    price: 3500,
    quantity: '15',
    unit: 'kg',
    harvestDate: '2026-04-08',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/cat-fish2.png',
    status: 'available',
    description: 'Fresh catfish from local ponds'
  },
  {
    id: '6',
    name: 'Banana Bunch',
    price: 1800,
    quantity: '25',
    unit: 'bunches',
    harvestDate: '2026-04-12',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/bananer.png',
    status: 'available',
    description: 'Fresh banana bunches'
  },
  {
    id: '7',
    name: 'Mushrooms',
    price: 2200,
    quantity: '10',
    unit: 'kg',
    harvestDate: '2026-04-11',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/mushrum.jpg',
    status: 'available',
    description: 'Fresh organic mushrooms'
  },
  {
    id: '8',
    name: 'Pineapples',
    price: 2500,
    quantity: '15',
    unit: 'pieces',
    harvestDate: '2026-04-10',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/pineapple.webp',
    status: 'available',
    description: 'Sweet fresh pineapples'
  },
  {
    id: '9',
    name: 'Watermelon',
    price: 4000,
    quantity: '12',
    unit: 'pieces',
    harvestDate: '2026-04-09',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/water melon.png',
    status: 'available',
    description: 'Juicy fresh watermelons'
  },
  {
    id: '10',
    name: 'Catfish',
    price: 5500,
    quantity: '8',
    unit: 'kg',
    harvestDate: '2026-04-12',
    farmerId: 'f1',
    farmerName: 'Adebayo Okonkwo',
    farmerLocation: 'Ibadan, Oyo State',
    farmerRating: 4.8,
    image: '/images/cat fish.png',
    status: 'available',
    description: 'Premium quality catfish'
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    productName: 'Fresh Tomatoes',
    quantity: '10 kg',
    price: 15000,
    buyerName: 'Folake Adeyemi',
    buyerPhone: '0801 234 5678',
    buyerLocation: 'Ikeja, Lagos',
    pickupTime: '2026-04-13 10:00 AM',
    status: 'pending',
    date: '2026-04-12'
  },
  {
    id: 'o2',
    productName: 'Yellow Peppers',
    quantity: '5 kg',
    price: 10000,
    buyerName: 'Emeka Obi',
    buyerPhone: '0802 345 6789',
    buyerLocation: 'Victoria Island, Lagos',
    pickupTime: '2026-04-13 2:00 PM',
    status: 'confirmed',
    date: '2026-04-12'
  },
  {
    id: 'o3',
    productName: 'Fresh Yams',
    quantity: '5 tubers',
    price: 2000,
    buyerName: 'Amina Hassan',
    buyerPhone: '0803 456 7890',
    buyerLocation: 'Wuse, Abuja',
    pickupTime: '2026-04-14 9:00 AM',
    status: 'in-transit',
    date: '2026-04-11'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'credit',
    amount: 15000,
    description: 'Payment for Fresh Tomatoes',
    date: '2026-04-11',
    status: 'completed'
  },
  {
    id: 't2',
    type: 'credit',
    amount: 10000,
    description: 'Payment for Yellow Peppers',
    date: '2026-04-10',
    status: 'completed'
  },
  {
    id: 't3',
    type: 'debit',
    amount: 5000,
    description: 'Withdrawal to Bank Account',
    date: '2026-04-09',
    status: 'completed'
  },
  {
    id: 't4',
    type: 'credit',
    amount: 8000,
    description: 'Payment for Cassava',
    date: '2026-04-08',
    status: 'pending'
  }
];

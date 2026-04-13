import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface DbJson {
  users: any[];
  categories: any[];
  products: any[];
  orders: any[];
  transactions: any[];
}

async function migrateData() {
  try {
    console.log('🚀 Starting database migration...\n');

    // Read db.json
    const dbPath = path.join(process.cwd(), 'db.json');
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    const data: DbJson = JSON.parse(rawData);

    // 1. Migrate categories
    console.log('📋 Migrating categories...');
    if (data.categories && data.categories.length > 0) {
      const { error: categoriesError } = await supabase
        .from('categories')
        .insert(data.categories);
      if (categoriesError) {
        console.warn('⚠️  Categories error:', categoriesError.message);
      } else {
        console.log(`✅ Inserted ${data.categories.length} categories`);
      }
    }

    // 2. Migrate users
    console.log('\n👥 Migrating users...');
    if (data.users && data.users.length > 0) {
      // Transform camelCase to snake_case for database
      const transformedUsers = data.users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        location: user.location,
        rating: user.rating,
        created_at: user.createdAt
      }));

      const { error: usersError } = await supabase
        .from('users')
        .insert(transformedUsers);
      if (usersError) {
        console.warn('⚠️  Users error:', usersError.message);
      } else {
        console.log(`✅ Inserted ${data.users.length} users`);
      }
    }

    // 3. Migrate products
    console.log('\n🥬 Migrating products...');
    if (data.products && data.products.length > 0) {
      const transformedProducts = data.products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        harvest_date: product.harvestDate,
        farmer_id: product.farmerId,
        farmer_name: product.farmerName,
        farmer_location: product.farmerLocation,
        farmer_rating: product.farmerRating,
        image: product.image,
        status: product.status,
        description: product.description,
        category: product.category,
        created_at: product.createdAt
      }));

      const { error: productsError } = await supabase
        .from('products')
        .insert(transformedProducts);
      if (productsError) {
        console.warn('⚠️  Products error:', productsError.message);
      } else {
        console.log(`✅ Inserted ${data.products.length} products`);
      }
    }

    // 4. Migrate orders
    console.log('\n📦 Migrating orders...');
    if (data.orders && data.orders.length > 0) {
      const transformedOrders = data.orders.map(order => ({
        id: order.id,
        product_name: order.productName,
        quantity: order.quantity,
        price: order.price,
        buyer_id: order.buyerId,
        buyer_name: order.buyerName,
        buyer_phone: order.buyerPhone,
        buyer_location: order.buyerLocation,
        farmer_id: order.farmerId,
        pickup_time: order.pickupTime,
        status: order.status,
        date: order.date,
        created_at: order.createdAt
      }));

      const { error: ordersError } = await supabase
        .from('orders')
        .insert(transformedOrders);
      if (ordersError) {
        console.warn('⚠️  Orders error:', ordersError.message);
      } else {
        console.log(`✅ Inserted ${data.orders.length} orders`);
      }
    }

    // 5. Migrate transactions
    console.log('\n💰 Migrating transactions...');
    if (data.transactions && data.transactions.length > 0) {
      const transformedTransactions = data.transactions.map(transaction => ({
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        user_id: transaction.userId,
        date: transaction.date,
        status: transaction.status,
        created_at: transaction.createdAt
      }));

      const { error: transactionsError } = await supabase
        .from('transactions')
        .insert(transformedTransactions);
      if (transactionsError) {
        console.warn('⚠️  Transactions error:', transactionsError.message);
      } else {
        console.log(`✅ Inserted ${data.transactions.length} transactions`);
      }
    }

    console.log('\n✨ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();

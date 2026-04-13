import { createClient } from '@supabase/supabase-js';

declare global {
  interface ImportMeta {
    env: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
    };
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

class ApiService {
  // Users
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    if (error) throw error;
    return data;
  }

  async getUser(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async createUser(user: any) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select();
    if (error) throw error;
    return data[0];
  }

  async updateUser(id: string, user: any) {
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }

  async deleteUser(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    if (error) throw error;
    return data;
  }

  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async createProduct(product: any) {
    try {
      console.log('API: Creating product with data:', product);
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();
      if (error) {
        console.error('Supabase product insert error:', error);
        throw new Error(`Failed to create product: ${error.message}`);
      }
      console.log('API: Product created successfully:', data);
      return data[0];
    } catch (err) {
      console.error('Product creation failed:', err);
      throw err;
    }
  }

  async updateProduct(id: string, product: any) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // Orders
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*');
    if (error) throw error;
    return data;
  }

  async getOrder(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async createOrder(order: any) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select();
    if (error) throw error;
    return data[0];
  }

  async updateOrder(id: string, order: any) {
    const { data, error } = await supabase
      .from('orders')
      .update(order)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }

  async deleteOrder(id: string) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // Transactions
  async getTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*');
    if (error) throw error;
    return data;
  }

  async getTransaction(id: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async createTransaction(transaction: any) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select();
    if (error) throw error;
    return data[0];
  }

  async updateTransaction(id: string, transaction: any) {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }

  async deleteTransaction(id: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // Categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    if (error) throw error;
    return data;
  }
}

export const apiService = new ApiService();
export default apiService;
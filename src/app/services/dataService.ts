import { apiService } from '../services/api';
import {
  User,
  Product,
  Order,
  Transaction,
  Category
} from './mockData';

class DataService {
  // Users
  async getUsers(): Promise<User[]> {
    return await apiService.getUsers();
  }

  async getUser(id: string): Promise<User | null> {
    return await apiService.getUser(id);
  }

  async createUser(user: Omit<User, 'createdAt'>): Promise<User> {
    const newUser = {
      ...user,
      created_at: new Date().toISOString()
    };
    return await apiService.createUser(newUser);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return await apiService.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    return await apiService.deleteUser(id);
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await apiService.getProducts();
  }

  async getProduct(id: string): Promise<Product | null> {
    return await apiService.getProduct(id);
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const newProduct = {
      ...product,
      created_at: new Date().toISOString()
    };
    return await apiService.createProduct(newProduct);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return await apiService.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<void> {
    return await apiService.deleteProduct(id);
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return await apiService.getOrders();
  }

  async getOrder(id: string): Promise<Order | null> {
    return await apiService.getOrder(id);
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder = {
      ...order,
      created_at: new Date().toISOString()
    };
    return await apiService.createOrder(newOrder);
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    return await apiService.updateOrder(id, order);
  }

  async deleteOrder(id: string): Promise<void> {
    return await apiService.deleteOrder(id);
  }

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    return await apiService.getTransactions();
  }

  async getTransaction(id: string): Promise<Transaction | null> {
    return await apiService.getTransaction(id);
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    const newTransaction = {
      ...transaction,
      created_at: new Date().toISOString()
    };
    return await apiService.createTransaction(newTransaction);
  }

  async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    return await apiService.updateTransaction(id, transaction);
  }

  async deleteTransaction(id: string): Promise<void> {
    return await apiService.deleteTransaction(id);
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await apiService.getCategories();
  }
}

export const dataService = new DataService();
export default dataService;
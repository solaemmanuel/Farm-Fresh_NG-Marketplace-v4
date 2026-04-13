# Farm Fresh NG Marketplace - Database Setup

This project uses JSON Server as a lightweight database for development and testing.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Database Server
```bash
npm run db
```
This starts JSON Server on `http://localhost:3001`

### 3. Start the Development Server
```bash
npm run dev
```
This starts the React app on `http://localhost:5173`

### 4. Run Both Together
```bash
npm run dev:full
```
This runs both the database server and development server concurrently.

## 📊 Database Structure

The database (`db.json`) contains the following collections:

### Users
```json
{
  "id": "u1",
  "name": "Adebayo Okonkwo",
  "email": "adebayo@example.com",
  "phone": "+234 801 234 5678",
  "role": "farmer|buyer|logistics",
  "location": "Ibadan, Oyo State",
  "rating": 4.8,
  "createdAt": "2026-01-15T10:00:00.000Z"
}
```

### Products
```json
{
  "id": "1",
  "name": "Fresh Tomatoes",
  "price": 1500,
  "quantity": "50",
  "unit": "kg",
  "harvestDate": "2026-04-10",
  "farmerId": "u1",
  "farmerName": "Adebayo Okonkwo",
  "farmerLocation": "Ibadan, Oyo State",
  "farmerRating": 4.8,
  "image": "/images/fresh-onion-500x500.webp",
  "status": "available|sold|pending",
  "description": "Fresh red tomatoes, harvested yesterday",
  "category": "vegetables",
  "createdAt": "2026-04-10T08:00:00.000Z"
}
```

### Orders
```json
{
  "id": "o1",
  "productName": "Fresh Tomatoes",
  "quantity": "10 kg",
  "price": 15000,
  "buyerId": "u4",
  "buyerName": "Folake Adeyemi",
  "buyerPhone": "+234 801 234 5678",
  "buyerLocation": "Ikeja, Lagos",
  "farmerId": "u1",
  "pickupTime": "2026-04-13T10:00:00.000Z",
  "status": "pending|confirmed|in-transit|delivered|cancelled",
  "date": "2026-04-12",
  "createdAt": "2026-04-12T14:00:00.000Z"
}
```

### Transactions
```json
{
  "id": "t1",
  "type": "credit|debit",
  "amount": 15000,
  "description": "Payment for Fresh Tomatoes",
  "userId": "u1",
  "date": "2026-04-11",
  "status": "completed|pending|failed",
  "createdAt": "2026-04-11T12:00:00.000Z"
}
```

### Categories
```json
{
  "id": "vegetables",
  "name": "Vegetables",
  "icon": "🥬"
}
```

## 🔧 API Endpoints

JSON Server automatically provides REST endpoints:

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Same pattern applies to `/products`, `/orders`, `/transactions`, and `/categories`.

## 🛠 Development Features

### Automatic Fallback
The app automatically falls back to mock data if the API server is not running, ensuring development can continue seamlessly.

### Hot Reload
- Database changes are reflected immediately (JSON Server watches the file)
- React app hot reloads on code changes

### Data Persistence
All data is stored in `db.json` and persists between server restarts.

## 📝 Adding New Data

### Via API
```bash
# Add a new product
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "price": 1000,
    "quantity": "10",
    "unit": "kg",
    "farmerId": "u1",
    "status": "available"
  }'
```

### Direct File Edit
Edit `db.json` directly and the changes will be reflected immediately.

## 🚀 Production Deployment

For production, consider migrating to:
- **Supabase** - Cloud PostgreSQL with real-time features
- **Firebase Firestore** - NoSQL cloud database
- **PlanetScale** - Serverless MySQL
- **MongoDB Atlas** - Cloud MongoDB

The current setup is perfect for development and prototyping!
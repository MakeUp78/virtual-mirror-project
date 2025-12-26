# Virtual Mirror - AR E-commerce Solution

![Virtual Mirror](https://img.shields.io/badge/AR-Ecommerce-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## 🎯 Overview

Virtual Mirror is a cutting-edge AR E-commerce platform for silicone devices that allows users to preview products on their skin before purchasing. Built with React, Node.js/Express, and AR.js technology.

## ✨ Features

- 📱 **AR Preview** - Try products virtually using your device's camera
- 🎨 **Product Customization** - Choose colors and sizes
- 🛒 **Full E-commerce** - Shopping cart, checkout, and order management
- 🔐 **Authentication** - Secure user registration and login
- 💡 **Smart Recommendations** - Product suggestions based on browsing
- 📦 **Order Tracking** - Monitor your order status
- 🎯 **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Project Structure

```
virtual-mirror-project/
├── backend/               # Node.js/Express backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/            # React frontend
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable components
│       ├── context/     # React context providers
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── App.js       # Main app component
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MakeUp78/virtual-mirror-project.git
   cd virtual-mirror-project
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Backend (.env):
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `backend/.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/virtual-mirror
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=30d
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux with systemd
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

5. **Start the development servers**
   
   Option 1 - Run both servers concurrently:
   ```bash
   npm run dev
   ```
   
   Option 2 - Run servers separately:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/recommendations/:id` - Get recommendations

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)

### Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files

## 🛠️ Technologies Used

### Frontend
- React 18.2.0
- React Router DOM 6.20.1
- Axios 1.6.2
- AR.js 2.2.2
- Three.js 0.159.0

### Backend
- Node.js
- Express 4.18.2
- MongoDB with Mongoose 8.0.3
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Helmet for security
- CORS for cross-origin requests

## 🎨 Key Features Implementation

### AR Preview
The AR preview feature uses the device's camera to overlay products on the user's skin in real-time. Located in `/frontend/src/pages/ARPreview/ARPreview.js`.

### Product Customization
Users can customize products by selecting:
- Colors (ColorPicker component)
- Sizes (SizePicker component)

### Shopping Cart
Full-featured cart with:
- Add/remove items
- Update quantities
- Persist cart in database
- Real-time total calculation

### Order Management
Complete order workflow:
- Create orders from cart
- Payment method selection
- Order status tracking
- Order history

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Role-based access control
- Input validation
- Rate limiting
- Helmet security headers
- CORS configuration

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
npm run build
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build:frontend`
2. Deploy the `frontend/build` directory
3. Set environment variable: `REACT_APP_API_URL`

### Backend (Heroku/DigitalOcean)
1. Set up MongoDB Atlas or managed MongoDB
2. Configure environment variables
3. Deploy backend code
4. Run database migrations if needed

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **MakeUp78** - Initial work

## 🙏 Acknowledgments

- AR.js for augmented reality capabilities
- React community for excellent libraries
- MongoDB for flexible database solution
- Express.js for robust backend framework

## 📞 Support

For support, email support@virtualmirror.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Advanced AR features with face tracking
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Dark mode

## 📊 Status

Project Status: **Active Development** ✅

---

Made with ❤️ by MakeUp78
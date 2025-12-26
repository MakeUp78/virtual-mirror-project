require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual-mirror');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create test users
    console.log('👥 Creating test users...');

    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Test users created:');
    console.log('   📧 User: test@example.com / password123');
    console.log('   👑 Admin: admin@example.com / admin123\n');

    // Create test products
    console.log('📦 Creating test products...');

    const products = [
      {
        name: 'Hydrating Face Patch',
        description: 'Premium silicone face patch for deep hydration. Perfect for all skin types. Reusable and eco-friendly.',
        price: 29.99,
        category: 'patches',
        images: ['https://via.placeholder.com/400x400?text=Hydrating+Face+Patch'],
        colors: [
          { name: 'Clear', hex: '#FFFFFF' },
          { name: 'Pink', hex: '#FFB6C1' },
          { name: 'Blue', hex: '#87CEEB' }
        ],
        sizes: [
          { name: 'Small', dimensions: { width: 5, height: 3 } },
          { name: 'Medium', dimensions: { width: 7, height: 4 } },
          { name: 'Large', dimensions: { width: 9, height: 5 } }
        ],
        stock: 50,
        rating: 4.5,
        numReviews: 23,
        isActive: true
      },
      {
        name: 'Anti-Wrinkle Forehead Strip',
        description: 'Silicone strip designed to reduce forehead wrinkles while you sleep. Clinically tested and dermatologist approved.',
        price: 24.99,
        category: 'strips',
        images: ['https://via.placeholder.com/400x400?text=Forehead+Strip'],
        colors: [
          { name: 'Clear', hex: '#FFFFFF' },
          { name: 'Nude', hex: '#F5DEB3' }
        ],
        sizes: [
          { name: 'Standard', dimensions: { width: 8, height: 3 } },
          { name: 'Wide', dimensions: { width: 10, height: 3 } }
        ],
        stock: 35,
        rating: 4.7,
        numReviews: 45,
        isActive: true
      },
      {
        name: 'Eye Contour Patches (Pair)',
        description: 'Set of 2 silicone patches for under-eye area. Reduces dark circles and puffiness. Comfortable overnight wear.',
        price: 34.99,
        category: 'patches',
        images: ['https://via.placeholder.com/400x400?text=Eye+Patches'],
        colors: [
          { name: 'Clear', hex: '#FFFFFF' },
          { name: 'Lavender', hex: '#E6E6FA' }
        ],
        sizes: [
          { name: 'One Size', dimensions: { width: 6, height: 2 } }
        ],
        stock: 42,
        rating: 4.8,
        numReviews: 67,
        isActive: true
      },
      {
        name: 'Full Face Sleeping Mask',
        description: 'Innovative full-face silicone mask for overnight anti-aging treatment. Enhances skin elasticity and moisture retention.',
        price: 49.99,
        category: 'masks',
        images: ['https://via.placeholder.com/400x400?text=Face+Mask'],
        colors: [
          { name: 'Clear', hex: '#FFFFFF' },
          { name: 'Pink', hex: '#FFB6C1' }
        ],
        sizes: [
          { name: 'Small', dimensions: { width: 18, height: 22 } },
          { name: 'Medium', dimensions: { width: 20, height: 24 } },
          { name: 'Large', dimensions: { width: 22, height: 26 } }
        ],
        stock: 20,
        rating: 4.6,
        numReviews: 34,
        isActive: true
      },
      {
        name: 'Neck & Chest Patch',
        description: 'Large silicone patch for neck and chest area. Prevents and reduces wrinkles. Includes travel case.',
        price: 39.99,
        category: 'patches',
        images: ['https://via.placeholder.com/400x400?text=Neck+Patch'],
        colors: [
          { name: 'Clear', hex: '#FFFFFF' },
          { name: 'Beige', hex: '#F5F5DC' }
        ],
        sizes: [
          { name: 'Standard', dimensions: { width: 15, height: 20 } }
        ],
        stock: 28,
        rating: 4.4,
        numReviews: 19,
        isActive: true
      },
      {
        name: 'Smile Line Smoothing Strips',
        description: 'Set of targeted strips for smile lines and mouth area. Reduces appearance of fine lines around lips.',
        price: 27.99,
        category: 'strips',
        images: ['https://via.placeholder.com/400x400?text=Smile+Strips'],
        colors: [
          { name: 'Clear', hex: '#FFFFFF' }
        ],
        sizes: [
          { name: 'Small', dimensions: { width: 4, height: 6 } },
          { name: 'Large', dimensions: { width: 5, height: 7 } }
        ],
        stock: 45,
        rating: 4.3,
        numReviews: 28,
        isActive: true
      }
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products created\n`);

    console.log('🎉 Database seeded successfully!\n');
    console.log('📱 You can now:');
    console.log('   1. Login with test@example.com / password123');
    console.log('   2. Browse products');
    console.log('   3. Add items to cart');
    console.log('   4. Complete checkout\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
connectDB().then(() => seedData());

#!/bin/bash

echo "🚀 Starting Virtual Mirror Application..."
echo ""

# Check if MongoDB is running
echo "📦 Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   - macOS: brew services start mongodb-community"
    echo "   - Linux: sudo systemctl start mongod"
    echo "   - Windows: net start MongoDB"
    echo ""
    echo "Continuing anyway (using remote MongoDB if configured)..."
fi

# Install dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Create .env if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "⚙️  Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please edit backend/.env with your MongoDB URI and other settings"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Starting servers..."
echo "   Backend will run on: http://localhost:5000"
echo "   Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev

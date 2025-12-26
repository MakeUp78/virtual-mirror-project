# Virtual Mirror Development Guide

## Table of Contents
1. [Setup](#setup)
2. [Architecture](#architecture)
3. [Development Workflow](#development-workflow)
4. [Code Standards](#code-standards)
5. [Testing](#testing)
6. [Deployment](#deployment)

## Setup

### Local Development Environment

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `virtual-mirror`
   - Update `MONGODB_URI` in `.env`

3. **Environment Variables**
   - Copy `.env.example` to `.env` in backend directory
   - Update all required variables
   - Never commit `.env` files

### Running the Application

**Development Mode:**
```bash
# Run both frontend and backend
npm run dev

# Run separately
npm run dev:backend    # Backend only
npm run dev:frontend   # Frontend only
```

## Architecture

### Backend Architecture

```
backend/
├── config/          # Configuration files
│   └── database.js  # MongoDB connection
├── controllers/     # Business logic
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── middleware/      # Custom middleware
│   ├── auth.js      # Authentication
│   └── upload.js    # File upload
├── models/          # Data models
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/          # API routes
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
└── server.js        # Entry point
```

### Frontend Architecture

```
frontend/src/
├── components/      # Reusable components
│   ├── Navbar/
│   ├── ProductCard/
│   ├── ColorPicker/
│   └── SizePicker/
├── context/         # Global state
│   ├── AuthContext.js
│   └── CartContext.js
├── pages/           # Page components
│   ├── Home/
│   ├── Products/
│   ├── ProductDetail/
│   ├── Cart/
│   ├── Checkout/
│   ├── Orders/
│   ├── Profile/
│   ├── ARPreview/
│   └── Auth/
├── services/        # API calls
│   └── api.js
└── App.js          # Main app
```

## Development Workflow

### Adding a New Feature

1. **Create a new branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Implement the feature**
   - Follow code standards
   - Write tests
   - Update documentation

3. **Test locally**
   ```bash
   npm test
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Add: feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/feature-name
   ```

### Adding a New API Endpoint

1. **Create route** in `backend/routes/`
2. **Create controller** in `backend/controllers/`
3. **Add validation** if needed
4. **Update API service** in `frontend/src/services/api.js`
5. **Test the endpoint**

### Adding a New Page

1. **Create page component** in `frontend/src/pages/`
2. **Add route** in `App.js`
3. **Update navigation** in `Navbar.js` if needed
4. **Create CSS file** for styling

## Code Standards

### JavaScript/React

- Use ES6+ features
- Use functional components with hooks
- Use meaningful variable names
- Add comments for complex logic
- Follow Airbnb style guide

### File Naming

- Components: PascalCase (e.g., `ProductCard.js`)
- Utilities: camelCase (e.g., `apiHelper.js`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_CONSTANTS.js`)

### Git Commits

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

Example:
```
feat: add product filtering
fix: resolve cart calculation bug
docs: update API documentation
```

## Testing

### Backend Tests

```bash
cd backend
npm test
```

Test files should be in `backend/__tests__/`

### Frontend Tests

```bash
cd frontend
npm test
```

Test files should be next to components: `Component.test.js`

### Integration Tests

Run both frontend and backend tests:
```bash
npm test
```

## Deployment

### Environment Setup

**Production Environment Variables:**
- `NODE_ENV=production`
- `MONGODB_URI=<production_db_uri>`
- `JWT_SECRET=<strong_secret>`
- `FRONTEND_URL=<production_frontend_url>`

### Build Process

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build  # if using TypeScript
```

### Deployment Checklist

- [ ] Update environment variables
- [ ] Test build locally
- [ ] Run all tests
- [ ] Update documentation
- [ ] Create database backup
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Verify deployment
- [ ] Monitor logs

## Common Issues

### MongoDB Connection Error

**Problem:** Cannot connect to MongoDB

**Solution:**
- Check if MongoDB is running
- Verify MONGODB_URI in `.env`
- Check network connectivity

### CORS Errors

**Problem:** CORS policy blocking requests

**Solution:**
- Update CORS configuration in `server.js`
- Check FRONTEND_URL in `.env`
- Verify origin settings

### File Upload Errors

**Problem:** File upload fails

**Solution:**
- Check MAX_FILE_SIZE setting
- Verify UPLOAD_PATH exists
- Check file permissions

## Useful Commands

```bash
# Install dependencies
npm run install:all

# Start development
npm run dev

# Build frontend
npm run build:frontend

# Build backend
npm run build:backend

# Run tests
npm test

# Clean install
rm -rf node_modules */node_modules
npm run install:all
```

## Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)

## Support

For questions or issues, contact:
- Email: dev@virtualmirror.com
- GitHub Issues: [Create an issue](https://github.com/MakeUp78/virtual-mirror-project/issues)

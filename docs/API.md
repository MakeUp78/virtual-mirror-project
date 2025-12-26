# Virtual Mirror API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.virtualmirror.com/api
```

## Authentication

Most endpoints require authentication. Include JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

**POST** `/auth/login`

Authenticate user and get token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User

**GET** `/auth/me`

Get logged in user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Profile

**PUT** `/auth/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "role": "user"
  }
}
```

---

## Product Endpoints

### Get All Products

**GET** `/products`

Get list of all products with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (patches, strips, masks, other)
- `search` (optional): Search in name and description
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

**Example:**
```
GET /products?category=patches&minPrice=10&maxPrice=50&page=1
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Hydrating Face Patch",
      "description": "Deep hydration silicone patch",
      "price": 29.99,
      "category": "patches",
      "images": ["/uploads/product1.jpg"],
      "colors": [
        { "name": "Clear", "hex": "#FFFFFF" },
        { "name": "Pink", "hex": "#FFB6C1" }
      ],
      "sizes": [
        { "name": "Small", "dimensions": { "width": 5, "height": 3 } },
        { "name": "Large", "dimensions": { "width": 8, "height": 5 } }
      ],
      "stock": 50,
      "rating": 4.5,
      "numReviews": 23,
      "isActive": true
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 48
}
```

### Get Product by ID

**GET** `/products/:id`

Get detailed information about a specific product.

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Hydrating Face Patch",
    "description": "Deep hydration silicone patch for all skin types",
    "price": 29.99,
    "category": "patches",
    "images": ["/uploads/product1.jpg", "/uploads/product1-2.jpg"],
    "arModel": "/uploads/patch-model.glb",
    "colors": [...],
    "sizes": [...],
    "stock": 50,
    "rating": 4.5,
    "numReviews": 23
  }
}
```

### Create Product (Admin)

**POST** `/products`

Create a new product. Requires admin role.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 39.99,
  "category": "patches",
  "images": ["/uploads/image.jpg"],
  "colors": [
    { "name": "Clear", "hex": "#FFFFFF" }
  ],
  "sizes": [
    { "name": "Medium", "dimensions": { "width": 6, "height": 4 } }
  ],
  "stock": 100
}
```

**Response:**
```json
{
  "success": true,
  "product": { ... }
}
```

### Update Product (Admin)

**PUT** `/products/:id`

Update an existing product. Requires admin role.

### Delete Product (Admin)

**DELETE** `/products/:id`

Delete a product. Requires admin role.

### Get Product Recommendations

**GET** `/products/recommendations/:id`

Get recommended products based on a product.

**Response:**
```json
{
  "success": true,
  "recommendations": [
    { ... },
    { ... }
  ]
}
```

---

## Cart Endpoints

### Get User Cart

**GET** `/cart`

Get current user's shopping cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "product": {
          "_id": "507f1f77bcf86cd799439014",
          "name": "Hydrating Face Patch",
          "price": 29.99,
          "images": ["/uploads/product1.jpg"]
        },
        "quantity": 2,
        "customization": {
          "color": "Clear",
          "size": "Large"
        }
      }
    ],
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Add Item to Cart

**POST** `/cart`

Add an item to the cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439014",
  "quantity": 2,
  "customization": {
    "color": "Clear",
    "size": "Large"
  }
}
```

**Response:**
```json
{
  "success": true,
  "cart": { ... }
}
```

### Update Cart Item

**PUT** `/cart/:itemId`

Update quantity or customization of a cart item.

**Request Body:**
```json
{
  "quantity": 3,
  "customization": {
    "color": "Pink",
    "size": "Small"
  }
}
```

### Remove Item from Cart

**DELETE** `/cart/:itemId`

Remove an item from the cart.

### Clear Cart

**DELETE** `/cart`

Remove all items from the cart.

---

## Order Endpoints

### Create Order

**POST** `/orders`

Create a new order from cart items.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "507f1f77bcf86cd799439014",
      "name": "Hydrating Face Patch",
      "quantity": 2,
      "price": 29.99,
      "customization": {
        "color": "Clear",
        "size": "Large"
      }
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card",
  "taxPrice": 5.99,
  "shippingPrice": 10.00,
  "totalPrice": 75.97
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439015",
    "orderNumber": "ORD-2024-001",
    "status": "pending",
    "isPaid": false,
    "isDelivered": false,
    "totalPrice": 75.97,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get User Orders

**GET** `/orders`

Get all orders for the logged-in user.

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "orderItems": [...],
      "status": "delivered",
      "totalPrice": 75.97,
      "isPaid": true,
      "paidAt": "2024-01-01T12:00:00.000Z",
      "isDelivered": true,
      "deliveredAt": "2024-01-05T15:30:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Order by ID

**GET** `/orders/:id`

Get detailed information about a specific order.

### Update Order to Paid

**PUT** `/orders/:id/pay`

Mark an order as paid.

**Request Body:**
```json
{
  "id": "payment_transaction_id",
  "status": "completed",
  "update_time": "2024-01-01T12:00:00.000Z",
  "email_address": "payer@example.com"
}
```

### Update Order to Delivered (Admin)

**PUT** `/orders/:id/deliver`

Mark an order as delivered. Requires admin role.

---

## Upload Endpoints

### Upload Single File

**POST** `/upload/single`

Upload a single file (image or 3D model).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: File to upload (max 10MB)

**Response:**
```json
{
  "success": true,
  "file": {
    "filename": "file-1234567890.jpg",
    "path": "/uploads/file-1234567890.jpg",
    "mimetype": "image/jpeg",
    "size": 245678
  }
}
```

### Upload Multiple Files

**POST** `/upload/multiple`

Upload multiple files at once (max 5 files).

**Form Data:**
- `files`: Array of files

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "filename": "file1-1234567890.jpg",
      "path": "/uploads/file1-1234567890.jpg",
      "mimetype": "image/jpeg",
      "size": 245678
    },
    {
      "filename": "file2-1234567891.jpg",
      "path": "/uploads/file2-1234567891.jpg",
      "mimetype": "image/jpeg",
      "size": 312456
    }
  ]
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

API endpoints are rate limited to:
- 100 requests per 15 minutes per IP

---

## Examples

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:5000/api/products', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

### cURL
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Axios
```javascript
import axios from 'axios';

const response = await axios.get('http://localhost:5000/api/products', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

For more information, visit our [GitHub repository](https://github.com/MakeUp78/virtual-mirror-project).

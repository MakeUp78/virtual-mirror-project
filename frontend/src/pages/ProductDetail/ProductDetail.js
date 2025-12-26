import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import SizePicker from '../../components/SizePicker/SizePicker';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data.product);

      // Set default selections
      if (response.data.product.colors?.length > 0) {
        setSelectedColor(response.data.product.colors[0].name);
      }
      if (response.data.product.sizes?.length > 0) {
        setSelectedSize(response.data.product.sizes[0].name);
      }

      // Load recommendations
      const recResponse = await productsAPI.getRecommendations(id);
      setRecommendations(recResponse.data.recommendations);

      setError(null);
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const customization = {
      color: selectedColor,
      size: selectedSize,
    };

    const result = await addToCart(product._id, quantity, customization);

    if (result.success) {
      setMessage({ type: 'success', text: 'Product added to cart!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="error">{error || 'Product not found'}</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-images">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} className="main-image" />
          ) : (
            <div className="image-placeholder">No Image Available</div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            {product.rating > 0 && (
              <>
                <span className="rating">⭐ {product.rating.toFixed(1)}</span>
                <span className="reviews">({product.numReviews} reviews)</span>
              </>
            )}
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.colors && product.colors.length > 0 && (
            <ColorPicker
              colors={product.colors}
              selectedColor={selectedColor}
              onColorSelect={(color) => setSelectedColor(color.name)}
            />
          )}

          {product.sizes && product.sizes.length > 0 && (
            <SizePicker
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={(size) => setSelectedSize(size.name)}
            />
          )}

          <div className="quantity-selector">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <span className="stock-info">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {message && (
            <div className={message.type === 'success' ? 'success' : 'error'}>
              {message.text}
            </div>
          )}

          <div className="product-actions">
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {product.arModel && (
              <Link to={`/ar-preview/${product._id}`} className="btn btn-secondary">
                AR Preview
              </Link>
            )}
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>You May Also Like</h2>
          <div className="recommendations-grid">
            {recommendations.map((rec) => (
              <div key={rec._id} className="recommendation-card">
                <Link to={`/products/${rec._id}`}>
                  {rec.images && rec.images[0] ? (
                    <img src={rec.images[0]} alt={rec.name} />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                  <h3>{rec.name}</h3>
                  <p className="price">${rec.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

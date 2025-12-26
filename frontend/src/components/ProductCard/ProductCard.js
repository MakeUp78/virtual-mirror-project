import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-card-link">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card-image"
          />
        ) : (
          <div className="product-card-image-placeholder">No Image</div>
        )}

        <div className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-description">
            {product.description.substring(0, 100)}
            {product.description.length > 100 ? '...' : ''}
          </p>

          <div className="product-card-footer">
            <span className="product-card-price">${product.price.toFixed(2)}</span>
            {product.rating > 0 && (
              <span className="product-card-rating">
                ⭐ {product.rating.toFixed(1)} ({product.numReviews})
              </span>
            )}
          </div>

          {product.stock === 0 && (
            <div className="product-card-badge">Out of Stock</div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

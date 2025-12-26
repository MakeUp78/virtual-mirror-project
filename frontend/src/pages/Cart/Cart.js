import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, removeFromCart, updateCartItem, getCartTotal } = useCart();

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                {item.product.images && item.product.images[0] ? (
                  <img src={item.product.images[0]} alt={item.product.name} />
                ) : (
                  <div className="image-placeholder">No Image</div>
                )}
              </div>

              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                {item.customization && (
                  <div className="customization">
                    {item.customization.color && (
                      <span>Color: {item.customization.color}</span>
                    )}
                    {item.customization.size && (
                      <span>Size: {item.customization.size}</span>
                    )}
                  </div>
                )}
                <p className="price">${item.product.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="cart-item-remove"
                onClick={() => handleRemove(item._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

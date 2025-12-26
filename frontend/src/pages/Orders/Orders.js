import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getAll();
      setOrders(response.data.orders);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      processing: '#17a2b8',
      shipped: '#007bff',
      delivered: '#28a745',
      cancelled: '#dc3545',
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No orders yet</h2>
        <p>Start shopping to see your orders here!</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-id">
                <strong>Order ID:</strong> {order._id}
              </div>
              <div className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div
                className="order-status"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status.toUpperCase()}
              </div>
            </div>

            <div className="order-items">
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <strong>{item.name}</strong>
                    <span> × {item.quantity}</span>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </div>
              <div className="order-payment">
                <span>{order.isPaid ? '✓ Paid' : 'Not Paid'}</span>
                <span>{order.isDelivered ? '✓ Delivered' : 'Not Delivered'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

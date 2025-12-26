import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Virtual Mirror AR E-commerce</h1>
          <p>Try before you buy with our innovative AR technology</p>
          <p>Customize and preview silicone devices on your skin in real-time</p>
          <Link to="/products" className="btn btn-primary btn-large">
            Explore Products
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Virtual Mirror?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>AR Preview</h3>
              <p>See how products look on your skin before purchasing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Customize</h3>
              <p>Choose from various colors and sizes to match your needs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Easy Shopping</h3>
              <p>Simple and secure checkout process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Smart Recommendations</h3>
              <p>Get personalized product suggestions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
            <Link to="/products" className="btn btn-secondary">Browse Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

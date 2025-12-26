import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import './ARPreview.css';

const ARPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    loadProduct();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data.product);
      setError(null);
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setStream(mediaStream);
      setCameraActive(true);
    } catch (err) {
      setError('Failed to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // You can save or process the captured image here
      const imageData = canvas.toDataURL('image/png');
      console.log('Captured image:', imageData);

      alert('Image captured! In a production app, this would be saved or processed.');
    }
  };

  if (loading) {
    return <div className="loading">Loading AR preview...</div>;
  }

  if (error || !product) {
    return (
      <div className="error">
        {error || 'Product not found'}
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="ar-preview-page">
      <div className="ar-header">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Back
        </button>
        <h1>AR Preview: {product.name}</h1>
      </div>

      <div className="ar-container">
        <div className="ar-viewport">
          {!cameraActive ? (
            <div className="ar-placeholder">
              <div className="placeholder-content">
                <h2>Ready to try AR?</h2>
                <p>Click the button below to start your camera and preview the product</p>
                <button onClick={startCamera} className="btn btn-primary btn-large">
                  Start Camera
                </button>
              </div>
            </div>
          ) : (
            <div className="ar-camera">
              <video ref={videoRef} autoPlay playsInline className="ar-video" />
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              <div className="ar-overlay">
                <div className="ar-controls">
                  <button onClick={captureImage} className="btn btn-primary">
                    📸 Capture
                  </button>
                  <button onClick={stopCamera} className="btn btn-danger">
                    Stop Camera
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ar-info">
          <h2>AR Instructions</h2>
          <ol>
            <li>Allow camera access when prompted</li>
            <li>Position your face in the camera view</li>
            <li>The product will overlay on your skin</li>
            <li>Move around to see different angles</li>
            <li>Capture an image when you're satisfied</li>
          </ol>

          <div className="product-details">
            <h3>Product Details</h3>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>

          <div className="ar-note">
            <p><strong>Note:</strong> This is a basic AR implementation. In a production environment,
              this would use AR.js or other AR frameworks to overlay the product on your face/skin
              with accurate positioning and realistic rendering.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARPreview;

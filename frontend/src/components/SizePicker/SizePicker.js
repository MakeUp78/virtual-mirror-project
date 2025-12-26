import React from 'react';
import './SizePicker.css';

const SizePicker = ({ sizes, selectedSize, onSizeSelect }) => {
  return (
    <div className="size-picker">
      <h4>Select Size:</h4>
      <div className="size-options">
        {sizes.map((size, index) => (
          <button
            key={index}
            className={`size-option ${selectedSize === size.name ? 'selected' : ''}`}
            onClick={() => onSizeSelect(size)}
          >
            {size.name}
            {size.dimensions && (
              <span className="size-dimensions">
                ({size.dimensions.width}x{size.dimensions.height}cm)
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizePicker;

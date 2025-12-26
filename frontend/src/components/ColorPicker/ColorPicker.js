import React from 'react';
import './ColorPicker.css';

const ColorPicker = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <div className="color-picker">
      <h4>Select Color:</h4>
      <div className="color-options">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onColorSelect(color)}
            title={color.name}
          >
            {selectedColor === color.name && <span className="checkmark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

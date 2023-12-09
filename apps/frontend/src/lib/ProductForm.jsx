import { useState, useRef, useEffect } from 'react';

export default function ProductForm(props) {
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('Choose a size');
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      productId: props.productId,
      gender,
      size,
      quantity,
    });
    const data = {
      productId: props.productId,
      gender: gender,
      size: size,
      quantity: quantity,
    };
    const urlRoute = import.meta.env.PUBLIC_API_URL + '/cart';
    const response = fetch(urlRoute, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
      method: 'POST',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      {/* Gender Selection */}
      <strong>Gender</strong>
      <div className="radio-group">
        <div className="radio-group">
          <label className="form-label">
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label className="form-label">
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
      </div>

      {/* Size Selection */}
      <div
        ref={wrapperRef}
        className={`dropdown__wrapper ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="placeholder">
          {size}{' '}
          <span className="arrow">
            <img
              src="https://cdn-manuelosorio.cyclic.app/api/icons/chevron-up?color=%230A2239&#38;size=24&#38;stroke_width=2"
              alt="Chevorn Icon"
            />
          </span>
        </div>
        <div className="dropdown__options">
          {['small', 'medium', 'large', 'x-large', 'xx-large'].map(
            (option, idx) => (
              <div
                key={idx}
                className="dropdown__option"
                onClick={() => {
                  setSize(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            )
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <strong>Quantity</strong>
      <div className="quantity">
        <div
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="quantity__control"
        >
          -
        </div>
        <div className="quantity__display">{quantity}</div>
        <div
          onClick={() => setQuantity(quantity + 1)}
          className="quantity__control"
        >
          +
        </div>
      </div>
      {/* Add to Cart Button */}
      <button type="submit" className="button">
        <img
          src="https://cdn-manuelosorio.cyclic.app/api/icons/shopping-cart?color=%23efefef&#38;size=24&#38;stroke_width=2"
          alt="Shopping Cart Icon"
        />
        Add to Cart
      </button>
    </form>
  );
}

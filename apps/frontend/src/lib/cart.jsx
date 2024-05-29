import { useState, useEffect } from 'react';

function cartItem() {
  return {
    margin: 'auto',
  };
}

function Cart(props) {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    console.log('useEffect');
    async function fetchData() {
      console.log('fetching data');
      try {
        const urlRoute = import.meta.env.PUBLIC_API_URL + '/cart';
        const response = await fetch(urlRoute, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log('data', data);

        setCartData(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }
    fetchData().then();
  }, []);

  if (!cartData) {
    return (
      <div className="loading">
        <div className="loading__circle"></div>
        <div className="loading__circle"></div>
        <div className="loading__circle"></div>
      </div>
    );
  }
  if (cartData.items.length === 0) {
    return <div>Cart is empty.</div>;
  }
  return cartData.items.map((item) => {
    return (
      <div key={item.id} className="product-card cart-item" style={cartItem()}>
        <div className="cart-item__image">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="cart-item__info">
          <div>{item.name}</div>
          <div>{item.price}</div>
        </div>
      </div>
    );
  });
}
export default Cart;

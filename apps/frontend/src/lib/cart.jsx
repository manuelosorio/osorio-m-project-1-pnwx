import { useState, useEffect } from 'react';

function Cart(props) {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const urlRoute = import.meta.env.PUBLIC_API_URL + '/cart';
        const response = await fetch(urlRoute, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setCartData(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {cartData ? (
        <div>Cart data: {JSON.stringify(cartData)}</div>
      ) : (
        <div>Loading cart data...</div>
      )}
    </div>
  );
}

export default Cart;

import React, { useState, useEffect, type HTMLProps } from 'react';

function cartItemStyle() {
  return {
    margin: 'auto',
  };
}

function Cart(props: HTMLProps<any>) {
  const [cartData, setCartData] = useState([] as any);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    }
    fetchData().then();
  }, []);

  if (loading) {
    return (
      <>
        <div>Loading</div>
        <div className="loading">
          <div className="loading__circle"></div>
          <div className="loading__circle"></div>
          <div className="loading__circle"></div>
        </div>
      </>
    );
  }
  if (cartData) {
    if (!cartData.items) {
      return <div>Cart is empty.</div>;
    }
    if (cartData.items.length === 0) {
      return <div>Cart is empty.</div>;
    }
    return cartData.items.map((item: any) => {
      return (
        <div
          key={item.id}
          className="product-card cart-item"
          style={cartItemStyle()}
        >
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
}
export default Cart;

import React, { useState } from 'react';
import './App.css';

const productsData = [
  { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg', rating: 4 },
  { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg', rating: 3 },
  { id: 3, name: 'Product 3', price: 15, image: 'product3.jpg', rating: 5 },
];

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button onClick={() => onAddToCart(product, quantity)}>Add to Cart</button>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.product.id === product.id);
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Shopping Cart</h1>
        <input type="text" placeholder="Search..." />
        <div className="filters">
          <label>
            <input type="checkbox" />
            Category 1
          </label>
          <label>
            <input type="checkbox" />
            Category 2
          </label>
          <label>
            <input type="checkbox" />
            Category 3
          </label>
        </div>
      </header>
      <div className="product-list">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.product.id}>
              {item.product.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

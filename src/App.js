import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [products, setProducts] = useState([
      {
      name: "Large White Eggs, Ct. 12",
      prices: {
          "Target": 2.39,
          "Trader Joe's": 3.99,
          "Fresh Thyme": 3.99
      }
    },
      {
      name: "Green Onions",
      prices: {
          "Target": 0.99,
          "Trader Joe's": 1.29,
          "Fresh Thyme": 1.29
      }
    },
      {
      name: "Tofu",
      prices: {
          "Target": 2.99,
          "Trader Joe's": 1.99,
          "Fresh Thyme": 2.79
      }
    }
]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    targetPrice: '',
    traderJoesPrice: '',
    freshThymePrice: ''
  });

  const addProduct = (e) => {
    e.preventDefault();

    const product = {
      name: newProduct.name,
      prices: {
        "Target": parseFloat(newProduct.targetPrice),
        "Trader Joe's": parseFloat(newProduct.traderJoesPrice),
        "Fresh Thyme": parseFloat(newProduct.freshThymePrice)
      }
    }; 

    setProducts([...products, product]);

    setNewProduct({
      name: '',
      targetPrice: '',
      traderJoesPrice: '',
      freshThymePrice: ''
    });
  };

  return (
    <div>
      <h1>My Grocery Prices:</h1>
      <form onSubmit={addProduct}>
        <h2>Add New Product</h2>

        <input
          type="text"
          placeholder="Product name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />

        <input
          type="number"
          placeholder="Target's price"
          value={newProduct.targetPrice}
          onChange={(e) => setNewProduct({...newProduct, targetPrice: e.target.value})}
        />

        <input
          type="number"
          placeholder="Trader Joe's price"
          value={newProduct.traderJoesPrice}
          onChange={(e) => setNewProduct({...newProduct, traderJoesPrice: e.target.value})}
        />

        <input
          type="number"
          placeholder="Fresh Thyme's price"
          value={newProduct.freshThymePrice}
          onChange={(e) => setNewProduct({...newProduct, freshThymePrice: e.target.value})}
        />

        <button type ="submit">Add Product</button>
      </form>

    
      
      {products.map((product) => (
        <div key = {product.name}>
          <h3>{product.name}</h3>
          <p>Target: ${product.prices.Target}</p>
          <p>Trader Joe's: ${product.prices["Trader Joe's"]}</p>
          <p>Fresh Thyme: ${product.prices["Fresh Thyme"]}</p>
        </div> 
      ))}
    </div>
  );
}

export default App;


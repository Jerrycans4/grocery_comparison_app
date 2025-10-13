import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDocs, doc } from 'firebase/firestore';

function App() {
  const [products, setProducts] = useState([
]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    targetPrice: '',
    traderJoesPrice: '',
    freshThymePrice: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async() => {
    const querySnap = await getDocs(collection (db , 'products'));
    const productsData = querySnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(productsData);
  }

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'products'), {
        name: newProduct.name,
        prices: {
          "Target": parseFloat(newProduct.targetPrice),
          "Trader Joe's": parseFloat(newProduct.traderJoesPrice),
          "Fresh Thyme": parseFloat(newProduct.freshThymePrice)
        }
      });

      // Clear my form
      setNewProduct({
        name: '',
        targetPrice: '',
        traderJoesPrice: '',
        freshThymePrice: ''
      });

      // Reload the products from Firebase
      loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Highlight cheapest Price for quick comparisons
  const findCheapest = (prices) => {
    let cheapest = { store: '', price: Infinity };

    Object.entries(prices).forEach(([store, price]) => {
      if (price > 0 && price < cheapest.price) {
        cheapest = { store, price };
      }
    });

    return cheapest;
  }
  

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

    
      
      {products.map((product) => {
        const cheapest = findCheapest(product.prices);

        return (
        <div key = {product.name}>
          <h3>{product.name}</h3>
          <p style= {{color: cheapest.store === 'Target' ? 'green' : 'black', 
          fontWeight: cheapest.store === 'Target' ? 'bold' : 'normal'}}>
            Target: ${product.prices.Target}
          </p>
          <p style = {{color: cheapest.store === "Trader Joe's" ? 'green' : 'black', 
          fontWeight: cheapest.store === "Trader Joe's" ? 'bold' : 'normal'}}>
            Trader Joe's: ${product.prices["Trader Joe's"]}
          </p>
          <p style = {{color: cheapest.store === 'Fresh Thyme' ? 'green' : 'black', 
          fontWeight: cheapest.store === 'Fresh Thyme' ? 'bold' : 'normal'}}>
          Fresh Thyme: ${product.prices["Fresh Thyme"]}
          </p>
        </div> 
      );
    })};
    </div>
  )
}

export default App;


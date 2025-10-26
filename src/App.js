import './App.css';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {

  const [editingProduct, setEditingProduct] = useState(null);
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

  // adding a new product
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

      // Prepare new 
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

  // Updating existing prices
    const updateProduct = async (productId) => {
      try {
        await updateDoc(doc(db, 'products', productId), {
          name: newProduct.name,
          prices: {
            "Target": parseFloat(newProduct.targetPrice),
            "Trader Joe's": parseFloat(newProduct.traderJoesPrice),
            "Fresh Thyme": parseFloat(newProduct.freshThymePrice)
          }
        });
        setEditingProduct(null);
        setNewProduct({
        name: '',
        targetPrice: '',
        traderJoesPrice: '',
        freshThymePrice: ''
      });
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  //Delete some product
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
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
    <div className = "App">
      <h1>My Grocery Prices</h1>
      <p style={{textAlign: 'center', color: '#7f8c8d', marginBottom: '30px'}}>
        Compare prices across Target, Trader Joe's, and Fresh Thyme
      </p>
      <form onSubmit={ (e) => {
        if (editingProduct) {
          e.preventDefault();
          updateProduct(editingProduct);
        } else {
          addProduct(e);
        }
      }}>
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

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

        <button type ="submit"
        className = "btn-primary">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

    
      
      {products.map((product) => {
        const cheapest = findCheapest(product.prices);

        return (
          <div key = {product.id} className = "product-card">
            <h3>{product.name}</h3>
            <button className = "btn-edit" onClick = {() => {
              setEditingProduct(product.id);
              setNewProduct({
                name: product.name,
                targetPrice: product.prices.Target,
                traderJoesPrice: product.prices["Trader Joe's"],
                freshThymePrice: product.prices["Fresh Thyme"]
              });
            }}>
              Edit
            </button>

            <button className = "btn-delete" onClick = {() => deleteProduct(product.id)}>
              Delete
            </button>
              
            <p className={cheapest.store === 'Target' ? 'cheapest-price' : ''}>
              Target: ${product.prices.Target}
            </p>

            <p className = {cheapest.store === "Trader Joe's" ? 'cheapest-price' : ''}>
            Trader Joe's: ${product.prices["Trader Joe's"]}
            </p>

            <p className = {cheapest.store === 'Fresh Thyme' ? 'bold' : ''}>
            Fresh Thyme: ${product.prices["Fresh Thyme"]}
            </p>

          </div> 
        );
      })}
    </div>
  )
}

export default App;


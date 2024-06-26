import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import Services from './pages/Services';
import Users from './pages/Users';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);

  const url = 'http://localhost:3000/products';

  useEffect(() => {
    const getProductsList = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };

    getProductsList();
  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
  };

  const getProductById = async (id) => {
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    setName(data.name);
    setPrice(data.price);
    setStock(data.stock);
    setId(data.id);
    setEdit(true);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, price, stock })
    };

    const save_url = edit ? url + `/${id}` : url;
    const res = await fetch(save_url, saveRequestParams);

    if (!edit) {
      const newProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    if (edit) {
      const editedProduct = await res.json();
      const editedProductIndex = products.findIndex(prod => prod.id === id);
      products[editedProductIndex] = editedProduct;
      setProducts(products);
    }

    clearForm();
    setEdit(false);
  };

  const deleteProduct = async (id) => {
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    });

    const deletedProduct = await res.json();
    setProducts(products.filter(prod => prod.id !== deletedProduct.id));
  };

  const handleName = (e) => { setName(e.target.value); };
  const handlePrice = (e) => { setPrice(e.target.value); };
  const handleStock = (e) => { setStock(e.target.value); };

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/products" element={isAuthenticated ? (
            <>
              <ProductTable products={products} deleteProduct={deleteProduct} editProduct={getProductById} />
              <ProductForm
                name={name}
                price={price}
                stock={stock}
                handleName={handleName}
                handlePrice={handlePrice}
                handleStock={handleStock}
                saveProduct={saveProduct}
              />
            </>
          ) : <Navigate to="/login" />} />
          <Route path="/services" element={isAuthenticated ? <Services /> : <Navigate to="/login" />} />
          <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      {isAuthenticated && <Footer />}
    </Router>
  );
}

export default App;
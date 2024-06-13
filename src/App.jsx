import React, { useState, useEffect } from 'react';
import './App.css';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import Services from './pages/Services';
import Users from './pages/Users';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);

  const url = 'http://localhost:3000/products';

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    getProductsList();
  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
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
    try {
      const res = await fetch(save_url, saveRequestParams);
      if (!res.ok) throw new Error('Erro ao salvar produto');
      const newProduct = await res.json();
      if (!edit) {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      } else {
        setProducts((prevProducts) => prevProducts.map(prod => prod.id === id ? newProduct : prod));
      }
      clearForm();
      setEdit(false);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(url + `/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      });
      if (!res.ok) throw new Error('Erro ao excluir produto');
      setProducts((prevProducts) => prevProducts.filter(prod => prod.id !== id));
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleName = (e) => { setName(e.target.value); };
  const handlePrice = (e) => { setPrice(e.target.value); };
  const handleStock = (e) => { setStock(e.target.value); };

  const getProductById = async (id) => {
    try {
      const res = await fetch(url + `/${id}`);
      if (!res.ok) throw new Error('Erro ao buscar produto');
      const data = await res.json();
      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setId(data.id);
      setEdit(true);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<h2>Bem-vindo ao CRUD com JSON Server</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={
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
          } />
          <Route path="/services" element={<Services />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
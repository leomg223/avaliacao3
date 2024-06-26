import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

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
      setProducts(products.filter(prod => prod.id !== id));
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const editProduct = async (id) => {
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
    <div className="products-container">
      <h2>Gerenciamento de Produtos</h2>
      <form onSubmit={saveProduct}>
        <label className="form-label" htmlFor="name">Nome:</label>
        <input className="form-input" value={name} type="text" id="name" onChange={(e) => setName(e.target.value)} required />
        
        <label className="form-label" htmlFor="price">Preço:</label>
        <input className="form-input" value={price} type="number" id="price" onChange={(e) => setPrice(e.target.value)} required />
        
        <label className="form-label" htmlFor="stock">Estoque:</label>
        <input className="form-input" value={stock} type="number" id="stock" onChange={(e) => setStock(e.target.value)} required />
        
        <button className="form-submit" type="submit">{edit ? "Editar" : "Cadastrar"}</button>
      </form>
      
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.stock}</td>
              <td>
                <button onClick={() => editProduct(prod.id)}>Editar</button>
                <button onClick={() => deleteProduct(prod.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
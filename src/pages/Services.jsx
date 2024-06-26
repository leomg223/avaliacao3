import React, { useState, useEffect } from 'react';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  
  const url = 'http://localhost:3000/services';
  
  useEffect(() => {
    // Lista todos os serviços:
    const getServicesList = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao buscar serviços');
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    
    getServicesList();
  }, []);
  
  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
    setCategory("");
  };
  
  const saveService = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, description, price, duration, category })
    };
    
    const save_url = edit ? url + `/${id}` : url;
    
    try {
      const res = await fetch(save_url, saveRequestParams);
      if (!res.ok) throw new Error('Erro ao salvar serviço');
      
      const newService = await res.json();
      
      if (!edit) {
        setServices((prevServices) => [...prevServices, newService]);
      } else {
        setServices((prevServices) => prevServices.map(service => service.id === id ? newService : service));
      }
      
      clearForm();
      setEdit(false);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  const deleteService = async (id) => {
    try {
      const res = await fetch(url + `/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      });
      
      if (!res.ok) throw new Error('Erro ao excluir serviço');
      
      setServices(services.filter(service => service.id !== id));
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  const editService = async (id) => {
    try {
      const res = await fetch(url + `/${id}`);
      if (!res.ok) throw new Error('Erro ao buscar serviço');
      
      const data = await res.json();
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setDuration(data.duration);
      setCategory(data.category);
      setId(data.id);
      setEdit(true);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  return (
    <div className="services-container">
      <h2>Gerenciamento de Serviços</h2>
      <form onSubmit={saveService}>
        <label className="form-label" htmlFor="name">Nome:</label>
        <input className="form-input" value={name} type="text" id="name" onChange={(e) => setName(e.target.value)} required />
        
        <label className="form-label" htmlFor="description">Descrição:</label>
        <input className="form-input" value={description} type="text" id="description" onChange={(e) => setDescription(e.target.value)} required />
        
        <label className="form-label" htmlFor="price">Preço:</label>
        <input className="form-input" value={price} type="number" id="price" onChange={(e) => setPrice(e.target.value)} required />
        
        <label className="form-label" htmlFor="duration">Duração:</label>
        <input className="form-input" value={duration} type="text" id="duration" onChange={(e) => setDuration(e.target.value)} required />
        
        <label className="form-label" htmlFor="category">Categoria:</label>
        <input className="form-input" value={category} type="text" id="category" onChange={(e) => setCategory(e.target.value)} required />
        
        <button className="form-submit" type="submit">{edit ? "Editar" : "Cadastrar"}</button>
      </form>
      
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Duração</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{service.price}</td>
              <td>{service.duration}</td>
              <td>{service.category}</td>
              <td>
                <button onClick={() => editService(service.id)}>Editar</button>
                <button onClick={() => deleteService(service.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
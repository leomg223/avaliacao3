import React, { useState, useEffect } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  
  const url = 'http://localhost:3000/users';
  
  useEffect(() => {
    // Lista todos os usuários:
    const getUsersList = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    
    getUsersList();
  }, []);
  
  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setRole("");
  };
  
  const saveUser = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, email, phone, address, role })
    };
    
    const save_url = edit ? url + `/${id}` : url;
    
    try {
      const res = await fetch(save_url, saveRequestParams);
      if (!res.ok) throw new Error('Erro ao salvar usuário');
      
      const newUser = await res.json();
      
      if (!edit) {
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } else {
        setUsers((prevUsers) => prevUsers.map(user => user.id === id ? newUser : user));
      }
      
      clearForm();
      setEdit(false);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      const res = await fetch(url + `/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      });
      
      if (!res.ok) throw new Error('Erro ao excluir usuário');
      
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  const editUser = async (id) => {
    try {
      const res = await fetch(url + `/${id}`);
      if (!res.ok) throw new Error('Erro ao buscar usuário');
      
      const data = await res.json();
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setRole(data.role);
      setId(data.id);
      setEdit(true);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  return (
    <div className="users-container">
      <h2>Gerenciamento de Usuários</h2>
      <form onSubmit={saveUser}>
        <label className="form-label" htmlFor="name">Nome:</label>
        <input className="form-input" value={name} type="text" id="name" onChange={(e) => setName(e.target.value)} required />
        
        <label className="form-label" htmlFor="email">Email:</label>
        <input className="form-input" value={email} type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
        
        <label className="form-label" htmlFor="phone">Telefone:</label>
        <input className="form-input" value={phone} type="text" id="phone" onChange={(e) => setPhone(e.target.value)} required />
        
        <label className="form-label" htmlFor="address">Endereço:</label>
        <input className="form-input" value={address} type="text" id="address" onChange={(e) => setAddress(e.target.value)} required />
        
        <label className="form-label" htmlFor="role">Função:</label>
        <input className="form-input" value={role} type="text" id="role" onChange={(e) => setRole(e.target.value)} required />
        
        <button className="form-submit" type="submit">{edit ? "Editar" : "Cadastrar"}</button>
      </form>
      
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => editUser(user.id)}>Editar</button>
                <button onClick={() => deleteUser(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
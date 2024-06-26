import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema CRUD</h1>
      <p>Gerencie seus produtos, serviços e usuários com facilidade.</p>
      <div className="cards">
        <div className="card">
          <h2>Produtos</h2>
          <p>Adicione, edite e remova produtos do seu inventário.</p>
        </div>
        <div className="card">
          <h2>Serviços</h2>
          <p>Gerencie seus serviços oferecidos.</p>
        </div>
        <div className="card">
          <h2>Usuários</h2>
          <p>Controle o acesso dos usuários ao sistema.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CursosPage from './api/pages/Cursos/CursosPage';
import AlunosPage from './api/pages/Alunos/AlunosPage';
import MatriculasPage from './api/pages/Matriculas/MatriculasPage';

const Home = () => <h2 style={{ textAlign: 'center' }}>Seja bem-vindo(a) ao Sistema de Matrículas!</h2>;

const App = () => {
  return (
    <Router>
      <header>
        <nav style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', textAlign: 'center' }}>
          <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          <Link to="/cursos" style={{ margin: '0 10px', textDecoration: 'none' }}>Cursos</Link>
          <Link to="/alunos" style={{ margin: '0 10px', textDecoration: 'none' }}>Alunos</Link>
          <Link to="/matriculas" style={{ margin: '0 10px', textDecoration: 'none' }}>Matrículas e Relatórios</Link>
        </nav>
      </header>
      <main style={{ padding: '20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/alunos" element={<AlunosPage />} />
          <Route path="/matriculas" element={<MatriculasPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
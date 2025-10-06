import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
    if (!dateString) return '';
    // A API .NET retorna a data com horário (ex: "2000-01-01T00:00:00"). 
    // O input type="date" precisa apenas da parte YYYY-MM-DD.
    return dateString.split('T')[0]; 
};

const AlunoForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [aluno, setAluno] = useState({
    nome: initialData.nome || '',
    email: initialData.email || '',
    dataNascimento: formatDate(initialData.dataNascimento) || '', 
  });

  useEffect(() => {
    setAluno({
      nome: initialData.nome || '',
      email: initialData.email || '',
      dataNascimento: formatDate(initialData.dataNascimento) || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(aluno);
    if (!isEditing) {
      setAluno({ nome: '', email: '', dataNascimento: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="aluno-form">
      <h3>{isEditing ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</h3>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value={aluno.nome} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={aluno.email} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="dataNascimento">Data de Nascimento (Mínimo 18 anos):</label>
        <input 
            type="date" 
            id="dataNascimento" 
            name="dataNascimento" 
            value={aluno.dataNascimento} 
            onChange={handleChange} 
            required 
        />
      </div>
      <button type="submit">
        {isEditing ? 'Salvar Alterações' : 'Cadastrar Aluno'}
      </button>
    </form>
  );
};

export default AlunoForm;
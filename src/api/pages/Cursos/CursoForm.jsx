import React, { useState, useEffect } from 'react';

const CursoForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [curso, setCurso] = useState({
    nome: initialData.nome || '',
    descricao: initialData.descricao || '',
  });

  useEffect(() => {
    setCurso({
      nome: initialData.nome || '',
      descricao: initialData.descricao || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(curso);
    if (!isEditing) {
      setCurso({ nome: '', descricao: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="curso-form">
      <h3>{isEditing ? 'Editar Curso' : 'Adicionar Novo Curso'}</h3>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={curso.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={curso.descricao}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">
        {isEditing ? 'Salvar Alterações' : 'Criar Curso'}
      </button>
    </form>
  );
};

export default CursoForm;
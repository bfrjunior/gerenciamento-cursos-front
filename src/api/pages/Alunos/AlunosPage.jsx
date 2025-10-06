import React, { useState, useEffect } from 'react';
import api from '../../apiService';
import AlunoForm from './AlunoForm';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alunoParaEditar, setAlunoParaEditar] = useState(null);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/alunos');
      setAlunos(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar alunos:", err);
      setError("Falha ao carregar os alunos. Verifique se a API está rodando.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSaveAluno = async (alunoData) => {
    try {
      if (alunoParaEditar) {
        await api.put(`/alunos/${alunoParaEditar.id}`, alunoData);
        setAlunoParaEditar(null);
        alert('Aluno atualizado com sucesso!');
      } else {
        await api.post('/alunos', alunoData);
        alert('Aluno cadastrado com sucesso!');
      }
      fetchAlunos();
    } catch (err) {
      console.error("Erro ao salvar aluno:", err);
      
      // 🚨 TRATAMENTO DO ERRO DE VALIDAÇÃO DO BACK-END (400)
      if (err.response && err.response.status === 400) {
        alert(`Erro de Validação: ${err.response.data}`);
      } else {
        alert('Erro ao salvar o aluno. Verifique o console.');
      }
    }
  };

  const handleDeleteAluno = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        await api.delete(`/alunos/${id}`);
        alert('Aluno excluído com sucesso!');
        fetchAlunos();
      } catch (err) {
        console.error("Erro ao excluir aluno:", err);
        alert('Erro ao excluir o aluno.');
      }
    }
  };

  if (loading) return <div>Carregando alunos...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="alunos-page">
      <h1>Gerenciamento de Alunos</h1>

      <div className="form-section">
        <AlunoForm 
          initialData={alunoParaEditar || {}}
          onSubmit={handleSaveAluno} 
          isEditing={!!alunoParaEditar}
        />
        {alunoParaEditar && (
          <button onClick={() => setAlunoParaEditar(null)}>Cancelar Edição</button>
        )}
      </div>

      <hr />

      <h2>Lista de Alunos Cadastrados ({alunos.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Data Nasc.</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{new Date(aluno.dataNascimento).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setAlunoParaEditar(aluno)}>Editar</button>
                <button onClick={() => handleDeleteAluno(aluno.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlunosPage;
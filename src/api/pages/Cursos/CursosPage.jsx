import React, { useState, useEffect } from 'react';
import api from '../../apiService';
import CursoForm from './CursoForm';

const CursosPage = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursoParaEditar, setCursoParaEditar] = useState(null);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cursos');
      setCursos(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar cursos:", err);
      setError("Falha ao carregar os cursos. Verifique se a API está rodando.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleSaveCurso = async (cursoData) => {
    try {
      if (cursoParaEditar) {
        await api.put(`/cursos/${cursoParaEditar.id}`, cursoData);
        setCursoParaEditar(null);
        alert('Curso atualizado com sucesso!');
      } else {
        await api.post('/cursos', cursoData);
        alert('Curso criado com sucesso!');
      }
      fetchCursos();
    } catch (err) {
      console.error("Erro ao salvar curso:", err);
      alert('Erro ao salvar o curso.');
    }
  };

  const handleDeleteCurso = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await api.delete(`/cursos/${id}`);
        alert('Curso excluído com sucesso!');
        fetchCursos();
      } catch (err) {
        console.error("Erro ao excluir curso:", err);
        alert('Erro ao excluir o curso. Certifique-se de que não há matrículas associadas.');
      }
    }
  };

  if (loading) return <div>Carregando cursos...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="cursos-page">
      <h1>Gerenciamento de Cursos</h1>

      <div className="form-section">
        <CursoForm 
          initialData={cursoParaEditar || {}}
          onSubmit={handleSaveCurso} 
          isEditing={!!cursoParaEditar}
        />
        {cursoParaEditar && (
          <button onClick={() => setCursoParaEditar(null)}>Cancelar Edição</button>
        )}
      </div>

      <hr />

      <h2>Lista de Cursos Disponíveis ({cursos.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(curso => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nome}</td>
              <td>{curso.descricao}</td>
              <td>
                <button onClick={() => setCursoParaEditar(curso)}>Editar</button>
                <button 
                  onClick={() => handleDeleteCurso(curso.id)} 
                >
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

export default CursosPage;
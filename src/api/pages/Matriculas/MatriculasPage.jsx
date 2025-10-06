import React, { useState, useEffect } from 'react';
import api from '../../apiService';

const MatriculasPage = () => {
    const [alunos, setAlunos] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [alunoIdMatricula, setAlunoIdMatricula] = useState('');
    const [cursoIdMatricula, setCursoIdMatricula] = useState('');

    const [cursoIdRelatorio, setCursoIdRelatorio] = useState('');
    const [alunosDoCurso, setAlunosDoCurso] = useState([]);
    const [relatorioCarregado, setRelatorioCarregado] = useState(false);
    const [relatorioErro, setRelatorioErro] = useState(null);

    const fetchData = async () => {
        try {
            const [alunosRes, cursosRes] = await Promise.all([
                api.get('/alunos'),
                api.get('/cursos')
            ]);
            setAlunos(alunosRes.data);
            setCursos(cursosRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao carregar dados iniciais:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 1. Lógica para Matricular Aluno (POST api/matriculas)
    const handleMatricular = async (e) => {
        e.preventDefault();
        if (!alunoIdMatricula || !cursoIdMatricula) {
            alert("Selecione um aluno e um curso.");
            return;
        }

        try {
            await api.post('/matriculas', { 
                alunoId: parseInt(alunoIdMatricula), 
                cursoId: parseInt(cursoIdMatricula) 
            });
            alert('Matrícula realizada com sucesso!');
        } catch (error) {
            // Tratamento de conflito (erro 409)
            if (error.response && error.response.status === 409) {
                alert(error.response.data);
            } else {
                console.error("Erro ao matricular:", error);
                alert('Erro ao realizar a matrícula.');
            }
        }
    };
    
    // 2. Lógica para Remover Matrícula (DELETE api/matriculas)
    const handleRemoverMatricula = async (e) => {
        e.preventDefault();
        if (!alunoIdMatricula || !cursoIdMatricula) {
            alert("Selecione um aluno e um curso para remover a matrícula.");
            return;
        }
        
        if (!window.confirm("Tem certeza que deseja remover esta matrícula?")) return;

        try {
            await api.delete(`/matriculas?alunoId=${alunoIdMatricula}&cursoId=${cursoIdMatricula}`);
            alert('Matrícula removida com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                 alert('Matrícula não encontrada.');
            } else {
                console.error("Erro ao remover matrícula:", error);
                alert('Erro ao remover a matrícula.');
            }
        }
    };

    // 3. Lógica para Relatório de Alunos por Curso (GET api/relatorios/alunos-por-curso/{cursoId})
    const handleGerarRelatorio = async (e) => {
        e.preventDefault();
        if (!cursoIdRelatorio) {
            setAlunosDoCurso([]);
            setRelatorioCarregado(false);
            return;
        }
        
        setRelatorioCarregado(false);
        setRelatorioErro(null);

        try {
            const response = await api.get(`/relatorios/alunos-por-curso/${cursoIdRelatorio}`);
            setAlunosDoCurso(response.data);
            setRelatorioCarregado(true);
        } catch (error) {
            setAlunosDoCurso([]);
            setRelatorioCarregado(true);
            if (error.response && error.response.status === 404) {
                 setRelatorioErro(error.response.data);
            } else {
                setRelatorioErro("Ocorreu um erro ao buscar os alunos.");
            }
        }
    };

    if (loading) return <div>Carregando dados...</div>;

    const cursoSelecionado = cursos.find(c => c.id === parseInt(cursoIdRelatorio))?.nome;

    return (
        <div className="matriculas-page">
            <h1>Gerenciamento de Matrículas e Relatórios</h1>

            <section>
                <h2>Matricular / Remover Aluno</h2>
                <form style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexDirection: 'column', maxWidth: '400px' }}>
                    <select 
                        value={alunoIdMatricula} 
                        onChange={(e) => setAlunoIdMatricula(e.target.value)} 
                        required
                    >
                        <option value="">-- Selecione o Aluno --</option>
                        {alunos.map(aluno => (
                            <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                        ))}
                    </select>

                    <select 
                        value={cursoIdMatricula} 
                        onChange={(e) => setCursoIdMatricula(e.target.value)} 
                        required
                    >
                        <option value="">-- Selecione o Curso --</option>
                        {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="button" onClick={handleMatricular} style={{ flex: 1, backgroundColor: '#4CAF50', color: 'white' }}>
                          Matricular
                      </button>
                      <button type="button" onClick={handleRemoverMatricula} style={{ flex: 1, backgroundColor: '#f44336', color: 'white' }}>
                          Remover Matrícula
                      </button>
                    </div>
                </form>
            </section>

            <hr style={{margin: '20px 0'}} />
            
            <section>
                <h2>Relatório: Alunos por Curso</h2>
                <form onSubmit={handleGerarRelatorio} style={{ display: 'flex', gap: '10px', marginBottom: '15px', maxWidth: '400px' }}>
                    <select 
                        value={cursoIdRelatorio} 
                        onChange={(e) => setCursoIdRelatorio(e.target.value)} 
                        required
                    >
                        <option value="">Selecione o Curso para o Relatório</option>
                        {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>
                    <button type="submit">Gerar Relatório</button>
                </form>

                {relatorioCarregado && (
                    <div className="relatorio-results">
                        <h3>Resultados para: {cursoSelecionado || 'Nenhum curso selecionado'}</h3>
                        
                        {relatorioErro ? (
                            <p style={{ color: 'red', fontWeight: 'bold' }}>{relatorioErro}</p>
                        ) : alunosDoCurso.length > 0 ? (
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {alunosDoCurso.map(aluno => (
                                    <li key={aluno.id}>{aluno.nome} ({aluno.email})</li>
                                ))}
                            </ul>
                        ) : (
                             cursoIdRelatorio && <p>Nenhum aluno matriculado neste curso.</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MatriculasPage;
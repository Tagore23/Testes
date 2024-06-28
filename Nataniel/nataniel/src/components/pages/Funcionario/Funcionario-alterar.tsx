import { useEffect, useState } from "react";
import { Funcionario } from "../../../models/Funcionario";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
function FunciionarioAlterar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [CPF, setCPF] = useState("");

  const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: #399;
  margin-right: 15px;
  font-weight: bold;

  &:hover {
    color: blue;
  }
`;
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5274/api/funcionario/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((funcionario: Funcionario) => {
          setNome(funcionario.Nome);
          setCPF(funcionario.CPF);
        });
    }
  }, []);

  function alterarFuncionario(e: any) {
    const funcionario: Funcionario = {
        Nome: nome,
        CPF: CPF,
        Id: 0
    };
    //FETCH ou AXIOS
    fetch(`http://localhost:5274/api/funcionario/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario),
    })
      .then((resposta) => resposta.json())
      .then((funcionarioss: Funcionario) => {
        navigate("/pages/produto/listar");
      });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Alterar Funcionario</h1>
      <form onSubmit={alterarFuncionario}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>CPF:</label>
        <input
          type="text"
          value={CPF}
          placeholder="Digite o CPF"
          onChange={(e: any) => setCPF(e.target.value)}
        />
        <br />
        <label>ID:</label>
        <input
          type="text"
          value={id}
          placeholder="Digite o quantidade"
          onChange={(e: any) => (e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FunciionarioAlterar;
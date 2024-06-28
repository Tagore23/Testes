import React, { useState } from "react";
import { Funcionario } from "../../../models/Funcionario";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid grey;
  border-radius: 3px;
`;

const FuncionarioCadastrar: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [cpf, setCPF] = useState("");

  const cadastrarFuncionario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const novoFuncionario: Funcionario = {
      Id: parseInt(id), // Converte para número, se necessário
      Nome: nome,
      CPF: cpf,
    };

    try {
      const response = await fetch("http://localhost:5274/api/funcionario/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoFuncionario),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const data = await response.json();
      console.log("Funcionário cadastrado com sucesso:", data);
      setId("");
      setNome("");
      setCPF("");
      navigate("/pages/funcionario/listar"); // Redireciona após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      // Implemente um feedback para o usuário informando o erro
    }
  };

  return (
    <div>
      <h1>Cadastrar Funcionário</h1>
      <form onSubmit={cadastrarFuncionario}>
        <label>ID:</label>
        <input
          type="text"
          placeholder="Digite o ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <br />
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <label>CPF:</label>
        <input
          type="text"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCPF(e.target.value)}
          required
        />
        <br />
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
};

export default FuncionarioCadastrar;

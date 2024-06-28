import React, { useEffect, useState } from "react";
import { Funcionario } from "../../../models/Funcionario";
import styled from 'styled-components';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: #399;
  margin-right: 15px;
  font-weight: bold;

  &:hover {
    color: blue;
  }
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f9;
  }
`;

const StyledTableCell = styled.td`
  padding: 12px;
  text-align: left;
`;

function ProdutoListar() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  function carregarFuncionarios() {
    fetch("http://localhost:5274/api/funcionario/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        const funcionariosFormatados = dados.map((funcionario: any) => ({
          Id: funcionario.id.toString(),  // Converte para string se necessário
          Nome: funcionario.nome,
          CPF: funcionario.cpf
        }));
        setFuncionarios(funcionariosFormatados);
      })
      .catch((error) => {
        console.error("Erro ao carregar funcionários:", error);
      });
  }

  return (
    <div>
      <h1>Listar Funcionários</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario, index) => (
            <tr key={funcionario.Id}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{funcionario.Id}</StyledTableCell>
              <StyledTableCell>{funcionario.Nome}</StyledTableCell>
              <StyledTableCell>{funcionario.CPF}</StyledTableCell>
              <StyledTableCell>
              <StyledNavLink to={`/pages/funcionario/alterar/${funcionario.Id}`}>
                  Alterar
                  </StyledNavLink>
              </StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default ProdutoListar;

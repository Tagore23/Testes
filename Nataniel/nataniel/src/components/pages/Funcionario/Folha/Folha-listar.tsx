import React, { useEffect, useState } from "react";
 // Verifique o caminho correto para o arquivo de modelo
  // Verifique o caminho correto para o arquivo de modelo
import styled from 'styled-components';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Folha } from "../../../../models/Folha";

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

function FolhaListar() {
  const [folha, setFolha] = useState<Folha[]>([]);

  useEffect(() => {
    carregarFolhas();
  }, []);

  function carregarFolhas() {
    fetch("http://localhost:5274/api/folha/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setFolha(dados);
      })
      .catch((error) => {
        console.error("Erro ao carregar folhas de pagamento:", error);
      });
  }

  return (
    <div>
      <h1>Listar Folhas de Pagamento</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Mês</th>
            <th>Ano</th>
            <th>Salário Líquido</th>
            <th>Salário Bruto</th>
            <th>Imposto IRRF</th>
            <th>Imposto INSS</th>
            <th>Imposto FGTS</th>
            <th>Funcionário ID</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {folha.map((item, index) => (
            <tr key={item.id}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{item.id}</StyledTableCell>
              <StyledTableCell>{item.quantidade}</StyledTableCell>
              <StyledTableCell>{item.valor}</StyledTableCell>
              <StyledTableCell>{item.mes}</StyledTableCell>
              <StyledTableCell>{item.ano}</StyledTableCell>
              <StyledTableCell>{item.salarioLiquido}</StyledTableCell>
              <StyledTableCell>{item.salarioBruto}</StyledTableCell>
              <StyledTableCell>{item.impostoIRRF}</StyledTableCell>
              <StyledTableCell>{item.impostoINSS}</StyledTableCell>
              <StyledTableCell>{item.impostoFGTS}</StyledTableCell>
              <StyledTableCell>{item.funcionarioId}</StyledTableCell>
              <StyledTableCell>
                <StyledNavLink to={`/pages/funcionario/alterar/${item.id}`}>
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

export default FolhaListar;

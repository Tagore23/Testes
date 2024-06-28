import React from "react";
import ListaFuncionario from "./components/pages/Funcionario/Funcionario-listar";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import CadastroFuncionario from "./components/pages/Funcionario/Funcionario-cadastrar";
import styled from 'styled-components';
import FolhaListar from "./components/pages/Funcionario/Folha/Folha-listar";
import FolhaCadastrar from "./components/pages/Funcionario/Folha/Folha-cadastrar";

// Componente estilizado para os links de navegação
const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: #399;
  margin-right: 15px;
  font-weight: bold;

  &:hover {
    color: blue;
  }
`;


// Componente estilizado para o conteúdo principal
const MainContent = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <StyledNavLink to={"/"}>Home</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to={"/pages/funcionario/listar"}>
                Listar Funcionários
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to={"/pages/funcionario/cadastrar"}>
                Cadastrar Funcionários
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to={"/pages/funcionario/consultar"}>
                Consultar Funcionários
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to={"/api/folha/listar"}>
                Folha Listar
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to={"/api/folha/cadastrar"}>
              Folha Cadastrar
              </StyledNavLink>
            </li>
          </ul>
        </nav>
        <MainContent>
          <Routes>
            <Route path="/" element={<ListaFuncionario />} />
            <Route path="/pages/funcionario/listar" element={<ListaFuncionario />} />
            <Route path="/pages/funcionario/cadastrar" element={<CadastroFuncionario />} />
            <Route path="/api/folha/listar" element={<FolhaListar/>}/>
            <Route path="/api/folha/cadastrar" element={<FolhaCadastrar/>}/>
          </Routes>
          <footer>
            <p>Desenvolvido por Tagore Nataniel de Lara</p>
          </footer>
        </MainContent>
      </BrowserRouter>
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Projeto base em React com TypeScript</h1>
    </div>
  );
}

export default App;

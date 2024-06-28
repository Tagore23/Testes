import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Folha } from "../../../../models/Folha";

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid grey;
  border-radius: 3px;
`;

const FolhaCadastrar: React.FC = () => {
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState<number | string>(0);
  const [valor, setValor] = useState<number | string>(0);
  const [mes, setMes] = useState<number | string>(0);
  const [ano, setAno] = useState<number | string>(0);
  const [salarioLiquido, setSalarioLiquido] = useState<number | string>(0);
  const [salarioBruto, setSalarioBruto] = useState<number | string>(0);
  const [impostoIRRF, setImpostoIRRF] = useState<number | string>(0);
  const [impostoINSS, setImpostoINSS] = useState<number | string>(0);
  const [impostoFGTS, setImpostoFGTS] = useState<number | string>(0);
  const [funcionarioId, setFuncionarioId] = useState<number | string>(0);

  const cadastrarFolha = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const novaFolha: Folha = {
      id: 0,  // O ID será gerado pelo servidor, não precisamos enviar
      quantidade: typeof quantidade === "string" ? parseInt(quantidade) : quantidade,
      valor: typeof valor === "string" ? parseFloat(valor) : valor,
      mes: typeof mes === "string" ? parseInt(mes) : mes,
      ano: typeof ano === "string" ? parseInt(ano) : ano,
      salarioLiquido: typeof salarioLiquido === "string" ? parseFloat(salarioLiquido) : salarioLiquido,
      salarioBruto: typeof salarioBruto === "string" ? parseFloat(salarioBruto) : salarioBruto,
      impostoIRRF: typeof impostoIRRF === "string" ? parseFloat(impostoIRRF) : impostoIRRF,
      impostoINSS: typeof impostoINSS === "string" ? parseFloat(impostoINSS) : impostoINSS,
      impostoFGTS: typeof impostoFGTS === "string" ? parseFloat(impostoFGTS) : impostoFGTS,
      funcionarioId: typeof funcionarioId === "string" ? parseInt(funcionarioId) : funcionarioId,
    };

    try {
      const response = await fetch("http://localhost:5274/api/folha/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaFolha),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const data = await response.json();
      console.log("Folha cadastrada com sucesso:", data);
      // Limpar os campos após o cadastro
      setQuantidade(0);
      setValor(0);
      setMes(0);
      setAno(0);
      setSalarioLiquido(0);
      setSalarioBruto(0);
      setImpostoIRRF(0);
      setImpostoINSS(0);
      setImpostoFGTS(0);
      setFuncionarioId(0);
      navigate("/pages/folha/listar"); // Redireciona após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar folha:", error);
      // Implementar um feedback para o usuário informando o erro
    }
  };

  return (
    <div>
      <h1>Cadastrar Folha de Pagamento</h1>
      <form onSubmit={cadastrarFolha}>
        <label>Quantidade:</label>
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <br />
        <label>Valor:</label>
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <br />
        <label>Mês:</label>
        <input
          type="number"
          placeholder="Mês"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          required
        />
        <br />
        <label>Ano:</label>
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
        <br />
        <label>Salário Líquido:</label>
        <input
          type="number"
          placeholder="Salário Líquido"
          value={salarioLiquido}
          onChange={(e) => setSalarioLiquido(e.target.value)}
          required
        />
        <br />
        <label>Salário Bruto:</label>
        <input
          type="number"
          placeholder="Salário Bruto"
          value={salarioBruto}
          onChange={(e) => setSalarioBruto(e.target.value)}
          required
        />
        <br />
        <label>Imposto IRRF:</label>
        <input
          type="number"
          placeholder="Imposto IRRF"
          value={impostoIRRF}
          onChange={(e) => setImpostoIRRF(e.target.value)}
          required
        />
        <br />
        <label>Imposto INSS:</label>
        <input
          type="number"
          placeholder="Imposto INSS"
          value={impostoINSS}
          onChange={(e) => setImpostoINSS(e.target.value)}
          required
        />
        <br />
        <label>Imposto FGTS:</label>
        <input
          type="number"
          placeholder="Imposto FGTS"
          value={impostoFGTS}
          onChange={(e) => setImpostoFGTS(e.target.value)}
          required
        />
        <br />
        <label>ID do Funcionário:</label>
        <input
          type="number"
          placeholder="ID do Funcionário"
          value={funcionarioId}
          onChange={(e) => setFuncionarioId(e.target.value)}
          required
        />
        <br />
        <Button type="submit">Cadastrar Folha</Button>
      </form>
    </div>
  );
};

export default FolhaCadastrar;
    
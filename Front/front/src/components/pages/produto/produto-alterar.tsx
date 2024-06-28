import { useEffect, useState } from "react";
import { Produto } from "../../../models/Produto";
import { useNavigate, useParams } from "react-router-dom";

function ProdutoAlterar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5225/api/produto/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((produto: Produto) => {
          setNome(produto.nome);
          setDescricao(produto.descricao);
          setQuantidade(produto.quantidade.toString());
          setValor(produto.valor.toString());
        });
    }
  }, []);

  function alterarProduto(e: any) {
    const produto: Produto = {
      nome: nome,
      descricao: descricao,
      valor: parseFloat(valor),
      quantidade: parseInt(quantidade),
      categoriaId: "05bdf537-a841-4c50-8823-2e234d0bf0b0",
    };
    //FETCH ou AXIOS
    fetch(`http://localhost:5225/api/produto/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    })
      .then((resposta) => resposta.json())
      .then((produto: Produto) => {
        navigate("/pages/produto/listar");
      });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Alterar Produto</h1>
      <form onSubmit={alterarProduto}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Descricao:</label>
        <input
          type="text"
          value={descricao}
          placeholder="Digite o descrição"
          onChange={(e: any) => setDescricao(e.target.value)}
        />
        <br />
        <label>Quantidade:</label>
        <input
          type="text"
          value={quantidade}
          placeholder="Digite o quantidade"
          onChange={(e: any) => setQuantidade(e.target.value)}
        />
        <br />
        <label>Valor:</label>
        <input
          type="text"
          value={valor}
          placeholder="Digite o valor"
          onChange={(e: any) => setValor(e.target.value)}
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ProdutoAlterar;
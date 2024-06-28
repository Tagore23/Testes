import { useEffect, useState } from "react";
import { Produto } from "../../../models/Produto";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../../../models/Categoria";

function ProdutoCadastrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        setCategorias(categorias);
      });
  }

  function cadastrarProduto(e: any) {
    const produto: Produto = {
      nome: nome,
      descricao: descricao,
      valor: parseFloat(valor),
      quantidade: parseInt(quantidade),
      categoriaId: categoriaId,
    };

    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/produto/cadastrar", {
      method: "POST",
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
      <h1>Cadastrar Produto</h1>
      <form onSubmit={cadastrarProduto}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Descricao:</label>
        <input
          type="text"
          placeholder="Digite o descrição"
          onChange={(e: any) => setDescricao(e.target.value)}
        />
        <br />
        <label>Quantidade:</label>
        <input
          type="text"
          placeholder="Digite o quantidade"
          onChange={(e: any) => setQuantidade(e.target.value)}
        />
        <br />
        <label>Valor:</label>
        <input
          type="text"
          placeholder="Digite o valor"
          onChange={(e: any) => setValor(e.target.value)}
        />
        <br />
        <label>Categorias:</label>
        <select onChange={(e: any) => setCategoriaId(e.target.value)}>
          {categorias.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ProdutoCadastrar;
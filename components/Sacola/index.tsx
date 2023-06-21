import React, { useState } from "react";

const Sacola: React.FC = () => {
  const [produtos, setProdutos] = useState([
    { nome: "Cimento", quantidade: 10, valorUnitario: 20.0 },
    { nome: "Areia", quantidade: 5, valorUnitario: 15.0 },
    { nome: "Pedra", quantidade: 3, valorUnitario: 25.0 },
  ]);

  const calcularValorTotal = () => {
    return produtos.reduce((total, produto) => {
      return total + produto.quantidade * produto.valorUnitario;
    }, 0);
  };

  const handleRemoverProduto = (index: number) => {
    const novosProdutos = [...produtos];
    novosProdutos.splice(index, 1);
    setProdutos(novosProdutos);
  };

  return (
    <div>
      <h2>Sacola de Compras</h2>
      {produtos.length === 0 ? (
        <p>A sua sacola de compras está vazia.</p>
      ) : (
        <div>
          {produtos.map((produto, index) => (
            <div key={index}>
              <h3>{produto.nome}</h3>
              <p>Quantidade: {produto.quantidade}</p>
              <p>Valor Unitário: R$ {produto.valorUnitario}</p>
              <p>Valor Total: R$ {produto.quantidade * produto.valorUnitario}</p>
              <button onClick={() => handleRemoverProduto(index)}>Remover</button>
            </div>
          ))}
          <p>Valor Total da Compra: R$ {calcularValorTotal()}</p>
          <button>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};

export default Sacola;
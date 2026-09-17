# 📦 Pratelix

O **Pratelix** é um aplicativo web para controle e gerenciamento de estoque de produtos, desenvolvido com React. Ele permite listar itens em uma tabela, cadastrar novos produtos através de um formulário e gerenciar o estado global do estoque.

🔗 **Link do projeto online:** [Acesse o Pratelix aqui](https://garrido-dev.github.io/Pratelix/)

---

## ⚠️ Status do Projeto

> 🛠️ **Em Desenvolvimento:** Este projeto está sendo construído ativamente e novas funcionalidades estão sendo adicionadas constantemente. Por se tratar de uma versão de testes, o sistema **pode conter erros ou comportamentos inesperados**.

---

## 🚀 Funcionalidades Atuais

*   **Listagem de Itens:** Visualização clara de todos os produtos cadastrados através de uma tabela estruturada.
*   **Cadastro de Itens:** Formulário dinâmico para adicionar novos produtos ao estoque.
*   **Regras de Negócio Isoladas:** Uso de classes JavaScript estruturadas para garantir a organização dos dados de cada item.
*   **Gerenciamento de Estado:** Contexto global unificado (`StockContext`) para controle em tempo real dos itens de estoque.
*   **Estilização Isolada:** Visual moderno utilizando *CSS Modules* para evitar conflito de estilos entre componentes.

---

## 🛠️ Tecnologias Utilizadas

*   [React](https://react.dev) — Biblioteca JavaScript para construção de interfaces.
*   [CSS Modules](https://github.com) — Estilização de componentes de forma isolada.
*   [JavaScript (ES6+)](https://mozilla.org) — Lógica de programação e criação de entidades.

---

## 📁 Estrutura de Pastas Principal

A estrutura atual do código fonte (`src/`) está organizada da seguinte forma:

```text
src/
├── components/          # Componentes visuais (Tabela, Formulário e Estilos)
├── contexts/            # Contextos do React para controle global (Estoque)
├── entities/            # Classes e moldes de dados (StockItem)
├── pages/               # Páginas do aplicativo (Criar Item, Home, etc.)
├── App.jsx              # Componente principal
└── index.css            # Estilos globals do projeto
```

---

## 💻 Como Rodar o Projeto Localmente

Siga os passos abaixo para testar o projeto no seu computador:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd pratelix
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. Abra o navegador no endereço indicado no seu terminal (geralmente `http://localhost:5173`).

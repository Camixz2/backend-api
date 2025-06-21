# API Backend - Desafio Final Desenvolvimento Back-end II

## Descrição do Projeto

Este projeto consiste em uma API RESTful desenvolvida em Node.js para gerenciar clientes, produtos e usuários. Utiliza banco de dados MySQL (via XAMPP), autenticação JWT, cache para otimização das requisições, e testes automatizados com Jest e Supertest.

---

## Tecnologias Utilizadas

- Node.js
- Express.js
- MySQL (XAMPP)
- JWT para autenticação
- node-cache para cache de dados
- bcryptjs para hash de senhas
- Jest e Supertest para testes automatizados
- dotenv para variáveis de ambiente

---

## Como Rodar o Projeto

1. Clone o repositório:
git clone https://github.com/seuusuario/backend-api.git
Entre na pasta do projeto:

cd backend-api
Instale as dependências:


npm install
Configure o arquivo .env na raiz do projeto com as variáveis:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=backendDB
JWT_SECRET=seu_segredo_jwt_aqui
JWT_EXPIRES=1h

Crie o banco e as tabelas no MySQL usando o arquivo models/script.sql (via phpMyAdmin ou MySQL Workbench).

Inicie o servidor:
npm start
Para rodar os testes automatizados:
npm test
Endpoints Disponíveis
GET /
Retorna mensagem de boas-vindas para verificar se o servidor está ativo.

Clientes (autenticação obrigatória):

GET /clientes – Lista clientes (usa cache).

POST /clientes – Cria cliente.

PUT /clientes/:id – Atualiza cliente.

DELETE /clientes/:id – Deleta cliente.

Produtos (público, sem autenticação):

GET /produtos – Lista produtos.

POST /produtos – Cria produto.

PUT /produtos/:id – Atualiza produto.

DELETE /produtos/:id – Deleta produto.

Usuários:

POST /usuarios – Cria usuário (com senha criptografada).

GET /usuarios – Lista usuários.

Autenticação:

POST /login – Recebe usuário e senha, retorna token JWT.

POST /logout – Invalida token atual.

Autenticação
Para acessar os endpoints protegidos (/clientes), envie o token JWT no header da requisição:

Authorization: Bearer <token>
O token é gerado no login e invalidado no logout.

Cache
O endpoint GET /clientes usa cache com duração de 30 segundos para melhorar desempenho.

O cache é invalidado automaticamente quando clientes são criados, atualizados ou deletados.

Testes Automatizados
São realizados testes de validação dos campos, autenticação, e funcionamento dos endpoints.

Para rodar os testes, use o comando:
npm test
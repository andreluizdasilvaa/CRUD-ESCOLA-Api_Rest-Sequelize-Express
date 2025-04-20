# API REST - Escola (Node.js, Express, Sequelize, MariaDB)

## Descrição

Esta API RESTful foi desenvolvida para gerenciar uma escola, permitindo o cadastro de usuários, autenticação via JWT, gerenciamento de alunos e upload de fotos para cada aluno. O projeto segue boas práticas de organização de código, autenticação, validação e manipulação de arquivos.

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para banco de dados relacional (utilizando MariaDB).
- **MariaDB**: Banco de dados relacional.
- **JWT (jsonwebtoken)**: Autenticação baseada em tokens.
- **Multer**: Upload de arquivos (fotos dos alunos).
- **bcryptjs**: Hash de senhas.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **Jest & Supertest**: Testes automatizados.
- **Sequelize CLI**: Migrations e seeds.

---

## Deploy

- **API hospedada no Render**: O backend foi implementado e está rodando gratuitamente no serviço Render (free trial).
- **Banco de Dados no AlwaysData**: O banco de dados MariaDB está hospedado gratuitamente no serviço AlwaysData (free trial).

---

## Instalação e Execução Local

### 1. Clone o repositório

```bash
git clone https://github.com/andreluizdasilvaa/CRUD-ESCOLA-Api_Rest-Sequelize-Express
cd CRUD-ESCOLA-Api_Rest-Sequelize-Express
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```
DATABASE=<nome_do_banco>
DATABASE_HOST=<host>
DATABASE_PORT=<porta>
DATABASE_USERNAME=<usuario>
DATABASE_PASSWORD=<senha>
TOKEN_SECRET=<sua_chave_secreta>
TOKEN_EXPIRATION=7d
# PORT=<porta_opcional>
```

> **Obs 1:** Para rodar localmente, utilize as credenciais do banco de dados do AlwaysData.
>
> **Obs 2:** A variável de ambiente `PORT` é opcional. Caso não seja definida, o servidor irá rodar na porta padrão **3001**.

---

### 4. Configure o banco de dados

- Crie o banco de dados no MariaDB com o nome definido em `DATABASE`.
- Execute as migrations:

```bash
npx sequelize db:migrate
```

- (Opcional) Popule o banco com dados iniciais (seeds):

```bash
npx sequelize db:seed:all
```

---

### 5. Ajuste a URL base da aplicação

No arquivo `src/config/appConfig.js`, altere o valor da propriedade `url` para refletir o endereço base da sua API, seja local ou em produção.  
Exemplo para ambiente local:

```javascript
export default {
    url: 'http://localhost:3001/'
}
```

> **Importante:** Sempre ajuste essa URL conforme o ambiente em que a API estiver rodando (local, Render, etc).

---

### 6. Inicie a aplicação

```bash
npm run dev
```

A API estará disponível em: [http://localhost:3001](http://localhost:3001) (ou na porta definida em `PORT`).

---

## Estrutura das Rotas

- **/users**: Cadastro, atualização e remoção de usuários.
- **/tokens**: Geração de token JWT (login).
- **/alunos**: CRUD de alunos (protegido por autenticação).
- **/fotos**: Upload de fotos para alunos (protegido por autenticação).
- **/**: Rota de teste (home).

---

## Fluxo de Funcionamento

1. **Cadastro de Usuário**: Crie um usuário via `/users`.
2. **Login**: Gere um token JWT via `/tokens`.
3. **Autenticação**: Use o token JWT no header `Authorization: Bearer <token>` para acessar rotas protegidas.
4. **CRUD de Alunos**: Gerencie alunos autenticado.
5. **Upload de Foto**: Envie uma foto para um aluno via `/fotos` (multipart/form-data).

---

## Testes

- Os testes automatizados estão em `src/__tests__`.
- Para rodar os testes:

```bash
npm test
```

---

## Exemplos de Uso

Utilize a extensão **REST Client** do VS Code e o arquivo [`src/__tests__/tests.http`](src/__tests__/tests.http) para testar as rotas facilmente.

---

## Observações

- As fotos são salvas em `uploads/images`.
- O campo `url` da foto retorna o endereço público para acesso à imagem.
- O projeto utiliza autenticação JWT para proteger rotas sensíveis.
- O código segue padrão ES Modules.

---

## Scripts Úteis

- `npm run dev`: Executa o servidor em modo desenvolvimento.
- `npm start`: Executa o servidor em modo produção.
- `npm test`: Executa os testes automatizados.
- `npx sequelize db:migrate`: Executa as migrations.
- `npx sequelize db:seed:all`: Executa os seeds.

---

Baixe a collection do Postman por aqui:  
👉 [Download via Google Drive](https://drive.google.com/file/d/1sTNm3NReMrnc8n21y5WfqGLlWaOK0ew9/view?usp=sharing)
# 📋 Guia de Apresentação e Demonstração da Prova Final - SCAP

Este documento contém o roteiro passo a passo para a execução do sistema, demonstração ao vivo e gravação do vídeo da prova final, atendendo a todos os critérios e artefatos obrigatórios do edital.

---

## 🏗️ 1. Visão Geral da Arquitetura do Projeto

* **Back-end:** Node.js com Express e ES Modules (`"type": "module"`).
* **Banco de Dados (NoSQL):** MongoDB na nuvem via **MongoDB Atlas** (Database: `scap_db`) utilizando **Prisma ORM**.
* **Front-end:** React com TypeScript, Vite, Tailwind CSS e Zustand.
* **Autenticação:** JWT (JSON Web Tokens) e hash de senhas com Bcrypt.
* **Documentação:** Swagger OpenAPI 3.0 via Swagger UI.
* **Testes Automatizados:** Jest com cobertura de código em relatório HTML.
* **Análise Estática de Código:** ESLint v9/v10 (Flat Config).

---

## ⚙️ 2. Preparação do Ambiente Local

### 2.1. Arquivo de Configuração (`backend/.env`)
Certifique-se de que o arquivo `backend/.env` está configurado com a URL do MongoDB Atlas:
```env
DATABASE_URL="mongodb+srv://2410880_db_user:w1jLO39OGT3WGfjb@cluster-ads41-flaris.lehkt4o.mongodb.net/scap_db?retryWrites=true&w=majority"
JWT_PASSWORD="sua_chave_secreta_jwt_segura_aqui"
PORT=3000
```

### 2.2. Sincronização do Banco e Seed Inicial
Se precisar reinicializar as coleções e o usuário administrador padrão:
```powershell
# Abra o terminal na pasta backend
cd backend

# Sincroniza os schemas/índices no MongoDB Atlas
npx prisma db push

# Popula os setores, perfis e o usuário administrador inicial
npx prisma db seed
```

---

## 🎬 3. Roteiro Passo a Passo para a Gravação do Vídeo

A banca exige a demonstração das ferramentas e do sistema em execução. Recomenda-se dividir a apresentação nas seguintes etapas:

```mermaid
flowchart LR
    A["1. ESLint (Terminal)"] --> B["2. Jest & Cobertura (Terminal + HTML)"]
    B --> C["3. Swagger (Navegador)"]
    C --> D["4. Aplicação Web (Front + Back)"]
```

---

### ETAPA 1: Análise Estática de Código (ESLint)
> **Critério avaliado:** Configuração e execução do linter, demonstrando a inexistência de problemas.

1. No terminal, dentro da pasta `backend`, execute:
   ```powershell
   npm run lint
   ```
2. **O que destacar no vídeo:**
   * Mostrar que o comando executou sobre todos os arquivos JS em `src/`.
   * Evidenciar que o terminal finalizou limpo, sem nenhum erro ou aviso de violação de regras (`0 errors, 0 warnings`).

---

### ETAPA 2: Testes Automatizados e Relatório de Cobertura (Jest)
> **Critério avaliado:** Mínimo de 80% de cobertura nos testes unitários e exibição do relatório HTML obrigatório do Jest.

1. No terminal do `backend`, execute:
   ```powershell
   npm run test:coverage
   ```
2. **O que destacar no vídeo:**
   * Mostrar as **10 suites de teste passando** e os **84 testes unitários com 100% de sucesso**.
   * Apresentar os números da tabela no terminal comprovando o cumprimento do requisito de 80%:
     * **Statements:** **91.74%**
     * **Branches:** **84.02%**
     * **Functions:** **100.00%**
     * **Lines:** **91.74%**
3. **Apresentar o Relatório HTML Obrigatório:**
   * No explorador de arquivos ou pelo terminal, abra o arquivo gerado pelo Jest:
     ```powershell
     start coverage/index.html
     ```
   * Mostre o painel verde no navegador com a cobertura detalhada dos arquivos e pastas do projeto.

---

### ETAPA 3: Documentação e Execução pela API (Swagger)
> **Critério avaliado:** Documentação completa da API e execução de requisições diretamente pela interface do Swagger.

1. Inicie o servidor do backend:
   ```powershell
   npm run dev
   ```
   *(O servidor iniciará em `http://localhost:3000`)*.

2. No navegador, acesse:
   **`http://localhost:3000/api-docs`**

3. **O que demonstrar no vídeo:**
   * Navegue pelas tags documentadas: **Sector**, **User**, **Access** e **Auth** (total de 16 rotas com métodos POST, GET, PUT e DELETE).
   * **Executar a autenticação ao vivo:**
     1. Abra o endpoint `POST /login` e clique em **Try it out**.
     2. Envie o JSON com as credenciais do admin:
        ```json
        {
          "email": "admin@scap.com",
          "password": "12345"
        }
      ```
     3. Clique em **Execute** e mostre a resposta `200 OK` contendo o token JWT.
     4. Copie o token retornado (sem aspas).
     5. Clique no botão verde **Authorize** (com ícone de cadeado) no topo da página.
     6. Cole o token no campo de valor e clique em **Authorize**.
   * **Executar um endpoint protegido:**
     1. Abra a rota `GET /usuarios` ou `GET /setores`.
     2. Clique em **Try it out** e depois em **Execute**.
     3. Mostre a listagem dos dados vindos diretamente do MongoDB Atlas com status `200 OK`.

---

### ETAPA 4: Demonstração da Aplicação Web em Funcionamento
> **Critério avaliado:** Todas as funcionalidades em funcionamento real integrado com banco de dados NoSQL.

1. Em um segundo terminal, acesse a pasta `frontend` e inicie o cliente:
   ```powershell
   cd frontend
   npm run dev
   ```
2. Acesse no navegador:
   **`http://localhost:5173`**

3. **Fluxo de demonstração sugerido no vídeo:**
   * **Login:** Autenticar com `admin@scap.com` e senha `12345`.
   * **Setores:**
     * Acessar a tela de **Setores** e cadastrar um novo setor (ex: *"Laboratório"* ou *"Engenharia"*).
     * Demonstrar a edição e exclusão de setor.
   * **Usuários:**
     * Acessar a tela de **Colaboradores / Usuários**.
     * Criar um novo colaborador vinculado ao setor recém-criado.
   * **Simulador de Catraca Física (Destaque do Projeto):**
     * Acessar o menu lateral **Simulador**.
     * Selecionar o colaborador criado.
     * Clicar no botão **"Aproximar Crachá (Bipar)"**.
     * Demonstrar a resposta da catraca acendendo em **Verde** ("Acesso Autorizado").
   * **Registros e Auditoria (Logs):**
     * Navegar até a aba de **Logs / Histórico de Acessos** ou no **Dashboard** para comprovar que o acesso foi registrado e persistido no MongoDB Atlas em tempo real.

---

## 📌 4. Checklist Final dos Artefatos de Entrega

Antes de postar a tarefa final, confira este checklist:

- [x] **Node.js, Express e JavaScript:** Implementados e organizados por módulos.
- [x] **CRUD Completo:** POST, GET, PUT e DELETE implementados e funcionais.
- [x] **Banco NoSQL:** Conectado ao MongoDB Atlas (`scap_db`) com persistência efetiva.
- [x] **ESLint:** Executado no terminal sem erros.
- [x] **Jest:** 84 testes unitários com **91.74% de cobertura** e relatório HTML gerado.
- [x] **Swagger:** Interface ativa em `/api-docs` com execução de requisições.
- [ ] **Nome dos integrantes:** Adicionar o nome completo de todos os integrantes do grupo no comentário da tarefa ao submeter o link do vídeo/trabalho.

# SCAP - Sistema de Controle de Acesso e Ponto

O **SCAP** é uma solução completa para a gestão de segurança, frequência e controle de acesso corporativo. O sistema integra a simulação digital de controle físico de catracas com um painel administrativo moderno e responsivo, persistência em banco de dados **NoSQL (MongoDB)**, documentação interativa via **Swagger**, análise estática de código com **ESLint** e **cobertura de testes unitários superior a 90% via Jest**.

---

## 🛠️ Tecnologias Utilizadas

* **Back-end:** Node.js, Express (v5), Prisma ORM, MongoDB (NoSQL), JWT (JSON Web Tokens), Bcrypt, Swagger OpenAPI 3.0, Jest e ESLint.
* **Front-end:** React, TypeScript, Vite, Zustand (Gestão de estado persistido), Axios e Tailwind CSS v4.
* **Banco de Dados:** MongoDB (Cluster na nuvem via MongoDB Atlas ou instância local).

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
1. [Node.js](https://nodejs.org/) (Versão 18 ou superior)
2. [Git](https://git-scm.com/)
3. Instância ativa do **MongoDB** (local na porta `27017` ou cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 🚀 Passo a Passo para Instalação e Execução

### 1. Clonar o Repositório
Abra o seu terminal e execute:
```bash
git clone https://github.com/LeonardoKako/SCAP-Admin.git
cd SCAP-Admin
```

---

### 2. Configurar e Subir o Back-end

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie ou configure o arquivo `.env` dentro da pasta `backend/` com as suas credenciais do MongoDB e a chave JWT:
   ```env
   DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/scap_db?retryWrites=true&w=majority"
   JWT_PASSWORD="sua_chave_secreta_jwt_segura_aqui"
   PORT=3000
   ```
   *(Caso utilize o MongoDB rodando localmente na máquina, use: `mongodb://localhost:27017/scap_db?authSource=admin`)*.

4. Sincronize os schemas e índices no MongoDB com o Prisma:
   ```bash
   npx prisma db push
   ```

5. Popule o banco com os perfis de acesso, setores padrão e o administrador inicial executando o seed:
   ```bash
   npx prisma db seed
   ```

6. Inicie o servidor do backend em modo de desenvolvimento (porta `3000`):
   ```bash
   npm run dev
   ```

---

### 3. Configurar e Subir o Front-end

1. Abra uma nova janela de terminal, navegue até a raiz do projeto e acesse a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do React (Vite):
   ```bash
   npm run dev
   ```
   *(O frontend iniciará por padrão em `http://localhost:5173`, com proxy configurado automaticamente para redirecionar as chamadas `/api` para a porta `3000`)*.

---

## 🔐 Acesso ao Sistema e Credenciais Padrão

Após subir os dois servidores, acesse no navegador: **`http://localhost:5173`**

Utilize a conta de administrador padrão (gerada no passo de seed) para realizar o login:
* **E-mail:** `admin@scap.com`
* **Senha:** `12345`

---

## 📑 Documentação Interativa da API (Swagger)

A API possui documentação OpenAPI 3.0 completa disponível diretamente pelo Swagger UI:
* **URL:** **`http://localhost:3000/api-docs`**

Pela interface do Swagger, é possível:
1. Visualizar todos os endpoints documentados (`Sector`, `User`, `Access`, `Auth`).
2. Executar a autenticação no endpoint `POST /login` e clicar no botão **Authorize** (cadeado) para testar requisições autenticadas diretamente pela interface.

---

## 🧪 Testes Automatizados e Relatório de Cobertura (Jest)

O projeto possui suíte de testes unitários cobrindo controllers, services, middlewares e tratamento de erros.

Dentro da pasta `backend`, execute:

* **Executar os testes unitários:**
  ```bash
  npm test
  ```

* **Executar e gerar o relatório HTML de cobertura (≥ 80%):**
  ```bash
  npm run test:coverage
  ```
  *(O relatório visual em HTML é gerado na pasta `backend/coverage/index.html` e pode ser aberto diretamente no navegador)*.

---

## 🔍 Análise Estática de Código (ESLint)

Para executar a análise de padrões de código e regras do ESLint:
```bash
npm run lint
```

---

## 🎛️ Simulador de Catraca Física

O sistema conta com um **Simulador de Catraca/Totem** interativo acessível pelo menu lateral esquerdo ("Simulador"):
* Selecione qualquer funcionário cadastrado.
* Clique em **"Aproximar Crachá (Bipar)"** para registrar o acesso em tempo real no MongoDB.
* O painel indica visualmente **Verde** (Acesso Permitido) ou **Vermelho** (Acesso Negado).
* Os registros são refletidos instantaneamente no painel de **Dashboard** e na tela de **Logs de Acesso**.

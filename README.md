# SCAP - Sistema de Controle de Acesso e Ponto

O **SCAP** é uma solução moderna e completa para a gestão de segurança, frequência e controle de jornada de trabalho organizacional. O sistema integra o controle físico de acessos (simulado digitalmente) com um painel administrativo completo e responsivo, oferecendo uma interface centralizada e eficiente.

---

## 🛠️ Tecnologias Utilizadas

*   **Back-end:** Node.js, Express, Prisma ORM, PostgreSQL, JWT (Criptografia/Tokens), Bcrypt e Swagger para documentação de rotas.
*   **Front-end:** React, TypeScript, Zustand (Gestão de Estado persistido), Axios e Tailwind CSS v4 via plugin do Vite (`@tailwindcss/vite`).

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
1.  [Node.js](https://nodejs.org/) (Versão 18 ou superior recomendada)
2.  [Git](https://git-scm.com/)
3.  [PostgreSQL](https://www.postgresql.org/) (Banco de dados ativo rodando localmente ou na nuvem)

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

1.  Acesse a pasta do backend:
    ```bash
    cd backend
    ```
2.  Instale as dependências de terceiros:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz da pasta `backend/` contendo as credenciais de banco e a assinatura JWT. Você pode copiar como base o arquivo `.env.example` ou inserir as variáveis abaixo:
    ```env
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/scap_db?schema=public"
    JWT_PASSWORD="sua_chave_secreta_jwt_segura_aqui"
    ```
    *Substitua `usuario`, `senha`, `localhost` e `scap_db` conforme as configurações do seu servidor PostgreSQL local ou da nuvem.*

4.  Execute as migrations do Prisma para criar todas as tabelas e relacionamentos automaticamente no PostgreSQL:
    ```bash
    npx prisma migrate dev
    ```
5.  Popule o banco de dados com os perfis de acesso, setores padrão e o administrador inicial executando o seed script:
    ```bash
    npx prisma db seed
    ```
6.  Inicie o servidor de desenvolvimento do backend (rodando na porta `3000` por padrão, com reinicialização automática ao salvar arquivos):
    ```bash
    npm run dev
    ```

---

### 3. Configurar e Subir o Front-end

1.  Abra uma nova janela de terminal, navegue até a pasta raiz do projeto e acesse a pasta do frontend:
    ```bash
    cd frontend
    ```
2.  Instale as dependências do frontend:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento do React (Vite):
    ```bash
    npm run dev
    ```
    *Nota: O frontend do Vite está pré-configurado com um Proxy de desenvolvimento que redireciona as chamadas de `/api` automaticamente para a porta `3000`, evitando qualquer problema de CORS.*

---

## 🔐 Acesso ao Sistema e Credenciais Padrão

Após subir os dois servidores com sucesso, acesse a URL exibida no terminal do frontend (geralmente `http://localhost:5173`).

Utilize a seguinte conta de administrador padrão (gerada no passo de seed) para realizar o primeiro login:
*   **E-mail:** `admin@scap.com`
*   **Senha:** `12345`

---

## 🎛️ Simulador de Catraca Física

Como não temos uma catraca física real conectada, criamos uma interface interativa de **Simulador de Catraca/Totem** acessível diretamente pelo menu lateral esquerdo ("Simulador").
*   Pelo simulador, você escolhe qualquer funcionário cadastrado.
*   Ao clicar em **"Aproximar Crachá (Bipar)"**, o simulador faz uma chamada assíncrona para registrar o log no banco de dados.
*   O painel acende em **Verde** (Acesso Permitido) ou **Vermelho** (Acesso Negado) simulando a resposta física real da catraca.
*   Você verá esses registros aparecendo em tempo real nos gráficos do **Painel (Dashboard)** e na tela de **Registros (Logs)**!

---

## 📂 Teste Direto via REST Client (Alternativa)
Se preferir testar a API do backend sem usar o navegador, você pode usar a extensão **REST Client** (do VS Code) no arquivo [api.http](file:///c:/Users/Leo/Documents/SCAP-Admin/backend/api.http) localizado na pasta do backend. Ele já possui todas as requisições configuradas passo a passo.

# 🌱 API de Gerenciamento de Irrigação

Este projeto é uma API RESTful desenvolvida em Node.js (Express) para o desafio API de Gerenciamento de Irrigação.

## Principais Funcionalidades

- **🔑 Autenticação de Usuários (JWT)**
  - Registro de usuário (`POST /auth/register`)
  - Login (`POST /auth/login`)
  - Proteção de rotas (JWT)

- **🚿 Gerenciamento de Pivôs**
  - Listar pivôs do usuário (`GET /pivots`)
  - Obter pivô específico (`GET /pivots/:id`)
  - Criar pivô (`POST /pivots`)
  - Atualizar pivô (`PUT /pivots/:id`)
  - Remover pivô (`DELETE /pivots/:id`)

- **💧 Gerenciamento de Irrigações**
  - Listar irrigações do usuário (`GET /irrigations`)
  - Obter irrigação específica (`GET /irrigations/:id`)
  - Criar irrigação (`POST /irrigations`)
  - Remover irrigação (`DELETE /irrigations/:id`)

- **👑 Admin**
  - Login admin (`POST /admin/login`)
  - Listar/obter/atualizar pivôs
  - Listar/obter/ irrigações
  - Alterar senha de usuário
  - Visualizar todos os logs

- **📊 Logs (winston)**
  - Todas as ações relevantes são registradas em `logs/info.log`
  - Rotas para consultar logs por usuário ou geral para Admin

- **🛡️ Rate Limiter**
  - Limite de requisições nas rotas de autenticação e cadastro

## 📁 Estrutura do Projeto
```
/
├── controllers/         # Controladores das rotas  
├── middlewares/         # Middlewares (auth, ratelimit)  
├── models/              # Definições dos modelos  
├── routes/              # Definições de rotas  
├── services/            # Lógica de negócios  
├── logs/                # Sistema de logs  
├── server.js            # Inicialização do servidor  
└── README.md            # Documentação  
```

## 🏷️ Entidades

- **User:** `id, name, userName (apelido), passwordHash, createdAt`
- **Pivot:** `id, description, flowRate, minApplicationDepth, userId, updatedAt`
- **Irrigation:** `id, pivotId, applicationAmount, irrigationDate, userId`
- **Admin:** `id, name, passwordHash, createdAt`


## 📌 Observações

- Persistência em memória.
- O diretório [models](/models) contém as definições das classes que representam as entidades do sistema. Cada modelo utiliza UUID para gerar identificadores únicos.
- O campo `name` foi usado como identificador único (poderia ser email).
- O campo `userName` é o apelido do usuário no sistema.
- Um Admin padrão é criado com o script [/models/AdminCriar.js](/models/AdminCriar.js) ao inicializar o servidor.
- Os logs são exportados em .json e nas rotas de listagem é utilizado [logParser](logParser).
- O limite de requisições e tempo podem ser alterados em [ratelimniter.js](ratelimniter.js).
- Você pode criar um arquivo `.env` no diretório raiz do projeto e definir os valores de `PORT` e `JWT_SECRET`, caso não crie, eles terão os valores padrão: `3000` e `"segredojwt"`.

**Exemplo de arquivo .env**:
   ```bash
   PORT = 3000
   JWT_SECRET = "segredojwt"
   ```
  
## 🔗 Rotas

Veja o arquivo [routes/apiRoutes.js](routes/apiRoutes.js) para todos os endpoints disponíveis.  
Toda a parte que está entre `//ADICIONAIS  //` não faz parte do enunciado do desafio, são funcionalidades extras.

## 🛠️ Requisitos

- Node.js 18+
- Express
- bcrypt
- jsonwebtoken
- dotenv
- express-rate-limit
- winston

## 🚀 Como executar

1. **Clone o projeto:**
   ```bash
   git clone https://github.com/PEDRO-Lz/Irriga_Global.git
   ```
2. **Navegue até o diretório raiz:**
   ```bash
   cd Irriga_Global/
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Inicie o servidor:**
   ```bash
   node server.js
   ```  

*O servidor rodará na porta 3000 por padrão.*

 ## ✅ Testes
   - Utilizando `Postman`, importe o arquivo de coleção [API_Tests.postman_collection.json](API_Tests.postman_collection.json) para realizar uma bateria de testes.
   - É interessante utilizar a ferramenta **RUN** na coleção, que está organizada em uma sequência de requisições específicas para testes, permitindo validar o comportamento da API e analisar os logs gerados.
   - Os testes cobrem casos de sucesso e erros esperados.

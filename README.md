# Projeto de API RESTful com Upload de Imagens

Este projeto é uma API RESTful desenvolvida em **Node.js** com integração ao banco de dados **MongoDB**. Ele permite o upload de imagens, a geração de descrições automáticas com o serviço Gemini, e a manipulação de dados por meio de rotas REST.

## 🚀 Funcionalidades

- Upload de imagens com armazenamento local em `uploads/`.
- Geração automática de descrições para as imagens enviadas.
- Operações CRUD:
  - **Create**: Envio de imagens e criação de novos registros.
  - **Read**: Listagem de todos os posts.
  - **Update**: Atualização de descrições e informações das imagens.
  - **Delete**: Exclusão de posts.

---

## 📂 Estrutura do Projeto

```plaintext
📦 projeto-api
├── 📁 node_modules      # Dependências instaladas
├── 📁 uploads           # Diretório para armazenar imagens enviadas
├── 📁 src               # Código-fonte principal
│   ├── 📁 config        # Configuração de conexão ao banco de dados
│   │   └── dbconfig.js  # Arquivo para conectar ao MongoDB
│   ├── 📁 controller    # Lógica dos endpoints da API
│   │   └── postsController.js
│   ├── 📁 models        # Interação com o banco de dados
│   │   └── postsModel.js
│   ├── 📁 routes        # Definição das rotas
│   │   └── postsRoutes.js
│   └── 📁 service       # Serviços auxiliares
│       └── serviceGemini.js
└── server.js            # Arquivo principal do servidor
```

## ⚙️ Pré-requisitos

- Node.js v16 ou superior.
- MongoDB rodando localmente ou em um servidor, no projeto foi utilizado o MongoDb Atlas.
- OConfiguração de uma variável de ambiente:
  - STRING_CONEXAO: URL de conexão com o MongoDB.

## 🛠️ Configuração e Execução

1. Clonar o repositório
```
> git clone <URL_DO_REPOSITORIO>
> cd projeto-api
```

2. Instalar dependências

```
> npm install
```

3. Configurar o Ambiente
- Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```
STRING_CONEXAO=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome_do_banco>?retryWrites=true&w=majority
```

4. Inicie o Servidor
```
> node server.js
ou
> npm run dev
```

## 🌐 Rotas da API

GET /post
Retorna todos os posts cadastrados no banco.

POST /post
Cria um novo post a partir dos dados enviados no corpo da requisição.

POST /upload
Realiza o upload de uma imagem e cria um post associado.

Exemplo de requisição:
URL: /upload
Método: POST
Headers: Content-Type: multipart/form-data
Corpo: img (arquivo de imagem)
PUT /post/:id
Atualiza a descrição ou informações de um post específico.

DELETE /post/:id
Exclui um post do banco de dados.

## 🧩 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Multer para upload de arquivos
- dotenv para variáveis de ambiente
- fs para manipulação de arquivos locais

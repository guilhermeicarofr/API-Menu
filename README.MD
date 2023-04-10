# API-Menu
- Autor: Guilherme Icaro F Real [@GItHub](https://www.github.com/guilhermeicarofr) [@LinkedIn](https://www.linkedin.com/in/guilhermeicarofr/)
- Tecnologias utilizadas: Node.js, Express.js, POO, Typescript, Javascript, MongoDB, Mongoose, Redis, Docker, Jest, Supertest, BCrypt, JWT, Joi

#

## Como rodar:
- Antes de tudo - clonar esse repositório:
````
git clone "https://github.com/guilhermeicarofr/API-Menu"
````

### Opção1 - Rodar em um container Docker (recomendado):
- Com docker e docker-compose instalado na máquina (veja: https://docs.docker.com/compose/install/), acessar a pasta do projeto e executar o comando a seguir. Pode ser necessário autorização de superusuário.
```
sudo docker-compose up
```
- A aplicação estará disponível no endpoint http://localhost:4000/

### Opção2 - Rodar localmente (sem Docker):
- Necessário instalação do Node e NPM na máquina (v19+ recomendado).
- Acessar a pasta do projeto e executar o comando a seguir para instalar os pacotes:
```
npm install
```
- Executar aplicação:
```
npm run start
```
- A aplicação estará disponível no endpoint http://localhost:5000/

#

## Como usar:
- Fazer requisições HTTP a seguir para o endpoint correspondente ao método usado para rodar a aplicação como descrito acima
- Tipos de dados da aplicação:
```
Admin = {
  _id: string;
  username: string;
  password: string;
}

Category = {
  _id: string;
  name: string;
  parent: Category | null;
}

Product = {
  _id: string;
  name: string;
  qty: number;
  price: number;
  categories: Category[];
}
```

## Rotas de autenticação de admin:
### - POST /auth/signup
- Criar um novo administrador do sistema
- Envie um body no formato:
```
{
  username: string
  password: string
}
```
- Deve receber status 201 se requisição OK e novo Admin criado, 400 se body inválido ou 409 caso o username já esteja em uso

### - POST /auth/login
- Faz login como administrador do sistema, recebendo um token de autorização
- Deve receber status 200 e TOKEN: string se requisição OK, 400 se body inválido ou 403 caso as credenciais de login sejam inválidas

## Rotas de categoria:
### - GET /category (Autenticada)
- Retorna uma lista Category[] com todas as categorias registradas no banco de dados
- Caso não exista nenhuma Category no banco, roda uma função de seed, criando algumas categorias iniciais e retornando sua lista
- A requisição é autenticada, então deve conter um dos dois tipos de HEADER a seguir para envio do TOKEN: string:
```
{ Authorization: 'Bearer {TOKEN}' } e/ou
{ Authentication: '{TOKEN}' }
```
- Deve receber status 200 e Category[] se requisição OK ou 401 caso a autenticação por token seja inválida

## Rotas de produto:
### - GET /product (Autenticada)
- Retorna uma lista Product[] com todos os produtos registrados no banco de dados
- Caso não exista nenhum Product no banco retorna array vazio
- A requisição é autenticada, então deve conter um dos dois tipos de HEADER a seguir para envio do TOKEN: string:
```
{ Authorization: 'Bearer {TOKEN}' } e/ou
{ Authentication: '{TOKEN}' }
```
- Deve receber status 200 e Product[] se requisição OK ou 401 caso a autenticação por token seja inválida

### - GET /product/ID (Autenticada)
- Retorna um produto: Product especificado pelo ID
- A requisição é autenticada, então deve conter um dos dois tipos de HEADER a seguir para envio do TOKEN: string:
```
{ Authorization: 'Bearer {TOKEN}' } e/ou
{ Authentication: '{TOKEN}' }
```
- O parametro de rota ID deve ser uma _id: string de um produto existente no banco de dados
- Deve receber status 200 e um Product se requisição OK, 400 caso o ID seja inválido, 404 caso ID seja válido porém não existente no banco de dados e 401 caso a autenticação por token seja inválida

### - POST /product (Autenticada)
- Cria um novo um produto: Product no banco de dados
- A requisição é autenticada, então deve conter um dos dois tipos de HEADER a seguir para envio do TOKEN: string:
```
{ Authorization: 'Bearer {TOKEN}' } e/ou
{ Authentication: '{TOKEN}' }
```
- Envie um body com os dados do novo produto contendo exatamente os seguintes campos:
```
{
  name: string;
  price: number;
  qty: number;
  categories: Category[];
}
```
- Deve receber status 201 e retornar o novo produto criado se requisição OK, 400 caso o body seja inválido ou não enviado, 401 caso a autenticação por token seja inválida e 409 caso o array de categories: Category[] informado seja inválido e não existente no banco de dados

### - DELETE /product/ID (Autenticada)
- Apaga um produto: Product especificado pelo ID do banco de dados
- A requisição é autenticada, então deve conter um dos dois tipos de HEADER a seguir para envio do TOKEN: string:
```
{ Authorization: 'Bearer {TOKEN}' } e/ou
{ Authentication: '{TOKEN}' }
```
- O parametro de rota ID deve ser uma _id: string de um produto existente
- Deve receber status 200 e apagar o produto se requisição OK, 400 caso o ID seja inválido, 404 caso ID seja válido porém não existente no banco de dados e 401 caso a autenticação por token seja inválida

### - PATCH /product/ID (Autenticada)
- Edita um produto: Product especificado pelo ID no banco de dados, substituindo os dados enviados
- A requisição é autenticada, então deve conter um dos dois tipos de HEADER a seguir para envio do TOKEN: string:
```
{ Authorization: 'Bearer {TOKEN}' } e/ou
{ Authentication: '{TOKEN}' }
```
- O parametro de rota ID deve ser uma _id: string de um produto existente
- Envie um body para edição contendo um ou mais dos seguintes campos:
```
{
  name: string;
  price: number;
  qty: number;
  categories: Category[];
}
```
- Deve receber status 200 e retornar o produto editado solicitado por ID se requisição OK, 400 caso o body seja inválido, 400 caso o ID seja inválido, 404 caso ID seja válido porém não existente no banco de dados, 401 caso a autenticação por token seja inválida e 409 caso o array de categories: Category[] informado seja inválido e não existente no banco de dados

#

## Tecnologias utilizadas:
- Node:
- Typescript:
- Express:
- MongoDB:
- Mongoose:
- Redis:
- BCrypt:
- JWT:
- Joi:
- HTTP-Status:
- Jest:
- Supertest:

## Arquitetura em camadas:
- Camada Routes:

#

## Executar testes automatizados:
### Opção1 - Rodar testes em um container Docker (recomendado):
- Acessar a pasta do projeto e executar o comando:
```
sudo docker-compose -f docker-compose-test.yml up
```
- Os testes automatizados serão executados com Jest e um relatório de cobertura do código será emitido

### Opção2 - Rodar testes localmente (sem Docker):

- Executar comando de testes:
```
npm run test
```
- Executar testes com relatório de cobertura:
```
npm run test:coverage
```

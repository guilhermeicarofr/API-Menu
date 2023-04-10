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

## Paradigma orientado a objeto (POO):
- A aplicação foi desenvolvida com o conceito de Programação Orientada a Objetos utilizando classes para maior qualidade do código em termos de organização, manutenção, legibilidade, modularidade e independência das partes, com alta possibilidade de re-utilização de módulos e adaptação do projeto se necessario.

## Tecnologias utilizadas:
- [ Node ]: ambiente de execução javascript como possibilidade de disponibilizar uma api versátil, eficiente e de fácil implementação, foi usada a v19.
- [ Typescript ]: utilizado para permitir a tipagem do código trazendo maior segurança, organização e limpeza do código da aplicação, auxiliando no desenvolvimento e evitando bugs.
- [ Express ]: usado para facilitar a implementação de uma aplicação de servidor HTTP com Node.
- [ MongoDB ]: banco de dados não relacional extremamente versátil e amplamente usado no mercado, o mongodb permite o armazenamento e manipulação eficiente e ágil de dados no formato de objetos.
- [ Mongoose ]: biblioteca usada para comunicação com o MongoDB que permite a tipagem e modelagem dos dados da aplicação através de schemas e models.
- [ Redis ]: banco não relacional executado em memória, usado para criação da camada de cache para produtos e categorias, permitindo uma alta velocidade de recuperação nas listas desses dados, não sendo necessário buscá-los diretamente no banco Mongo em toda requisição.
- [ Jest ]: biblioteca de testes automatizados, usada para permitir alta qualidade e confiabilidade no código da aplicação atráves dos testes desenvolvidos e dos relatorios de cobertura de código.
- [ Supertest ]: ferramente auxiliar para o jest, que facilita a execução do servidor node+express para recebimento de requisições http de teste.
- [ Docker ]: poderosa ferramenta de execução de containers, permite que a aplicação seja executada em um ambiente a parte da máquina local e sem que seja necessário fazer a instalação de todas as dependências do projeto na máquina.
- [ Docker-Compose ]: ferramenta auxiliar que permitiu executar não só a aplicação Node em um container mas também containers separados para o banco de dados MongoDB e para o banco de cache Redis, interligando os três containers.
- [ Git ]: ferramente de versionamento de código amplamente usada para controle de versões e edição, assim como histórico de desenvolvimento da aplicação.
- [ BCrypt ]: biblioteca de criptografia que foi usada para criptografar a senha do Admin antes de armazená-la no banco de dados no momento do signup por motivos de segurança dos dados, o bcrypt também é usado para posteriormente verificar se a senha informada no login é compatível com a senha criptografada armazenada no signup.
- [ JWT ]: a jsonwebtoken foi utilizada para gerar tokens de autenticação baseados nos dados do usuário que fez login com sucesso na aplicação, tokens que podem ser usados nas outras requisições para validar a autorização do cliente.
- [ Joi ]: usada para validação de dados, foi importante para ajudar na verificação de dados de input para garantir os parâmetros definidos através de schemas e impedir inputs inválidos para a api.
- [ HTTP-Status ]: biblioteca usada para melhor a padronização dos outputs da aplicação atráves de HTTP status codes, de forma semântica e visualmente fácil de identificar no código.

## Arquitetura em camadas da aplicação:
- Camada Routes(Presentation): contém a apresentação e organização das rotas da aplicação
- Camada Controller(Application): contém as ações e os inputs e outputs da aplicação
- Camada Service(Domain): contém as regras de negócio e contexto de como opera a aplicação
- Camada Repository(Persistence) contém os acessos e manipulação dos dados salvos e persistidos na aplicação, seja banco de dados ou cache

#

## Como executar testes automatizados:
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

## Exemplo de relatório de cobertura do código disponível na pasta /coverage/:
<img align="center" height="300em" width="550em" style="border-radius:50em" alt='coverage' src='https://github.com/guilhermeicarofr/API-Menu/blob/main/e401990c-a389-4d46-bcfb-da3e324da8d0.jpg' />

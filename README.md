# Immersive API
Immersive assignment - This assignment covers most the points mentioned in the doc except the unit test which will be availalbe by monday. Please read through it and setup the project.

## Development
Please use the following command to install all the dependencies. 

```bash
$ npm install

```

Please rename .env.template to to .env for development. You can set your own TOKEN key and secret if you'd like.

### Docker Container
I've created a docker file that use the container for mysql database. Please run the following command to up the docker first and use the migration section to run all the migrations in oder to run application as a docker container. This required docker to be install on your machine.

- run `docker-compose -f docker-compose.local.yml up -d`
- remove existing docker volumes `docker-compose -f docker-compose.local.yml down --volumes`

### Sequelize (Object Relation Mapper)
- This service uses Sequelize (https://sequelize.org) to manage changes to its datastore (MySql database called 'engage').
- Create database if its not existed `sequelize db:create`
- Run all migration `sequelize db:migrate`
- Undo all migrations `sequelize db:migrate:undo:all`

In case you've not installed the sequelize cli, please use the following command to installed it globally or you can use `./node_module/sequelize/ db:migrate` e.g. 

```bash
$ npm install -g sequelize-cli

```

### Generate Swagger Documentation 
Please use the following command to generate the swagger documentation or else import `ENG.postman_collection.json` to postman to see the API and response body params.

```bash
$ npm run start:generate:doc

```

Please run the developement server and you would see the swagger doc at `http://localhost:3000/docs/`.

### Run development server. 

```bash
# development
$ npm run start:dev

```

### Administrator
At the minute I've create a file `user.js` that contain the administrator credentials and role. If you want to test the api for non administrator user, you've to manaully change the role to e.g. 'user' or something lik
- For login credentials please the below username and password
- email: `test@test.com`
- password: `password`
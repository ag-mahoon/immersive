# Immersive API
Immersive assignment - please follow the instruction to run the api server. Please following the instruction to generate swagger documentations.

## Development

```bash
# development
$ npm install

```
### Docker Container
I've created a docker file that use the container for mysql database. Please run the docker first and use the migration section to run all the migrations In oder to run application as a docker container. This required docker to be install on your machine.

- run `docker-compose -f docker-compose.local.yml up -d`
- remove existing docker volumes `docker-compose -f docker-compose.local.yml down --volumes`

### Sequelize (Object Relation Mapper)
- This service uses Sequelize (https://sequelize.org) to manage changes to its datastore (MySql database called 'engage').
- Run all migration `sequelize db:migrate`
- Undo all migrations `sequelize db:migrate:undo:all`
In case you've not installed the sequelize cli, please use the following command:
```bash
$ npm install -g sequelize-cli
$ sequelize db:create
$ sequelize db:migrate
$ sequelize db:migrate:undo:all

```

### Bash run

```bash
# development
$ npm run start:dev

```
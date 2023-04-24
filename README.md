<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Starwars API like <a href="https://swapi.dev" target="_blank">Swapi</a> on NestJS</p>

## Description

API where saved all information about starwars.

## Installation

```bash
$ npm install
```

## Running the app

Set all environment variable(.env file in the root of project) and constants. Then run the application

```bash
# Building
$ npm run build
# Up migrations
$ npm run migration:run
# Seeding
$ npm run seed:run
# After that you can start
$ npm run start
```

Start with docker compose
Set all variables in .env file(instead DB_HOST=localhost you should use DB_HOST=mysql)

```bash
# Building images
$ docker-compose build
# Start app
$ docker-compose up

```

If you want to check out a state of program -> /api/health (only for admins)

## Documentation

Swagger is used here. Api documentation is located on route `/api/docs`

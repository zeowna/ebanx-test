# Take Home assignment from EBANX #

Project written in Node.js 16 with Nest.js framework.

Technologies used:

1. Typescript;
2. Nest.js;
3. MYSQL;
4. Typeorm;
5. Docker and Docker Compose.

to run the project run the following  command:
```bash
$ docker-compose up --build app
```

Then you'll need to run the DB migrations:
```bash
$ docker-compose run --no-deps --rm app yarn migrations:run
```

This project is missing unit tests, but passes yours ``automated test suite`` xD.

## José Lucas Chociai ##

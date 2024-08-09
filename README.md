STARTUP STEPS:

1. Make a folder to contain Postgres db via docker voluemes:

    `mkdir -p $HOME/docker/volumes/postgres`

2. Spin up a postgres DBMS on your local docker environment with the following command:

    `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \ -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`

3. Update the `knexfile.js` with your Postgres DBMS connection details

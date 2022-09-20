# Writing Docker File
___
## Introduce
1. Practice writing dockerfile
2. Practice using docker compose
3. Build multiple container with __docker-compose__

## Flag
1. __t__ (tag): use for setting up name for docker image when running docker build
2. __v__ (volume): use for binding your application with docker container
3. __p__ (port): use for mapping port on docker container to your localhost:port
4. __d__ (detach): use for running your application on detach mode
5. __f__ (force): use for forcing your docker container to remove even though it was running

## Command line common
1. Container
   - docker ps: get process status
   - docker rm [containerName] -f: remove your container
2. Image
   - docker image ls: get all images
   - docker image rm [imageName]: remove your image
3. Volume
   - docker volume ls: get all volumes
   - docker volume prune: remove few volumes don't use
6. Execute
   - docker exec -it [containerName] bash

## Usage
1. When running project with only __Dockerfile__
   - Step one
   ```docker
   docker build -t node-app
   ```
   - Step two
   ```docker
   docker run -d -p 3000:3000 -v ${pwd}:/app -v /app/node_modules --env-file ./.env --name docker-node-app node-app
   ```
2. When running project on __dev__ or __prod__ environment
   - On __production__
    ```docker
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
    ```
   - On __development__
    ```docker
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
   ```
   - To remove docker container
   ```docker
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
   ```
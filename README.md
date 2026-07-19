<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. En la raiz del proyecto ejectuar el comando 
```
yarn install
```
3. En la raiz del proyecto ejecutar:
```
docker-compose up -d 
```
4. Tener instalado Nest CLI
```
npm i -g @nestjs/cli
```
5. Levantar el API en desarrollo
```
yarn start:dev
```
6. Reconstruir base de datos
```
http://localhost:3000/api/v2/seed
```
7. Clonar el archivo __.env.template__ y renombrar como __.env__ y llenar variables de entorno

Production build

1. Crear y llenar el archivo __.env.prod__
2. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
Por defecto, docker-compose usa el archivo .env, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con
```
docker-compose -f docker-compose.prod.yaml up --build
```
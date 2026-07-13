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
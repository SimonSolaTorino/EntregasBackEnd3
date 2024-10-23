#imagen de Node.js
FROM node:18
#ruta al proyecto
WORKDIR /app
#copia de los json
COPY package*.json ./
#dependencias
RUN npm install
#copia del codigo
COPY . .
#exposicion del puerto
EXPOSE 8080
#comando para ejecutar el proyecto
CMD ["npm", "start"]
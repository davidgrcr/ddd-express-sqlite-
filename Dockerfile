# Usa una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias dentro del contenedor
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "index.js"]

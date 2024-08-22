# Use uma imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código da aplicação para o diretório de trabalho
COPY . .

# Compile o código, se necessário (apenas para projetos que precisam ser compilados, como TypeScript)
# RUN npm run build

# Exponha a porta que o aplicativo irá rodar (por exemplo, 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
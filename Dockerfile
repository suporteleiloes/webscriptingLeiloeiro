# Define a imagem base
FROM node:18.16.0

# Define a zona para BR/SP
RUN ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

# Cria o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração e dependências
COPY package*.json ./
COPY .env ./
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta utilizada pela aplicação
EXPOSE 3000

# Define o comando a ser executado quando o contêiner iniciar
WORKDIR /app

# Adiciona o comando para executar o script AD.js antes de npm start
CMD ["bash", "-c", "npm run start"]
# Web Scraping

### Instalação via Docker Compose


1. Criar uma imagem Docker para o projeto "Web Scraping". Certifique-se de ter o Docker instalado no seu sistema. Execute o seguinte comando:
```
docker-compose build
```

2. Por fim, execute o contêiner Docker usando o comando abaixo:
```
docker-compose up -d
```

### Instalação via Docker


1. Criar uma imagem Docker para o projeto "Web Scraping". Certifique-se de ter o Docker instalado no seu sistema. Execute o seguinte comando:
```
sudo docker build -t webscraping -f Dockerfile .
```

2. Por fim, execute o contêiner Docker usando o comando abaixo:
```
sudo docker run --name webscraping -d -p 3000:3000 webscraping
```

### Instalação via Node.js


1. Na versão 18.16.1
```
npm install
```

2. Execute
```
npm run start
```

const XLSX = require('xlsx');
const json = [
  {
    "matricula": "007/1995",
    "nome": "Josias Rodrigues da Silva Filho",
    "endereco": "Rua continental, nº 2454, Bairro Flodoaldo Pontes Pinto, Porto Velho – RO",
    "telefones": [
      "(69) 98403-1645",
      "(69) 9987-2662"
    ],
    "emails": [
      "jr_leiloes@hotmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "008/1995",
    "nome": "Vladmir Oliani",
    "endereco": "Rua Prudente de Moraes, 2613, sala 05, centro, Porto Velho-RO,  Cep: 76.801-040",
    "telefones": [
      "(69) 99981-1985",
      "3221-8079"
    ],
    "emails": [
      "vladmiroliani@hotmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "010/2006",
    "nome": "Vera Lúcia Aguiar de Sousa",
    "endereco": "Rua José Vieira Caúla, nº 3771, Bairro Embratel, CEP: 76.820-773, Porto Velho – RO",
    "telefones": [
      "(69) 99215-0509"
    ],
    "emails": [
      "sousa.veralucia@hotmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "013/2008",
    "nome": "Fábio de Mello Andrade",
    "endereco": "Avenida Jorge Teixeira , nº 2915, Bairro Liberdade, Porto Velho – RO",
    "telefones": [
      "(69) 98407-2000"
    ],
    "emails": null,
    "site": "",
    "situacao": 0
  },
  {
    "matricula": "015/2009",
    "nome": "Evanilde Aquino Pimentel",
    "endereco": "Rua João Pimenta, 1093, Jardim Aurélio Bernardi, Ji-Paraná/RO, CEP 76.907-464",
    "telefones": [
      "69 98133-1688"
    ],
    "emails": [
      "contato@rondonialeiloes.com.br"
    ],
    "site": "https",
    "situacao": 1
  },
  {
    "matricula": "018/2013",
    "nome": "Vera Maria Aguiar de Sousa",
    "endereco": "Rua José Vieira Caúla, nº 3771, Bairro Embratel, CEP: 76.820-773, Porto Velho – RO",
    "telefones": [
      "(69) 99373-9686"
    ],
    "emails": [
      "sousa.veramaria@hotmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "019/2013",
    "nome": "Francisco Portela Aguiar",
    "endereco": "",
    "telefones": [
      "(69) 99268-5003"
    ],
    "emails": [
      "portela.ro@hotmail.com",
      "portelaleiloes@gmail.com"
    ],
    "site": "www.portelaleiloes.com.br",
    "situacao": 1
  },
  {
    "matricula": "021/2017",
    "nome": "Deonizia Kiratch",
    "endereco": "",
    "telefones": [
      "(69) 99991-8800"
    ],
    "emails": [
      "contato@deonizialeiloes.com.br"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "022/2017",
    "nome": "Ana Carolina Zaninetti Rosa",
    "endereco": "Rua João Pimenta, nº 1093, Jd Aurélio Bernardi, Ji-Paraná/RO.",
    "telefones": [
      "69 98136-0056"
    ],
    "emails": [
      "leiloes.rondonia@gmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "023/2018",
    "nome": "Flávia Laís Costa Nascimento",
    "endereco": "Rua Roberto de Souza, nº 2181, Bairro Nova Porto Velho – RO",
    "telefones": [
      "(69) 98488-3774",
      "(69) 99244-3102"
    ],
    "emails": [
      "flavialcnascimento@gmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "024/2018",
    "nome": "Marcus Allain de Oliveira Barbosa",
    "endereco": "Rua Petrópolis, nº 3.181, altos – Bairro Novo Horizonte, Porto Velho – RO",
    "telefones": [
      "(69) 99229-6465"
    ],
    "emails": [
      "maleiloesro@hotmail.com"
    ],
    "site": "www.maleiloesro.com.br",
    "situacao": 1
  },
  {
    "matricula": "025/2018",
    "nome": "Harrison Lira do Nascimento",
    "endereco": "Rua Abunã, nº 1947, Galeria Lira, Sala 08, Bairro: São João Bosco, Porto Velho – RO",
    "telefones": [
      "(69) 99917-5750"
    ],
    "emails": [
      "liraleiloeiro@gmail.com"
    ],
    "site": "www.arrematerondonia.com.br",
    "situacao": 0
  },
  {
    "matricula": "026/2019",
    "nome": "PAULO SÉRGIO DE OLIVEIRA",
    "endereco": "Rua José Antônio da Silva, nº 70 – Bairro Cidade Alta, no município de Rolim de Moura, Estado de Rondônia.",
    "telefones": [
      "(69)3449-2094"
    ],
    "emails": [
      "CONTATO@TEMLEILOES.COM.BR"
    ],
    "site": "WWW.TEMLEILOES.COM.BR",
    "situacao": 1
  },
  {
    "matricula": "029/2020",
    "nome": "Patrícia Pimentel Grocoski Costa",
    "endereco": "Rua Panamá, nº 2516, Sala Comercial 03 – Bairro Embratel – CEP 76820768, Porto Velho – RO\nTelefone: (69)  99302-3330",
    "telefones": [],
    "emails": [
      "patricia@pimentelleiloes.com.br"
    ],
    "site": "www.pimentelleiloes.com.br",
    "situacao": 1
  },
  {
    "matricula": "030/2021",
    "nome": "Mariana Gouvêa Lessa",
    "endereco": "Avenida Pedro Teixeira, nº 725, Torre 3, Ap. 403, Condomínio Sky Paradise – Dom Pedro, Cep: 69.040-000, Manaus/AM",
    "telefones": [
      "(92) 98110-8299"
    ],
    "emails": [
      "gerencia.manaus@vipleiloes.net.br"
    ],
    "site": "www.vipleiloes.com.br",
    "situacao": 1
  },
  {
    "matricula": "031/2021",
    "nome": "Conceição de Maria Costa Lopes",
    "endereco": "Avenida Prefeito Chiquilito Erse, nº 642, Bairro Lagoa, Cep: 76.812-034, Porto Velho/RO",
    "telefones": [
      "(98) 98281-1111"
    ],
    "emails": [
      "conceicaocosta@vipleiloes.com.br"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "032/2021",
    "nome": "Maria Vanielly de Lima Honorato Portela",
    "endereco": "Rua Vicunha, nº 3643,  Bairro Conceição, Cep: 76808-384, Porto Velho/RO",
    "telefones": [
      "(69) 99277-7660",
      "(69) 98164-1111"
    ],
    "emails": [
      "vaniellyhonorato@gmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "033/2021",
    "nome": "ALEX WILLIAN HOPPE",
    "endereco": "R. Alberto Tokarski, n°11, Centro, Canoinhas/SC, CEP 89.460-070",
    "telefones": [
      "(47) 3622-5164"
    ],
    "emails": [
      "contato@hoppeleiloes.com.br"
    ],
    "site": "www.hoppeleiloes.com.br/",
    "situacao": 1
  },
  {
    "matricula": "034/2021",
    "nome": "HUGO MOREIRA PIMENTA",
    "endereco": "Av. André Araújo, 97, Cd. Fórum Business Center, sala 207, Adrianópolis, CEP: 69.057-025, Manaus/AM",
    "telefones": [
      "98110-8299"
    ],
    "emails": [
      "hugo@moreirapimenta.lel.br"
    ],
    "site": "hugopimentaleiloeiro.com.br\nhugopimentaleiloeiro.com\nhugopimentaleiloeiro.net.br\nhugopimentaleiloeiro.net\nhugopimentaleiloeiro.org",
    "situacao": 1
  },
  {
    "matricula": "035/2021",
    "nome": "EDUARDO DOS SANTOS",
    "endereco": "Rua Parecis, nº 4915 – Residencial Alto dos Parecis – CEP: 76985-010",
    "telefones": [
      "(69) 98404-5291"
    ],
    "emails": [
      "eduardo.santosvha@outlook.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "036/2022",
    "nome": "LUIZ EDUARDO NOBRE SILVEIRA NETO",
    "endereco": "Rua Itatuapé, nº. 7908 Bairro JK II Porto Velho-RO CEP: 76.829-350",
    "telefones": [
      "(69) 99202-7609"
    ],
    "emails": [
      "nobreleiloes@hotmail.com"
    ],
    "site": "",
    "situacao": 0
  },
  {
    "matricula": "037/2022",
    "nome": "MARTA SIMONE SHIOKAWA",
    "endereco": "Rua Sebastião de Oliveira, 90, Bairro Boqueirão Cep:11701-200 , Praia Grande/SP",
    "telefones": [],
    "emails": [
      "contato@mleiloes.com.br"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "038/2022",
    "nome": "BRUNO PIMENTEL ROSA",
    "endereco": "Av. Gov. Jorge Teixeira, 3986 Bloco 5 Ap 204 -Bairro: Industrial, Porto Velho/RO",
    "telefones": [
      "(69) 99976-8361"
    ],
    "emails": [
      "contato@lancevip.com.br"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "039/2022",
    "nome": "TIAGO TESSLER BLECHER",
    "endereco": "R Rua Natingui, 862 – 3º andar, Conjuntos 311 e 312, Edifício UNE, Vila Madalena, São Paulo – SP, CEP 05443-001",
    "telefones": [
      "(11) 3392-3446"
    ],
    "emails": [
      "tiago.tessler@webleiloes.com.br"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "040/2022",
    "nome": "FELIPE CEZAR SOUZA E SILVA",
    "endereco": "Rua José Vieira Caúla, Esquina com a Equador, nº 3771, Bairro: Embratel, CEP: 76.820-773Porto Velho RO\nEm frente  a Drogaria Lá Paz.",
    "telefones": [
      "(69) 99268-0027"
    ],
    "emails": [
      "leiloesaguiar@gmail.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "041/2023",
    "nome": "DAVI BORGES DE AQUINO",
    "endereco": "Avenida Paulista, nº 2421, 1º andar – Bela Vista, São Paulo/SP",
    "telefones": [
      "(11) 3230-1126"
    ],
    "emails": [
      "inscricoes@alfaleiloes.com"
    ],
    "site": "",
    "situacao": 1
  },
  {
    "matricula": "042/2023",
    "nome": "DANIEL ELIAS GARCIA",
    "endereco": "Rua Anardo Raul Garcia, 62 São Luiz, CEP 88803-495, Criciúma/SC",
    "telefones": [
      "(48) 99138-6012"
    ],
    "emails": [
      "contato@dgleiloes.com.br"
    ],
    "site": "",
    "situacao": 1
  }
];
const uf = 'ro'

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(json);

XLSX.utils.book_append_sheet(workbook, worksheet, 'Leiloeiros');

XLSX.writeFile(workbook, `./planilhas/${uf}.xlsx`);

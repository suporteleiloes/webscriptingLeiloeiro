const juntas = [
  { sigla: "rj", nome: "jucerja", url: "https://www.jucerja.rj.gov.br/AuxiliaresComercio/Leiloeiros", type:"web" },
  { sigla: "rn", nome: "jucern", url: "http://www.jucern.rn.gov.br/Conteudo.asp?TRAN=ITEM&TARG=8695&ACT=&PAGE=0&PARM=&LBL=Leiloeiros", type:"web" },
  { sigla: "ro", nome: "jucer", url: "https://rondonia.ro.gov.br/jucer/lista-de-leiloeiros-oficiais/", type:"web" },
  { sigla: "rr", nome: "jucerr", url: "https://jucerr.rr.gov.br/servicos/", type:"web" },
  { sigla: "rs", nome: "jucisrs", url: "https://jucisrs.rs.gov.br/upload/arquivos/202304/03134743-publicacao-anual-leiloeiros-2023.pdf", type:"pdf" },
  { sigla: "sc", nome: "jucesc", url: "https://leiloeiros.jucesc.sc.gov.br/site/", type:"web" },
  { sigla: "se", nome: "jucese", url: "https://www.jucese.se.gov.br/index.php/leiloeiros/", type:"web" },
  { sigla: "sp", nome: "jucesp", url: "http://www.institucional.jucesp.sp.gov.br/consultaLeilao.html", type:"web" },
  { sigla: "to", nome: "jucetins", url: "https://www.to.gov.br/jucetins/leiloeiros/152aezl6blm0", type:"web" }
];

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const data = {};

// Função para fazer a solicitação HTTP e obter o HTML da página
async function getHtml() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    return null;
  }
}

function webScrape(html) {
  const $ = cheerio.load(html);
  const paragraphs = [];

  // Aqui, selecione o elemento HTML correto (por exemplo, `<p>`) e extraia o texto do parágrafo.
  $('strong').each((index, element) => {
    paragraphs.push($(element).text());
  });

  return paragraphs;
}

// Função principal para executar o webscraping e salvar os dados em um arquivo JSON
async function main() {
  const html = await getHtml();

  if (html) {
    const paragraphs = webScrape(html);

    const jsonData = JSON.stringify({ paragraphs }, null, 2);

    // Salvar o JSON em um arquivo (por exemplo, "data.json").
    fs.writeFile('data.json', jsonData, {encoding: 'utf8'}, (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo:', err);
      } else {
        console.log('Dados salvos em "data.json" com sucesso!');
      }
    });
  }
}

main();

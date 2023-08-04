const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const data = {};

// Dados de url de cada junta
const juntas = [
  { sigla: "ac", nome: "juceac", url: "http://juceac.acre.gov.br/leiloeiros/", type:"web" },
  { sigla: "al", nome: "juceal", url: "http://juceal.al.gov.br/servicos/leiloeiros", type:"web" },
  { sigla: "am", nome: "jucea", url: "http://www.jucea.am.gov.br/leiloeiros/", type:"web" },
  { sigla: "ap", nome: "jucap", url: "http://www.jucap.ap.gov.br/leiloeiros", type:"web" },
  { sigla: "ba", nome: "juceb", url: "http://www.juceb.ba.gov.br/home/matriculas-e-carteira-profissional/", type:"web" },
  { sigla: "ce", nome: "jucec", url: "https://www.jucec.ce.gov.br/leiloeiros/", type:"web" },
  { sigla: "df", nome: "jucis", url: "https://jucis.df.gov.br/leiloeiros/", type:"web" },
  { sigla: "es", nome: "jucees", url: "https://jucees.es.gov.br/Media/Jucees/Tradutores%20e%20Leiloeiros/Leiloeiro/Rela%C3%A7%C3%A3o%20de%20Leiloeiros%20Regulares.pdf", type:"pdf" },
  { sigla: "go", nome: "juceg", url: "https://www.juceg.go.gov.br/orientacoes-e-modelos/leiloeiros.html", type:"web" },
  { sigla: "ma", nome: "jucema", url: "http://portal.jucema.ma.gov.br/pagina/11", type:"web" },
  { sigla: "mg", nome: "jucemg", url: "https://jucemg.mg.gov.br/pagina/140/leiloeiros-ordem-alfabetica", type:"web" },
  { sigla: "ms", nome: "jucems", url: "http://www.jucems.ms.gov.br/servicos/controles-especiais/leiloeiros", type:"web" },
  { sigla: "mt", nome: "jucemat", url: "http://www.jucemat.mt.gov.br/leiloeiros", type:"web" },
  { sigla: "pa", nome: "jucepa", url: "https://www.jucepa.pa.gov.br/node/135", type:"web" },
  { sigla: "pb", nome: "jucep", url: "https://jucep.pb.gov.br/contatos/leiloeiros/leiloeiros", type:"web" },
  { sigla: "pe", nome: "jucepe", url: "https://portal.jucepe.pe.gov.br/leiloeiros" },
  { sigla: "pi", nome: "jucepi", url: "https://portal.pi.gov.br/jucepi/leiloeiro-oficial/", type:"web" },
  { sigla: "pr", nome: "jucepar", url: "https://www.juntacomercial.pr.gov.br/Pagina/LEILOEIROS-OFICIAIS-HABILITADOS", type:"web" },
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
    fs.writeFile('data.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo:', err);
      } else {
        console.log('Dados salvos em "data.json" com sucesso!');
      }
    });
  }
}

main();

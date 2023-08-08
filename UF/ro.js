const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const url = 'https://rondonia.ro.gov.br/jucer/lista-de-leiloeiros-oficiais/'

// Função para fazer a solicitação HTTP e obter o HTML da página
async function getHtml() {
  const {data: html} = await axios.get(url);
  return html;
}

getHtml().then((res) => {
   const $ = cheerio.load(res);
   
   const arrayNomes = []
   $('div.entry strong').each((i, strong) => {
      const strongText = $(strong).text().trim();
      
      const strongArray = strongText.split(' ');
      if (strongArray.length <= 6 ) {
         if(!strongText.toLowerCase().includes('regular') && !strongText.includes('@')){
            if(strongText.length > 1){
               arrayNomes.push(strongText)            
            }
         }
      }
   })

   const arrayMassaroca = [];
   $('div.entry dd').each((i, em) => {
         const texto = $(em).text().trim();
         arrayMassaroca.push(texto);
   });

   const data = arrayMassaroca;
   const leiloeiros = [];
   let currentLeiloeiro = null;
   let nomeIndex = 0;

   for (const item of data) {
   if (item.includes('Matr') && item.includes('\n')) {
      continue; // Ignorar itens que contenham 'Matr' e '\n'
   }

   if (item.startsWith("Matrícula:")) {
      const matricula = item.match(/\d+\/\d+/)[0];
      const nome = arrayNomes[nomeIndex];
      nomeIndex++;
      currentLeiloeiro = {
         matricula: matricula,
         nome: nome,
         endereco: "",
         telefones: [],
         emails: [],
         site: "",
         situacao: 1,
      };
      leiloeiros.push(currentLeiloeiro);
   } else if (item.startsWith("Endereço:")) {
      currentLeiloeiro.endereco = item.replace("Endereço:", "").trim();
   } else if (item.startsWith("Telefone:")) {
      const phones = item.match(/\(?\d+\)?\s?\d+-\d+/g);
      currentLeiloeiro.telefones = phones;
   } else if (item.startsWith("E-mail:")) {
      const emails = item.match(/[\w\.-]+@[\w\.-]+/g);
      currentLeiloeiro.emails = emails;
   } else if (/Site:/i.test(item) || /Sítio:/i.test(item)) {
      const parts = item.split(":");
      if (parts[1]) {
         currentLeiloeiro.site = parts[1].trim();
      }
   } else if (item.startsWith("Situação:")) {
      if (item.includes("IRREGULAR") || item.includes("Afastado")) {
         currentLeiloeiro.situacao = 0;
      }
   }
   }

   fs.writeFile('../json/ro.json', JSON.stringify(leiloeiros, null, 2), {encoding: "utf-8"} ,(err) => {
      if(err) throw err;
      console.log('webScrape successful')
   });
})
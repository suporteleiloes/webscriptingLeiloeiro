const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const url = 'http://www.jucern.rn.gov.br/Conteudo.asp?TRAN=ITEM&TARG=8695&ACT=&PAGE=0&PARM=&LBL=Leiloeiros'

// Função para fazer a solicitação HTTP e obter o HTML da página
async function getHtml() {
  const {data: html} = await axios.get(url);
  return html;
}

getHtml().then((res) => {
   const $ = cheerio.load(res);
   const arrayP = [];
   const arrayS = []
   const leiloeiros = [];

   $('#P000 p').each((i, p) => {
      const text = $(p).text().trim();

      if(i > 19 && text.length > 1){
         arrayP.push(text)
      }
   })

   $('strong').each((i, s) => {
      const text = $(s).text().trim();

      if(i > 6){
         arrayS.push(text)
      }
   })

   const array = arrayP.filter((element) => !arrayS.includes(element));

   const fragmentos = [];
   let string = '';

   array.forEach((item, index) => {
      if (item.slice(0, 5) === 'Nomea' && (index === array.length - 1 || array[index+1].slice(0, 5) === 'Nomea')) {
         fragmentos.push(item);
      } else {
         string += `${item} \n`;
         if(array[index+1].slice(0, 5) === 'Nomea'){
            fragmentos.push(string);
            string = '';
         }
      }
   });

   function getPessoas() {
      const array = [];

      fragmentos.forEach((frag, i) => {
         array.push(`nome: ${arrayS[i]}\n${frag}`)
      })

      return array;
   }

   const pessoas = getPessoas();
   console.log(pessoas)

   fs.writeFile('../data.json', JSON.stringify(fragmentos, null, 2), {encoding: "utf-8"} ,(err) => {
      if(err) throw err;
      console.log('webScrape successful')
   })
   
})
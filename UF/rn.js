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

   // Array de todas as informacoes menos o nome
   const arrayP = [];

   // Array só de nomes de leiloeiros
   const arrayS = []

   // Aqui é porque os dados desse antonio são especiais, o maluco que fez o site 
   // colocou só ele diferentao e acabou quebrando todo o codigo mais tarde porque eu nao havia percebido
   const antonioText = $('div:nth-child(96)').text().trim();

   $('#P000 p').each((i, p) => {
      // text recebe o text do paragrafo
      const text = $(p).text().trim();

      // Obs: imaginando que a div #P000 é um array e os itens são paragrafos, o paragrafo 20 é o primeiro que contém info de um leiloeiro
      if(i > 19 && text.length > 1){
         arrayP.push(text)
      }
   })

   // aqui eu apenas peguei os nomes dos leiloeiros que tem em comum a tag strong e mandei todos pro array designado
   $('strong').each((i, s) => {
      const text = $(s).text().trim();

      if(i > 6){
         arrayS.push(text)
      }
   })

   // Esse array contém todos os dados de todos os leiloeiros mas sem os nomes
   const array = arrayP.filter((element) => !arrayS.includes(element));

   const fragmentos = [];
   let string = '';

   // a contante em todos os dados é a nomeação, todo leiloeiro aqui tem uma. Portanto, eu percorri o array que só possuía os dados e estava mandando pro array 'fragmentos' todos os valores que começavam com 'Nomea' e os que não começavam eu concatenava no último item e mandava pro 'fragmentos' quando o próximo item começasse com 'Nomea'
   array.forEach((item, index) => {
      if (item.slice(0, 5) === 'Nomea' && (index === array.length - 1 || array[index+1].slice(0, 5) === 'Nomea')) {
         fragmentos.push(item);
      } else {
         string += `${item}\n`;
         if(array[index+1].slice(0, 5) === 'Nomea' || index === array.length - 1 ){
            fragmentos.push(string);
            string = '';
         }
      }
   });

   // Essa é a função que vai retornar o objeto formatado
   function format(frags){
      // Aqui eu encontrei um jeito de inserir o antonio no meio dessa galera sem quebrar a ordem, pois bagunçava todos os dados
      const array = [];
      let count = 1;

      arrayS.forEach((leiloeiro, i) => {
         if(leiloeiro === 'Antônio Romero Ferreira da Silva'){
            array.push(`nome: ${leiloeiro}\n${antonioText}`);
            count = 0;
         }else{
            if(count !== 0){
               count++
            }

            array.push(`nome: ${leiloeiro}\n${count ? frags[i] : frags[i-1]}`)
         }
      })

      // daqui pra baixo é só manipulando os dados, geramente criando arrays de arrays, etc 
      let pessoas = [];

      array.forEach((leilo, i) => {
         pessoas.push([...leilo.split('\n')]);
      })
      
      pessoas = pessoas.map((pessoa, i) => {
         return pessoa.map((prop) => {
            return e = prop.split(': ');
         });
      });

      const pessoasClone = [...pessoas];
      pessoas = [];
      pessoasClone.forEach((pessoa) => {
         if(pessoa[pessoa.length -1][0]){
            pessoas.push(pessoa)
         }else{
            const array = [...pessoa];
            array.pop()
            pessoas.push(array)
         }
      })

      // pessoas.forEach((pessoa, iPessoa) => {
      //    pessoa.forEach((prop, iProp) => {
      //       if(prop[0] === 'nome'){
      //          if(countLeilo){
      //             leiloeiros.push(leiloeiro);
      //             leiloeiro = [];
      //             suspenso = 0;
      //             countLeilo = 0;
      //          }

      //          countLeilo++
      //          const arrayNome = prop[1].split(' - ');
      //          if(arrayNome[1] && (arrayNome[1].toLowerCase() === 'suspenso' || arrayNome[1].toLowerCase() === 'suspensa')){
      //             suspenso = 1
      //             leiloeiro.push(['nome', arrayNome[0]])
      //          }else{
      //             leiloeiro.push(['nome', prop[1]]);
      //          }

      //          if(iPessoa === pessoas.length - 1){
      //             leiloeiros.push(leiloeiro);
      //          }
      //       }

      //       if(prop[0].toLowerCase().slice(0,4) === 'matr'){
      //          if(prop.length === 1){
      //             const array = prop[0].split('nº');
      //             leiloeiro.push(['matricula', array[1].trim()]);
      //          }else{
      //             leiloeiro.push(['matricula', prop[1].trim()])
      //          }
      //       }

      //       let endereco = '';
      //       const rascunho = [];
      //       if(prop[0].toLowerCase().slice(0, 3) === 'end'){
      //          const rascunho2 = [...prop];
      //          rascunho2.shift();
      //          rascunho.push('endereco');

      //          rascunho2.forEach((str) => {
      //             endereco += ` ${str}`
      //          })
      //       }

      //       if(prop[0].toLowerCase().includes('cep')){
      //          if(prop.length === 1){
      //             const arrayCep = prop[0].toLowerCase().split('cep');
      //             arrayCep.forEach((str) => {
      //                endereco += ` ${arrayCep[0]} CEP ${arrayCep[1]}`
      //             })
      //          }else{
      //             prop.forEach((str) => {
      //                endereco += ` ${str}`
      //             })
      //          }
      //       }
            
      //       if(prop[0].toLowerCase().slice(0,3) === 'tel'){
      //          rascunho.push(endereco);

      //          if(prop.length === 1){
      //             const arrayTel = prop.split(':')
      //          }
      //       }
      //    })

      // })

      const rawData = [
         // ... (seus dados aqui)
       ];
       
       const data = pessoas;

       const cepPatterns = [
         /\d{6}-\d{3}/,
         /\d{5}-\d{3}/,
         /\d{5}\.\d{3}-\d{2}/,
         /\d{5}\.\d{3}-\d{3}/,
         /\d{2}\.\d{3}-\d{3}/,
         /\d{6}\.\d{3}-\d{2}/,
         /\d{6}\.\d{3}-\d{3}/,
         /\d{5}\.\d{2}-\d{3}/,
         /\d{6}-\d{3}\./,
         /\d{5}-\d{3}\./,
         /\d{5}\.\d{3}-\d{2}\./,
         /\d{5}\.\d{3}-\d{3}\./,
         /\d{2}\.\d{3}-\d{3}\./,
         /\d{6}\.\d{3}-\d{2}\./,
         /\d{6}\.\d{3}-\d{3}\./,
         /\d{5}\.\d{2}-\d{3}\./
       ];
       
       const result = data.map(personData => {
         const personInfo = {
           suspenso: false,
           nome: "",
           matricula: null,
           cep: null,
           email: null,
           telefones: [],
           site: null
         };
       
         for (const item of personData) {
            const [key, value] = item;
            const lowerKey = key.toLowerCase();
            
            if (lowerKey.includes('mail')) {
               if(value){
                   personInfo.email = value;
               }else{
                  personInfo.email = item[0].trim().split(': ')[1]
               }
           }

            if (!Array.isArray(item) || item.length !== 2) {
               continue; // Pula itens inválidos
            }

            const lowerValue = value.toLowerCase();
       
           if (lowerKey === "nome") {
             personInfo.nome = value;
             personInfo.suspenso = lowerValue.includes("suspenso");
           } else if (lowerKey.includes("matr")) {
             if (value.length === 1 && value[0].includes("aria ")) {
               const matriculaArray = value[0].split("aria ")[1].split(" ");
               if (matriculaArray.length > 1) {
                 personInfo.matricula = matriculaArray[1];
               }
             } else {
               personInfo.matricula = value;
             }
           } else if (lowerKey.includes("cep")) {
             for (const pattern of cepPatterns) {
               const cepMatch = value.match(pattern);
               if (cepMatch) {
                 personInfo.cep = cepMatch[0].replace(/\.|-/g, "");
                 break;
               }
             }
           } else if (lowerKey.includes("tel")) {
             if (value.includes(";")) {
               personInfo.telefones = value.split(";").map(item => item.trim());
             } else {
               personInfo.telefones.push(value.trim());
             }
           } else if (lowerKey.includes("site")) {
             if (value.includes("www") || value.includes("http")) {
               personInfo.site = value;
             }
           } else if (lowerKey.startsWith("end")) {
             for (const subValue of value) {
               for (const pattern of cepPatterns) {
                 const cepMatch = subValue.match(pattern);
                 if (cepMatch) {
                   personInfo.cep = cepMatch[0].replace(/\.|-/g, "");
                   break;
                 }
               }
             }
           }
           
         }
       
         return personInfo;
       })
       
      return result
   }

   fs.writeFile('../data.json', JSON.stringify(format(fragmentos), null, 2), {encoding: "utf-8"} ,(err) => {
      if(err) throw err;
      console.log('webScrape successful')
   })
  

})
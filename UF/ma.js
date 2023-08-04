const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

let leiloeiro = {

    nome: "",
    matricula: "",
    dataPosse: "",
    endereco: "",
    telefones: "",
    situacao: 1

};

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get('http://portal.jucema.ma.gov.br/pagina/11');
    
    // Aguarda o carregamento da página e procura xpath=//div[5]/div
    await driver.wait(until.elementLocated(By.xpath("//div[5]/div")), 10000);
    let leiloeiros = await driver.findElements(By.xpath("//div[5]/div"));

    // Captura o HTML da variavel leiloeiros e transforma em string
    let texto = await leiloeiros[0].getAttribute('innerHTML');

    async function MA(texto) {
        const leiloeiros = [];
        const linhas = texto.split('\n');
        let leiloeiro = null;
      
        for (let i = 0; i < linhas.length; i++) {
          const linha = linhas[i].trim();
          if (linha.includes('Matrícula')) {
            if (leiloeiro) leiloeiros.push(leiloeiro);
            leiloeiro = {
              nome: linhas[i - 1].trim(),
              matricula: linha.split('Matrícula')[1].split('–')[0].trim(),
              dataPosse: linha.split('Em')[1].trim(),
              endereco: '',
              telefones: '',
              situacao: 1, // Defina a situação como desejado
            };
          } else if (linha.includes('Endereço:')) {
            leiloeiro.endereco = linha.split('Endereço:')[1].trim();
          } else if (linha.includes('Contato:')) {
            leiloeiro.telefones = linha.split('Contato:')[1].trim();
          }
        }
      
        if (leiloeiro) leiloeiros.push(leiloeiro);

        // Trata o array de leiloeiros para remover os dados indesejados
        // remove <h4> e </h4> <strong> e </strong> e &nbsp;

        leiloeiros.forEach(function(leiloeiro) {
            leiloeiro.nome = leiloeiro.nome.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
            leiloeiro.dataPosse = leiloeiro.dataPosse.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
            leiloeiro.matricula = leiloeiro.matricula.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
            leiloeiro.endereco = leiloeiro.endereco.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
            leiloeiro.telefones = leiloeiro.telefones.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
        });

      
        return leiloeiros;
      }

      const teste = MA(texto);
        console.log(teste);


        module.exports = {
            MA
        }
    

  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    await driver.quit();
  }
})();




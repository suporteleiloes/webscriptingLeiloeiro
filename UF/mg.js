const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function MG() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://jucemg.mg.gov.br/pagina/140/leiloeiros-ordem-alfabetica');
           
            
            // Aguarda o carregamento da página e procura xpath=//article/section
            await driver.wait(until.elementLocated(By.xpath("//article/section")), 10000);
            let dados = await driver.findElements(By.xpath("//article/section"));
                
            // Captura o HTML da variavel leiloeiros e transforma em string
            let texto = await dados[0].getAttribute('innerHTML');
            try {

            const leiloeiros = [];
            const linhas = texto.split('<br>');
            let leiloeiro = null;

            for (let i = 0; i < linhas.length; i++) {
                const linha = linhas[i].trim();
                
                // Vai definir o leiloeiro se encontrar a tag <p> no texto, logo cada leiloeiro é definido por uma tag <p> no início  e uma tag </p> no final
                
                if (linha.includes('<p>')) {
                    if (leiloeiro) leiloeiros.push(leiloeiro);
                    leiloeiro = {
                        nome: linha.split('<strong>')[1].split('</strong>')[0],
                        matricula: '',
                        dataPosse: '',
                        endereco: '',
                        telefone: '',
                        email: '',
                        situacao: 1, // Defina a situação como desejado
                    };
                } else if (linha.includes('Matrícula')) {
                    leiloeiro.matricula = linha.split('Matrícula: ')[1].split('de')[0].trim();
                    leiloeiro.dataPosse = linha.split('de')[1].split('<br>')[0].trim();
                } else if (linha.includes('CEP')){
                    leiloeiro.endereco = linha;
                }  else if (linha.includes('Telefone:')) {
                    leiloeiro.telefone = linha.split('Telefone:')[1].trim();
                } else if (linha.includes('<a href="mailto:')) {
                    const regex = /<a href="mailto:(.*?)">/g;
                    leiloeiro.email = regex.exec(linha)[1];
                }
            }

            if (leiloeiro) leiloeiros.push(leiloeiro);

            leiloeiros.forEach(function(leiloeiro) {
                leiloeiro.nome = leiloeiro.nome.replace(/<a href="mailto:/g, '').replace(/<\/a>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                leiloeiro.dataPosse = leiloeiro.dataPosse.replace(/<a href="mailto:/g, '').replace(/<\/a>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                leiloeiro.matricula = leiloeiro.matricula.replace(/<a href="mailto:/g, '').replace(/<\/a>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                leiloeiro.endereco = leiloeiro.endereco.replace(/<a href="mailto:/g, '').replace(/<\/a>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                leiloeiro.telefone = leiloeiro.telefone.replace(/<a href="mailto:/g, '').replace(/<\/a>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                if (leiloeiro.email) {
                    leiloeiro.email = leiloeiro.email.replace(/<a href="mailto:/g, '').replace(/<\/a>/g, '').replace(/">/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                }
            });

            // return texto; 
            return leiloeiros;
        }
        catch (e) {
            console.log(e);
            await driver.quit();
        }
        finally {
            await driver.quit();
        }
    }

module.exports = MG;

/* const chamada = MG();
chamada.then(function(result) {
  const json = JSON.stringify(result, null, 2);
    // console.log(json);
    // Transforma em CSV
    const csv = require('json2csv').parse(result); 
    console.log(csv);

 }
 );
 */
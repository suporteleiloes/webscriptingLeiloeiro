const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function RO() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://rondonia.ro.gov.br/jucer/lista-de-leiloeiros-oficiais/');
       

            try {
                
                await driver.wait(until.elementLocated(By.xpath("//div[@class='entry mt10']")), 10000);
                let base = await driver.findElements(By.xpath("//div[@class='entry mt10']"));

                let html = await base[0].getAttribute('innerHTML');
                let dados = html.split("<hr>");
                let contador = dados.length;

                let leiloeiros = [];
                let leiloeiro = null;

              for (let i = 1; i < contador; i++) {
                    let texto = dados[i];
        
                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    nome = texto.split('<strong>')[1].split('</strong>')[0];

                    matricula = texto.split('Matrícula:')[1].split('</em>')[0];
                    matricula = matricula.replace(/<[^>]*>?/gm, '');
                    matricula = matricula.trim();

                    dataPosse = texto.split('posse:')[1].split('</em>')[0];
                    dataPosse = dataPosse.replace(/<[^>]*>?/gm, '');
                    dataPosse = dataPosse.trim();

                    endereco = texto.split('Endereço:')[1].split('</em>')[0];
                    endereco = endereco.replace(/<[^>]*>?/gm, '');
                    endereco = endereco.trim();

                    if(texto.includes('Telefone')){
                    telefone = texto.split('Telefone')[1].split('</em>')[0];
                    telefone = telefone.replace(/:/g, " ");
                    telefone = telefone.replace(/<[^>]*>?/gm, '');
                    telefone = telefone.replace(/&nbsp;/g, "");
                    telefone = telefone.trim();
                    }

                    if(texto.includes('mail')){
                        email = texto.split('-mail')[1].split('</em>')[0];
                        email = email.replace(/&nbsp;/g, "");
                        if (email.includes('mailto:')){
                            email = email.split('mailto:')[1].split('\"')[0];
                        }
                        email = email.replace(/:/g, " ");
                        email = email.replace(/<[^>]*>?/gm, '');
                        email = email.trim();
                        }

                    if(!texto.includes('REGULAR') || texto.includes('IRREGULAR')){
                        situacao = 0;
                    }

                 

                      // Constrói o objeto
     leiloeiro = {
        nome: nome,
        matricula: matricula,
        dataPosse: dataPosse,
        endereco: endereco,
        telefone: telefone,
        email: email,
        situacao: situacao
    };

                    // Adiciona o objeto no array
                     leiloeiros.push(leiloeiro); 
                } 

                /* const leiloeiro = {
  nome: '',
  matricula: '',
  dataPosse: '',
  endereco: '',
  telefone: '',
  email: '',
  situacao: 1
}; */
    
                
   

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

 
module.exports = RO;


/* const chamada = RO();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); 
 */
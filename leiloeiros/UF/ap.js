const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function AP() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('http://www.jucap.ap.gov.br/leiloeiros');
       
            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div/main/div/div[2]/div/div")), 10000);
                let base = await driver.findElements(By.xpath("/html/body/div/main/div/div[2]/div/div//div"));
       
                let leiloeiros = [];
                let leiloeiro = null;

                for (let i = 0; i < base.length; i++) {

                    let split = await base[i].getAttribute('innerHTML');
                    split = split.split('<h4 class="text-primary">');
                    let contador = split.length;

                    for (let j = 1; j < contador; j++) {
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    nome = split[j].split('</i>')[1].split('</h4>')[0].trim();
                    matricula = split[j].split('cula:')[1].split('<br>')[0].trim();
                    endereco = split[j].split('reço:')[1].split('<br>')[0].trim();
                    telefone = split[j].split('tato')[1].split('<br>')[0].trim();
                    telefone = telefone.split(':')[1].trim();
                    email = split[j].split('mail:')[1].split('<br>')[0].trim();

                    leiloeiro = {
                        nome: nome,
                        matricula: matricula,
                        dataPosse: dataPosse,
                        endereco: endereco,
                        telefone: telefone,
site: site,
                        email: email,
                        situacao: situacao,
                        uf: 'AP'
                    };
                
                    leiloeiros.push(leiloeiro);
                }      

                    }
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

 
module.exports = AP;


/* const chamada = AP();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );   */
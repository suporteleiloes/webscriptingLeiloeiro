const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function DF() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://jucis.df.gov.br/leiloeiros/');
       
            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div[8]/div/div/div/div[2]")), 10000);
                let base = await driver.findElements(By.xpath("/html/body/div[8]/div/div/div/div[2]"));
                let html = await base[0].getAttribute('innerHTML')
                html = html.split('<p>LISTA DE LEILOEIROS 2023<br>')[1];
                // separa os dados "<p>&nbsp;</p>"
                html = html.split('<p>&nbsp;</p>');

                let leiloeiros = [];
                let leiloeiro = null;

                for (let i = 0; i < html.length; i++) {

                    let dados = html[i];

                    if(dados.includes('cula')) {
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 0;
                    let matricula = '';
                    let dataPosse = '';

                    nome = dados.split('</p>')[0].trim() || dados.split('<br>')[0].trim();
                    nome = nome.replace(/&nbsp;/g, '').replace(/\./g, '').replace(/\d/g, '').replace(/<.*?>/g, '').trim();
                    nome = nome.split('\n')[0].trim();
                    nome = nome.trim();

                    matricula = dados.split('cula:')[1].split('</p>')[0].trim();
              
                    if(dados.includes('cial:')) {
                    endereco = dados.split('cial:')[1].split('</p>')[0].trim()
                    } else if (dados.includes('reço:')) {
                    endereco = dados.split('reço:')[1].split('</p>')[0].trim();
                    }
                    endereco = endereco.replace(/&nbsp;/g, '').trim();
                    endereco = endereco.split('\n')[0].trim();
                    endereco = endereco.split('Site:')[0].trim();
                    endereco = endereco.trim();

                    if(dados.includes('fones:')) {
                    telefone = dados.split('fones:')[1].split('</p>')[0].trim();
                    } else if (dados.includes('fone:')) {
                    telefone = dados.split('fone:')[1].split('</p>')[0].trim();
                    }
                    telefone = telefone.split('Site:')[0].trim();
                    
                    if(dados.includes('Site:')) {
                    site = dados.split('Site:')[1].split('</p>')[0].trim();
                    site = site.replace(/&nbsp;/g, '').trim();
                    }

                    if(dados.includes('mail:')) {
                    email = dados.split('mail:')[1].split('</p>')[0].trim();
                    email = email.split('Site:')[0].trim();
                    email = email.replace(/&nbsp;/g, '').trim();
                    } else if (dados.includes('mails:')) {
                    email = dados.split('mails:')[1].split('</p>')[0].trim();
                    email = email.split('Site:')[0].trim();
                    email = email.replace(/&nbsp;/g, '').trim();
                    }

                    if(dados.includes('Regular')) {
                    situacao = 1;
                    }
               
                    leiloeiro = {
                        nome: nome,
                        matricula: matricula,
                        dataPosse: dataPosse,
                        endereco: endereco,
                        telefone: telefone,
site: site,
                        email: email,
                        situacao: situacao,
                        uf: 'DF'
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

 
module.exports = DF;


/* const chamada = DF();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); */
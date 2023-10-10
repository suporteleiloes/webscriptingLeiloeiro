const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function AL() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('http://juceal.al.gov.br/servicos/leiloeiros');
       
            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div/section[3]/div/div/div[1]/div/article/div[2]")), 10000);
                let base = await driver.findElements(By.xpath("/html/body/div[1]/div/section[3]/div/div/div[1]/div/article/div[2]"));
       
                let leiloeiros = [];
                let leiloeiro = null;

                for (let i = 0; i < base.length; i++) {

                    let split = await base[i].getAttribute('innerHTML');
                    split = split.split('<p>&nbsp;</p>');
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

                    if(split[j].includes('<p><strong>')) {
                    nome = split[j].split('<p><strong>')[1].split('</p>')[0].trim();
                    nome = nome.replace(/<.*?>/g, '').trim();
                    if(nome.includes('(')) {
                        nome = nome.split('(')[0].trim();
                    }

                        if(split[j].includes('cula')) {
                            matricula = split[j].split('cula')[1].split('</p>')[0].trim();
                            matricula = matricula.replace(/<.*?>/g, '').replace(/&nbsp;/g, '').replace(/:/g, '').trim();
                        }

                        if(split[j].includes('Posse')) {
                            dataPosse = split[j].split('Posse')[1].split('</p>')[0].trim();
                            dataPosse = dataPosse.replace(/<.*?>/g, '').replace(/&nbsp;/g, '').replace(/:/g, '').trim();
                        }

                        if(split[j].includes('www')) {
                            site = split[j].split('www.')[1].split('"')[0].trim();
                            site = site.replace(/<.*?>/g, '').replace(/&nbsp;/g, '').replace(/:/g, '').trim();
                            if(site.includes('\n')) {
                                site = site.split('\n')[0].trim();
                            } else if (site.includes('/')) {
                                site = site.split('/')[0].trim();
                            }
                        }

                        if(split[j].includes('mailto:')) {
                            email = split[j].split('mailto:')[1].split('"')[0].trim();
                            email = email.replace(/<.*?>/g, '').replace(/&nbsp;/g, '').replace(/:/g, '').trim();
                            if(email.includes('\n')) {
                                email = email.split('\n')[0].trim();
                            }
                        }

                        if(split[j].includes('Fone')) {
                            telefone = split[j].split('fone')[1].split('</p>')[0].trim();
                            telefone = telefone.replace(/<.*?>/g, '').replace(/&nbsp;/g, '').replace(/:/g, '').trim();
                            if(telefone.includes('\n')) {
                                telefone = telefone.split('\n')[0].trim();
                            }
                        }

                        if(telefone.length < 1){
                            telefone = split[j].match(/\d{4,}[-]\d{4,}|\d{4,}[(]\d{4,}/g);
                            if(telefone) {
                                telefone = telefone[0];
                            }
                        }

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
                        uf: 'AL'
                    };
                
                    if(nome != ''){
                    leiloeiros.push(leiloeiro);
                    }
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

 
module.exports = AL;


/* const chamada = AL();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );   */
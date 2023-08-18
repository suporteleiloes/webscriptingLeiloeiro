const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function SE() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://jucese.se.gov.br/leiloeiros/');
       

            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div/article/div[2]/div[2]")), 10000);
                let main = await driver.findElements(By.xpath("/html/body/div/article/div[2]/div[2]//ul"));
                const contador = main.length;
                let leiloeiros = [];
                let leiloeiro = null;
               
              for (let i = 0; i < contador; i++) {

                    let html = await main[i].getAttribute('innerHTML');
                 
                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    if(html.includes('<li><strong>') && !html.includes('Tutorial') && !html.includes('jucese')){
                    nome = html.split('<li><strong>')[1].split('</strong>')[0].trim();
                        if(nome.includes('–')){
                    nome = nome.split('–')[1].trim();
                        } else if (nome.includes('º')){
                    nome = nome.split('º')[1].trim();
                     }
                     nome = nome.replace(/&nbsp;/g, ' ').trim();
                    }

                    if(html.includes('cula')){
                        matricula = html.split('cula')[1].split('\n')[0].trim();
                        matricula = matricula.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/:/g, ' ').trim();

                        if (matricula.includes('°')){
                            matricula = matricula.split('°')[1].trim();
                             } else if (matricula.includes('º')){
                                matricula = matricula.split('º')[1].trim();
                                 }  else if (matricula.includes('n.')){
                                    matricula = matricula.split('n.')[1].trim();
                                     }
                                            }

                                            if(html.includes('reço:')){
                                                endereco = html.split('reço:')[1].split('<br>')[0].trim();
                                                endereco = endereco.replace(/&nbsp;/g, ' ').trim();
                                                }

                                                if(html.includes('fones:')){
                                                    telefone = html.split('fones:')[1].split('<br>')[0].trim();
                                                    telefone = telefone.replace(/&nbsp;/g, ' ').trim();
                                                    }

                                                    if(html.includes('mail:')){
                                                        email = html.split('mail:')[1].split('<br>')[0].trim();
                                                        email = email.replace(/&nbsp;/g, ' ').trim();
                                                        }

                                                        if(html.includes('ancelamento')){
                                                            situacao = 0;
                                                            } else if(html.includes('egular')){
                                                                situacao = 1;
                                                                }
                        


     leiloeiro = {
        nome: nome,
        matricula: matricula,
        dataPosse: dataPosse,
        endereco: endereco,
        telefone: telefone,
        email: email,
        situacao: situacao
    };

            if(nome != ''){
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

 
module.exports = SE;


/* const chamada = SE();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); */
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function CE() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://www.jucec.ce.gov.br/leiloeiros/');
       
            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/main/section/div/div")), 10000);
                let base = await driver.findElements(By.xpath("/html/body/main/section/div/div"));
                let html = await base[0].getAttribute('innerHTML')
                html = html.split('<h1>Lista de Leiloeiros</h1>')[1];
                html = html.split('<p>&nbsp;</p>');
                


                let leiloeiros = [];
                let leiloeiro = null;

                for (let i = 0; i < html.length; i++) {

                    let dados = html[i];
                
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    if(dados.includes('<strong>')) {
                    nome = dados.split('<strong>')[1].split('</strong>')[0].trim();
                        if(nome.includes('&nbsp;')) {
                            nome = nome.split('&nbsp;')[0].trim();
                        }

                        if(dados.includes('cula')) {
                            matricula = dados.split('cula')[1].split('</')[0].trim();
                            matricula = matricula.replace(/–/g, '').trim();
                        }
                        
                        endereco = dados.split('</strong></p>')[1].split('CEP')[0].trim();
                        endereco = endereco.replace(/<.*?>/g, '').replace(/\n/g, ' ').trim();
                        endereco = endereco.split('&nbsp;')[0].trim();

                        if(endereco.includes('Fone') || endereco.includes('E-mail') || endereco.includes('Site')) {
                            endereco = '';
                        }

                        if(dados.includes('Fone')) {
                            telefone = dados.split('Fone')[1].split('</')[0].trim();
                            telefone = telefone.replace(/:/g, '').trim();
                        }

                        if(dados.includes('E-mail')) {
                            email = dados.split('E-mail')[1].split('</')[0].trim();
                            email = email.replace(/:/g, '').replace(/<.*?>/g, '').replace(/&nbsp;/g, '').trim();
                        }

                        if(dados.includes('Site')) {
                            site = dados.split('Site')[1].split('</')[0].trim();
                            site = site.replace(/:/g, '').replace(/<.*?>/g, '').replace(/&nbsp;/g, '').trim();
                        }
                } 


                    dataPosse = dados.match(/\d{2}\/\d{2}\/\d{4}/g);
                    if(dataPosse) {
                        dataPosse = dataPosse[0];
                    } else if(dataPosse == null) {
                        dataPosse = '';
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
                        uf: 'CE'
                    };
                

                    if(leiloeiro.nome){
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

 
module.exports = CE;


/* const chamada = CE();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); */
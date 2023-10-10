const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function MS() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('http://www.jucems.ms.gov.br/servicos/controles-especiais/leiloeiros');
       

            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div/div/div/div[2]/div/div[1]")), 10000);
                let main = await driver.findElements(By.xpath("/html/body/div/div[2]/div/div/div/div[2]/div/div[1]"));

                const base = await main[0].getAttribute('textContent');
                const base1 = base.replace(/.*a seguir:/, '').replace(/.*áginas 118 - 127/, '').replace(/- EDITAL\/JUCEMS Nº 004\/2023, DE 16 DE MARÇO DE 2023 -/, '');
                const dados = base1.split(/gular\n\n/);
           
                const contador = dados.length;


                let leiloeiros = [];
                let leiloeiro = null;
               
                for (let i = 0; i < contador; i++) {

                    const texto = dados[i].trim();
                    const linhas = texto.split(/\n/);
                    

                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';


                    for (j = 0; j < linhas.length; j++) {

                        if (j == 0) {
                        nome = linhas[j].trim();
                        }

                        if (linhas[j].includes('cula')) {
                            matricula = linhas[j].split(/cula/)[1].trim();
                       
                            matricula = matricula.replace(/:/g, '').trim();
                        }

                        if (linhas[j].includes('posse')) {
                            dataPosse = linhas[j].split(/posse:/)[1].trim();
                        }

                        if (linhas[j].includes('Fone')) {
                            telefone = linhas[j].split(/Fone/)[1].trim();
                       
                            telefone = telefone.replace(/:/g, '').trim();
                        }

                        if (linhas[j].includes('E-mail')) {
                            email = linhas[j].split(/E-mail/)[1].trim();
                       
                            email = email.replace(/:/g, '').trim();
                        }

                        if (linhas[j].includes('Site')) {
                            site = linhas[j].split(/Site/)[1].trim();
                       
                            site = site.replace(/:/g, '').trim();
                        }

                        if (linhas[j].includes('Irr')) {
                            situacao = 0;
                        }


                    }
                 
                    if (linhas.length > 8) {
                        endereco = linhas[8].trim() + ' ' + linhas[10].trim() + ' ' + linhas[12].trim();
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
        uf: 'MS'
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

 
module.exports = MS;


/* const chamada = MS();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); */
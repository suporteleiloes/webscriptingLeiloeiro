const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function BA() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('http://www.juceb.ba.gov.br/home/matriculas-e-carteira-profissional/');
       

            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div[4]/div/div[3]/div[2]/div[2]/table/tbody")), 10000);
                let dados = await driver.findElements(By.xpath("/html/body/div[2]/div[4]/div/div[3]/div[2]/div[2]/table/tbody//tr"));

                const contador = dados.length;
                let leiloeiros = [];
                let leiloeiro = null;
               
                for (let i = 1; i < contador; i++) {

                    let html = await dados[i].getAttribute('innerHTML');
                    let texto = await dados[i].getText();
                   
                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = 0;
                    let matricula = '';
                    let dataPosse = '';

                    let linha = html.split('</td>');

                        for (let j = 0; j < linha.length; j++) {

                        if(j == 0){
                            nome = linha[j];
                        }

                        if(j == 1){
                            let linhaTelefoneEmail = linha[j].split('<br>');
                            for (let k = 0; k < linhaTelefoneEmail.length; k++) {
                               
                                if(linhaTelefoneEmail[k].includes('@')){
                                    email = linhaTelefoneEmail[k] + ' / ' + email;
                                }

                                if(linhaTelefoneEmail[k].match(/\d{3,}/g)){
                                    telefone = linhaTelefoneEmail[k] + ' / ' + telefone;
                                }
                               
                            }
                        }

                        if(j == 2){
                            endereco = linha[j];
                        }

                        if(j == 3){
                            dataPosse = linha[j];
                        }

                        if(j == 4){
                            matricula = linha[j];
                        }

                        if(j == 5){
                            if(linha[j].includes('REGULAR')){
                                situacao = 1;
                            }
                        }
                    }
                    
                    nome = nome.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').replace(/\n/g, '').trim();
                    endereco = endereco.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').replace(/\n/g, '').trim();
                    telefone = telefone.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').replace(/\n/g, '').trim();
                    email = email.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').replace(/\n/g, '').trim();
                    matricula = matricula.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').replace(/\n/g, '').trim();
                    dataPosse = dataPosse.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').replace(/\n/g, '').trim();


     leiloeiro = {
        nome: nome,
        matricula: matricula,
        dataPosse: dataPosse,
        endereco: endereco,
        telefone: telefone,
        email: email,
        situacao: situacao,
        uf: 'BA'
    };

         
                     leiloeiros.push(leiloeiro); 
                   
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

 
module.exports = BA;


/* const chamada = BA();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );  */
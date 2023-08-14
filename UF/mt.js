const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function MT() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('http://www.jucemat.mt.gov.br/leiloeiros');
       

            try {
                
                let dados = await driver.findElements(By.xpath("//div[@class='col-md-4 col-sm-6']"));
                const contador = dados.length-1;
                let leiloeiros = [];
                let leiloeiro = null;
            
                for (let i = 0; i <= contador; i++) {

                    let html = await dados[i].getAttribute('innerHTML');
                    let texto = await dados[i].getAttribute('innerText');
                                          
                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = '';
                    let matricula = '';
                    let dataPosse = '';

                       
                          nome = html.split('<h2 class="text-uppercase">')[1].split('</h2>')[0];
                            nome = nome.trim();

                            situacao = html.split('Situação: </strong>')[1].split('</li>')[0];
                            situacao = situacao.trim();

                            matricula = html.split('<span class="label label-lg">')[1].split('</span>')[0];
                            matricula = matricula.trim();
       
                            dataPosse = html.split('Posse: </strong>')[1].split('</li>')[0];
                            dataPosse = dataPosse.trim();

                            if(html.includes('<li><i class="fa fa-map-marker"></i>')){
                            endereco = html.split('<li><i class="fa fa-map-marker"></i>')[1].split('</li>')[0];
                            endereco = endereco.trim();
                            }

                            if(html.includes('<li><i class="fa fa-at"></i>')){
                            email = html.split('<li><i class="fa fa-at"></i>')[1].split('</li>')[0];
                            email = email.trim();
                            }

                            if(html.includes('<li><i class="fa fa-phone"></i>')){ 
                            telefone = html.split('<li><i class="fa fa-phone"></i>')[1].split('</li>')[0];
                            telefone = telefone.trim();
                            }

                                    if(situacao == 'Regular'){
                                situacao = 1;
                            } else { situacao = 0; }



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
                    //console.log(texto);
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

 
module.exports = MT;

/*  const chamada = MT();
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
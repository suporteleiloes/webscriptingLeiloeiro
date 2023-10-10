const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function TO() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://www.to.gov.br/jucetins/leiloeiros/152aezl6blm0');
       

            try {
               

                // Espera carregar "<div class="page_main_content">" e pega o html
                await driver.wait(until.elementLocated(By.xpath("//div[@class='page_main_content']")), 10000);
                let base = await driver.findElements(By.xpath("//div[@class='page_main_content']"));
                let leiloeiros = [];
                let leiloeiro = null;
                let html = await base[0].getAttribute('innerHTML');

                let texto = html.split('<p><br><strong>');
                let contador = texto.length;


                for (let i = 1; i < contador; i++) {
                    let dados = texto[i];

                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    nome = dados.split('</strong>')[0];

                    matricula = dados.split('<p>Matrícula')[1].split(',')[0];
                    if (matricula.includes('de')) {
                        matricula = matricula.split('de')[0];
                    }

                    matricula = matricula.replace('n', '', 'g').replace('º', '', 'g').replace(':', '', 'g').replace('.', '', 'g').replace('°', '', 'g');
                    matricula = matricula.trim();

                    dataPosse = dados.match(/\d{2}\/\d{2}\/\d{4}/g)[0];

                    endereco = dados.split('<p>Endereço:')[1].split('</p>')[0];
                    endereco = endereco.replace(/&nbsp;/g, '');
                    endereco = endereco.trim();
                    
                    if(dados.includes('Telefone')){
                    telefone = dados.split('<p>Telefone')[1].split('</p>')[0];
                    telefone = telefone.replace(':', '').replace('Celular', '').replace('Fax', '');
                    telefone = telefone.trim();
                    }

                    if(dados.includes('ite:')){
                    site = dados.split('ite:')[1].split('</p>')[0];
                    site = site.replace(/<[^>]*>?/gm, '').trim();
                    }

                    if(dados.includes('mail:')){
                    email = dados.split('mail:')[1].split('</p>')[0];
                    if (email.includes('mailto:')) {
                        email = email.split('mailto:')[1].split('\">')[0];
                    }
                    email = email.trim();
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
                            uf: 'TO'
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

 
module.exports = TO;

/*   const chamada = TO();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );  */
 
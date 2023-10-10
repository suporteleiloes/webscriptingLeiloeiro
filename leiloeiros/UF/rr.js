const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function RR() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://jucerr.rr.gov.br/leiloeiros/');
       

            try {
                let base = await driver.findElements(By.xpath("//div[@class='elementskit-accordion accordion-4']"));
                let leiloeiros = [];
                let leiloeiro = null;
                let contador = base.length;
                let contador_elementskit = 0;
                let elementskit_dados = [];

                for (let i = 0; i < contador; i++) {
                let html = await base[i].getAttribute('innerHTML');
                let texto = await base[i].getText();
                let elementskit = await base[i].findElements(By.xpath("//div[@class='elementskit-card ']"));
                let elementskit_active = await base[i].findElements(By.xpath("//div[@class='elementskit-card active']"));
                contador_elementskit = elementskit.length + elementskit_active.length;


               for (let i = 0; i < elementskit.length; i++) {
                elementskit_dados.push(await elementskit[i].getAttribute('innerHTML'));
               }
               for (let i = 0; i < elementskit_active.length; i++) {
                elementskit_dados.push(await elementskit_active[i].getAttribute('innerHTML'));
               }
            }

                for (let i = 0; i < contador_elementskit; i++) {
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
let site = '';
                    let email = '';
                    let situacao = '';
                    let matricula = '';
                    let dataPosse = '';

                    let texto = elementskit_dados[i];
             
                    nome = texto.split('<span class="ekit-accordion-title">')[1].split('</span>')[0];
                    nome = nome.trim();

                    if (texto.includes('Matrícula')) {
                    matricula = texto.split('Matrícula')[1].split('<br>')[0];
                    matricula = matricula.replace(/JUCER\/RR|JUCERR|da|:|Nº/g, '').trim();
                    matricula = matricula.trim();
                    }

                    if (texto.includes('Data da posse:')) {
                    dataPosse = texto.split('Data da posse:')[1].split('<br>')[0];
                    dataPosse = dataPosse.replace(/Data|da|posse|:/g, '').trim();
                    if (dataPosse.includes('pela')){
                         dataPosse = dataPosse.split('pela')[0];
                            dataPosse = dataPosse.trim();
                    }
                    
                    dataPosse = dataPosse.trim();
                    }

                    if (texto.includes('FONES')) {
                    telefone = texto.split('FONES')[1].split('<br>')[0];
                    telefone = telefone.replace(/FONES|:/g, '').trim();
                    telefone = telefone.trim();
                    } else if (texto.includes('Cel:')) {
                    telefone = texto.split('Cel:')[1].split('<br>')[0];
                    telefone = telefone.replace(/Cel|:/g, '').trim();
                    telefone = telefone.trim();
                    } else if (texto.includes('Celular:')) {
                    telefone = texto.split('Celular:')[1].split('<br>')[0];
                    telefone = telefone.replace(/Celular|:/g, '').trim();
                    telefone = telefone.trim();
                    }

                    if (texto.includes('E.mail:')) {
                    email = texto.split('E.mail:')[1].split('<br>')[0];
                    email = email.replace(/E.mail|:/g, '').trim();
                    email = email.trim();
                    if (email.includes('mailto')) {
                        email = email.split('mailto')[1].split('" role=')[0];
                        email = email.trim();
                    } else if (email.includes('&nbsp;')) {
                        email = email.split('&nbsp;')[1].split('</p>')[0];
                        email = email.replace(/\//g, '');
                        email = email.trim();
                    }
                    } else if (texto.includes('e-mail:')) {
                        email = texto.split('e-mail:')[1].split('<br>')[0];
                        email = email.replace(/e-mail|:/g, '').trim();
                        if (email.includes('mailto')) {
                            email = email.split('mailto')[1].split('" role=')[0];
                            email = email.trim();
                        }
                        email = email.trim();
                    } else if (texto.includes('Email:')) {
                        email = texto.split('Email:')[1].split('<br>')[0];
                        email = email.replace(/Email|:/g, '').trim();
                        if (email.includes('mailto')) {
                            email = email.split('mailto')[1].split('" role=')[0];
                            email = email.trim();
                        } else if (email.includes('&nbsp;')) {
                            email = email.split('&nbsp;')[1].split('</p>')[0];
                            // remove o </a>
                            email = email.replace(/<\/a>/g, '');
                            email = email.trim();
                        }
                        email = email.trim();
                    } else if (texto.includes('E-mail:')) {
                        email = texto.split('E-mail:')[1].split('<br>')[0];
                        email = email.replace(/E-mail|:/g, '').trim();
                        if (email.includes('&nbsp;')) {
                            email = email.split('&nbsp;')[1].split('</p>')[0];
        
                            email = email.trim();
                        }
                        email = email.trim();
                    } else if (texto.includes('Emails:')) {
                        email = texto.split('Emails:')[1].split('<br>')[0];
                        email = email.replace(/Emails|:/g, '').trim();
                        if (email.includes('&nbsp;')) {
                            email = email.split('&nbsp;')[1].split('</p>')[0];
                            email = email.replace(/,/g, '');
                            email = email.trim();
                        }
                        email = email.trim();
                    }

                    if (texto.includes('ite:')) {
                        site = texto.split('ite:')[1].split('"')[0].trim();
                    }

                    
                    if (texto.includes('DESCREDENCIADO')) {
                        situacao = 0;
                    } else {
                        situacao = 1;
                    }
                    
                    endereco = texto.split('<br>')[1].split('<br>')[0];

                    if (endereco.includes('Data da posse') || endereco.includes('CPF')) {
                        endereco = '';
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
                            uf: 'RR',
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

 
module.exports = RR;

/*   const chamada = RR();
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
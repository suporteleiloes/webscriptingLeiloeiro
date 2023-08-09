const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function PB() {
            let driver = await new Builder().forBrowser(Browser.CHROME).build();
            await driver.get('https://jucep.pb.gov.br/contatos/leiloeiros/leiloeiros');
            // Configura o driver para não aparecer na tela
            await driver.manage().window().setRect(0, 0, 0, 0);

            try {
                
                let dados = await driver.findElements(By.xpath("//div[@id='parent-fieldname-text']/p"));

                let leiloeiros = [];
                let leiloeiro = null;
                for (let i = 0; i < dados.length; i++) {

                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = '';
                    let matricula = '';
                    let dataPosse = '';

                    let texto = await dados[i].getAttribute('innerText');
                    if(texto.includes('Nome:')){
                        nome = texto.split('Nome:')[1].split('Matrícula:')[0];
                        nome = nome.trim();

                        matricula = texto.split('Matrícula:')[1].split('Data da posse:')[0];
                        matricula = matricula.trim();

                        dataPosse = texto.split('Data da posse:')[1].split('Endereço:')[0];
                        dataPosse = dataPosse.trim();

                        endereco = texto.split('Endereço:')[1].split('Telefone:')[0];
                        endereco = endereco.trim();

                        telefone = texto.split('Telefone:')[1].split('Site:')[0];
                        telefone = telefone.trim();

                        if(telefone.includes('\n')){
                            telefone = telefone.split('\n')[0];
                            telefone = telefone.trim();
                        }

                        email = texto.split('E-mail:')[1].split('Situação:')[0];
                        email = email.trim();
   
                            if(email.includes('\n')){
                                email = email.split('\n')[0];
                                email = email.trim();
                            }

                        situacao = texto.split('Situação:')[1];
                        situacao = situacao.trim();

                        if(situacao == 'Regular'){
                            situacao = 1;
                        }else{
                            situacao = 0;
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
                    
                                        // Adiciona o objeto no array
                                        //console.log(texto);
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

 
module.exports = PB;

/*  const chamada = PB();
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
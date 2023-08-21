const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function SP() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
        let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
     //  let driver = await new Builder().forBrowser(Browser.CHROME).build();

            await driver.get('https://www.institucional.jucesp.sp.gov.br/relatorio/ConsultasLeiloeiroTradutor/ListaLeiloeirosTradutores');
       
            try {
                await driver.sleep(1000);
                await driver.wait(until.elementLocated(By.xpath("/html/body/div/main/div/div/section/form/div[1]/div[3]/table/tbody/tr[1]/td[7]/button")), 10000);
                await driver.sleep(1000);
                await driver.findElement(By.xpath("/html/body/div/main/div/div/section/form/div[1]/div[3]/table/tbody/tr[1]/td[7]/button")).click();
                await driver.wait(until.elementLocated(By.xpath("/html/body/div/main/div/div/section/form/div[4]/div")), 10000);
                await driver.wait(until.elementLocated(By.xpath("/html/body/div/main/div/div/section/form/div[4]/div/div[1]")), 10000);
                await driver.wait(until.elementLocated(By.xpath("/html/body/div/main/div/div/section/form/div[4]/div/div[1]/div[2]/div[4]")), 10000);
                let paginas = await driver.findElements(By.xpath("/html/body/div/main/div/div/section/form/div[4]/div/div[1]/div[2]/div[4]"));
                let contador = await paginas[0].getAttribute('innerHTML');
                contador = contador.split('de')[1].trim();
                contador = parseInt(contador);

                let leiloeiros = [];
                let leiloeiro = null;

                  

  for (let i = 0; i < contador; i++) {
    await driver.wait(until.elementLocated(By.xpath("//*[@id='example']/tbody")), 10000);
    let base = await driver.findElements(By.xpath("//*[@id='example']/tbody//tr"));

                    for( let j = 0; j < base.length; j++) {

                        let nome = '';
                        let endereco = '';
                        let telefone = '';
                        let email = '';
                        let situacao = 0;
                        let matricula = '';
                        let dataPosse = '';

                        let colunas = await base[j].findElements(By.xpath(".//td"));

                        nome = await colunas[0].getText();

                        matricula = await colunas[1].getText();

                        dataPosse = await colunas[2].getText();

                        endereco = await colunas[3].getText() + ' ' + await colunas[4].getText() + ' ' + await colunas[5].getText() + ' ' + await colunas[6].getText();

                        telefone = await colunas[7].getText();

                        email = await colunas[8].getText();

                        situacao = await colunas[9].getText();

                        if(situacao == 'Atuante') {
                            situacao = 1;
                        } else {
                            situacao = 0;
                        }

                        leiloeiro = {
                            nome: nome,
                            matricula: matricula,
                            dataPosse: dataPosse,
                            endereco: endereco,
                            telefone: telefone,
                            email: email,
                            situacao: situacao,
                            uf: 'SP'
                        };
                        leiloeiros.push(leiloeiro);
                       
                    }


                
                    await driver.findElement(By.xpath("/html/body/div/main/div/div/section/form/div[4]/div/div[1]/div[2]/div[5]/a[2]")).click();
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

 
module.exports = SP;


/* const chamada = SP();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); */
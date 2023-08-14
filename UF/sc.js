const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function SC() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
    // let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
let driver = await new Builder().forBrowser(Browser.CHROME).build();
            await driver.get('https://leiloeiros.jucesc.sc.gov.br/site/');
       
            try {

                await driver.wait(until.elementLocated(By.xpath("//tbody[@style='text-align: center;']")), 10000);
                await driver.manage().window().maximize();
                let base = await driver.findElements(By.xpath("//tbody[@style='text-align: center;']/tr"));
                let leiloeiros = [];
                let leiloeiro = null;

                let contador = base.length;

                for (let i = contador-1; i >= 0; i--) {
                    let html = await base[i].getAttribute('innerHTML');

                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = 0;
                    let matricula = '';
                    let dataPosse = '';

                    matricula = await base[i].findElement(By.xpath("./td[@class='aarc']")).getText();
                    nome = await base[i].findElement(By.xpath("./td[@class='nome']")).getText();
                    dataPosse = await base[i].findElement(By.xpath("./td[@class='data']")).getText();
                    situacao = await base[i].findElement(By.xpath("./td[@class='situacao']")).getText();

                    if (situacao == "Regular") {
                        situacao = 1;
                    } else {
                        situacao = 0;
                    }

                    await driver.executeScript("arguments[0].scrollIntoView(true);", base[i]);
                    // seleciona o base[i] e espera ate que ele seja clicavel
                    await driver.wait(until.elementIsVisible(base[i]), 10000);
                    await base[i].click();
                    await driver.wait(until.elementLocated(By.xpath("//iframe")), 10000);
                    await driver.switchTo().frame(0)
                    await driver.wait(until.elementLocated(By.xpath("//tbody")), 10000);
                      
                    let htmlModal = await driver.findElement(By.xpath("//tbody")).getAttribute('innerHTML');
  
                    if(htmlModal.includes("Logradouros")){
                    endereco = htmlModal.split("Logradouros")[1].split("</td></tr>")[0];
                    endereco = endereco.replace(/<br>/g, " ");
                    endereco = endereco.replace(/<[^>]*>?/gm, " ");
                    endereco = endereco.trim();
                    }

                    if(htmlModal.includes("Contatos </b>")){
                    contatosx = htmlModal.split("Contatos </b>")[1].split("<b>")[0];

                    contatos = contatosx.split("<br>");
                    for (let j = 0; j < contatos.length; j++){
                        if (contatos[j].match(/\d{3,}/g)) {
                            telefone = telefone + contatos[j] + " ";
                            telefone = telefone.replace(/<[^>]*>?/gm, " ");
                            telefone = telefone.trim();
                        }
                        if (contatos[j].includes("@")) {
                            email = email + contatos[j] + " ";
                            email = email.replace(/<[^>]*>?/gm, " ");
                            email = email.trim();
                        }
                    }
                 
                }

                    await driver.switchTo().defaultContent()
                    await driver.findElement(By.id("cboxClose")).click()
                    await driver.sleep(100);
                   

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
                                      // console.log(JSON.stringify(leiloeiro, null, 2));
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

 
module.exports = SC;

/*  const chamada = SC();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );  */
 
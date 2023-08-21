const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function RS() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
          // let driver = await new Builder().forBrowser(Browser.CHROME).build();
            await driver.get('http://sistemas.jucisrs.rs.gov.br/leiloeiros/');
       

            try {
                await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/form/div[3]/div/button")), 10000);
                await driver.findElement(By.xpath("/html/body/div[2]/form/div[3]/div/button")).click();
                await driver.sleep(1000);
                let leiloeiros = [];
                let leiloeiro = null;

                await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/b")), 10000);
                let html = await driver.findElement(By.xpath("/html/body/div[2]/b")).getAttribute('innerHTML');
                let base = html.split("<hr>");
                let contador = base.length;

         for (let i = 0; i < contador - 2; i++) {
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    let texto = base[i];

                    nome = texto.split("</font> - ")[1].split("<font")[0].trim();
                    nome = nome.split("<br>")[0].trim();

                    matricula = texto.split('#A01A14">')[1].split("</font>")[0].trim();

            if(texto.includes("Posse")){
                    dataPosse = texto.split("Posse")[1].split("<br>")[0].trim();
                    dataPosse = dataPosse.match(/\d{2}\/\d{2}\/\d{4}/)[0];
            }
                  
            if(texto.includes("Telefone")){
                    telefone = texto.split("Telefone")[1].split("<br>")[0].trim();
                    telefone = telefone.replace(/<[^>]*>?/gm, ' ').replace(/&nbsp;/g, ' ').replace(/:/g, ' ').trim();
                    telefone = telefone.trim();
                }

                if(texto.includes('href="')){
                    site = texto.split('href="')[1].split('"')[0].trim();
                }

                if(texto.includes("e-Mail")){
                    email = texto.split("e-Mail")[1].split("<br>")[0].trim();
                    email = email.replace(/<[^>]*>?/gm, ' ').replace(/&nbsp;/g, ' ').replace(/:/g, ' ').trim();
                    email = email.trim();
                }

                if(texto.includes("Cancelado") || texto.includes("Suspenso")){
                    situacao = 0
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
                            uf: 'RS',
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

 
module.exports = RS;

/* 
  const chamada = RS();
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
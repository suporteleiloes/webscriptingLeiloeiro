const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function RJ() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
          // let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
          let driver = await new Builder().forBrowser(Browser.CHROME).build();

            await driver.get('https://www.jucerja.rj.gov.br/AuxiliaresComercio/Leiloeiros');
            await driver.manage().window().maximize();

            try {

                let leiloeiros = [];
                let leiloeiro = null;
              
                while (true) {
          
                    const html_total = await driver.findElement(By.xpath('/html')).getAttribute('innerHTML');

                 if (!html_total.includes('arrow foward')) {
                        break;
                    } else if (!html_total.includes('próxima')) {
                    }
                  
                   await driver.wait(until.elementLocated(By.xpath("/html/body/div/section[2]/div/div[1]/section[2]/div[2]/div")), 10000);
       
                      await driver.wait(until.elementLocated(By.xpath("/html/body/div/section[2]/div/div[1]/section[2]/div[2]/div")), 10000);
                let base = await driver.findElements(By.xpath("/html/body/div/section[2]/div/div[1]/section[2]/div[2]/div/ul//li"));

                for (let i = 0; i < base.length; i++) {
                    let html = await base[i].getAttribute('innerHTML')
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    nome = html.split('<h4 class="u-md-texto u-bold">')[1].split('</h4>')[0].trim();
                    if(nome.includes('-')) {
                        nome = nome.split('-')[0].trim();
                    } else if(nome.includes('IRREGULAR')) {
                        nome = nome.split('IRREGULAR')[0].trim();
                    } 

                    matricula = html.split('<h6 class="u-md-texto u-semBold u-corCinzaClaro u-inlineBlock">')[1].split('</h6>')[0].trim();

                    dataPosse = html.split('Data da Posse:</h5>')[1].split('</h6>')[0].trim();
                    dataPosse = dataPosse.replace(/<.*?>/g, '').trim();

                    endereco = html.split('Endereço:</h5>')[1].split('</h6>')[0].trim();
                    endereco = endereco.replace(/<.*?>/g, '').trim();

                    telefone = html.split('Telefone:</h5>')[1].split('</h6>')[0].trim();
                    telefone = telefone.replace(/<.*?>/g, '').trim();

                    site = html.split('Site:</h5>')[1].split('</h6>')[0].trim();
                    site = site.replace(/<.*?>/g, '').trim();

                    email = html.split('E-mail:</h5>')[1].split('</h6>')[0].trim();
                    email = email.replace(/<.*?>/g, '').trim();

                    if(html.includes('IRREGULAR') || html.includes('CANCELAD')) {
                        situacao = 0;
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
                        uf: 'RJ'
                    };
                
                    if(leiloeiro.nome){
                   leiloeiros.push(leiloeiro);
                    }

        }

        await driver.executeScript("arguments[0].scrollIntoView(true);", await driver.findElement(By.xpath("//li[@class='arrow foward']")));
        await driver.findElement(By.xpath("//li[@class='arrow foward']")).click();
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/section[2]/div/div[1]/section[2]/div[2]/div")), 10000);
     //   await driver.sleep(1000);


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

 
module.exports = RJ;


/* const chamada = RJ();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); */
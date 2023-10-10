const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function AC() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://juceac.ac.gov.br/leiloeiro/');
       
            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[3]/div[2]/div/div[1]/article/div[2]/section/div/div/section/div/div/div/div/div")), 10000);
                let base1 = await driver.findElements(By.xpath("/html/body/div[1]/div[3]/div[2]/div/div[1]/article/div[2]/section/div/div/section/div/div/div/div/div"));
                let base2 = await base1[0].getAttribute('innerHTML');
                let base = base2.split('<p><b style="font-weight: normal;">&nbsp;</b></p>');
                let leiloeiros = [];
                let leiloeiro = null;

                for (let i = 0; i < base.length; i++) {
               
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

              
                    if(base[i].includes('<p dir="ltr" style="line-height: 1.38; text-align: justify; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12pt; font-family: Heebo,sans-serif; color: #000000; background-color: transparent; font-weight: bold; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">')){
                        nome = base[i].split('<p dir="ltr" style="line-height: 1.38; text-align: justify; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12pt; font-family: Heebo,sans-serif; color: #000000; background-color: transparent; font-weight: bold; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">')[1].split('</span></p>')[0].trim();
                        nome = nome.replace(/<.*?>/g, '').trim();

                 
                                } 
                    else if(base[i].includes('<span style="font-size: 12pt; font-family: Heebo, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">')){
                        nome = base[i].split('<span style="font-size: 12pt; font-family: Heebo, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">')[1].split('</span>')[0].trim();
                        nome = nome.replace(/<.*?>/g, '').trim();
                    }

                    if(nome.includes('–')){
                        matricula = nome.split('–')[0].trim();
                        nome = nome.split('–')[1].trim();
                    }

                    if(nome.includes('n.º')){
                        nome = nome.split('n.º')[0].trim();
                    }

                    if(nome.includes('Matrícula')){
                        nome = nome.split('Matrícula')[0].trim();
                    }

                    if(base[i].includes('CANCELADO') || base[i].includes('SUSPENSO')){
                        situacao = 0;
                    }

                    if(base[i].includes('posse')){
                        dataPosse = base[i].split('posse')[1].split('</')[0].trim();
                        dataPosse = dataPosse.replace(/:/g, '').trim();
                    }

                    if(base[i].includes('reço')){
                        endereco = base[i].split('reço')[1].split('</')[0].trim();
                        endereco = endereco.replace(/:/g, '').trim();
                    }

                    if(base[i].includes('fone')){
                        telefone = base[i].split('fone')[1].split('</')[0].trim();
                        telefone = telefone.replace(/:/g, '').trim();
                    }

                    if(base[i].includes('Site:')){
                        site = base[i].split('Site:')[1].split('</a>')[0].trim();
                        site = site.replace(/<.*?>/g, '').trim();
                    }

                    if(base[i].includes('-mail')){
                        email = base[i].split('-mail')[1].split('</')[0].trim();
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
                        uf: 'AC'
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

 
module.exports = AC;


/* const chamada = AC();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );  */ 
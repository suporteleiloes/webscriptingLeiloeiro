const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function RN() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('http://www.jucern.rn.gov.br/Conteudo.asp?TRAN=ITEM&TARG=8695&ACT=&PAGE=0&PARM=&LBL=Leiloeiros');
       

            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[3]/div[2]")), 10000);
                let base = await driver.findElements(By.xpath("/html/body/div[1]/div[3]/div[2]"));
                const base1 = await base[0].getAttribute('innerHTML');
                const base2 = base1.split('antiguidade</strong></h2>')[1];
                const base3 = base2.split('<br><br><div class="tags">')[0];
                const dados = base3.split('<p>&nbsp;</p>');
         

                const contador = dados.length;
                let leiloeiros = [];
                let leiloeiro = null;
               
                for (let i = 1; i < contador; i++) {

                    let html = dados[i];
            
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    
                    if(html.includes('<strong>')){
                    nome = html.split('<strong>')[1].split('</strong>')[0].trim();
             
                    nome = nome.replace(/&nbsp;/g, ' ');
                    nome = nome.replace(/<.*?>/g, '').trim();
                    }

                    if(html.includes('eação:')){
                        dataPosse = html.split('eação:')[1].split('<br>')[0].trim();
                        dataPosse = dataPosse.split('</p>')[0].trim();
                    }

                    if(html.includes('fone:')){
                        telefone = html.split('fone:')[1].split('<br>')[0].trim();
                        telefone = telefone.split('</p>')[0].trim();
                    }

                    if(html.includes('mail:')){
                        email = html.split('mail:')[1].split('<br>')[0].trim();
                        email = email.split('</p>')[0].trim();
                        if(email.includes('mailto:')){
                            email = email.split('mailto:')[1].split('"')[0].trim();
                        }
                        email = email.replace(/<.*?>/g, '').trim();
                    }

                    if(html.includes('ortaria')){
                        matricula = html.split('ortaria')[1].split('<br>')[0].trim();
                        matricula = matricula.split('</p>')[0].trim();
                        matricula = matricula.replace(/n/g, '').replace(/º/g, '').replace(/:/g, '').replace(/<.*?>/g, '').trim();
                    }

                    if(html.includes('ite:')){
                        site = html.split('ite:')[1].split('<br>')[0].trim();
                        site = site.split('</p>')[0].trim();
                    }

                    if(html.includes('reço')){
                        endereco = html.split('reço')[1].split('<br>')[0].trim();
                        endereco = endereco.split('</p>')[0].trim();
                        endereco = endereco.replace(/n/g, '').replace(/º/g, '').replace(/:/g, '').replace(/<.*?>/g, '').trim();
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
        uf: 'RN'
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

 
module.exports = RN;


/* const chamada = RN();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );  */
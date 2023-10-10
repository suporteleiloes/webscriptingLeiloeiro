const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function AM() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('http://www.jucea.am.gov.br/leiloeiros/');
       

            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/section/div[1]/div/div/article/section/div")), 10000);
                let main = await driver.findElements(By.xpath("/html/body/section/div[1]/div/div/article/section/div"));

                const base = await main[0].getAttribute('innerHTML');
                const dados = base.split('</div>');
                const contador = dados.length;

                let leiloeiros = [];
                let leiloeiro = null;
               
                for (let i = 0; i < contador; i++) {

                    let html = dados[i];

                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
                    let site = '';
                    let email = '';
                    let situacao = 0;
                    let matricula = '';
                    let dataPosse = '';


                    if(html.includes('title="')){
                    nome = html.split('title="')[1].split('" style')[0].trim();
                    }
                   
                    if(html.includes('Nº')){
                    matricula = html.split('Nº')[1].split('</p>')[0].trim();
                    matricula = matricula.replace(/<[^>]*>?/gm, '').trim();
                    } else if(html.includes('°')){
                    matricula = html.split('°')[1].split('</p>')[0].trim();
                    matricula = matricula.replace(/<[^>]*>?/gm, '').trim();
                    }
                    

                    if(html.includes('REÇO:')){
                    endereco = html.split('REÇO:')[1].split('</p>')[0].trim();
                    endereco = endereco.replace(/&nbsp;/g, ' ').trim();
                    }

                    if(html.includes('FONE:')){
                    telefone = html.split('FONE:')[1].split('</p>')[0].trim();
                    telefone = telefone.replace(/&nbsp;/g, ' ').trim();
                    }

                    if(html.includes('MAIL:')){
                    email = html.split('MAIL:')[1].split('</p>')[0].trim();
                    email = email.replace(/&nbsp;/g, ' ').trim();
                    }

                    if(html.includes('SITE:')){
                        site = html.split('SITE:')[1].split('</p>')[0].trim();
                        site = site.replace(/&nbsp;/g, ' ').trim();
                        }

                    if(html.includes('REGULAR')){
                    situacao = 1;
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
        uf: 'AM'
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

 
module.exports = AM;


/* const chamada = AM();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 ); */
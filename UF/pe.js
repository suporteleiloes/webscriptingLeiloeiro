const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function PE() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://portal.jucepe.pe.gov.br/leiloeiros');
       

            try {
                
                // Conta quantos "<div class="row">" tem na pagina
                let dados = await driver.findElements(By.xpath("//div[@class='row']"));
                const contador = dados.length-1;
                let leiloeiros = [];
                let leiloeiro = null;
            
                // Faz um loop em todos os "<div class="row">"
                for (let i = 0; i <= contador; i++) {
                    let texto = await dados[i].getAttribute('innerHTML');
                                        
                    let nome = '';
                    let endereco = '';
                    let telefone  = '';
let site = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    if(texto.includes('(falecid')){
                        nome = texto.split('<h5 class="g-font-weight-600 g-color-black">')[1].split('<span')[0];
                        nome = nome.trim();
                   
                    }else{
                    // Nome vai ser de "<h5 class="g-font-weight-600 g-color-black">" até "<!---->"
                    nome = texto.split('<h5 class="g-font-weight-600 g-color-black">')[1].split('<!---->')[0];
                    nome = nome.trim();
                    
                    }

                    if(texto.includes('Irregular')){
                    situacao = 0;
                    }

                    endereco = texto.split('<div class="media-body g-color-text">')[1].split('</div>')[0];
                    // Deixa tudo em uma linha só
                    endereco = endereco.replace(/(\r\n|\n|\r)/gm, "");
                    // Remove os <br>
                    endereco = endereco.replace(/<br>/g, " ");
                    endereco = endereco.trim();
                    // Remove os espaços em branco duplicados
                    endereco = endereco.replace(/\s{2,}/g, ' ');

                    
                    if(texto.includes('<div class="media-body g-color-text"><span>')){
                    telefone = texto.split('<div class="media-body g-color-text"><span>')[1].split('</div>')[0];
                    // Remove os <span> e </span> e <br>
                    telefone = telefone.replace(/<span>/g, "");
                    telefone = telefone.replace(/<\/span>/g, "");
                    telefone = telefone.replace(/<br>/g, "");
                    telefone = telefone.trim();
                    // Remove os espaços em branco duplicados e deixa separado por /
                    telefone = telefone.replace(/\s{2,}/g, ' / ');
                   
                    } 

                    if(texto.includes('<i class="icon-communication-051 u-line-icon-pro"></i></span></div> <div class="media-body g-color-text">')){
                    site = texto.split('<i class="icon-communication-051 u-line-icon-pro"></i></span></div> <div class="media-body g-color-text">')[1].split('</div>')[0];
                    site = site.replace(/\n/g, "");
                    site = site.trim();
                    }

                    if(texto.includes('<i class="icon-communication-154 u-line-icon-pro"></i></span></div> <div class="media-body g-color-text">')){
                    email = texto.split('<i class="icon-communication-154 u-line-icon-pro"></i></span></div> <div class="media-body g-color-text">')[1].split('</div>')[0];
                    // remove os \n
                    email = email.replace(/\n/g, "");
                    email = email.trim();
                    }

     // Constrói o objeto
     leiloeiro = {
        nome: nome,
        matricula: matricula,
        dataPosse: dataPosse,
        endereco: endereco,
        telefone: telefone,
site: site,
        email: email,
        situacao: situacao,
        uf: 'PE'
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

 
module.exports = PE;

/*  const chamada = PE();
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
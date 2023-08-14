const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function PI() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://portal.pi.gov.br/jucepi/leiloeiro-oficial/');
       

            try {
                
                // Procura quantos <p>  tem dentro de "<div class="post-content">"
                let dados = await driver.findElements(By.xpath("//div[@class='post-content']//p"));

                const contador = dados.length;
                let leiloeiros = [];
                let leiloeiro = null;

                for (let i = 1; i < contador; i++) {
                    let texto = await dados[i].getAttribute('innerHTML');
                    let semhtml = await dados[i].getText();
                   
                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = 1;
                    let matricula = '';
                    let dataPosse = '';

                    nome = texto.split('<strong>')[1].split('</strong>')[0];
                    nome = nome.replace(/<br>/g, "");
                    nome = nome.trim();

                    matricula = semhtml.split('º')[1].split(',')[0];
                    matricula = matricula.trim();

                    dataPosse = semhtml.split('em')[1].split('<br>')[0]
                    if (dataPosse.includes('\n')) {
                    // remove tudo depois de \n incluindo ele
                    dataPosse = dataPosse.split('\n')[0];
                    dataPosse = dataPosse.trim();
                    }
                    dataPosse = dataPosse.trim();

                    endereco = texto.split('Endereço:')[1].split('<br>')[0];
                    endereco = endereco.trim();

                    if(texto.includes('Telefone:')){
                        telefone = texto.split('Telefone:')[1].split('<br>')[0];
                    telefone = telefone.trim();
                    } else if(texto.includes('Telefones')){
                        telefone = texto.split('Telefones:')[1].split('<br>')[0];
                    telefone = telefone.trim();
                    }

                    // if icludes E-mails:
                    if(texto.includes('E-mails:')){
                        email = semhtml.split('E-mails:')[1].split('Site')[0];
                        // troca o \n por " / "
                        email = email.replace(/\n/g, " / ");
                        email = email.trim();
                    } else if(texto.includes('mail:')){
                        // se tiver "Site"
                        if(texto.includes('Site')){
                            email = semhtml.split('mail:')[1].split('Site')[0];
                        email = email.trim();
                        } else {
                            email = semhtml.split('mail:')[1];
                            email = email.trim();
                        }
                    }

                 


                      // Constrói o objeto
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
                     leiloeiros.push(leiloeiro); 
                }

                /* const leiloeiro = {
  nome: '',
  matricula: '',
  dataPosse: '',
  endereco: '',
  telefone: '',
  email: '',
  situacao: 1
}; */
    
                
   

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

 
module.exports = PI;

/* 
const chamada = PI();
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
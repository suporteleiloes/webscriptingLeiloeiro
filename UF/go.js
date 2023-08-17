const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function GO() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://www.juceg.go.gov.br/orientacoes-e-modelos/leiloeiros.html');
       

            try {
                
                await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/section[3]/div/div/div[2]/main/div[3]/div/div/div/div/section/article/div/table[4]")), 10000);
                let dados = await driver.findElements(By.xpath("/html/body/div[3]/section[3]/div/div/div[2]/main/div[3]/div/div/div/div/section/article/div/table[4]//td"));

                const contador = dados.length;
                let leiloeiros = [];
                let leiloeiro = null;

                for (let i = 1; i < contador; i++) {

                    let html = await dados[i].getAttribute('innerHTML');
                    let texto = await dados[i].getText();
                   
                    let nome = '';
                    let endereco = '';
                    let telefone = '';
                    let email = '';
                    let situacao = 0;
                    let matricula = '';
                    let dataPosse = '';

                    if(html.includes('<h6>')){
                    nome = html.split('<h6>')[1].split('(')[0];
                    nome = nome.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').trim();

  
                    matricula = html.split('cula')[1].split('de')[0];
                    matricula = matricula.replace(/&nbsp/g, '').replace(/;/g, '').replace(/:/g, '').replace(/<[^>]*>/g, '').trim();

                    dataPosse = html.match(/\d{2}\/\d{2}\/\d{4}/g)[0];

                    if(html.includes('mail:')){
                    email = html.split('mail:')[1].split('\n')[0];
                    email = email.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').trim();
                    }

                    
                    if(html.includes('Fone')){
                        telefone = html.split('Fone')[1].split('\n')[0];
                        telefone = telefone.replace(/&nbsp/g, '').replace(/;/g, '').replace(/:/g, '').replace(/<[^>]*>/g, '').trim();
                        }

                    if(html.includes('Situação Regular') || html.includes('Situação: Regular') || html.includes('Regular')){
                        situacao = 1;
                        }

                        if(html.includes('CEP:')){
                            let linha = html.split('CEP:')[0].split('\n');
                            let linhaEndereco = linha[linha.length - 3] + ' ' + linha[linha.length - 2] + ' ' + linha[linha.length - 1];
                            endereco = `${linhaEndereco.replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').trim()} ${html.split('CEP:')[1].split('\n')[0].replace(/&nbsp/g, '').replace(/;/g, '').replace(/<[^>]*>/g, '').trim()}`
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
                    // se o nome for diferente de vazio
                    if (nome != ''){
                     leiloeiros.push(leiloeiro); 
                    }
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

 
module.exports = GO;


/* const chamada = GO();
chamada.then(function(result) {
    //console.log(result);
 const json = JSON.stringify(result, null, 2);
     console.log(json);
    // Transforma em CSV
   // const csv = require('json2csv').parse(result); 
    //console.log(csv);

 }
 );  */
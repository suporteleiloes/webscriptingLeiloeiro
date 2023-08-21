const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function PR() {
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--headless');
           let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

            await driver.get('https://www.juntacomercial.pr.gov.br/Pagina/LEILOEIROS-OFICIAIS-HABILITADOS');
       

            try {
                
                // Conta quantos "<div class="collapsible-item panel panel-default">" existem na página
                let dados = await driver.findElements(By.xpath("//div[@class='collapsible-item panel panel-default']"));
                const contador = dados.length;
                let leiloeiros = [];
                let leiloeiro = null;

                /* const leiloeiro = {
  nome: '',
  matricula: '',
  dataPosse: '',
  endereco: '',
  telefone: '',
  email: '',
  situacao: 1
}; */
    
                // Pega tudo dentro de <div class="collapsible-item panel panel-default">, apenas texto sem html e transforma em string
                for (let i = 1; i <= contador; i++) {
                 
                
                    let texto = await driver.findElement(By.xpath("//div[@class='collapsible-item panel panel-default'][" + i + "]"));
                    // Clica no texto
                    // Pega o texto

                    let semhtml = await texto.getText();
                    let html = await texto.getAttribute('innerHTML');

                    // Começa a construir o objeto do leiloeiro

                    // Nome vai ser do inicio da string até "  |"
                    let nome = semhtml.substring(0, semhtml.indexOf('|'));
                    nome = nome.trim();
                    // Matricula é o texto entre "|  Matrícula: " até "  |"
                    let matricula = semhtml.substring(semhtml.indexOf('cula:') + 5, semhtml.indexOf('|', semhtml.indexOf('cula: ') + 7));
                    matricula = matricula.trim();

                    // DataPosse vai ser de "Data:" até o final da string
                    let dataPosse = semhtml.substring(semhtml.indexOf('Data:') + 6, semhtml.length);
                    dataPosse = dataPosse.trim();

                    // Endereço vai ser entre "<p>Endereço:" e "</p>" no texto com html
                    // Se tiver "REGULAR - HABILITADO COM RESSALVA" no texto com html, não tem endereço	
                    let endereco = '';
                    if (html.includes('HABILITADO COM RESSALVA')) {
                       endereco = '';
                } else {
                     // Se achar o texto "<p>Rua:" no texto com html, o endereço vai ser entre "<p>Rua:" e "</p>"
                     if (html.includes('<p>Rua')){
                        endereco = html.substring(html.indexOf('<p>Rua') + 3, html.indexOf('</p>', html.indexOf('<p>Rua')));
                        endereco = endereco.trim();
                    } if (html.includes('<p>Endereço')){
                    endereco = html.substring(html.indexOf('Endereço:') + 9, html.indexOf('</p>', html.indexOf('Endereço:')));
                    endereco = endereco.trim();
                } else {
                    endereco = '';
                }
             // Remove todos os ; e &nbsp; do endereço
                endereco = endereco.replace(/;/g, '');
                endereco = endereco.replace(/&nbsp/g, '');
            }

                // Se achar o texto "<p>Telefone:" no texto com html, o telefone vai ser entre "<p>Telefone:" e "</p>"
                let telefone  = '';
let site = '';
                if (html.includes('HABILITADO COM RESSALVA')) {
                    telefone = '';
            } else {
                // telefone vai ser de "Telefones" até "</p>"
                
                if(!html.includes('Telefones')){
                    telefone = '';
                }
                else if (html.includes('Telefones')){
                  
                telefone = html.substring(html.indexOf('Telefones') + 9, html.indexOf('</p>', html.indexOf('Telefones')));
                // Remove todos os ; e ; e &nbsp; do telefone
                telefone = telefone.replace(/;/g, '');
                telefone = telefone.replace(/&nbsp/g, '');
                telefone = telefone.replace(/:/g, '');
                telefone = telefone.trim();
                } else {
                    telefone = html.substring(html.indexOf('Telefone') + 8, html.indexOf('</p>', html.indexOf('Telefone')));
                    // Remove todos os ; e ; e &nbsp; do telefone
                    telefone = telefone.replace(/;/g, '');
                    telefone = telefone.replace(/&nbsp/g, '');
                    telefone = telefone.replace(/:/g, '');
                    telefone = telefone.trim();}

            }

            let email = '';

            if(html.includes('E-mail')){
                // Pega o email entre "E-mail:" e "</p>"
                email = html.split('E-mail:')[1].split('</p>')[0];
                // Pega o email entre "rel="nofollow">" e "<span"
                if (email.includes('rel="nofollow">')){
                    email = email.split('rel="nofollow">')[1].split('<span')[0];
                } else if(email.includes('mailto:')){
                    // pega o email entre "mailto:" e "" class=""
                    email = email.split('mailto:')[1].split('" class="')[0];
                }
            } else {
                let email = "";
            }

            if(html.includes('Site')){
                // Pega o site entre "Site:" e "</p>"
                site = html.split('Site:')[1].split('</p>')[0];
                // tira as tags html
                site = site.replace(/<[^>]*>/g, '');
                // tira os espaços
                site = site.trim();
            }


            let situacao = 0;
            if (html.includes('REGULAR' || 'HABILITADO' || 'LICENCIADO')) {
                situacao = 1;
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
                        uf: 'PR'
                    };


                    

// console.log(html)
                    //console.log(leiloeiro);

                    // Adiciona o objeto no array
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

 
module.exports = PR;

/* const chamada = PR();
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
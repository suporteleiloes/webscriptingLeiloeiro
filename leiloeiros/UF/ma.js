const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

 async function MA() {
            const chrome = require('selenium-webdriver/chrome');
            const options = new chrome.Options();
            options.addArguments('--headless');
            let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
            await driver.get('http://portal.jucema.ma.gov.br/pagina/11');
        
            
            // Aguarda o carregamento da página e procura xpath=//div[5]/div
            await driver.wait(until.elementLocated(By.xpath("//div[5]/div")), 10000);
            let dados = await driver.findElements(By.xpath("//div[5]/div"));
                
            // Captura o HTML da variavel leiloeiros e transforma em string
            let texto = await dados[0].getAttribute('innerHTML');

            try {

            const leiloeiros = [];
            const linhas = texto.split('\n');
            let leiloeiro = null;

            for (let i = 0; i < linhas.length; i++) {
                const linha = linhas[i].trim();
                if (linha.includes('Matrícula')) {
                    if (leiloeiro) leiloeiros.push(leiloeiro);
                    leiloeiro = {
                        nome: linhas[i - 1].trim(),
                        matricula: linha.split('Matrícula')[1].split('–')[0].trim(),
                        dataPosse: linha.split('Em')[1].trim(),
                        endereco: '',
                        telefone: '',
                        site: '',
                        email: '',
                        situacao: 1, // Defina a situação como desejado
                        uf: 'MA'
                    };
                } else if (linha.includes('Endereço:')) {
                    leiloeiro.endereco = linha.split('Endereço:')[1].trim();
                } else if (linha.includes('Contato:')) {
                    leiloeiro.telefone = linha.split('Contato:')[1].trim();
                } else if (linha.includes('E-mail:')) {
                    leiloeiro.email = linha.split('E-mail:')[1].trim();
                } else if (linha.includes('Site:')) {
                    leiloeiro.site = linha.split('Site:')[1].trim();
                    leiloeiro.site = leiloeiro.site.replace(/<[^>]*>/g, '').trim();
                }
            }

            if (leiloeiro) leiloeiros.push(leiloeiro);

            leiloeiros.forEach(function(leiloeiro) {
                leiloeiro.nome = leiloeiro.nome.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                leiloeiro.dataPosse = leiloeiro.dataPosse.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '').replace(/: /g, '');
                leiloeiro.matricula = leiloeiro.matricula.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '').replace(/: /g, '');
                leiloeiro.endereco = leiloeiro.endereco.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');

                if (leiloeiro.endereco.includes('Contato')) {
                    leiloeiro.endereco = leiloeiro.endereco.split('Contato')[0];
                }

                if (leiloeiro.matricula.includes('-')) {
                    leiloeiro.matricula = leiloeiro.matricula.split('-')[0];
                }

                if (leiloeiro.matricula.includes('Nº')) {
                    // pega tudo depois de Nº
                    leiloeiro.matricula = leiloeiro.matricula.split('Nº ')[1];
                }

                if (leiloeiro.email) {
                    leiloeiro.email = leiloeiro.email.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                    if (leiloeiro.email.includes('mailto:')){
                    leiloeiro.email = leiloeiro.email.split('">')[1].split('</a>')[0];
                    }
                } if (leiloeiro.telefone) {
                        leiloeiro.telefone = leiloeiro.telefone.replace(/<h4>/g, '').replace(/<\/h4>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/&nbsp;/g, '');
                        if (leiloeiro.telefone.includes('<a href="callto:')){
                        leiloeiro.telefone = leiloeiro.telefone.split('">')[1].split('</a>')[0];
                        }
                }
            });

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

module.exports = MA;

/* const chamada = MA();
chamada.then(function(result) {
  const json = JSON.stringify(result, null, 2);
    // console.log(json);
    // Transforma em CSV
    const csv = require('json2csv').parse(result); 
    console.log(csv);

 }
 ); */

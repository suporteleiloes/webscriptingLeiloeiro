const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function TO() {
  const chrome = require("selenium-webdriver/chrome");
  const options = new chrome.Options();
  options.addArguments("--headless");
  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
  //  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get("https://faetrural.com.br/pagina-leiloeiros-credenciados.html");
  await driver.manage().window().maximize();
    try {
        let leiloeiros = [];
        let leiloeiro = null;
        const base = await driver.findElements(By.xpath("/html/body/div[4]/div/div/div[2]/div/div/div[2]/p[2]"));
        const html = await base[0].getAttribute("innerHTML");
        // console.log(html)
        const regex = /Nome(.+?)<br>/g;

        while ((match = regex.exec(html)) != null) {
            nome = match[1];
            nome = nome.replace(/<.+?>/g, "");
            nome = nome.replace(/:.+?;/g, "");
            nome = nome.replace(/:.+?/g, "");
            nome = nome.replace(/;.+/g, "");
            nome = nome.replace(/;/g, "");
            nome = nome.replace(/:/g, "");
            nome.trim();
    
            leiloeiro = { nome }
            leiloeiros.push(leiloeiro);     
            }
    

        return leiloeiros;
    } catch (e) {
        console.log(e);
        await driver.quit();
      } finally {
        await driver.quit();
      }
    }
    

module.exports = TO;


/* const chamada = TO();
chamada.then(function (result) {
  //console.log(result);
  const json = JSON.stringify(result, null, 2);
  console.log(json);
  // Transforma em CSV
  // const csv = require('json2csv').parse(result);
  //console.log(csv);
}); */





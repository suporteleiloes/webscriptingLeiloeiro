const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function RS() {
  const chrome = require("selenium-webdriver/chrome");
  const options = new chrome.Options();
  options.addArguments("--headless");
  // let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get(
    "https://www.farsul.org.br/https:/www.farsul.org.br/farsul/farsul-divulga-relacao-de-leiloeiros-recadastrados-no-estado,412481.jhtml"
  );
  await driver.manage().window().maximize();

    // pega os dados de /html/body/div[2]/section/div/div[1]/article/div/div/div/div[2]/table/tbody
    const base = await driver.findElements(
      By.xpath(
        "/html/body/div[2]/section/div/div[1]/article/div/div/div/div[2]/table/tbody/tr"
      )
    );
    let leiloeiros = [];
    let leiloeiro = null;

  try {

    const base_html = await driver
      .findElement(By.xpath("/html/body/div[2]/section/div/div[1]/article/div/div/div/div[2]/table/tbody"))
      .getAttribute("innerHTML");

      // faz um loop para percorrer todos os "<span class="CharOverride-2">" "</span>"
      // e pegar o texto entre eles
      let nome = "";

      const regex = /<span class="CharOverride-2">(.+?)<\/span>/g;

      while ((match = regex.exec(base_html)) != null) {
        nome = match[1];

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

module.exports = RS;

/* const chamada = RS();
chamada.then(function (result) {
  //console.log(result);
  const json = JSON.stringify(result, null, 2);
  console.log(json);
  // Transforma em CSV
  // const csv = require('json2csv').parse(result);
  //console.log(csv);
});

 */
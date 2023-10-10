const fs = require("fs");
const json2csv = require("json2csv").parse;
const csvtojsonV2=require("csvtojson");
const path = require("path");

const leiloeiro_csvFolder = path.join(__dirname, "leiloeiros/csv");
const leiloeiro_jsonFolder = path.join(__dirname, "leiloeiros/json");
const federacao_csvFolder = path.join(__dirname, "federacoes/csv");
const federacao_jsonFolder = path.join(__dirname, "federacoes/json");

const ac = require("./leiloeiros/UF/ac");
const al = require("./leiloeiros/UF/al");
const am = require("./leiloeiros/UF/am");
const ap = require("./leiloeiros/UF/ap");
const ba = require("./leiloeiros/UF/ba");
const ce = require("./leiloeiros/UF/ce");
const df = require("./leiloeiros/UF/df");
const go = require("./leiloeiros/UF/go");
const ma = require("./leiloeiros/UF/ma");
const mg = require("./leiloeiros/UF/mg");
const ms = require("./leiloeiros/UF/ms");
const mt = require("./leiloeiros/UF/mt");
const pb = require("./leiloeiros/UF/pb");
const pe = require("./leiloeiros/UF/pe");
const pi = require("./leiloeiros/UF/pi");
const pr = require("./leiloeiros/UF/pr");
const rj = require("./leiloeiros/UF/rj");
const rn = require("./leiloeiros/UF/rn");
const ro = require("./leiloeiros/UF/ro");
const rr = require("./leiloeiros/UF/rr");
const rs = require("./leiloeiros/UF/rs");
const sc = require("./leiloeiros/UF/sc");
const se = require("./leiloeiros/UF/se");
const sp = require("./leiloeiros/UF/sp");
const to = require("./leiloeiros/UF/to");

const rs_federacao = require("./federacoes/UF/rs");

async function getLeiloeiros() {
  try {
    const UF_FUNCTIONS = [
      { name: "rj", func: rj },
      { name: "ac", func: ac },
      { name: "al", func: al },
      { name: "am", func: am },
      { name: "ap", func: ap },
      { name: "ba", func: ba },
      { name: "ce", func: ce },
      { name: "df", func: df },
      { name: "go", func: go },
      { name: "ma", func: ma },
      { name: "mg", func: mg },
      // { name: "ms", func: ms },
      { name: "mt", func: mt },
      { name: "pb", func: pb },
      { name: "pe", func: pe },
      { name: "pi", func: pi },
      { name: "pr", func: pr },
      { name: "rn", func: rn },
      { name: "ro", func: ro },
      { name: "rr", func: rr },
      { name: "rs", func: rs },
      { name: "sc", func: sc },
      { name: "se", func: se },
      { name: "sp", func: sp },
      // { name: "to", func: to },
    ];

    for (let i = 0; i < UF_FUNCTIONS.length; i++) {
      const { name, func } = UF_FUNCTIONS[i];
      let success = false;
      while (!success) {
        try {
          const data = await func();
          await exportJson(data, name);
          await exportCsv(data, name);
          success = true;
        } catch (error) {
          console.log(`Erro em ${name}: ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getFederacao() {
  try {
    const UF_FUNCTIONS = [
      { name: "rs", func: rs_federacao },
    ];

    for (let i = 0; i < UF_FUNCTIONS.length; i++) {
      const { name, func } = UF_FUNCTIONS[i];
      let success = false;
      while (!success) {
        try {
          const data = await func();
          await fed_exportJson(data, name);
          await fed_exportCsv(data, name);
          success = true;
        } catch (error) {
          console.log(`Erro em ${name}: ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

mergeCsv = () => {
      const files = fs.readdirSync(leiloeiro_csvFolder);
      let merged = "";

        files.forEach((file) => {
          const filePath = path.join(leiloeiro_csvFolder, file);
          const data = fs.readFileSync(filePath, "utf8");
          merged += data;
        });

      fs.writeFileSync(path.join(leiloeiro_csvFolder, "br.csv"), merged);
}

completeJson = () => {
  const csv = fs.readFileSync(path.join(leiloeiro_csvFolder, "br.csv"), "utf8");
  
        csvtojsonV2({
          noheader:false,
          output: "json"
        })
        .fromString(csv)
        .then((jsonObj)=>{
          fs.writeFileSync(path.join(leiloeiro_jsonFolder, "br.json"), JSON.stringify(jsonObj));
        })

}

async function exportJson(data, name) {
  if (!fs.existsSync(leiloeiro_jsonFolder)) {
    fs.mkdirSync(leiloeiro_jsonFolder);
  }

  fs.writeFile(
    path.join(leiloeiro_jsonFolder, `${name}.json`),
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
    }
  );
}

async function exportCsv(data, name) {
  if (!fs.existsSync(leiloeiro_csvFolder)) {
    fs.mkdirSync(leiloeiro_csvFolder);
  }

  fs.writeFile(
    path.join(leiloeiro_csvFolder, `${name}.csv`),
    json2csv(data),
    function (err) {
      if (err) throw err;
    }
  );
}

async function fed_exportJson(data, name) {
  if (!fs.existsSync(federacao_jsonFolder)) {
    fs.mkdirSync(federacao_jsonFolder);
  }

  fs.writeFile(
    path.join(federacao_jsonFolder, `${name}.json`),
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
    }
  );
}

async function fed_exportCsv(data, name) {
  if (!fs.existsSync(federacao_csvFolder)) {
    fs.mkdirSync(federacao_csvFolder);
  }

  fs.writeFile(
    path.join(federacao_csvFolder, `${name}.csv`),
    json2csv(data),
    function (err) {
      if (err) throw err;
    }
  );
}

getLeiloeiros()
  .then(() => mergeCsv())
  .then(() => completeJson());

getFederacao()
const fs = require("fs");
const json2csv = require("json2csv").parse;
const csvtojsonV2=require("csvtojson");
const path = require("path");

const csvFolder = path.join(__dirname, "csv");
const jsonFolder = path.join(__dirname, "json");

const ac = require("./UF/ac");
const al = require("./UF/al");
const am = require("./UF/am");
const ap = require("./UF/ap");
const ba = require("./UF/ba");
const ce = require("./UF/ce");
const df = require("./UF/df");
const go = require("./UF/go");
const ma = require("./UF/ma");
const mg = require("./UF/mg");
const ms = require("./UF/ms");
const mt = require("./UF/mt");
const pb = require("./UF/pb");
const pe = require("./UF/pe");
const pi = require("./UF/pi");
const pr = require("./UF/pr");
const rj = require("./UF/rj");
const rn = require("./UF/rn");
const ro = require("./UF/ro");
const rr = require("./UF/rr");
const rs = require("./UF/rs");
const sc = require("./UF/sc");
const se = require("./UF/se");
const sp = require("./UF/sp");
const to = require("./UF/to");

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

mergeCsv = () => {
  const files = fs.readdirSync(csvFolder);
  let merged = "";

  files.forEach((file) => {
    const filePath = path.join(csvFolder, file);
    const data = fs.readFileSync(filePath, "utf8");
    merged += data;
  });

  fs.writeFileSync(path.join(csvFolder, "br.csv"), merged);
}

completeJson = () => {
  const csv = fs.readFileSync(path.join(csvFolder, "br.csv"), "utf8");
  
  csvtojsonV2({
    noheader:false,
    output: "json"
  })
  .fromString(csv)
  .then((jsonObj)=>{
    fs.writeFileSync(path.join(jsonFolder, "br.json"), JSON.stringify(jsonObj));
  })

}

async function exportJson(data, name) {
  if (!fs.existsSync(jsonFolder)) {
    fs.mkdirSync(jsonFolder);
  }

  fs.writeFile(
    path.join(jsonFolder, `${name}.json`),
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
    }
  );
}

async function exportCsv(data, name) {
  if (!fs.existsSync(csvFolder)) {
    fs.mkdirSync(csvFolder);
  }

  fs.writeFile(
    path.join(csvFolder, `${name}.csv`),
    json2csv(data),
    function (err) {
      if (err) throw err;
    }
  );
}

getLeiloeiros()
  .then(() => mergeCsv())
  .then(() => completeJson());
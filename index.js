const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path');

const csvFolder = path.join(__dirname, 'csv');
const jsonFolder = path.join(__dirname, 'json');

const ma = require('./UF/ma');
const mg = require('./UF/mg');
const mt = require('./UF/mt');
const pb = require('./UF/pb');
const pe = require('./UF/pe');
const pi = require('./UF/pi');
const pr = require('./UF/pr');
const rr = require('./UF/rr');
const to = require('./UF/to');
const sc = require('./UF/sc');
const rs = require('./UF/rs');
const ro = require('./UF/ro');

async function getLeiloeiros() {
      const leiloeiros = [
        ...await mg(),
        ...await ma(),
        ...await pb(),
        ...await mt(),
        ...await pi(),
        ...await pe(),
        ...await rr(),
        ...await pr(),
        ...await to(),
        ...await rs(),
        ...await ro(),
        ...await sc()
                        ];
                
                        
      await exportJson(leiloeiros, 'leiloeiros');
      await exportCsv(leiloeiros, 'leiloeiros');

      return `Foram encontrados ${leiloeiros.length} leiloeiros`;
}

async function exportJson(data, name) {
  fs.writeFile(path.join(jsonFolder, `${name}.json`), JSON.stringify(data), function (err) {
    if (err) throw err;
  });

  if (!fs.existsSync(jsonFolder)) {
    fs.mkdirSync(jsonFolder);
  }  
}

async function exportCsv(data, name) {
  if (!fs.existsSync(csvFolder)) {
    fs.mkdirSync(csvFolder);
  }

  fs.writeFile(path.join(csvFolder, `${name}.csv`), json2csv(data), function (err) {
    if (err) throw err;
  });
}


getLeiloeiros()





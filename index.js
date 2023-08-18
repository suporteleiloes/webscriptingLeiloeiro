const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path');

const csvFolder = path.join(__dirname, 'csv');
const jsonFolder = path.join(__dirname, 'json');

const ba = require('./UF/ba');
const am = require('./UF/am');
const ap = require('./UF/ap');
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
const se = require('./UF/se');
const rs = require('./UF/rs');
const ro = require('./UF/ro');
const go = require('./UF/go');



async function getLeiloeiros() {

      const BA = await ba();
      await exportJson(BA, 'ba');
      await exportCsv(BA, 'ba');

      const AM = await am();
      await exportJson(AM, 'am');
      await exportCsv(AM, 'am');

      const AP = await ap();
      await exportJson(AP, 'ap');
      await exportCsv(AP, 'ap');
           
      const SC = await sc();
      await exportJson(SC, 'sc');
      await exportCsv(SC, 'sc');

      const RO = await ro();
      await exportJson(RO, 'ro');
      await exportCsv(RO, 'ro');

      const RS = await rs();
      await exportJson(RS, 'rs');
      await exportCsv(RS, 'rs');

      const TO = await to();
      await exportJson(TO, 'to');
      await exportCsv(TO, 'to');

      const PR = await pr();
      await exportJson(PR, 'pr');
      await exportCsv(PR, 'pr');

      const RR = await rr();
      await exportJson(RR, 'rr');
      await exportCsv(RR, 'rr');

      const PE = await pe();
      await exportJson(PE, 'pe');
      await exportCsv(PE, 'pe');

      const PI = await pi();
      await exportJson(PI, 'pi');
      await exportCsv(PI, 'pi');

      const MT = await mt();
      await exportJson(MT, 'mt');
      await exportCsv(MT, 'mt');

      const PB = await pb();
      await exportJson(PB, 'pb');
      await exportCsv(PB, 'pb');

      const MA = await ma();
      await exportJson(MA, 'ma');
      await exportCsv(MA, 'ma');

      const MG = await mg();
      await exportJson(MG, 'mg');
      await exportCsv(MG, 'mg');

      const GO = await go();
      await exportJson(GO, 'go');
      await exportCsv(GO, 'go');

      const SE = await se();
      await exportJson(SE, 'se');
      await exportCsv(SE, 'se');

      const Br = [
            ...BA,
            ...AM,
            ...AP,
            ...SC,
            ...RO,
            ...RS,
            ...TO,
            ...PR,
            ...RR,
            ...PE,
            ...PI,
            ...MT,
            ...PB,
            ...MA,
            ...MG,
            ...GO,
            ...SE
      ];

      await exportJson(Br, 'br');
      await exportCsv(Br, 'br');
      
      return `Foram encontrados ${Br.length} leiloeiros`;
}

async function exportJson(data, name) {
  if (!fs.existsSync(jsonFolder)) {
    fs.mkdirSync(jsonFolder);
  }  
  
  fs.writeFile(path.join(jsonFolder, `${name}.json`), JSON.stringify(data), function (err) {
    if (err) throw err;
  });
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

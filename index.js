const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path');

const csvFolder = path.join(__dirname, 'csv');
const jsonFolder = path.join(__dirname, 'json');

const al = require('./UF/al');
const am = require('./UF/am');
const ap = require('./UF/ap');
const ba = require('./UF/ba');
const ce = require('./UF/ce');
const df = require('./UF/df');
const go = require('./UF/go');
const ma = require('./UF/ma');
const mg = require('./UF/mg');
const ms = require('./UF/ms');
const mt = require('./UF/mt');
const pb = require('./UF/pb');
const pe = require('./UF/pe');
const pi = require('./UF/pi');
const pr = require('./UF/pr');
const rj = require('./UF/rj');
const rn = require('./UF/rn');
const ro = require('./UF/ro');
const rr = require('./UF/rr');
const rs = require('./UF/rs');
const sc = require('./UF/sc');
const se = require('./UF/se');
const sp = require('./UF/sp');
const to = require('./UF/to');
const AL = require('./UF/al');

async function getLeiloeiros() {

        const AL = await al();
        await exportJson(AL, 'al');
        await exportCsv(AL, 'al');

        const AM = await am();
        await exportJson(AM, 'am');
        await exportCsv(AM, 'am');

        const AP = await ap();
        await exportJson(AP, 'ap');
        await exportCsv(AP, 'ap');

        const BA = await ba();
        await exportJson(BA, 'ba');
        await exportCsv(BA, 'ba');

        const CE = await ce();
        await exportJson(CE, 'ce');
        await exportCsv(CE, 'ce');

        const DF = await df();
        await exportJson(DF, 'df');
        await exportCsv(DF, 'df');

        const GO = await go();
        await exportJson(GO, 'go');
        await exportCsv(GO, 'go');

        const MA = await ma();
        await exportJson(MA, 'ma');
        await exportCsv(MA, 'ma');

        const MG = await mg();
        await exportJson(MG, 'mg');
        await exportCsv(MG, 'mg');

        const MS = await ms();
        await exportJson(MS, 'ms');
        await exportCsv(MS, 'ms');

        const MT = await mt();
        await exportJson(MT, 'mt');
        await exportCsv(MT, 'mt');

        const PB = await pb();
        await exportJson(PB, 'pb');
        await exportCsv(PB, 'pb');

        const PE = await pe();
        await exportJson(PE, 'pe');
        await exportCsv(PE, 'pe');

        const PI = await pi();
        await exportJson(PI, 'pi');
        await exportCsv(PI, 'pi');

        const PR = await pr();
        await exportJson(PR, 'pr');
        await exportCsv(PR, 'pr');

        const RJ = await rj();
        await exportJson(RJ, 'rj');
        await exportCsv(RJ, 'rj');

        const RN = await rn();
        await exportJson(RN, 'rn');
        await exportCsv(RN, 'rn');

        const RO = await ro();
        await exportJson(RO, 'ro');
        await exportCsv(RO, 'ro');

        const RR = await rr();
        await exportJson(RR, 'rr');
        await exportCsv(RR, 'rr');

        const RS = await rs();
        await exportJson(RS, 'rs');
        await exportCsv(RS, 'rs');

        const SC = await sc();
        await exportJson(SC, 'sc');
        await exportCsv(SC, 'sc');

        const SE = await se();
        await exportJson(SE, 'se');
        await exportCsv(SE, 'se');

        const SP = await sp();
        await exportJson(SP, 'sp');
        await exportCsv(SP, 'sp');

        const TO = await to();
        await exportJson(TO, 'to');
        await exportCsv(TO, 'to');

      const Br = [
            ...AL,
            ...AM,
            ...AP,
            ...BA,
            ...CE,
            ...DF,
            ...GO,
            ...MA,
            ...MG,
            ...MS,
            ...MT,
            ...PB,
            ...PE,
            ...PI,
            ...PR,
            ...RJ,
            ...RN,
            ...RO,
            ...RR,
            ...RS,
            ...SC,
            ...SE,
            ...SP,
            ...TO
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

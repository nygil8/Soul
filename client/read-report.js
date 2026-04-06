import fs from 'fs';
let text = fs.readFileSync('report.json', 'utf8');
if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
const d = JSON.parse(text);
const errs = d.suites[0].specs[0].tests[0].results[0].errors;
console.log(errs.map(e => e.message).join('\n---\n'));
fs.writeFileSync('err2.txt', errs.map(e => e.message).join('\n---\n'), 'utf8');

const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

const inputPath = path.resolve('public/logo.png');

potrace.trace(inputPath, {
  threshold: 128,
  optCurve: true,
  alphaMax: 1.0,
  turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY
}, (err, svg) => {
  if (err) throw err;
  fs.writeFileSync('public/traced_potrace.svg', svg);
  console.log('Saved public/traced_potrace.svg');
});

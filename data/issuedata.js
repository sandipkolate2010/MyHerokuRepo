var fs = require("fs"),
    issues;

function readProductFileSync(filepath, encoding) {
  if (typeof (encoding) == 'undefined') {
    encoding = 'utf8';
  }
  var file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getProducts(file) {
  console.log('11111issuedata');
  var filepath = __dirname + '/' + file;
  return readProductFileSync(filepath);
}

module.exports = getProducts('issues.json');

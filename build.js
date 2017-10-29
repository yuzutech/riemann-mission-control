const fs = require('fs');
fs.createReadStream('node_modules/bulma/css/bulma.css')
  .pipe(fs.createWriteStream('src/main/resources/webroot/css/bulma.css'));

const nunjucks = require('nunjucks');
const axios = require('axios');
const agent = require('global-agent');
const fs = require("fs");

agent.bootstrap();

// Telegram.list
axios.get('https://core.telegram.org/resources/cidr.txt')
  .then(function (response) {
    resData = response.data;
    arrayIP = resData.split('\n').map(x => x.trim()).filter(x => x);
    IPv4Set = [];
    IPv6Set = [];
    for (itermIP of arrayIP) {
      if (itermIP.trim()) {
        if (itermIP.indexOf(".") != -1) {
          IPv4Set.push(itermIP);
        } else {
          IPv6Set.push(itermIP);
        }
      }
    }
    nunjucks.configure({
      autoescape: true
    });
    telegramText = nunjucks.render(`${__dirname}/Template/telegram.njk`, {
      IPv4Set,
      IPv6Set
    });
    fs.writeFile(`${__dirname}/../../Surge/RuleSet/Telegram.list`, telegramText, function (err) {
      if (err) {
        return console.error(err);
      }
    });
  })
  .catch(function (err) {
    console.error(err);
    process.exit(1)
  });
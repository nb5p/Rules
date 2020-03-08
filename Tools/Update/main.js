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
        nunjucks.configure({ autoescape: true });
        telegramText = nunjucks.render(`${__dirname}/Template/telegram.njk`, { IPv4Set, IPv6Set });
        fs.writeFile(`${__dirname}/../../Surge/Rule-Set/Telegram.list`, telegramText, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }).catch(function (err) {
        console.error(err);
    });

// Neteease-Music.list
axios.get('https://neteasemusic.xcpx.workers.dev/')
    .then(function (response) {
        resData = response.data;
        var position = resData.indexOf("\n") + 1;
        var neteasemusicText = resData.substring(position);
        fs.writeFile(`${__dirname}/../../Surge/Rule-Set/NeteaseMusic.list`, neteasemusicText, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    });
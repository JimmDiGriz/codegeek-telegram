/**
 * Created by JimmDiGriz on 23.02.2017.
 */

'use strict';

let config = require('./config');

let Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
Telegram = new Telegram.Telegram(config.telegram_token,
    {
        webAdmin: {
            port: 10003,
            host: '192.168.0.140'
        }
    });

let EchoController = require('./controllers/echo-controller');
let PizzaController = require('./controllers/pizza-controller');

Telegram.router
//    .when(
//    new TextCommand('', 'echoCommand'),
//    new EchoController()
//)
    .when(
    new TextCommand('/pizza', 'menuCommand'),
    new PizzaController()
);
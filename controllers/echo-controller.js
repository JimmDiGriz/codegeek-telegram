/**
 * Created by JimmDiGriz on 23.02.2017.
 */

'use strict';

let Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

class EchoController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    echoHandler($) {
        $.sendMessage($.message.text);
    }

    get routes() {
        return {
            'echoCommand': 'echoHandler'
        }
    }
}

module.exports = EchoController;
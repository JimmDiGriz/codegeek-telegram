/**
 * Created by JimmDiGriz on 23.02.2017.
 */

'use strict';

let Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

let _ = require('lodash');

let OrderPizzaForm = require('../forms/order-pizza-form');

class PizzaController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    menuHandler($) {
        if ($.message.chat.type == 'group') {
            $.sendMessage('Нельзя вызывать меню из группы, напиши мне в личку @codegeek_bot');
            return;
        }

        let form = new OrderPizzaForm();

        form.start($);
    }

    get routes() {
        return {
            'menuCommand': 'menuHandler'
        }
    }
}

module.exports = PizzaController;
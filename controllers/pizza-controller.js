/**
 * Created by JimmDiGriz on 23.02.2017.
 */

'use strict';

let Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

let _ = require('lodash');
let config = require('../config');

let OrderPizzaForm = require('../forms/order-pizza-form');
let Order = require('../models/order');

let redis = require('../storage');

class PizzaController extends TelegramBaseController {
    constructor() {
        super();
    }

    /**
     * @param {Scope} $
     */
    menuHandler($) {
        if ($.message.chat.type == 'group') {
            $.sendMessage('Нельзя вызывать меню из группы, напиши мне в личку @codegeek_bot');
            return;
        }

        redis.get('currentOrder', (err, reply) => {
            console.log(reply);

            if (!_.isEmpty(reply)) {
                $.sendMessage('Нельзя оформить еще один заказ');
                return;
            }

            let form = new OrderPizzaForm();

            form.start($);
        });
    }

    /**
     * @param {Scope} $
     */
    currentHandler($) {
        if ($.message.chat.type == 'group') {
            $.sendMessage('Нельзя узнать текущий заказ из группы, напиши мне в личку @codegeek_bot');
            return;
        }

        redis.get('currentOrder', (err, reply) => {
            if (_.isNil(reply)) {
                $.sendMessage('Заказа нет');
                return;
            }

            let data = new Order(reply);

            $.sendMessage(data.toChatMessage());
        });
    }

    get routes() {
        return {
            'menuCommand': 'menuHandler',
            'currentCommand': 'currentHandler'
        }
    }
}

module.exports = PizzaController;
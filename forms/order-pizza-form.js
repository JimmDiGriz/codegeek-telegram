/**
 * Created by JimmDiGriz on 23.02.2017.
 */

'use strict';

let _ = require('lodash');
let constants = require('../values/constants');
let Order = require('../models/order');
let redis = require('../storage');

class OrderPizzaForm {
    /**
     * @param {Scope} $
     **/
    start($) {
        let form = {
            name: {
                q: 'Введите название пиццы',
                error: constants.errors.something_wrong,
                validator: (message, callback) => {
                    if(!_.isNil(message.text) && !_.toNumber(message.text)) {
                        callback(true, message.text);
                        return;
                    }

                    callback(false);
                }
            },
            url: {
                q: 'Введите ссылку на пиццу',
                error: constants.errors.something_wrong,
                validator: (message, callback) => {
                    if(!_.isNil(message.text) && !_.toNumber(message.text)) {
                        callback(true, message.text);
                        return;
                    }

                    callback(false);
                }
            },
            price: {
                q: 'Введите цену пиццы',
                error: constants.errors.something_wrong,
                validator: (message, callback) => {
                    if(!_.isNil(message.text) && _.isNumber(_.toNumber(message.text)) && _.toNumber(message.text) > 0) {
                        callback(true, _.toNumber(message.text));
                        return;
                    }

                    callback(false);
                }
            },
            size: {
                q: 'Введите размер пиццы',
                error: constants.errors.something_wrong,
                keyboard: [['25'], ['30'], ['40'], ['50']],
                validator: (message, callback) => {
                    if(!_.isNil(message.text) && ['25', '30', '40', '50'].indexOf(message.text) > -1) {
                        callback(true, _.toNumber(message.text));
                        return;
                    }

                    callback(false);
                }
            },
            comment: {
                q: 'Введите дополнительную информацию',
                error: constants.errors.something_wrong,
                keyboard: null,
                validator: (message, callback) => {
                    if(!_.isNil(message.text) && !_.toNumber(message.text)) {
                        callback(true, message.text);
                        return;
                    }

                    callback(false);
                }
            }
        };

        $.runForm(form, (result) => {
            result.username = $.message.from.username;

            redis.set('currentOrder', JSON.stringify(result));

            console.log(result);

            $.sendMessage('Заказ принят');
        })
    }
}

module.exports = OrderPizzaForm;
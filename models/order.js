/**
 * Created by JimmDiGriz on 23.02.2017.
 */

'use script';

class Order {
    constructor(data) {
        data = this.data = JSON.parse(data);

        this.username = data.username;
        this.name = data.name;
        this.url = data.url;
        this.price = data.price;
        this.comment = data.comment;
        this.size = data.size;
    }

    toChatMessage() {
        return `Название: ${this.name}\nСсылка: ${this.url}\nРазмер: ${this.size}\nЦена: ${this.price}\nКомментарий: ${this.comment}\n Деньги отдавать ${this.username}`;
    }

}

module.exports = Order;
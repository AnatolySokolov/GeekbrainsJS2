'use strict';

(function () {

  // const API_URL = 'http://localhost:3000/db.json';

  const makeGETRequest = (cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/data.json');
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        cb(xhr.responseText);
      }
    };
    xhr.send();
  };

  class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }

    render() {
      return `<li class="product__item item-card">
       <a class="item-card__link" href="#">
         <h3 class="item-card__item-title">${this.title}</h3>
         <p class="item-card__price">${this.price}</p>
         <p class="item-card__stars"></p>
         <img class="item-card__img" src="img/product__img1.jpg" width="263" height="281" alt="mango people t-shirt">
       </a>
       <button class="item-card__cart" type="button">
        <span>Add to Cart</span>
       </button>
    </li>`;
    }
  }

  class GoodList {
    constructor() {
      this.goods = [];
    }

    fetchGoods(cb) {
      // this.goods = [
      //   {title: 'mango people t-shirt1', price: 52},
      //   {title: 'mango people t-shirt2', price: 52},
      //   {title: 'mango people t-shirt3', price: 52},
      //   {title: 'mango people t-shirt4', price: 52},
      //   {title: 'mango people t-shirt5', price: 52},
      //   {title: 'mango people t-shirt6', price: 52}
      // ];
      makeGETRequest(goods => {
        this.goods = JSON.parse(goods);
        cb();
      });
    }

    render() {
      const reducer = (acc, good) => {
        const goodItem = new GoodsItem(good.title, good.price);
        return acc + goodItem.render();
      };
      document.querySelector('.product__list').innerHTML = this.goods.reduce(reducer, '');
    }
  }

  class CartItem {
    constructor(title, price, img) {
      this.title = title;
      this.price = price;
      this.img = img;
    }

    render() {
      return `<li class="cart__item">
      <a class="cart__link" href="#">
        <div>
          <h3 class="cart__title">${this.title}</h3>
          <div class="cart__rating"></div>
          <p class="cart__quantity-and-price">
            <span>1</span>
            <span class="cart__letter-decoration"> x </span>
            <span>$ ${this.price}</span>
          </p>
        </div>
        <img class="cart__img" src="${this.img}"  width="72" height="85" alt="#">
      </a>
      <button class="cart__delete" type="button">
        <span class="visually-hidden">Delete the item from cart</span>
      </button>
    </li>`;
    }
  }

  class Cart {
    constructor() {
      this.list = [];
    }

    add() {
      // добваление товара в корзину
      this.list = [
        {title: 'rebox zane', price: 250, imgUrl: 'img/cart__product1.jpg'},
        {title: 'rebox zane', price: 250, imgUrl: 'img/cart__product2.jpg'}
      ];
    }

    remove() {
      // удаление товара из корзины
    }

    clear() {
      // отчистка корзины
      this.list = [];
    }

    countTotalCost() {
      // подсчет общей стоимость корзины
      return this.list.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
      const reducer = (acc, item) => {
        const cartItem = new CartItem(item.title, item.price, item.imgUrl);
        return acc + cartItem.render();
      };
      document.querySelector('.cart__list').innerHTML = this.list.reduce(reducer, '');
    }
  }

  const list = new GoodList();
  // list.fetchGoods();
  // list.render();
  list.fetchGoods(() => list.render());

  const cart = new Cart();
  cart.add();
  cart.render();
  // alert('суммарная стоимость корзины: ' + cart.countTotalCost());
})();

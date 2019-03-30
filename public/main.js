'use strict';

(function () {

  const DATA_URL = 'data';
  let goods = [];

  const sendRequest = url => {
    return fetch(url)
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
      .catch(error => console.log(error.message));
  };

  const onAddToCartButtonClick = e => {
    let id;

    if (e.target.classList.contains('item-card__cart')) {
      id = e.target.dataset.productId;
    } else if (e.target.classList.contains('item-card__cart-text')) {
      id = e.target.parentElement.dataset.productId;
    }
    if (id) {
      cart.add(id);
      cart.render();
    }
  };

  const onDeleteButtonClick = e => {
    if (e.target.classList.contains('cart__delete')) {
      const id = e.target.dataset.productId;
      cart.remove(id);
      cart.render();
    }
  };

  const onClearCartButtonClick = () => {
    cart.clear();
    cart.render();
  };

  class GoodsItem {
    constructor(title, price, img, id) {
      this.title = title;
      this.price = price;
      this.img = img;
      this.id = id;
    }

    render() {
      return `<li class="product__item item-card">
       <a class="item-card__link" href="#">
         <h3 class="item-card__item-title">${this.title}</h3>
         <p class="item-card__price">${this.price}</p>
         <p class="item-card__stars"></p>
         <img class="item-card__img" src=${this.img} width="263" height="281" alt="mango people t-shirt">
       </a>
       <button class="item-card__cart" data-product-id=${this.id} type="button">
        <span class="item-card__cart-text">Add to Cart</span>
       </button>
    </li>`;
    }
  }

  class GoodList {
    constructor() {
      this.goods = [];
    }

    fetchGoods(url) {
      return sendRequest(url)
        .then(data => {
          goods = data;
          this.goods = data;
        });
    }

    render() {
      const reducer = (acc, good) => {
        const goodItem = new GoodsItem(good.title, good.price, good.imgUrl, good.productId);
        return acc + goodItem.render();
      };
      document.querySelector('.product__list').innerHTML = this.goods.reduce(reducer, '');
      document.querySelector('.product__list').addEventListener('click', onAddToCartButtonClick);
    }
  }

  class CartItem {
    constructor(title, price, img, id) {
      this.title = title;
      this.price = price;
      this.img = img;
      this.id = id;
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
      <button class="cart__delete" data-product-id=${this.id} type="button">
        <span class="visually-hidden">Delete the item from cart</span>
      </button>
    </li>`;
    }
  }

  class Cart {
    constructor() {
      this.list = [];
    }

    add(id) {
      // добваление товара в корзину по id-атрибуту
      const checkItem = this.list.find(item => item.productId === id);
      if (!checkItem) {
        goods.find(item => {
          if (item.productId === id) {
            this.list.push(item);
          }
        });
      }
    }

    remove(id) {
      // удаление товара из корзины по id-атрибуту
      this.list.some((item, index) => {
        if (item.productId === id) {
          this.list.splice(index, 1);
        }
      });
    }

    clear() {
      // отчистка корзины
      this.list = [];
      document.querySelector('#clear-cart').removeEventListener('click', onClearCartButtonClick);
    }

    countTotalCost() {
      // подсчет общей стоимость корзины
      return this.list.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
      const reducer = (acc, item) => {
        const cartItem = new CartItem(item.title, item.price, item.imgUrl, item.productId);
        return acc + cartItem.render();
      };
      document.querySelector('.cart__list').innerHTML = this.list.reduce(reducer, '');
      document.querySelector('.cart__list').addEventListener('click', onDeleteButtonClick);
      document.querySelector('#clear-cart').addEventListener('click', onClearCartButtonClick);
    }
  }

  const list = new GoodList();
  list.fetchGoods(DATA_URL).then(() => list.render());

  const cart = new Cart();
  // alert('суммарная стоимость корзины: ' + cart.countTotalCost());
})();

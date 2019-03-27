'use strict';

(function () {

  const DATA_URL = 'data.json';
  let goods = [];

  const makeGETRequest = url => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          resolve(xhr.responseText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  };

  const getId = e => {
    let target = e.target;

    while (target !== this) {
      if (target.hasAttribute('data-product-id')) {
        return target.getAttribute('data-product-id');
      }
      target = target.parentNode;
    }
  };

  const onAddToCartButtonClick = e => {
    const id = getId(e);
    cart.add(id);
    cart.render();
  };

  const onDeleteButtonClick = e => {
    const id = getId(e);
    cart.remove(id);
    cart.render();
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
        <span>Add to Cart</span>
       </button>
    </li>`;
    }
  }

  class GoodList {
    constructor() {
      this.goods = [];
    }

    fetchGoods(url) {
      makeGETRequest(url)
        .then((data) => {
          goods = JSON.parse(data);
          this.goods = goods;
        })
        .then(() => {
          this.render();
        })
        .catch(error => console.log(error));
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
      const checkItem = this.list.some(item => item.productId === id);
      if (!checkItem) {
        goods.some(item => {
          if(item.productId === id) {
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
  list.fetchGoods(DATA_URL);

  const cart = new Cart();
  // alert('суммарная стоимость корзины: ' + cart.countTotalCost());
})();

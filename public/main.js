'use strict';

const DATA_URL = 'data';

// class CartItem {
//   constructor(title, price, img, id) {
//     this.title = title;
//     this.price = price;
//     this.img = img;
//     this.id = id;
//   }
//
//   render() {
//     return `<li class="cart__item">
//       <a class="cart__link" href="#">
//         <div>
//           <h3 class="cart__title">{{good.title}}</h3>
//           <div class="cart__rating"></div>
//           <p class="cart__quantity-and-price">
//             <span>1</span>
//             <span class="cart__letter-decoration"> x </span>
//             <span>$ ${this.price}</span>
//           </p>
//         </div>
//         <img class="cart__img" src="${this.img}"  width="72" height="85" alt="#">
//       </a>
//       <button class="cart__delete" data-product-id=${this.id} type="button">
//         <span class="visually-hidden">Delete the item from cart</span>
//       </button>
//     </li>`;
//   }
// }

// class Cart {
//   constructor() {
//     this.list = [];
//   }
//
//   add(id) {
//     // добваление товара в корзину по id-атрибуту
//     const checkItem = this.list.find(item => item.productId === id);
//     if (!checkItem) {
//       goods.find(item => {
//         if (item.productId === id) {
//           this.list.push(item);
//         }
//       });
//     }
//   }
//
//   remove(id) {
//     // удаление товара из корзины по id-атрибуту
//     this.list.some((item, index) => {
//       if (item.productId === id) {
//         this.list.splice(index, 1);
//       }
//     });
//   }
//
//   clear() {
//     // отчистка корзины
//     this.list = [];
//     document.querySelector('#clear-cart').removeEventListener('click', onClearCartButtonClick);
//   }
//
//   countTotalCost() {
//     // подсчет общей стоимость корзины
//     return this.list.reduce((acc, item) => acc + item.price, 0);
//   }
//
//   render() {
//     const reducer = (acc, item) => {
//       const cartItem = new CartItem(item.title, item.price, item.imgUrl, item.productId);
//       return acc + cartItem.render();
//     };
//     document.querySelector('.cart__list').innerHTML = this.list.reduce(reducer, '');
//     document.querySelector('.cart__list').addEventListener('click', onDeleteButtonClick);
//     document.querySelector('#clear-cart').addEventListener('click', onClearCartButtonClick);
//   }
// }

// const cart = new Cart();

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: ''
  },
  methods: {
    sendRequest(url) {
      return fetch(url)
        .then(
          response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
        .catch(error => console.log(error.message));
    }
  },
  mounted() {
    this.sendRequest(DATA_URL).then(goods => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  }
});

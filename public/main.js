const DATA_URL = 'data';

Vue.component('product-item', {
  props: ['good'],
  template: `
    <li class="product__item item-card">
      <a class="item-card__link" href="#">
        <h3 class="item-card__item-title">{{good.title}}</h3>
        <p class="item-card__price">{{good.price}}</p>
        <p class="item-card__stars"></p>
        <img class="item-card__img" :src="good.imgUrl" width="263" height="281" alt="mango people t-shirt">
      </a>
      <button class="item-card__cart" :data-product-id="good.productId" type="button">
        <span class="item-card__cart-text">Add to Cart</span>
      </button>
    </li>
  `
});

Vue.component('product-list', {
  props: ['goods'],
  template: `
  <ul class="product__list">
    <product-item v-for="good in goods" :good="good"></product-item>
  </ul>  
  `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    cart: []
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
    },
    filterItems(expression) {
      const re = new RegExp(expression, 'i');
      this.filteredGoods = this.goods.filter(item => re.test(item.title));
    },
    addToCart(id) {
      const checkItem = this.cart.find(item => item.productId === id);
      if (!checkItem) {
        this.filteredGoods.find(item => {
          if (item.productId === id) {
            this.cart.push(item);
          }
        });
      }
    },
    removeFromCart(id) {
      this.cart.some((item, index) => {
        if (item.productId === id) {
          this.cart.splice(index, 1);
        }
      });
    },
    clearCart() {
      this.cart = [];
    },
    countTotalCost() {
      return this.cart.reduce((acc, item) => acc + item.price, 0);
    },
    onAddToCartButtonClick(e) {
      let id;

      if (e.target.classList.contains('item-card__cart')) {
        id = e.target.dataset.productId;
      } else if (e.target.classList.contains('item-card__cart-text')) {
        id = e.target.parentElement.dataset.productId;
      }
      if (id) {
        this.addToCart(id);
      }
    },
    onDeleteButtonClick(e) {
      if (e.target.classList.contains('cart__delete')) {
        const id = e.target.dataset.productId;
        this.removeFromCart(id);
      }
    },
    onCartButtonClick() {
      document.querySelector('.cart__wrapper').classList.toggle('cart__wrapper--closed');
    },
    onSearchButtonClick() {
      this.filterItems(this.searchLine);
    }
  },
  mounted() {
    this.sendRequest(DATA_URL).then(goods => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  }
});

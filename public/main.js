'use strict';

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

Vue.component('product-item', {
  props: {
    good: Object
  },
  template: `
    <li class="product__item item-card">
      <a class="item-card__link" href="#">
        <h3 class="item-card__item-title">{{good.title}}</h3>
        <p class="item-card__price">{{good.price}}</p>
        <p class="item-card__stars"></p>
        <img class="item-card__img" :src="good.imgUrl" width="263" height="281" :alt="good.title">
      </a>
      <button class="item-card__cart" type="button" @click="onAddToCartButtonClick(good)">
        <span class="item-card__cart-text">Add to Cart</span>
      </button>
    </li>
  `,
  methods: {
    onAddToCartButtonClick(item) {
      eventEmitter.$emit('transmitItemFromProductItem', item);
    }
  }
});

Vue.component('product-list', {
  template: `
    <div>
      <ul class="product__list" v-if="filteredGoods.length != 0">
        <product-item v-for="good in filteredGoods" :good="good" :key="good.productId"></product-item>
      </ul>
      <p v-else>Нет данных</p> 
    </div>
  `,
  data() {
    return {
      DATA_URL: 'data',
      goods: [],
      filteredGoods: [],
    };
  },
  mounted() {
    sendRequest(this.DATA_URL)
      .then(goods => {
        this.goods = goods;
        this.filteredGoods = goods;
      });
  },
  created() {
    eventEmitter.$on('transmitDataFromSearchComponent', query => {
      const regExp = new RegExp(query, 'i');
      this.filteredGoods = this.goods.filter(item => regExp.test(item.title));
    });
  }
});

Vue.component('search-component', {
  template: `
    <div class="search">
      <input type="text" v-model="searchLine">
      <button type="button" @click="onSearchButtonClick">Поиск</button>
    </div>
  `,
  data() {
    return {
      searchLine: ''
    };
  },
  methods: {
    onSearchButtonClick() {
      eventEmitter.$emit('transmitDataFromSearchComponent', this.searchLine);
    }
  }
});

Vue.component('cart-item', {
  props: {
    item: Object
  },
  template: `
    <li class="cart__item">
    <a class="cart__link" href="#">
      <div>
        <h3 class="cart__title">{{item.title}}</h3>
        <div class="cart__rating"></div>
        <p class="cart__quantity-and-price">
          <span>{{item.quantity}}</span>
          <span class="cart__letter-decoration"> x </span>
          <span>$ {{item.price}}</span>
        </p>
      </div>
      <img class="cart__img" :src="item.imgUrl" width="72" height="85" :alt="item.title">
    </a>
    <button class="cart__delete" type="button" @click="onDeleteButtonClick(item)">
      <span class="visually-hidden">Delete the item from cart</span>
    </button>   </li>
  `,
  methods: {
    onDeleteButtonClick(item) {
      this.$emit('onDelButtonClick', item);
    }
  }
});

Vue.component('cart-component', {
  template: `
    <div class="cart__container">
      <button class="cart-button" type="button" @click="onCartButtonClick">Корзина</button>
      <div class="cart__wrapper cart__wrapper--closed">
        <ul class="cart__list">
          <cart-item v-for="item in cart" :item="item" :key="item.productId" @onDelButtonClick="removeItem"></cart-item>
        </ul>
        <p>Итого: {{countTotalCost()}}</p>
        <button class="cart__button" type="button" @click="sendCart">Отправить на сервер</button>
        <button class="cart__button" type="button" @click="clearCart">Отчистить корзину</button>
      </div>
    </div>
  `,
  data() {
    return {
      CART_URL: 'cart',
      cart: []
    };
  },
  methods: {
    onCartButtonClick() {
      document.querySelector('.cart__wrapper').classList.toggle('cart__wrapper--closed');
    },
    removeItem(item) {
      const i = this.cart.indexOf(item);
      this.cart.splice(i, 1);
    },
    clearCart() {
      this.cart = [];
      document.querySelector('.cart__wrapper').classList.add('cart__wrapper--closed');
    },
    countTotalCost() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    sendCart() {
      // неправильно работает. поправить
      // fetch(this.CART_URL, {
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(this.cart)
      // });
    }
  },
  mounted() {
    sendRequest(this.CART_URL)
      .then(goods => this.cart = goods);
  },
  created() {
    eventEmitter.$on('transmitItemFromProductItem', item => {
      if (this.cart.indexOf(item) === -1) {
        this.cart.push(item);
      } else {
        item.quantity++;
      }
    });
  }
});

const eventEmitter = new Vue();

const app = new Vue({
  el: '#app'
});

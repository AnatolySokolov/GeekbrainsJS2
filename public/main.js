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
        <img class="item-card__img" :src="good.imgUrl" width="263" height="281" alt="mango people t-shirt">
      </a>
      <button class="item-card__cart" type="button" :data-product-id="good.productId">
        <span class="item-card__cart-text">Add to Cart</span>
      </button>
    </li>
  `
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
    this.sendRequest(this.DATA_URL)
      .then(goods => {
        this.goods = goods;
        this.filteredGoods = goods;
      });
  },
  created() {
    eventEmitter.$on('transmitDataFromSearchLine', query => {
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
      eventEmitter.$emit('transmitDataFromSearchLine', this.searchLine);
    }
  }
});

const eventEmitter = new Vue();

const app = new Vue({
  el: '#app'
});

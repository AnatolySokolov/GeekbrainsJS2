'use strict';

(function () {
  const goods = [
    {title: 'mango people t-shirt1', price: 52},
    {title: 'mango people t-shirt2', price: 52},
    {title: 'mango people t-shirt3', price: 52},
    {title: 'mango people t-shirt4', price: 52},
    {title: 'mango people t-shirt5', price: 52},
    {title: 'mango people t-shirt6', price: 52}
  ];

  const renderGoodsItem = (title, price) =>
    `<li class="product__item item-card">
       <a class="item-card__link"href="#">
         <h3 class="item-card__item-title">${title}</h3>
         <p class="item-card__price">${price}</p>
         <p class="item-card__stars"></p>
         <img class="item-card__img" src="img/product__img1.jpg" width="263" height="281" alt="mango people t-shirt">
       </a>
       <button class="item-card__cart" type="button">
        <span>Add to Cart</span>
       </button>
    </li>`;


  const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.product__list').innerHTML = goodsList.join('');
  };

  renderGoodsList(goods);
})();



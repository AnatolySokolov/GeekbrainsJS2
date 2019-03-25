'use strict';

(function () {
  const $button = document.querySelector('.cart-button');

  const onCartButtonClick = function () {
    const $container = document.querySelector('.cart__list');

    $container.classList.toggle('cart__list--opened');
  };

  $button.addEventListener('click', onCartButtonClick);
})();

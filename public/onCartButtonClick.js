'use strict';

(function () {
  const $button = document.querySelector('.cart-button');

  const onCartButtonClick = function () {
    const $container = document.querySelector('.cart__wrapper');

    $container.classList.toggle('cart__wrapper--opened');
  };

  $button.addEventListener('click', onCartButtonClick);
})();

'use strict';

const foodProperties = {
  small: {
    price: 50,
    calorie: 20
  },
  big: {
    price: 100,
    calorie: 40
  },
  cheese: {
    price: 10,
    calorie: 20
  },
  salad: {
    price: 20,
    calorie: 5
  },
  potato: {
    price: 15,
    calorie: 10
  },
  seasoning: {
    price: 15,
    calorie: 0
  },
  mayonnaise: {
    price: 20,
    calorie: 5
  }
};

const errors = {
  size: 'Нет такого размера. Есть small, big',
  stuffing: 'Нет такого наполнителя. Есть cheese, salad, potato',
  toppings: {
    no: 'Нет такой добавки. Есть seasoning, mayonnaise',
    have: 'Такая добавка уже есть',
  }
};

class Hamburger {
  constructor(size, stuffing) {
    if (size === 'small' || size === 'big') {
      this.size = size;
    } else {
      console.log(errors.size);
    }
    if (stuffing === 'cheese' || stuffing === 'salad' || stuffing === 'potato') {
      this.stuffing = stuffing;
    } else {
      console.log(errors.stuffing);
    }
    this.toppings = [];
  }

  addToppings(toppings) {
    if (toppings === 'seasoning' || toppings === 'mayonnaise') {
      const isThereToppings = this.toppings.some(item => item === toppings);
      if (!isThereToppings) {
        this.toppings.push(toppings);
      } else {
        console.log(errors.toppings.have);
      }
    } else {
      console.log(errors.toppings.no);
    }
  }

  removeToppings(toppings) {
    this.toppings.forEach((item, index) => {
      if (item === toppings) {
        this.toppings.splice(index, 1);
      }
    });
  }

  getToppings() {
    return this.toppings;
  }

  getSize() {
    return this.size;
  }

  getStuffing() {
    return this.stuffing;
  }

  getFullList() {
    const fullList = [this.size, this.stuffing];
    this.toppings.forEach(item => fullList.push(item));
    return fullList;
  }

  calculatePrice() {
    let value = 0;
    this.getFullList().forEach(item => value += foodProperties[item].price);
    return value;
  }

  calculateCalories() {
    let value = 0;
    this.getFullList().forEach(item => value += foodProperties[item].calorie);
    return value;
  }
}

const hamburger = new Hamburger('small', 'cheese');
hamburger.addToppings('seasoning')
hamburger.addToppings('mayonnaise');
console.log(hamburger);
console.log(hamburger.calculateCalories());
console.log(hamburger.calculatePrice());

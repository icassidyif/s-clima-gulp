class Cart {
  constructor(products, currency = 'грн') {
    this.products = products;
    this.currency = currency;
  }
  productCountChange(id, value) {
    this.products[id]['count'] = value;
  }
  productPlus(id) {
    if(!this.products[id]['count']) {
      this.products[id]['count'] = 1;
    } else {
      this.products[id]['count']++;
    }
  }
  productMinus(id) {
    if(!this.products[id]['count']) {
      this.products[id]['count'] = 1;
    } else {
      if(this.products[id]['count'] >= 2){
        this.products[id]['count']--;
      }
    }
  }
  productRemove(id) {
    delete this.products[id];
  }
  getTotal() {
    let total = 0;
    for (let key in this.products) {
      total += (this.products[key]['count'] || 1) * this.products[key]['price'];
    }
    return total;
  }
  buildRemoveBtn(id) {
    let cartRemoveBnt = document.createElement('div');
    cartRemoveBnt.classList.add(`cart__remove`);
    cartRemoveBnt.setAttribute('data-id',id);
    cartRemoveBnt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" fill="none" viewBox="0 0 17 17" id="remove-cart-item"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 9.914l-6.793 6.793-1.414-1.414L7.086 8.5.293 1.707 1.707.293 8.5 7.086 15.293.293l1.414 1.414L9.914 8.5l6.793 6.793-1.414 1.414L8.5 9.914z" fill="#D11586" fill-opacity=".5"></path></svg>';
    return cartRemoveBnt;
  }
  buildCartItem(product, count, id) {
    // main div for cart__item
    const cartItem = document.createElement('div');
    cartItem.classList.add(`cart__item`);
    cartItem.classList.add(`cart__item_${count}`);
    cartItem.classList.add(`cart__row`);
    // name
    const itemName = document.createElement('h6');
    itemName.classList.add(`cart__name`);
    itemName.innerHTML = product['title'];
    // cart Photo
    const cartPhoto = document.createElement('div');
    cartPhoto.classList.add(`cart__photo`);
    cartPhoto.dataset.da = `cart__item_${count},1,576,min`;
    const cartImage = document.createElement('img');
    cartImage.setAttribute('src', product['image']);
    cartPhoto.appendChild(cartImage);
    // cart Control
    const cartControl = document.createElement('div');
    cartControl.classList.add(`cart__control`);
    const cartMinus = document.createElement('div');
    cartMinus.classList.add(`cart__minus`);
    cartMinus.setAttribute('data-id', id);
    const inputField = document.createElement('div');
    inputField.classList.add(`input-field`);
    inputField.classList.add(`inline`);
    const input = document.createElement('input');
    input.classList.add('validate');
    input.classList.add('count-product');
    input.setAttribute('data-id', id);
    input.setAttribute('type','number');
    input.setAttribute('step','1');
    input.setAttribute('min','0');
    input.setAttribute('disabled', '');
    input.value = product['count'];
    inputField.appendChild(input);
    const cartPlus = document.createElement('div');
    cartPlus.classList.add(`cart__plus`);
    cartPlus.setAttribute('data-id', id);
    cartControl.appendChild(cartMinus);
    cartControl.appendChild(inputField);
    cartControl.appendChild(cartPlus);
    // cart price
    const cartPrice = document.createElement('div');
    cartPrice.classList.add(`cart__price`);
    const cartPriceSpan = document.createElement('span');
    cartPriceSpan.innerHTML = product['price'] * product['count'] + ' ' + this.currency;
    cartPrice.appendChild(cartPriceSpan);

    cartItem.appendChild(this.buildRemoveBtn(id));
    cartItem.appendChild(itemName);
    cartItem.appendChild(cartPhoto);
    cartItem.appendChild(cartControl);
    cartItem.appendChild(cartPrice);

    return cartItem;
  }
  buildTotal() {
    const total = document.createElement('div');
    total.classList.add(`cart__total`);
    const totalSpan = document.createElement('span');
    totalSpan.innerHTML = `Разом: ${this.getTotal()} ${this.currency}`;
    total.appendChild(totalSpan);
    return total;
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('cart__content');
    if(Object.keys(this.products).length === 0 && this.products.constructor === Object) {
      const emptyMessage = document.createElement('span');
      emptyMessage.classList.add('cart__empty');
      emptyMessage.innerHTML = 'В корзині немає товарів!';
      container.appendChild(emptyMessage);
      return container;
    } else {
      let count = 0;
      for (let key in this.products) {
        let product = this.products[key];
        count++;
        const id = key;
        const productItem =  this.buildCartItem(product, count, id);
        container.appendChild(productItem);
      }
      //  Append
      return container;
    }
  }

}
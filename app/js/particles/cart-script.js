//-------------------------------------------------------------------------------
let cartOut = document.querySelector('.cart__out');
let products = {};
const orderForm = document.querySelector('#order-form');
updateFromLocalStorage();
let cart = new Cart(products);
updateCartContent();
function updateFromLocalStorage() {
  products = JSON.parse(localStorage.getItem('cart')) || {};
}
function loadToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(products));
}
function updateCartContent() {
  cartOut.innerHTML = '';
  cartOut.append(cart.render());
  cartOut.append(cart.buildTotal());
  showForm();
  if(Object.keys(cart.products).length === 0 && cart.products.constructor === Object) {
    hideForm();
  }
}
// ADD TO CART Event listener for ADD TO CART Buttons
const productsBlock = document.querySelector('.products');
if(productsBlock) {
  productsBlock.addEventListener('click', e => {
    if(e.target.closest('.cart-product')) {
      addToCart(e.target.closest('.cart-product').closest('.card-product'));
      M.toast({html: 'Товар додано в корзину'});
    }
  })
}
function addToCart(product) {
  const id = product.querySelector('.cart-product').getAttribute('data-id');
  const title = product.querySelector('.card-product__title').innerHTML;
  const image = product.querySelector('a').getAttribute('href');
  const price = parseInt(product.querySelector('.card-product__price').innerHTML);
  const count = 1;
  if(products[id]) {
    products[id]['count']++;
  } else {
    products[id] = {
      'title': title,
      'image': image,
      'price': price,
      'count': count
    }
  }
  loadToLocalStorage();
  updateCartContent();
}
// SETTINGS and manipulations INSIDE CART
cartOut.addEventListener('click', e => {
  if(e.target.closest('.cart__remove')) {
    cart.productRemove(e.target.closest('.cart__remove').dataset['id']);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }
  if(e.target.classList.contains('cart__plus')) {
    cart.productPlus(e.target.dataset['id']);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }
  if(e.target.classList.contains('cart__minus')) {
    cart.productMinus(e.target.dataset['id']);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }
})
cartOut.addEventListener('change', e => {
  if(e.target.classList.contains('count-product')) {
    cart.productCountChange(e.target.dataset['id'], e.target.value);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }
})



// Hide for if cart is empty
function hideForm() {
  orderForm.style.display = 'none';
}
function showForm() {
  orderForm.style.display = 'block';
  orderForm.reset();
}

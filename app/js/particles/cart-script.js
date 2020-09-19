// let productsPage = document.querySelector('.products');
// let cartDiv = document.querySelector('.cart');
//
//
//
// if(productsPage) {
//   function addToCart(product) {
//     const cartProducts = JSON.parse(localStorage.getItem('cart')) || {};
//     const id = product.querySelector('.card-product__cart').dataset.id;
//     const title = product.querySelector('.card-product__title').innerHTML;
//     const image = product.querySelector('.slider-card-product a').getAttribute('href');
//     const price = parseInt(product.querySelector('.card-product__price').innerHTML);
//     if (cartProducts[id] !== undefined) {
//       cartProducts[id]['count']++;
//     }
//     else {
//       cartProducts[id] = {
//         'title': title,
//         'image': image,
//         'price': price,
//         'count': 1
//       }
//       //cartProducts[id]['count'] = 1;
//     }
//     localStorage.setItem('cart', JSON.stringify(cartProducts));
//     M.toast({html: 'Товар додано в корзину'});
//     rebuildCart();
//   }
//
// //  Event listener for add to cart button
//   productsPage.addEventListener('click',function (e) {
//     if(e.target.classList.contains('card-product__cart') ||e.target.closest('.card-product__cart')) {
//       let product = e.target.closest('.card-product');
//       addToCart(product);
//     }
//   })
// }
//
//
// // actions with CART DIV and elements into
//
//
// rebuildCart();
//
// function rebuildCart() {
//   let cart = JSON.parse(localStorage.getItem('cart'));
//   let shopCart = new Cart(cart); // cart - массив товаров в корзине
//
//   if(localStorage.getItem('cart') && (localStorage.getItem('cart') !== '{}')) {
//
//     cartDiv.innerHTML = '';
//     cartDiv.append(shopCart.render());
//
//
//     cartDiv.addEventListener('change', e => {
//       if (e.target.classList.contains('count-product')) {
//         if(!e.target.value) {
//           e.target.value = 1;
//         }
//         shopCart.productCountChange(e.target.dataset['id'], parseInt(e.target.value));
//         cartDiv.innerHTML = '';
//         cartDiv.append(shopCart.render());
//         localStorage.setItem('cart', JSON.stringify(shopCart.products));
//       }
//     })
//
//
//     // listener
//     cartDiv.addEventListener('click', e => {
//       if(e.target.classList.contains('cart__remove') || e.target.closest('.cart__remove')) {
//         shopCart.productRemove(e.target.closest('.cart__remove').dataset['id']);
//         if(Object.keys(shopCart.products).length === 0 && shopCart.products.constructor === Object) {
//           localStorage.removeItem('cart');
//           rebuildCart();
//         } else {
//           cartDiv.innerHTML = '';
//           cartDiv.append(shopCart.render());
//           localStorage.setItem('cart', JSON.stringify(shopCart.products));
//         }
//
//       }
//       if(e.target.classList.contains('cart__plus')) {
//         shopCart.productPlus(e.target.dataset['id'])
//         cartDiv.innerHTML = '';
//         cartDiv.append(shopCart.render());
//         localStorage.setItem('cart', JSON.stringify(shopCart.products));
//
//       }
//       if(e.target.classList.contains('cart__minus')) {
//         shopCart.productMinus(e.target.dataset['id'])
//         cartDiv.innerHTML = '';
//         cartDiv.append(shopCart.render());
//         localStorage.setItem('cart', JSON.stringify(shopCart.products));
//
//       }
//     })
//   } else {
//     cartDiv.innerHTML = '';
//     cartDiv.append(shopCart.renderEmpty());
//   }
// }
//
//
//
//-------------------------------------------------------------------------------
let cartOut = document.querySelector('.cart__out');
let products = {};
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
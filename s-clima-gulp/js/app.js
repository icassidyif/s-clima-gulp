"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support === true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }

  ibg(); // запуск перевірки IBG. Функція визначить і при можливості замінить формат даного класу з JPEG в WEBP.
}); //--------------------------------------------------------------------------------
// img like a BG by Cassidy

function ibg() {
  var ibgs = document.querySelectorAll('.ibg');
  var body = document.querySelector('body');
  var isWebP = body.classList.contains('webp');
  ibgs.forEach(function (item) {
    if (item.querySelector('img')) {
      item.style.backgroundImage = isWebP ? 'url(' + item.querySelector('source').getAttribute('srcset') + ')' : 'url(' + item.querySelector('img').getAttribute('src') + ')';
    }
  });
} //end img like BG
// form send process


var ajaxSend = function ajaxSend(formData, url) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data === 'true') {
      showPopupSuccess();
    } else {
      showPopupError();
    }
  }).catch(function (error) {
    console.error(error);
  });
}; // end
// show popup alert


function showPopupSuccess() {
  $.magnificPopup.open({
    items: {
      src: $('#alert-success-send'),
      type: 'inline'
    },
    modal: true
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
}

function showPopupError() {
  $.magnificPopup.open({
    items: {
      src: $('#alert-error-send'),
      type: 'inline'
    },
    modal: true
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
} //end popup alert


var Cart = /*#__PURE__*/function () {
  function Cart(products) {
    var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'грн';

    _classCallCheck(this, Cart);

    this.products = products;
    this.currency = currency;
  }

  _createClass(Cart, [{
    key: "productCountChange",
    value: function productCountChange(id, value) {
      this.products[id]['count'] = value;
    }
  }, {
    key: "productPlus",
    value: function productPlus(id) {
      if (!this.products[id]['count']) {
        this.products[id]['count'] = 1;
      } else {
        this.products[id]['count']++;
      }
    }
  }, {
    key: "productMinus",
    value: function productMinus(id) {
      if (!this.products[id]['count']) {
        this.products[id]['count'] = 1;
      } else {
        if (this.products[id]['count'] >= 2) {
          this.products[id]['count']--;
        }
      }
    }
  }, {
    key: "productRemove",
    value: function productRemove(id) {
      delete this.products[id];
    }
  }, {
    key: "getTotal",
    value: function getTotal() {
      var total = 0;

      for (var key in this.products) {
        total += (this.products[key]['count'] || 1) * this.products[key]['price'];
      }

      return total;
    }
  }, {
    key: "buildRemoveBtn",
    value: function buildRemoveBtn(id) {
      var cartRemoveBnt = document.createElement('div');
      cartRemoveBnt.classList.add("cart__remove");
      cartRemoveBnt.setAttribute('data-id', id);
      cartRemoveBnt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" fill="none" viewBox="0 0 17 17" id="remove-cart-item"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 9.914l-6.793 6.793-1.414-1.414L7.086 8.5.293 1.707 1.707.293 8.5 7.086 15.293.293l1.414 1.414L9.914 8.5l6.793 6.793-1.414 1.414L8.5 9.914z" fill="#D11586" fill-opacity=".5"></path></svg>';
      return cartRemoveBnt;
    }
  }, {
    key: "buildCartItem",
    value: function buildCartItem(product, count, id) {
      // main div for cart__item
      var cartItem = document.createElement('div');
      cartItem.classList.add("cart__item");
      cartItem.classList.add("cart__item_".concat(count));
      cartItem.classList.add("cart__row"); // name

      var itemName = document.createElement('h6');
      itemName.classList.add("cart__name");
      itemName.innerHTML = product['title']; // cart Photo

      var cartPhoto = document.createElement('div');
      cartPhoto.classList.add("cart__photo");
      cartPhoto.dataset.da = "cart__item_".concat(count, ",1,576,min");
      var cartImage = document.createElement('img');
      cartImage.setAttribute('src', product['image']);
      cartPhoto.appendChild(cartImage); // cart Control

      var cartControl = document.createElement('div');
      cartControl.classList.add("cart__control");
      var cartMinus = document.createElement('div');
      cartMinus.classList.add("cart__minus");
      cartMinus.setAttribute('data-id', id);
      var inputField = document.createElement('div');
      inputField.classList.add("input-field");
      inputField.classList.add("inline");
      var input = document.createElement('input');
      input.classList.add('validate');
      input.classList.add('count-product');
      input.setAttribute('data-id', id);
      input.setAttribute('type', 'number');
      input.setAttribute('step', '1');
      input.setAttribute('min', '0');
      input.value = product['count'];
      inputField.appendChild(input);
      var cartPlus = document.createElement('div');
      cartPlus.classList.add("cart__plus");
      cartPlus.setAttribute('data-id', id);
      cartControl.appendChild(cartMinus);
      cartControl.appendChild(inputField);
      cartControl.appendChild(cartPlus); // cart price

      var cartPrice = document.createElement('div');
      cartPrice.classList.add("cart__price");
      var cartPriceSpan = document.createElement('span');
      cartPriceSpan.innerHTML = product['price'] * product['count'] + ' ' + this.currency;
      cartPrice.appendChild(cartPriceSpan);
      cartItem.appendChild(this.buildRemoveBtn(id));
      cartItem.appendChild(itemName);
      cartItem.appendChild(cartPhoto);
      cartItem.appendChild(cartControl);
      cartItem.appendChild(cartPrice);
      return cartItem;
    }
  }, {
    key: "buildTotal",
    value: function buildTotal() {
      var total = document.createElement('div');
      total.classList.add("cart__total");
      var totalSpan = document.createElement('span');
      totalSpan.innerHTML = "\u0420\u0430\u0437\u043E\u043C: ".concat(this.getTotal(), " ").concat(this.currency);
      total.appendChild(totalSpan);
      return total;
    }
  }, {
    key: "render",
    value: function render() {
      var container = document.createElement('div');
      container.classList.add('cart__content');

      if (Object.keys(this.products).length === 0 && this.products.constructor === Object) {
        var emptyMessage = document.createElement('span');
        emptyMessage.innerHTML = 'В корзині немає товарів!';
        container.appendChild(emptyMessage);
        return container;
      } else {
        var count = 0;

        for (var key in this.products) {
          var product = this.products[key];
          count++;
          var id = key;
          var productItem = this.buildCartItem(product, count, id);
          container.appendChild(productItem);
        } //  Append


        container.appendChild(this.buildTotal());
        return container;
      }
    }
  }]);

  return Cart;
}(); //Menu BURGER


var burgerMenu = document.querySelector('.burger-menu');
var body = document.querySelector('body');
var menu = document.querySelector('.menu-main');

if (burgerMenu != null) {
  burgerMenu.addEventListener('click', function () {
    burgerMenu.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock');
  });
} // end menu
//dropdown sub-menu


function changeMaxHeight(li, ul, height) {
  if (li.classList.contains('closed')) {
    li.classList.remove('closed');
    ul.style.maxHeight = height + 'px';
  } else {
    li.classList.add('closed');
    ul.style.maxHeight = "0px";
  }
}

var hasSubmenus = document.querySelectorAll('.menu-main ul li a:not(:only-child)');
hasSubmenus.forEach(function (element) {
  var subMenu = element.parentElement.querySelector('ul');
  var heightSubmenu = subMenu.clientHeight;
  var liItem = element.parentElement;
  liItem.classList.add('has-submenu');
  changeMaxHeight(liItem, subMenu, heightSubmenu);
  element.addEventListener('click', function (event) {
    event.preventDefault();
    changeMaxHeight(liItem, subMenu, heightSubmenu);
  });
}); // end dropdown-menu
//  change background-color

function bgMenu() {
  var header = document.querySelector('.header-main');

  if (pageYOffset > 50) {
    if (!header.classList.contains('header-main_scroll')) {
      header.classList.add('header-main_scroll');
    }
  } else {
    if (header.classList.contains('header-main_scroll')) {
      header.classList.remove('header-main_scroll');
    }
  }
}

window.addEventListener('scroll', function (event) {
  bgMenu(); // change background for submenu

  if (pageYOffset > 80) {
    hasSubmenus.forEach(function (element) {
      var subMenu = element.parentElement.querySelector('ul');
      subMenu.classList.add('change-bg');
    });
  } else {
    hasSubmenus.forEach(function (element) {
      var subMenu = element.parentElement.querySelector('ul');
      subMenu.classList.remove('change-bg');
    });
  } // end change background-color

});
bgMenu(); //Check scroll position=by Cassidy=======================================================
//=========================================================================//init SmoothScroll========================================================

var scroll = new SmoothScroll('a[href*="#"]', {
  header: '[data-scroll-header]',
  speed: 500,
  topOnEmptyHash: true,
  clip: true,
  easing: 'easeInOutCubic',
  updateURL: true,
  popstate: true
}); //=========================================================================
//=========================================================================//

if (document.querySelector('.parallax-main')) {
  var parallaxEffect = function parallaxEffect(event) {
    layers.forEach(function (layer) {
      var speed = layer.getAttribute('data-speed');
      layer.style.transform = "translate(".concat(event.clientX * speed / 1000, "px, ").concat(event.clientY * speed / 1300, "px )");
    });
  };

  var parallax = document.querySelector('.parallax-main');
  var layers = parallax.querySelectorAll('.parallax-main__layer');
  parallax.addEventListener('mousemove', parallaxEffect);
} //Scroll parallax


if (document.querySelectorAll('.parallax')) {
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
  });
} //end scroll parallax
////=include ./particles/swipper.js


$(document).ready(function () {
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Завантаження фото #%curr%...',
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image

    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    },
    removalDelay: 300
  });
  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom',
    showCloseBtn: true,
    closeBtnInside: true
  });
  $('.my-custom-close').click(function () {
    $.magnificPopup.close();
  });
});
$("#phone").mask("+38 (999) 999-99-99");
$.validator.addMethod('customphone', function (value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
}, "Please enter a valid phone number"); //
// $('#power-calc').validate({
//   rules: {
//     square: {
//       required: true
//     }
//   },
//   messages: {
//     square: {
//       required: "Це обов'язкове поле"
//     }
//   },
//   submitHandler: function (form) {
//     //$.magnificPopup.close();
//     // let url = '/php/call.php';
//     // let formData = $(form).serializeArray();
//     // ajaxSend(formData, url);
//     form.reset();
//   }
// });

$('#gardenForm').validate({
  rules: {
    parentName: {
      required: true,
      minlength: 2
    },
    parentSurname: {
      required: true,
      minlength: 2
    },
    phone: {
      required: true,
      customphone: true
    },
    childName: {
      required: true,
      minlength: 2
    },
    childSurname: {
      required: true,
      minlength: 2
    },
    age: {
      required: true,
      number: true
    }
  },
  messages: {
    parentName: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке ім'я"
    },
    parentSurname: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке прізвище"
    },
    phone: {
      required: "Це обов'язкове поле",
      customphone: 'Невірний номер телефону'
    },
    childName: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке ім'я"
    },
    childSurname: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке прізвище"
    },
    age: {
      required: "Це обов'язкове поле",
      number: 'Введіть число'
    }
  },
  submitHandler: function submitHandler(form) {
    $.magnificPopup.close();
    var url = '/php/garden.php';
    var formData = $(form).serializeArray();
    ajaxSend(formData, url);
    form.reset();
  }
});
$('#campForm').validate({
  rules: {
    parentName: {
      required: true,
      minlength: 2
    },
    parentSurname: {
      required: true,
      minlength: 2
    },
    phone: {
      required: true,
      customphone: true
    },
    childName: {
      required: true,
      minlength: 2
    },
    childSurname: {
      required: true,
      minlength: 2
    },
    age: {
      required: true,
      number: true
    }
  },
  messages: {
    parentName: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке ім'я"
    },
    parentSurname: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке прізвище"
    },
    phone: {
      required: "Це обов'язкове поле",
      customphone: 'Невірний номер телефону'
    },
    childName: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке ім'я"
    },
    childSurname: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке прізвище"
    },
    age: {
      required: "Це обов'язкове поле",
      number: 'Введіть число'
    }
  },
  submitHandler: function submitHandler(form) {
    $.magnificPopup.close();
    var url = '/php/camp.php';
    var formData = $(form).serializeArray();
    ajaxSend(formData, url);
    form.reset();
  }
});
$('#languagesForm').validate({
  rules: {
    parentName: {
      required: true,
      minlength: 2
    },
    parentSurname: {
      required: true,
      minlength: 2
    },
    phone: {
      required: true,
      customphone: true
    },
    childName: {
      required: true,
      minlength: 2
    },
    childSurname: {
      required: true,
      minlength: 2
    },
    age: {
      required: true,
      number: true
    }
  },
  messages: {
    parentName: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке ім'я"
    },
    parentSurname: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке прізвище"
    },
    phone: {
      required: "Це обов'язкове поле",
      customphone: 'Невірний номер телефону'
    },
    childName: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке ім'я"
    },
    childSurname: {
      required: "Це обов'язкове поле",
      minlength: "Надто коротке прізвище"
    },
    age: {
      required: "Це обов'язкове поле",
      number: 'Введіть число'
    }
  },
  submitHandler: function submitHandler(form) {
    $.magnificPopup.close();
    var url = '/php/languages.php';
    var formData = $(form).serializeArray();
    ajaxSend(formData, url);
    form.reset();
  }
});
$(document).ready(function () {
  $('.slider-comments').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 992,
      settings: {// slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {// slidesToShow: 1
      }
    }, {
      breakpoint: 576,
      settings: {// slidesToShow: 1,
        // arrows: false
      }
    }]
  });
  $('.slider-banners').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 992,
      settings: {// slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {// slidesToShow: 1
      }
    }, {
      breakpoint: 576,
      settings: {// slidesToShow: 1,
        // arrows: false
      }
    }]
  });
  $('.slider-works').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 1 // arrows: false

      }
    }]
  });
  $('.slider-articles').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: false,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }]
  }).on('setPosition', function () {
    $(this).find('.slick-slide').height('auto');
    var slickTrack = $(this).find('.slick-track');
    var slickTrackHeight = $(slickTrack).height();
    $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
  });
  $('.slider-achive').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 1 // arrows: false

      }
    }]
  }).on('setPosition', function () {
    $(this).find('.slick-slide').height('auto');
    var slickTrack = $(this).find('.slick-track');
    var slickTrackHeight = $(slickTrack).height();
    $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
  });
  $('.slider-partners').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: false,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 2 // arrows: false

      }
    }, {
      breakpoint: 400,
      settings: {
        slidesToShow: 1 // arrows: false

      }
    }]
  });
  $('.slider-card-product').slick({
    arrows: false,
    dots: false,
    adaptiveHeight: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: false,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand'
  });
}); // let productsPage = document.querySelector('.products');
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

var cartOut = document.querySelector('.cart__out');
var products = {};
updateFromLocalStorage();
var cart = new Cart(products);
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
} // ADD TO CART Event listener for ADD TO CART Buttons


var productsBlock = document.querySelector('.products');

if (productsBlock) {
  productsBlock.addEventListener('click', function (e) {
    if (e.target.closest('.cart-product')) {
      addToCart(e.target.closest('.cart-product').closest('.card-product'));
      M.toast({
        html: 'Товар додано в корзину'
      });
    }
  });
}

function addToCart(product) {
  var id = product.querySelector('.cart-product').getAttribute('data-id');
  var title = product.querySelector('.card-product__title').innerHTML;
  var image = product.querySelector('a').getAttribute('href');
  var price = parseInt(product.querySelector('.card-product__price').innerHTML);
  var count = 1;

  if (products[id]) {
    products[id]['count']++;
  } else {
    products[id] = {
      'title': title,
      'image': image,
      'price': price,
      'count': count
    };
  }

  loadToLocalStorage();
  updateCartContent();
} // SETTINGS and manipulations INSIDE CART


cartOut.addEventListener('click', function (e) {
  if (e.target.closest('.cart__remove')) {
    cart.productRemove(e.target.closest('.cart__remove').dataset['id']);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }

  if (e.target.classList.contains('cart__plus')) {
    cart.productPlus(e.target.dataset['id']);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }

  if (e.target.classList.contains('cart__minus')) {
    cart.productMinus(e.target.dataset['id']);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }
});
cartOut.addEventListener('change', function (e) {
  if (e.target.classList.contains('count-product')) {
    cart.productCountChange(e.target.dataset['id'], e.target.value);
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  console.log(supportsTouch); // Animation scroll-----
  // .anim-item
  // .anim-no-hide
  // Працює по класу .active

  var animItems = document.querySelectorAll('.anim-item');

  if (animItems.length > 0) {
    var animScroll = function animScroll() {
      animItems.forEach(function (animItem) {
        var animItemHeight = animItem.offsetHeight;
        var animItemPosition = offset(animItem).top;
        var animStart = 4;
        var animItemPoint = animItemHeight > window.innerHeight ? window.innerHeight - window.innerHeight / animStart : window.innerHeight - animItemHeight / animStart; // Знаходимо чи є елементи , які зміщені по осі Y і компенсуємо зміщення

        var style = getComputedStyle(animItem);
        var matrix = new WebKitCSSMatrix(style.webkitTransform);
        var translateY = matrix.m42;

        if (translateY !== 0) {
          animItemPosition += -translateY;
        } // кынець


        if (pageYOffset > animItemPosition - animItemPoint && pageYOffset < animItemPosition + animItemHeight) {
          animItem.classList.add('active');
        } else {
          if (!animItem.classList.contains('anim-no-hide')) {
            animItem.classList.remove('active');
          }
        }
      });
    };

    window.addEventListener('scroll', animScroll);
    setTimeout(function () {
      animScroll();
    }, 300);
  } // Функція , яка визначає позицію елемента по X та Y


  function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  } // end Animation Scroll
  //footer copyright====================================================


  var spanElement = document.createElement('span');
  var copyRight = "<a href=\"#\">S-Clima</a> \xA9 2019 - ".concat(new Date().getFullYear(), "\u0440.");
  var devRight = "\u0420\u043E\u0437\u0440\u043E\u0431\u043B\u0435\u043D\u043E \u0441\u0442\u0443\u0434\u0456\u0454\u044E <a target=\"_blank\" href=\"https://dwave.space/\"> d-wave </a>";
  spanElement.innerHTML = copyRight;
  $('.copyright__main').append(spanElement);
  $('.copyright__develop').append(devRight); //=========================================================================
  //=========================================================================
  //=========================================================================
  //=========================================================================
  // 29.33% 45deg   70.67   scale(0.7067)
  // Materialize initializations

  var selectElements = document.querySelectorAll('select');
  var instances = M.FormSelect.init(selectElements);
  var modals = document.querySelectorAll('.modal');
  var modalInstance = M.Modal.init(modals, {
    dismissible: true,
    opacity: .4,
    startingTop: '-10%',
    endingTop: '5%',
    inDuration: 350,
    outDuration: 350
  }); //modalInstance.open();
  // END Materialize initializations
  //Range Slider Sidebar

  if (document.getElementById('price-range')) {
    var slider = document.getElementById('price-range');
    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      step: 1,
      range: {
        'min': 0,
        'max': 100
      },
      format: wNumb({
        decimals: 0
      })
    });
    var priceFrom = document.getElementById('price-from');
    var priceFromLabel = document.querySelector('#price-from + label');
    var priceTo = document.getElementById('price-to');
    var priceToLabel = document.querySelector('#price-to + label');
    slider.noUiSlider.on('update', function (values, handle) {
      var value = values[handle];

      if (handle) {
        priceTo.value = value;
        priceToLabel.classList.add('active');
      } else {
        priceFrom.value = value;
        priceFromLabel.classList.add('active');
      }
    });
    priceTo.addEventListener('change', function () {
      slider.noUiSlider.set([null, this.value]);
    });
  } // END Range Slider Sidebar
  //Validate and Calculate power


  function calculatePower(square, height, light) {
    var volume = square * height;

    switch (light) {
      case 1:
        light = 30;
        break;

      case 2:
        light = 35;
        break;

      case 3:
        light = 40;
        break;
    }

    return volume * light / 1000;
  }

  if (document.querySelector('form.power-calc')) {
    var calcForms = document.querySelectorAll('form.power-calc');
    calcForms.forEach(function (form) {
      var calcBtn = form.querySelector('.calc-power');
      var resultInput = form.querySelector('.power');
      var resultLabel = form.querySelector('.power + label');
      var square = form.querySelector('.square');
      var height = form.querySelector('.height');
      var light = form.querySelector('.sun-light');
      var instance = M.FormSelect.getInstance(light);
      var valueSquare, valueHeight, valueLight;
      calcBtn.addEventListener('click', calculate);

      function calculate() {
        valueSquare = validateInput(square, 'Вкажіть площу приміщення');
        valueHeight = validateInput(height, 'Вкажіть висоту приміщення');
        valueLight = validateInput(light, 'Виберіть тип освітлення');
        var power = calculatePower(valueSquare, valueHeight, valueLight);
        power = Math.ceil(power * 10) / 10;
        resultInput.value = power;
        resultLabel.classList.add('active');
      }

      function validateInput(input, errorMsg) {
        if (!input.value) {
          if (input === light) {
            instance.input.classList.add('invalid');
          }

          input.classList.add('invalid');
          M.toast({
            html: errorMsg,
            classes: 'toast-error'
          });
        } else {
          return getValueInput(input);
        }
      }

      function getValueInput(input) {
        if (input === light) {
          instance.input.classList.remove('invalid');
          instance.input.classList.add('valid');
        }

        return parseInt(input.value);
      }
    });
  } //END Validate and Calculate power
  // show full version of works slider if touchscreen and product slider


  if (supportsTouch) {
    var worksItems = document.querySelectorAll('.works__item');
    worksItems.forEach(function (item) {
      item.classList.add('works__item_mobile');
    });
    var cardProducts = document.querySelectorAll('.card-product');
    cardProducts.forEach(function (card) {
      card.classList.add('card-product_mobile');
    });
  } // END show full version of works slider if touchscreen
  //  filter show-hide


  if (document.querySelector('#filter')) {
    var filterBtn = document.querySelector('#filter-btn');
    var filterCloseBtn = document.querySelector('#sidebar__close-btn');
    var filter = document.querySelector('#filter');
    var overlay = document.querySelector('#sidebar-overlay');
    filterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      body.classList.toggle('lock');
      filter.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    filterCloseBtn.addEventListener('click', function (e) {
      body.classList.toggle('lock');
      filter.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', function (e) {
      body.classList.toggle('lock');
      filter.classList.toggle('active');
      overlay.classList.toggle('active');
    });
  } //  end filter show-hide
  //  collapse product information


  function getInstances(product) {
    var moreBlock = product.querySelector('.card-product__rest');
    var expandBtn = product.querySelector('.card-product__more');
    var wrapper = product.querySelector('.card-product__wrapper');
    var column = product.parentElement.parentElement;
    return {
      moreBlock: moreBlock,
      expandBtn: expandBtn,
      wrapper: wrapper,
      column: column
    };
  }

  function collapseProduct() {
    var products = document.querySelectorAll('.card-product');
    products.forEach(function (product) {
      var instances = getInstances(product); // set column height for product

      instances.column.style.height = product.clientHeight + 30 + 'px'; // add event listener for expand button

      instances.expandBtn.addEventListener('click', function (event) {
        product.classList.toggle('opened');

        if (instances.moreBlock.clientHeight) {
          instances.moreBlock.style.height = 0;
        } else {
          instances.moreBlock.style.height = instances.wrapper.clientHeight + "px";
        }

        products.forEach(function (prod) {
          if (prod === product) {
            prod.style.transition = 'unset';
            product.style.zIndex = '2';
          } else {
            prod.classList.remove('opened');
            getInstances(prod).moreBlock.style.height = 0;
            prod.style.transition = 'z-index .5s ease-out';
            prod.style.zIndex = '1';
          }
        });
      });
    });
  }

  if (document.querySelector('.products')) {
    collapseProduct();
  } // END collapse product information

});
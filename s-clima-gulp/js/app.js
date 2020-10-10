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
      input.setAttribute('disabled', '');
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
        emptyMessage.classList.add('cart__empty');
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


        return container;
      }
    }
  }]);

  return Cart;
}();

var Form = /*#__PURE__*/function () {
  function Form() {
    _classCallCheck(this, Form);

    this.inputText = document.createElement('input');
    this.conumt = 1;
  }

  _createClass(Form, [{
    key: "calculate",
    value: function calculate(e) {
      var block = !e.target ? e : e.target.closest('.form__block');
      var square;
      var height;
      var light;
      var result;
      var resultLabel;

      function refreshCalculateValues() {
        square = +block.querySelector('input[name="formCalculateSquare"]').value;
        height = +block.querySelector('input[name="formCalculateHeight"]').value;
        light = +block.querySelector('select[name="form-sunlight"]').value;
        result = block.querySelector('input[name="power"]');
        resultLabel = block.querySelector('input[name="power"] + label');
      }

      function resetCalculateValues() {
        block.querySelector('input[name="formCalculateSquare"]').value = '';
        block.querySelector('input[name="formCalculateHeight"]').value = '';
      }

      refreshCalculateValues();
      result.value = calculatePower(square, height, light);
      resultLabel.classList.add('active');
      resetCalculateValues();
    }
  }, {
    key: "buildCalculateBlock",
    value: function buildCalculateBlock() {
      var mainColumn = document.createElement('div');
      mainColumn.classList.add('column');
      mainColumn.classList.add('form__block');
      var mainRow = document.createElement('div');
      mainRow.classList.add('row');
      var title = this.createTitle("\u041F\u0440\u0438\u043C\u0456\u0449\u0435\u043D\u043D\u044F #");
      var closeBtn = document.createElement('div');
      closeBtn.classList.add('form__remove-btn');
      var image = document.createElement('img');
      image.setAttribute('src', '../img/form-room-close.svg');
      var inputSquare = this.createInput('number', 'formCalculateSquare', 'form-calculate-square');
      inputSquare.classList.add('column-sm-1-2');
      inputSquare.querySelector('label').innerHTML = 'Площа приміщення (м2)';
      var inputHeight = this.createInput('number', 'formCalculateHeight', 'form-calculate-height');
      inputHeight.classList.add('column-sm-1-2');
      inputHeight.querySelector('label').innerHTML = 'Висота приміщення (м)';
      var select = this.createSelect('form-sunlight', ['Слабке', 'Середнє', 'Високе']);
      select.classList.add('column-sm-1-2');
      var column = document.createElement('div');
      column.classList.add('column');
      column.classList.add('column-sm-1-2');
      var buttonCalc = this.createButton('button', 'form__calculate-btn');
      buttonCalc.innerHTML = 'Розрахувати';
      var inputCalc = this.createInput('number', 'power', 'form-calculate-power');
      inputCalc.classList.add('input-field_inline');
      inputCalc.querySelector('label').innerHTML = 'кВт';
      column.append(buttonCalc);
      column.append(inputCalc); //appending

      mainColumn.append(mainRow);
      mainRow.append(title);
      title.firstChild.append(closeBtn);
      closeBtn.append(image);
      mainRow.append(inputSquare);
      mainRow.append(inputHeight);
      mainRow.append(select);
      mainRow.append(column); // listening

      buttonCalc.addEventListener('click', this.calculate);
      this.calculate(mainColumn);
      return mainColumn;
    }
  }, {
    key: "createTitle",
    value: function createTitle(text) {
      var column = document.createElement('div');
      column.classList.add('column');
      var titleBlock = document.createElement('div');
      titleBlock.classList.add('form__title');
      var title = document.createElement('span');
      var spanCount = document.createElement('span');

      if (text) {
        title.innerHTML = text;
      }

      column.append(titleBlock);
      titleBlock.append(title);
      titleBlock.append(spanCount);
      return column;
    }
  }, {
    key: "createButton",
    value: function createButton() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'button';
      var className = arguments.length > 1 ? arguments[1] : undefined;
      var button = document.createElement('button');
      button.classList.add(className);
      button.setAttribute('type', type); // appending

      return button;
    }
  }, {
    key: "createInfoText",
    value: function createInfoText(text) {
      var column = document.createElement('div');
      column.classList.add('column');
      var paragraph = document.createElement('div');
      paragraph.innerHTML = text;
      paragraph.classList.add('form__info-text'); //appending

      column.append(paragraph);
      return column;
    }
  }, {
    key: "createAddBtn",
    value: function createAddBtn() {
      var column = document.createElement('div');
      column.classList.add('column');
      var icon = document.createElement('div');
      icon.classList.add('form__icon-add');
      var image = document.createElement('img');
      image.classList.add('svg-form-add-btn');
      image.setAttribute('src', '../img/form-add-btn.svg'); // appending

      icon.append(image);
      column.append(icon);
      return column;
    }
  }, {
    key: "createInput",
    value: function createInput(type, name) {
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var iconName = arguments.length > 3 ? arguments[3] : undefined;
      var index = Math.random().toString(36).substr(2, 9);
      var column = document.createElement('div');
      column.classList.add('column');
      var inputField = document.createElement('div');
      inputField.classList.add('input-field');

      if (iconName) {
        var icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.classList.add('prefix');
        icon.innerHTML = iconName;
        inputField.append(icon);
      }

      var input = document.createElement('input');
      input.setAttribute('id', id + index);
      input.setAttribute('type', type);
      input.setAttribute('name', name);
      var label = document.createElement('label');
      label.setAttribute('for', id + index); // appending

      column.append(inputField);
      inputField.append(input);
      inputField.append(label);
      return column;
    }
  }, {
    key: "createTextarea",
    value: function createTextarea() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var iconName = arguments.length > 1 ? arguments[1] : undefined;
      var index = Math.random().toString(36).substr(2, 9);
      var column = document.createElement('div');
      column.classList.add('column');
      var inputField = document.createElement('div');
      inputField.classList.add('input-field');

      if (iconName) {
        var icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.classList.add('prefix');
        icon.innerHTML = iconName;
        inputField.append(icon);
      }

      var textArea = document.createElement('textarea');
      textArea.setAttribute('id', id + index);
      textArea.setAttribute('name', 'message');
      textArea.classList.add('materialize-textarea');
      var label = document.createElement('label');
      label.setAttribute('for', id + index); // appending

      column.append(inputField);
      inputField.append(textArea);
      inputField.append(label);
      return column;
    }
  }, {
    key: "createRadio",
    value: function createRadio(name, value, checked) {
      var label = document.createElement('label');
      var radio = document.createElement('input');
      radio.setAttribute('type', 'radio');
      radio.setAttribute('value', value);
      radio.classList.add('with-gap');
      var column = document.createElement('div');
      column.classList.add('column');

      if (checked === true) {
        radio.setAttribute('checked', '');
      }

      radio.setAttribute('name', name); //appending

      label.append(radio);
      column.append(label);
      return column;
    }
  }, {
    key: "createSelect",
    value: function createSelect(name, values) {
      var select = document.createElement('select');
      var column = document.createElement('div');
      column.classList.add('column');
      var container = document.createElement('div');
      container.classList.add('input-field');
      select.setAttribute('name', name);
      select.setAttribute('required', '');
      values.forEach(function (value, index) {
        var option = document.createElement('option');
        option.setAttribute('value', index + 1);

        if (index + 1 === 1) {
          option.setAttribute('selected', '');
        }

        if (typeof value === "string") {
          option.append(value);
        } else {
          option.dataset.link = value.url;
          option.append(value.name);
        }

        select.append(option);
      }); // appending

      column.append(container);
      container.append(select);
      return column;
    }
  }, {
    key: "createDetails",
    value: function createDetails(link) {
      var column = document.createElement('div');
      column.classList.add('column');
      var details = document.createElement('div');
      details.classList.add('form__details');
      var text = document.createElement('span');
      text.innerHTML = 'Ознайомитись';
      var textLink = document.createElement('span');
      var detailsLink = document.createElement('a');
      detailsLink.setAttribute('href', link);
      detailsLink.classList.add('link');
      detailsLink.innerHTML = 'детальніше'; // appending

      column.append(details);
      details.append(text);
      details.append(textLink);
      textLink.append(detailsLink);
      return column;
    }
  }, {
    key: "createForm",
    value: function createForm(id) {
      var form = document.createElement('form');
      form.classList.add('form');
      form.id = id;
      var row = document.createElement('div');
      row.classList.add('row'); //appending

      form.append(row);
      return form;
    }
  }]);

  return Form;
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
    removalDelay: 300,
    callbacks: {
      elementParse: function elementParse(item) {
        if (item.el.hasClass("video")) {
          item.type = 'iframe';
        } else {
          item.type = 'image';
        }
      }
    }
  });
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
});
var promForm = new Form();
var householdForm = new Form();
var categories = [{
  name: 'Кондиціонери',
  url: '/cond'
}, {
  name: 'Осушувачі/Очищувачі повітря',
  url: '/osy'
}, {
  name: 'Теплові завіси',
  url: '/teplZav'
}, {
  name: 'Теплові насоси',
  url: '/teplNas'
}, {
  name: 'Вентиляція',
  url: '/vent'
}]; //-------------- CREATE FORM FROM ELEMENTS

if (document.querySelector('#pick-up')) {
  var goPromForm = function goPromForm() {
    // functions
    function detectSelectedOption(selectEl) {
      return selectEl.querySelector('option[selected]').dataset.link;
    }

    function createPickUpBySelfContent() {
      console.log('content for pickUpBySelf');
      var title = promForm.createTitle('Параметри приміщення'); // Calculate section

      var inputSquare = promForm.createInput('number', 'formCalculateSquare', 'form-calculate-square');
      inputSquare.classList.add('column-sm-1-2');
      inputSquare.querySelector('label').innerHTML = 'Площа приміщення (м2)';
      var inputHeight = promForm.createInput('number', 'formCalculateHeight', 'form-calculate-height');
      inputHeight.classList.add('column-sm-1-2');
      inputHeight.querySelector('label').innerHTML = 'Висота приміщення (м)';
      var select = promForm.createSelect('form-sunlight', ['Слабке', 'Середнє', 'Високе']);
      select.classList.add('column-sm-1-2');
      var column = document.createElement('div');
      column.classList.add('column');
      column.classList.add('column-sm-1-2');
      var buttonCalc = promForm.createButton('button', 'form__calculate-btn');
      buttonCalc.innerHTML = 'Розрахувати';
      var inputCalc = promForm.createInput('number', 'power', 'form-calculate-power');
      inputCalc.classList.add('input-field_inline');
      inputCalc.querySelector('label').innerHTML = 'кВт';
      column.append(buttonCalc);
      column.append(inputCalc); // Submit section

      var columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      var buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      var buttonSubmit = promForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Показати товари';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit); //  clear before insert

      $('#form-calculate .container2').nextAll().remove(); //appending

      promFormElement.firstChild.append(title);
      promFormElement.firstChild.append(inputSquare);
      promFormElement.firstChild.append(inputHeight);
      promFormElement.firstChild.append(select);
      promFormElement.firstChild.append(column);
      promFormElement.firstChild.append(columnSubmit);
      initMaterializeSelect(); // Listeners

      var square;
      var height;
      var light;
      var result;
      var resultLabel;

      function refreshCalculateValues() {
        square = +promFormElement.querySelector('input[name="formCalculateSquare"]').value;
        height = +promFormElement.querySelector('input[name="formCalculateHeight"]').value;
        light = +promFormElement.querySelector('select[name="form-sunlight"]').value;
        result = promFormElement.querySelector('input[name="power"]');
        resultLabel = promFormElement.querySelector('input[name="power"] + label');
      }

      function resetCalculateValues() {
        promFormElement.querySelector('input[name="formCalculateSquare"]').value = '';
        promFormElement.querySelector('input[name="formCalculateHeight"]').value = '';
      }

      refreshCalculateValues();
      result.value = calculatePower(square, height, light);
      resultLabel.classList.add('active');
      buttonCalc.addEventListener('click', function (e) {
        refreshCalculateValues();
        result.value = calculatePower(square, height, light);
        resultLabel.classList.add('active');
        resetCalculateValues();
      });
    }

    function createPickUpByProfContent() {
      console.log('content for pickUpByProf');

      function refreshCount() {
        if (promFormElement.querySelectorAll('.form__block').length >= 0) {
          var calcBlocks = promFormElement.querySelectorAll('.form__block');
          calcBlocks.forEach(function (calcBlock, index) {
            var text = calcBlock.querySelector('.form__title span + span');
            text.innerHTML = index + 1;
          });
        }
      }

      var nameInput = promForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';
      var phoneInput = promForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';
      var container3 = document.createElement('div');
      container3.classList.add('container3');
      var addBtn = promForm.createAddBtn();
      var textInput = promForm.createTextarea('form-comment', 'mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту'; // Submit section

      var columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      var buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      var buttonSubmit = promForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit); //  clear before insert

      $('#form-calculate .container2').nextAll().remove(); // appending

      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(container3);
      promFormElement.firstChild.append(addBtn);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit); // listener

      var addButton = promFormElement.querySelector('.form__icon-add');
      addButton.addEventListener('click', addBlock);

      function addBlock(e) {
        var outPlace = promFormElement.querySelector('.container3');
        var calculateRoomBlock = promForm.buildCalculateBlock(); //appending

        outPlace.before(calculateRoomBlock);
        refreshCount();
        calculateRoomBlock.querySelector('.form__remove-btn').addEventListener('click', removeBlock);
        initMaterializeSelect();
      }

      function removeBlock(e) {
        var currentBlock = e.target.closest('.form__block');
        currentBlock.remove();
        refreshCount();
      }
    }

    function createCondtitonContent(category) {
      console.log('go condition content');
      var pickUpSelf = promForm.createRadio('typePickUp', 'pickUpBySelf', true);
      pickUpSelf.classList.add('column-sm-1-2');
      var spanSelf = document.createElement('span');
      spanSelf.innerHTML = 'Підібрати самостійно';
      pickUpSelf.firstChild.append(spanSelf);
      var pickUpProf = promForm.createRadio('typePickUp', 'pickUpByProf', false);
      pickUpProf.classList.add('column-sm-1-2');
      var spanProf = document.createElement('span');
      spanProf.innerHTML = 'Довірити вибір спеціалісту';
      pickUpProf.firstChild.append(spanProf); //creating container2

      var container2 = document.createElement('div');
      container2.classList.add('container2'); //  clear before insert

      $('#form-calculate .container1').nextAll().remove(); //appending

      promFormElement.firstChild.append(pickUpSelf);
      promFormElement.firstChild.append(pickUpProf);
      promFormElement.firstChild.append(container2); //  event listening

      var inputsRadio = promFormElement.querySelectorAll('input[name="typePickUp"]');
      inputsRadio.forEach(function (inputRadio) {
        inputRadio.addEventListener('change', function (e) {
          if (e.target.value === 'pickUpBySelf') {
            createPickUpBySelfContent();
          } else if (e.target.value === 'pickUpByProf') {
            createPickUpByProfContent();
          }
        });

        if (inputRadio.checked && inputRadio.value === 'pickUpBySelf') {
          createPickUpBySelfContent();
        } else if (inputRadio.checked && inputRadio.value === 'pickUpByProf') {
          createPickUpByProfContent();
        }
      });
    }

    function createAnotherContent(category) {
      console.log('go another content');
      var textBlcok = promForm.createInfoText('Підбір обладнання для осушувачів/очищувачів повітря технічно складний процес, який потребує професійного підходу.  Будь ласка, заповніть форму нижче, щоб отримати консультацію спеціаліста.');
      var nameInput = promForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';
      var phoneInput = promForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';
      var textInput = promForm.createTextarea('form-comment', 'mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту'; // Submit section

      var columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      var buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      var buttonSubmit = promForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit); //  clear before insert

      $('#form-calculate .container1').nextAll().remove(); //appending

      promFormElement.firstChild.append(textBlcok);
      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit);
    } //create form


    var promFormElement = promForm.createForm('form-calculate'); //create Select

    var promFormSelect = promForm.createSelect('categories', categories);
    promFormSelect.classList.add('column-sm-1-2'); //appending

    promFormElement.firstChild.appendChild(promFormSelect); //query Select

    var selectElement = promFormElement.querySelector('select'); //create details with active options

    var promFormDetails = promForm.createDetails(detectSelectedOption(selectElement));
    promFormDetails.classList.add('column-sm-1-2'); //create container-1

    var container1 = document.createElement('div');
    container1.classList.add('container1'); //appending

    promFormElement.firstChild.appendChild(promFormDetails);
    promFormElement.firstChild.appendChild(container1);

    if (+selectElement.querySelector('option[selected]').value === 1) {
      createCondtitonContent(+selectElement.querySelector('option[selected]').value);
    } else {
      createAnotherContent(+selectElement.querySelector('option[selected]').value);
    } // insert form into modal


    var outPromPickUp = document.querySelector('.prom-pick-up');
    outPromPickUp.appendChild(promFormElement); //  event listening

    selectElement.addEventListener('change', function (e) {
      promFormDetails.querySelector('a').setAttribute('href', e.target[+e.target.value - 1].dataset.link);

      if (+e.target.value !== 1) {
        createAnotherContent(+e.target.value);
      } else {
        createCondtitonContent(+e.target.value);
      }
    });
  };

  var goHouseHoldForm = function goHouseHoldForm() {
    // functions
    function detectSelectedOption(selectEl) {
      return selectEl.querySelector('option[selected]').dataset.link;
    }

    function createPickUpBySelfContent() {
      console.log('content for pickUpBySelf');
      var title = householdForm.createTitle('Параметри приміщення'); // Calculate section

      var inputSquare = householdForm.createInput('number', 'formCalculateSquare', 'form-calculate-square');
      inputSquare.classList.add('column-sm-1-2');
      inputSquare.querySelector('label').innerHTML = 'Площа приміщення (м2)';
      var inputHeight = householdForm.createInput('number', 'formCalculateHeight', 'form-calculate-height');
      inputHeight.classList.add('column-sm-1-2');
      inputHeight.querySelector('label').innerHTML = 'Висота приміщення (м)';
      var select = householdForm.createSelect('form-sunlight', ['Слабке', 'Середнє', 'Високе']);
      select.classList.add('column-sm-1-2');
      var column = document.createElement('div');
      column.classList.add('column');
      column.classList.add('column-sm-1-2');
      var buttonCalc = householdForm.createButton('button', 'form__calculate-btn');
      buttonCalc.innerHTML = 'Розрахувати';
      var inputCalc = householdForm.createInput('number', 'power', 'form-calculate-power');
      inputCalc.classList.add('input-field_inline');
      inputCalc.querySelector('label').innerHTML = 'кВт';
      column.append(buttonCalc);
      column.append(inputCalc); // Submit section

      var columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      var buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      var buttonSubmit = householdForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Показати товари';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit); //  clear before insert

      $('#form-calculate2 .container2').nextAll().remove(); //appending

      promFormElement.firstChild.append(title);
      promFormElement.firstChild.append(inputSquare);
      promFormElement.firstChild.append(inputHeight);
      promFormElement.firstChild.append(select);
      promFormElement.firstChild.append(column);
      promFormElement.firstChild.append(columnSubmit);
      initMaterializeSelect(); // Listeners

      var square;
      var height;
      var light;
      var result;
      var resultLabel;

      function refreshCalculateValues() {
        square = +promFormElement.querySelector('input[name="formCalculateSquare"]').value;
        height = +promFormElement.querySelector('input[name="formCalculateHeight"]').value;
        light = +promFormElement.querySelector('select[name="form-sunlight"]').value;
        result = promFormElement.querySelector('input[name="power"]');
        resultLabel = promFormElement.querySelector('input[name="power"] + label');
      }

      function resetCalculateValues() {
        promFormElement.querySelector('input[name="formCalculateSquare"]').value = '';
        promFormElement.querySelector('input[name="formCalculateHeight"]').value = '';
      }

      refreshCalculateValues();
      result.value = calculatePower(square, height, light);
      resultLabel.classList.add('active');
      buttonCalc.addEventListener('click', function (e) {
        refreshCalculateValues();
        result.value = calculatePower(square, height, light);
        resultLabel.classList.add('active');
        resetCalculateValues();
      });
    }

    function createPickUpByProfContent() {
      console.log('content for pickUpByProf');

      function refreshCount() {
        if (promFormElement.querySelectorAll('.form__block').length >= 0) {
          var calcBlocks = promFormElement.querySelectorAll('.form__block');
          calcBlocks.forEach(function (calcBlock, index) {
            var text = calcBlock.querySelector('.form__title span + span');
            text.innerHTML = index + 1;
          });
        }
      }

      var nameInput = householdForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';
      var phoneInput = householdForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';
      var container3 = document.createElement('div');
      container3.classList.add('container3');
      var addBtn = householdForm.createAddBtn();
      var textInput = householdForm.createTextarea('form-comment', 'mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту'; // Submit section

      var columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      var buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      var buttonSubmit = householdForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit); //  clear before insert

      $('#form-calculate2 .container2').nextAll().remove(); // appending

      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(container3);
      promFormElement.firstChild.append(addBtn);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit); // listener

      var addButton = promFormElement.querySelector('.form__icon-add');
      addButton.addEventListener('click', addBlock);

      function addBlock(e) {
        var outPlace = promFormElement.querySelector('.container3');
        var calculateRoomBlock = householdForm.buildCalculateBlock(); //appending

        outPlace.before(calculateRoomBlock);
        refreshCount();
        calculateRoomBlock.querySelector('.form__remove-btn').addEventListener('click', removeBlock);
        initMaterializeSelect();
      }

      function removeBlock(e) {
        var currentBlock = e.target.closest('.form__block');
        currentBlock.remove();
        refreshCount();
      }
    }

    function createCondtitonContent(category) {
      console.log('go condition content');
      var pickUpSelf = householdForm.createRadio('typePickUp', 'pickUpBySelf', true);
      pickUpSelf.classList.add('column-sm-1-2');
      var spanSelf = document.createElement('span');
      spanSelf.innerHTML = 'Підібрати самостійно';
      pickUpSelf.firstChild.append(spanSelf);
      var pickUpProf = householdForm.createRadio('typePickUp', 'pickUpByProf', false);
      pickUpProf.classList.add('column-sm-1-2');
      var spanProf = document.createElement('span');
      spanProf.innerHTML = 'Довірити вибір спеціалісту';
      pickUpProf.firstChild.append(spanProf); //creating container2

      var container2 = document.createElement('div');
      container2.classList.add('container2'); //  clear before insert

      $('#form-calculate2 .container1').nextAll().remove(); //appending

      promFormElement.firstChild.append(pickUpSelf);
      promFormElement.firstChild.append(pickUpProf);
      promFormElement.firstChild.append(container2); //  event listening

      var inputsRadio = promFormElement.querySelectorAll('input[name="typePickUp"]');
      inputsRadio.forEach(function (inputRadio) {
        inputRadio.addEventListener('change', function (e) {
          if (e.target.value === 'pickUpBySelf') {
            createPickUpBySelfContent();
          } else if (e.target.value === 'pickUpByProf') {
            createPickUpByProfContent();
          }
        });

        if (inputRadio.checked && inputRadio.value === 'pickUpBySelf') {
          createPickUpBySelfContent();
        } else if (inputRadio.checked && inputRadio.value === 'pickUpByProf') {
          createPickUpByProfContent();
        }
      });
    }

    function createAnotherContent(category) {
      console.log('go another content');
      var textBlcok = householdForm.createInfoText('Підбір обладнання для осушувачів/очищувачів повітря технічно складний процес, який потребує професійного підходу.  Будь ласка, заповніть форму нижче, щоб отримати консультацію спеціаліста.');
      var nameInput = householdForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';
      var phoneInput = householdForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';
      var textInput = householdForm.createTextarea('form-comment', 'mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту'; // Submit section

      var columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      var buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      var buttonSubmit = householdForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit); //  clear before insert

      $('#form-calculate2 .container1').nextAll().remove(); //appending

      promFormElement.firstChild.append(textBlcok);
      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit);
    } //create form


    var promFormElement = householdForm.createForm('form-calculate2'); //create Select

    var promFormSelect = householdForm.createSelect('categories', categories);
    promFormSelect.classList.add('column-sm-1-2'); //appending

    promFormElement.firstChild.appendChild(promFormSelect); //query Select

    var selectElement = promFormElement.querySelector('select'); //create details with active options

    var promFormDetails = householdForm.createDetails(detectSelectedOption(selectElement));
    promFormDetails.classList.add('column-sm-1-2'); //create container-1

    var container1 = document.createElement('div');
    container1.classList.add('container1'); //appending

    promFormElement.firstChild.appendChild(promFormDetails);
    promFormElement.firstChild.appendChild(container1);

    if (+selectElement.querySelector('option[selected]').value === 1) {
      createCondtitonContent(+selectElement.querySelector('option[selected]').value);
    } else {
      createAnotherContent(+selectElement.querySelector('option[selected]').value);
    } // insert form into modal


    var outPromPickUp = document.querySelector('.household-pick-up');
    outPromPickUp.appendChild(promFormElement); //  event listening

    selectElement.addEventListener('change', function (e) {
      promFormDetails.querySelector('a').setAttribute('href', e.target[+e.target.value - 1].dataset.link);

      if (+e.target.value !== 1) {
        createAnotherContent(+e.target.value);
      } else {
        createCondtitonContent(+e.target.value);
      }
    });
  };

  goPromForm();
  goHouseHoldForm();
} //-------------------------------------------------------------------------------


var cartOut = document.querySelector('.cart__out');
var cartHeaderCount = document.querySelector('.header-main__cart span');
var products = {};
var orderForm = document.querySelector('#order-form');
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
  cartOut.append(cart.buildTotal());
  showForm();
  cartHeaderCount.innerHTML = Object.keys(cart.products).length;
  cartHeaderCount.classList.add('active');

  if (Object.keys(cart.products).length === 0 && cart.products.constructor === Object) {
    hideForm();
    cartHeaderCount.innerHTML = '';
    cartHeaderCount.classList.remove('active');
  }
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
}); // Hide for if cart is empty

function hideForm() {
  orderForm.style.display = 'none';
}

function showForm() {
  orderForm.style.display = 'block';
  orderForm.reset();
} //update count


function updateCount() {
  cartHeaderCount.style.display = 'none';
}

$("select").css({
  display: "block",
  position: 'absolute',
  visibility: 'hidden'
});
$("#phone").mask("+38 (999) 999-99-99");
$.validator.addMethod('customPhone', function (value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
}, "Please enter a valid phone number");

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

  return Math.ceil(volume * light / 1000 * 10) / 10;
}

$('#order-form').validate({
  rules: {
    cartOrderName: {
      required: true
    },
    cartOrderPhone: {
      required: true,
      customPhone: true
    },
    cartOrderMessage: {}
  },
  messages: {
    cartOrderName: {
      required: "Це обов'язкове поле"
    },
    cartOrderPhone: {
      required: "Це обов'язкове поле",
      customPhone: 'Невірний номер телефону'
    }
  },
  submitHandler: function submitHandler(form) {
    // let url = '/php/call.php';
    var CurrentCart = JSON.parse(localStorage.getItem('cart'));
    var formData = $(form).serializeArray(); // ajaxSend(formData, url);

    console.log(formData, CurrentCart); //clear

    form.reset();
    cart.products = {};
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
    var modal = M.Modal.getInstance($('#cart'));
    modal.close();
  }
});
$('#power-calc').validate({
  rules: {
    square: {
      required: true,
      min: '1',
      max: '900',
      step: '.1',
      number: true
    },
    height: {
      required: true,
      min: '1',
      max: '50',
      step: '.1',
      number: true
    },
    sunlight: {
      required: true
    },
    power: {
      number: true,
      step: .1
    }
  },
  messages: {
    square: {
      required: 'Введіть площу приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    height: {
      required: 'Введіть висоту приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    sunlight: {
      required: 'Виберіть варіант зі списку'
    },
    power: {
      number: ' ',
      step: ' '
    }
  },
  submitHandler: function submitHandler(form) {
    var resultInput = form.querySelector('.power');
    var resultLabel = form.querySelector('.power + label');
    var data = $(form).serializeArray();
    resultInput.value = calculatePower(parseInt(data[0].value), parseInt(data[1].value), parseInt(data[2].value));
    resultLabel.classList.add('active'); //   SEND AJAX
  }
});
$('#form-calculate').validate({
  rules: {
    formCalculateSquare: {
      required: false,
      min: 1,
      max: 900,
      step: .1,
      number: true
    },
    formCalculateHeight: {
      required: false,
      min: 1,
      max: 50,
      step: .1,
      number: true
    },
    power: {
      required: false,
      min: 0,
      max: 100,
      step: .1,
      number: true
    },
    formName: {
      required: true,
      minlength: 2
    },
    formPhone: {
      required: true,
      customPhone: true
    }
  },
  messages: {
    formCalculateSquare: {
      required: 'Введіть площу приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formCalculateHeight: {
      required: 'Введіть висоту приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formName: {
      required: "Це обов'язкове поле",
      minlength: 'Надто коротке ім\'я'
    },
    formPhone: {
      required: "Це обов'язкове поле",
      customPhone: 'Невірний номер телефону'
    },
    power: {
      number: '',
      min: '',
      max: '',
      step: ''
    }
  },
  submitHandler: function submitHandler(form) {
    var data = $(form).serializeArray();
    console.log('form1 submit');
    console.log(data);
  }
});
$('#form-calculate2').validate({
  rules: {
    formCalculateSquare: {
      required: false,
      min: 1,
      max: 900,
      step: .1,
      number: true
    },
    formCalculateHeight: {
      required: false,
      min: 1,
      max: 50,
      step: .1,
      number: true
    },
    power: {
      required: false,
      min: 0,
      max: 100,
      step: .1,
      number: true
    },
    formName: {
      required: true,
      minlength: 2
    },
    formPhone: {
      required: true,
      customPhone: true
    }
  },
  messages: {
    formCalculateSquare: {
      required: 'Введіть площу приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formCalculateHeight: {
      required: 'Введіть висоту приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formName: {
      required: "Це обов'язкове поле",
      minlength: 'Надто коротке ім\'я'
    },
    formPhone: {
      required: "Це обов'язкове поле",
      customPhone: 'Невірний номер телефону'
    },
    power: {
      number: '',
      min: '',
      max: '',
      step: ''
    }
  },
  submitHandler: function submitHandler(form) {
    console.log('form2 submit');
  }
}); // Materialize initializations

function initMaterializeSelect() {
  var selectElements = document.querySelectorAll('select');
  var selectInstances = M.FormSelect.init(selectElements);
}

var modals = document.querySelectorAll('.modal');
var modalInstance = M.Modal.init(modals, {
  dismissible: true,
  opacity: .4,
  startingTop: '-10%',
  endingTop: '5%',
  inDuration: 350,
  outDuration: 350
}); //modalInstance.open();

initMaterializeSelect(); // form send process

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
  //Range Slider Sidebar

  function sidebarRangeInit(start, end, min, max) {
    var slider = document.getElementById('price-range');
    noUiSlider.create(slider, {
      start: [start, end],
      connect: true,
      step: 1,
      range: {
        'min': min,
        'max': max
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
  }

  if (document.getElementById('price-range')) {
    sidebarRangeInit(20, 80, 0, 100);
  } // END Range Slider Sidebar
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
  //  sidebar show-hide


  if (document.querySelector('.sidebar')) {
    var sidebarBtn = document.querySelector('.sidebar-btn');
    var sidebarCloseBtn = document.querySelector('.sidebar__close-btn');
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.sidebar-overlay');
    sidebarBtn.addEventListener('click', function (e) {
      e.preventDefault();
      body.classList.toggle('lock');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    sidebarCloseBtn.addEventListener('click', function (e) {
      body.classList.toggle('lock');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', function (e) {
      body.classList.toggle('lock');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });
  } //  end sidebar show-hide
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
  //  Projects list sidebar


  $(".project-list ul ul").each(function (index) {
    if (index != 0) {
      $(this).slideToggle(0);
    } else {
      $(this).prev().toggleClass("open");
    }
  });
  $(".project-list__item").click(function () {
    $(this).toggleClass("open");
    $(this).next().slideToggle(300);
  });
  $(".project-list a").each(function (index) {
    if (index === 0) {
      $(this).addClass("active");
    }
  });
  $(".project-list a").on("click", function (e) {
    e.preventDefault();
    $(".project-list a").removeClass();
    $(this).addClass("active");
  }); // END Projects list sidebar
  //  filter projects

  var projects = document.querySelectorAll('.gallery-work__item a');
  var workSort = document.querySelector('.work__sort');

  if (projects.length) {
    var sortLinks = workSort.querySelectorAll('a');
    workSort.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') {
        return false;
      } else {
        e.preventDefault();
        var className = e.target.dataset.filter;
        sortLinks.forEach(function (sortLink) {
          if (sortLink.dataset.filter === className) {
            sortLink.classList.add('active');
          } else {
            sortLink.classList.remove('active');
          }
        });
        projects.forEach(function (project) {
          project.parentElement.parentElement.classList.remove('hide-project');

          if (!project.classList.contains(className) && className !== 'all') {
            project.parentElement.parentElement.classList.add('hide-project');
          }
        });
      }
    });
  } //  END filter projects
  //  filter listener for AJAX


  if (document.querySelector('.filter')) {
    var powerInput = document.querySelector('#power');
    powerInput.addEventListener('change', function (e) {
      var value = e.target.value;

      if (value) {
        // SEND AJAX
        console.log(value);
      }
    });
  } //  END filter listener for AJAX

});
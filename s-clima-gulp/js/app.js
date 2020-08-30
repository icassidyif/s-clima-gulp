"use strict";

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


var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
console.log(supportsTouch); //Menu BURGER

var burgerMenu = document.querySelector('.burger-menu');
var body = document.querySelector('body');
var menu = document.querySelector('.menu');

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

var hasSubmenus = document.querySelectorAll('.menu ul li a:not(:only-child)');
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
//Check scroll position=by Cassidy=======================================================
//=========================================================================//init SmoothScroll========================================================

var scroll = new SmoothScroll('a[href*="#"]', {
  header: '[data-scroll-header]',
  speed: 300,
  topOnEmptyHash: true,
  clip: true,
  easing: 'easeInOutCubic',
  updateURL: true,
  popstate: true
}); //=========================================================================
//=========================================================================//listeners========================================================

document.addEventListener('scrollStart', function (e) {
  burgerMenu.classList.remove('active');
  menu.classList.remove('active');
  body.classList.remove('lock');
}, false); //=========================================================================

function parallaxEffect(event) {
  layers.forEach(function (layer) {
    var speed = layer.getAttribute('data-speed');
    layer.style.transform = "translate(".concat(event.clientX * speed / 1000, "px, ").concat(event.clientY * speed / 1300, "px )");
  });
}

var parallax = document.querySelector('.parallax');
var layers = parallax.querySelectorAll('.parallax__layer');
parallax.addEventListener('mousemove', parallaxEffect); ////=include ./particles/swipper.js

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
}, "Please enter a valid phone number");
$('#callMeForm').validate({
  rules: {
    phone: {
      required: true,
      customphone: true
    }
  },
  messages: {
    phone: {
      required: "Це обов'язкове поле",
      customphone: 'Невірний номер телефону'
    }
  },
  submitHandler: function submitHandler(form) {
    $.magnificPopup.close();
    var url = '/php/call.php';
    var formData = $(form).serializeArray();
    ajaxSend(formData, url);
    form.reset();
  }
});
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
  $('.slider').slick({
    arrows: true,
    dots: true,
    adaptiveHeight: true,
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
        slidesToShow: 1,
        arrows: false
      }
    }]
  });
  $('.slider-garden').slick({
    arrows: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2500,
    mobileFirst: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: true
      }
    }, {
      breakpoint: 992,
      settings: {
        arrows: true,
        adaptiveHeight: false
      }
    }]
  });
  $('.slider-school-camp').slick({
    arrows: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2500,
    mobileFirst: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: true
      }
    }, {
      breakpoint: 992,
      settings: {
        arrows: true,
        adaptiveHeight: false
      }
    }]
  });
  $('.slider-karpaty-camp').slick({
    arrows: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2500,
    mobileFirst: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: true
      }
    }, {
      breakpoint: 992,
      settings: {
        arrows: true,
        adaptiveHeight: false
      }
    }]
  });
  $('.slider-foreign-camp').slick({
    arrows: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2500,
    mobileFirst: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: true
      }
    }, {
      breakpoint: 992,
      settings: {
        arrows: true,
        adaptiveHeight: false
      }
    }]
  });
}); //Spoiler=========================================================================

$('.spoiler').click(function () {
  $(this).toggleClass('opened').toggleClass('closed').prev().slideToggle(700);

  if ($(this).hasClass('opened')) {
    $(this).find('label').html('Згорнути текст');
  } else {
    $(this).find('label').html('Читати далі');
  }
}); //
//TABS===================================================================

$('.tabs__item').each(function (i, item) {
  var target = $(this).attr('href');

  if ($(this).hasClass('active')) {
    $(target).show();
  } else {
    $(target).hide();
  }
}).click(function (e) {
  e.preventDefault();
  var target = $(this).attr('href');

  if ($(this).hasClass('active')) {
    return false;
  } else {
    $('.tabs__item').removeClass('active');
    $('.tabs__tab').hide();
    $(target).fadeIn(500);
    $(target).find('.camp__slider').slick('refresh');
    $(this).addClass('active');
  }
}); //footer copyright====================================================

var spanElement = document.createElement('span');
var copyRight = "Smartik \xA9 2017 - ".concat(new Date().getFullYear(), ".  \u0420\u043E\u0437\u0440\u043E\u0431\u043B\u0435\u043D\u043E <a href=\"#\"> d-wave </a>");
spanElement.innerHTML = copyRight;
$('.footer__copyright').append(spanElement); //=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
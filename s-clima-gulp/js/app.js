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
//  hover background-color

window.addEventListener('scroll', function (event) {
  var header = document.querySelector('.header-main');

  if (pageYOffset > 50) {
    if (!header.classList.contains('header-main_scroll')) {
      header.classList.add('header-main_scroll');
    }
  } else {
    if (header.classList.contains('header-main_scroll')) {
      header.classList.remove('header-main_scroll');
    }
  } // change background for submenu


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
  } // end hover background-color

}); //Check scroll position=by Cassidy=======================================================
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
}); // Animation scroll-----
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
var copyRight = "Smartik \xA9 2017 - ".concat(new Date().getFullYear(), ".  \u0420\u043E\u0437\u0440\u043E\u0431\u043B\u0435\u043D\u043E <a href=\"#\"> d-wave </a>");
spanElement.innerHTML = copyRight;
$('.footer__copyright').append(spanElement); //=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
// 29.33% 45deg   70.67   scale(0.7067)
// Materialize initializations

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
}); // END Materialize initializations
//Range Slider Sidebar

document.addEventListener("DOMContentLoaded", function (event) {
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
}); // END Range Slider Sidebar
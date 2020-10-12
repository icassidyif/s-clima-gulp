
let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

// Animation scroll-----
// .anim-item
// .anim-no-hide
// Працює по класу .active
const animItems = document.querySelectorAll('.anim-item');
if (animItems.length > 0) {
  window.addEventListener('scroll', animScroll);

  function animScroll() {
    animItems.forEach(animItem => {
      let animItemHeight = animItem.offsetHeight;
      let animItemPosition = offset(animItem).top;
      let animStart = 4;

      let animItemPoint = (animItemHeight > window.innerHeight) ? window.innerHeight - window.innerHeight / animStart : window.innerHeight - animItemHeight / animStart;

      // Знаходимо чи є елементи , які зміщені по осі Y і компенсуємо зміщення
      const style = getComputedStyle(animItem);
      const matrix = new WebKitCSSMatrix(style.webkitTransform);
      const translateY = matrix.m42;
      if (translateY !== 0) {
        animItemPosition += -translateY;
      }
      // кынець
      if (pageYOffset > animItemPosition - animItemPoint && pageYOffset < (animItemPosition + animItemHeight)) {
        animItem.classList.add('active');
      } else {
        if (!animItem.classList.contains('anim-no-hide')) {
          animItem.classList.remove('active');
        }
      }
    })
  }

  setTimeout(() => {
    animScroll();
  }, 300)
}

// Функція , яка визначає позицію елемента по X та Y
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  }
}

// end Animation Scroll


//footer copyright====================================================
let spanElement = document.createElement('span');
let copyRight = `<a href="#">S-Clima</a> © 2019 - ${new Date().getFullYear()}р.`;
let devRight = `Розроблено студією <a target="_blank" href="https://dwave.space/"> d-wave </a>`
spanElement.innerHTML = copyRight;
$('.copyright__main').append(spanElement);
$('.copyright__develop').append(devRight);
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================

// 29.33% 45deg   70.67   scale(0.7067)


//Range Slider Sidebar

let rangeSlider = document.getElementById('price-range');
if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: ['20','80'],
    connect: true,
    step: 1,
    range: {
      'min': 0,
      'max': 100
    },
    behaviour: 'drag',
    format: wNumb({
      decimals: 0
    })
  });

  let priceFrom = document.getElementById('price-from');
  let priceFromLabel = document.querySelector('#price-from + label');
  let priceTo = document.getElementById('price-to');
  let priceToLabel = document.querySelector('#price-to + label');

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    let value = values[handle];
    if (handle) {
      priceTo.value = value;
      priceToLabel.classList.add('active');
    } else {
      priceFrom.value = value;
      priceFromLabel.classList.add('active');
    }
  })
  priceTo.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([null, this.value]);
  });
}
function updateRangeSlider(start, end, min, max) {
  rangeSlider.noUiSlider.updateOptions({
    start: [start.toString(),end.toString()],
    range: {
      'min': min,
      'max': max
    }
  });
}
// END Range Slider Sidebar



// show full version of works slider if touchscreen and product slider
if(supportsTouch) {
  let worksItems = document.querySelectorAll('.works__item');
  worksItems.forEach(item => {
    item.classList.add('works__item_mobile');
  })

  let cardProducts = document.querySelectorAll('.card-product');
  cardProducts.forEach(card => {
    card.classList.add('card-product_mobile');
  })
}
// END show full version of works slider if touchscreen


//  sidebar show-hide
if(document.querySelector('.sidebar')) {
  let sidebarBtn = document.querySelector('.sidebar-btn');
  let sidebarCloseBtn = document.querySelector('.sidebar__close-btn');
  let sidebar = document.querySelector('.sidebar');
  let overlay = document.querySelector('.sidebar-overlay');
  sidebarBtn.addEventListener('click', function (e) {
    e.preventDefault();
    body.classList.toggle('lock');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  })
  sidebarCloseBtn.addEventListener('click', function (e) {
    body.classList.toggle('lock');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  })
  overlay.addEventListener('click', function (e) {
    body.classList.toggle('lock');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  })
}
//  end sidebar show-hide


//  collapse product information
function getInstances(product) {
  let moreBlock = product.querySelector('.card-product__rest');
  let expandBtn = product.querySelector('.card-product__more');
  let wrapper = product.querySelector('.card-product__wrapper');
  let column = product.parentElement.parentElement;
  return {
    moreBlock,
    expandBtn,
    wrapper,
    column
  }
}

function collapseProduct() {
  let products = document.querySelectorAll('.card-product');

  products.forEach(product => {
    let instances = getInstances(product);
    // set column height for product
    instances.column.style.height = product.clientHeight + 30 + 'px';
    // add event listener for expand button
    instances.expandBtn.addEventListener('click', function(event){
      product.classList.toggle('opened');

      if(instances.moreBlock.clientHeight) {
        instances.moreBlock.style.height = 0;
      } else {
        instances.moreBlock.style.height = instances.wrapper.clientHeight + "px";
      }

      products.forEach(prod => {
        if(prod === product) {
          prod.style.transition = 'unset';
          product.style.zIndex = '2';

        } else {
          prod.classList.remove('opened');

          getInstances(prod).moreBlock.style.height = 0;
          prod.style.transition = 'z-index .5s ease-out';
          prod.style.zIndex = '1';
        }
      })

    });
  })
}

if(document.querySelector('.products')) {
  collapseProduct();
}
// END collapse product information


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
});
// END Projects list sidebar




//  filter projects
const projects = document.querySelectorAll('.gallery-work__item a');
const workSort = document.querySelector('.work__sort');
if(projects.length){
  let sortLinks = workSort.querySelectorAll('a');
  workSort.addEventListener('click', e => {
    if (e.target.tagName !== 'A') {
      return false;
    } else {
      e.preventDefault();
      let className = e.target.dataset.filter;
      sortLinks.forEach(sortLink => {
        if(sortLink.dataset.filter === className) {
          sortLink.classList.add('active');
        }else {
          sortLink.classList.remove('active');
        }
      })
      projects.forEach(project => {
        project.parentElement.parentElement.classList.remove('hide-project');
        if(!project.classList.contains(className) && className !== 'all') {
          project.parentElement.parentElement.classList.add('hide-project');
        }
      })
    }
  })
}
//  END filter projects


//  filter listener for AJAX
if(document.querySelector('.filter')) {
  let powerInput = document.querySelector('#power');
  powerInput.addEventListener('change', e => {
    let value = e.target.value;
    if (value) {
      // SEND AJAX
      console.log(value);
    }
  })
}

//  END filter listener for AJAX

function createBlockFilter(id, textValue) {
  const block = document.createElement('div');
  block.classList.add('params-filter__item');
  const span = document.createElement('span');
  span.innerHTML = textValue;
  const img = document.createElement('img');
  img.classList.add('svg-bread-close');
  img.dataset.id = id;
  img.setAttribute('src', 'img/filter-block-close.svg');

  block.append(span);
  block.append(img);
  return block;
}





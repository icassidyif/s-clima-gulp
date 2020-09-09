document.addEventListener('DOMContentLoaded', function() {
  let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  console.log(supportsTouch);
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
  let copyRight = `Smartik © 2019 - ${new Date().getFullYear()}.  Розроблено <a href="#"> d-wave </a>`;
  spanElement.innerHTML = copyRight;
  $('.footer__copyright').append(spanElement);
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================

// 29.33% 45deg   70.67   scale(0.7067)


// Materialize initializations

  let selectElements = document.querySelectorAll('select');
  let instances = M.FormSelect.init(selectElements);


  //let instance = instances[0];
  //console.log(instance);


// END Materialize initializations


//Range Slider Sidebar
  if (document.getElementById('price-range')) {
    let slider = document.getElementById('price-range');
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

    let priceFrom = document.getElementById('price-from');
    let priceFromLabel = document.querySelector('#price-from + label');
    let priceTo = document.getElementById('price-to');
    let priceToLabel = document.querySelector('#price-to + label');

    slider.noUiSlider.on('update', function (values, handle) {
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
      slider.noUiSlider.set([null, this.value]);
    });
  }

// END Range Slider Sidebar



//Validate and Calculate power

  function calculatePower(square, height, light) {
    let volume = square * height;
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

    let calcForms = document.querySelectorAll('form.power-calc');
    calcForms.forEach(form => {
      let calcBtn = form.querySelector('.calc-power');
      let resultInput = form.querySelector('.power');
      let resultLabel = form.querySelector('.power + label');

      let square = form.querySelector('.square');
      let height = form.querySelector('.height');
      let light = form.querySelector('.sun-light');
      let instance = M.FormSelect.getInstance(light);

      let valueSquare,
        valueHeight,
        valueLight


      calcBtn.addEventListener('click', calculate);

      function calculate() {
        valueSquare = validateInput(square, 'Вкажіть площу приміщення');
        valueHeight = validateInput(height, 'Вкажіть висоту приміщення');
        valueLight = validateInput(light, 'Виберіть тип освітлення');

        let power = calculatePower(valueSquare, valueHeight, valueLight);
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
          M.toast({html: errorMsg, classes: 'toast-error'});
        } else {
          return getValueInput(input);
        }
      }
      function getValueInput(input) {
        if(input === light) {
          instance.input.classList.remove('invalid');
          instance.input.classList.add('valid');
        }
        return parseInt(input.value);
      }
    })
  }

//END Validate and Calculate power



// show full version of vorks slider if touchscreen
  if(supportsTouch) {
    let worksItems = document.querySelectorAll('.works__item');
    worksItems.forEach(item => {
      item.classList.add('works__item_mobile');
      console.log(item);
    })
  }

})
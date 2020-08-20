// Sliders -- Generate required classes and elements for swiper slider
let swipper = document.querySelectorAll('.swiper');
if(swipper){
  swipper.forEach(slider => {
    if(!slider.classList.contains('swiper-build')) {
      let sliderItems = Array.from(slider.children);
      if(sliderItems){
        sliderItems.forEach(sliderItem => {
          sliderItem.classList.add('swiper-slide');
        })
      }
      let sliderContent = slider.innerHTML;
      let sliderWrapper = document.createElement('div');
      sliderWrapper.classList.add('swiper-wrapper');
      sliderWrapper.innerHTML = sliderContent;
      slider.innerHTML = '';
      slider.appendChild(sliderWrapper);
      slider.classList.add('swiper-build');
    }
    if(slider.classList.contains('gallery')){
      // slider.data('LightGallery').destroy(true);
    }
  })
  slidersBuildCallback();
}

function slidersBuildCallback() {}

let mainSlider = new Swiper ('.main-slider__body', {
  flipEffect: {
    rotate: 30,
    slideShadows: false,
  },
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: false,
  speed: 800,
  // direction: 'horizontal',
  loop: true,
  // pagination: {
  //   el: '.swiper-pagination',
  // },
  navigation: {
    nextEl: '.control-main-slider__arrow_next',
    prevEl: '.control-main-slider__arrow_prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true
    }
  }
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

let secondSlider = new Swiper ('.slider-lots__body', {
  // flipEffect: {
  //   rotate: 30,
  //   slideShadows: false,
  // },
  observer: true,
  observeParents: true,
  slidesPerView: 3,
  spaceBetween: 0,
  // autoHeight: false,
  speed: 800,
  // direction: 'horizontal',
  loop: true,
  // pagination: {
  //   el: '.swiper-pagination',
  // },
  navigation: {
    nextEl: '.control-slider-lots__arrow_next',
    prevEl: '.control-slider-lots__arrow_prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    550: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3,
    }
  },
  on: {
    lazyImageReady: function () {
      ibg()
    }
  }
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

//===================================slider-quotes

let sliderQuotes = new Swiper ('.slider-quotes__body', {
  // flipEffect: {
  //   rotate: 30,
  //   slideShadows: false,
  // },
  effect: 'fade',
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 0,
  // autoHeight: false,
  speed: 1500,
  // direction: 'horizontal',
  loop: true,
  // pagination: {
  //   el: '.swiper-pagination',
  // },
  navigation: {
    nextEl: '.control-slider-quotes__circle'
  },
  breakpoints: {
    320: {
      autoHeight: true
    },
    570: {
      autoHeight: false
    }
  },
  on: {
    lazyImageReady: function () {
      ibg()
    }
  }
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});
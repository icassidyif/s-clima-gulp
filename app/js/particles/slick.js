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
    responsive: [
      {
        breakpoint: 992,
        settings: {
          // slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          // slidesToShow: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          // slidesToShow: 1,
          // arrows: false
        }
      }
    ]
  });

});

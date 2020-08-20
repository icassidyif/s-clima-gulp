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
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
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
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          adaptiveHeight: false
        }
      }
    ]
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
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          adaptiveHeight: false
        }
      }
    ]
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
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          adaptiveHeight: false
        }
      }
    ]
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
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          adaptiveHeight: false
        }
      }
    ]
  });
});

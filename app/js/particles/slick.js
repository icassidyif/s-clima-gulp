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
          // arrows: false
        }
      }
    ]
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
        }
      }
    ]
  }).on('setPosition', function () {
    $(this).find('.slick-slide').height('auto');
    let slickTrack = $(this).find('.slick-track');
    let slickTrackHeight = $(slickTrack).height();
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
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          // arrows: false
        }
      }
    ]
  }).on('setPosition', function () {
    $(this).find('.slick-slide').height('auto');
    let slickTrack = $(this).find('.slick-track');
    let slickTrackHeight = $(slickTrack).height();
    $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
  });

});



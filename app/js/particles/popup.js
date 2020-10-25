$(document).ready(function () {
  $('.popup-gallery').each(function() {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Завантаження фото #%curr%...',
      mainClass: 'mfp-fade',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,2]
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      },
      removalDelay: 300,
      callbacks: {
        elementParse: function(item) {
          if(item.el.hasClass("video")){
            item.type = 'iframe';
          }else {
            item.type = 'image';
          }
        }
      }
    })
  })


})


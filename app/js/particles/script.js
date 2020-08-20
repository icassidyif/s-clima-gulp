//Spoiler=========================================================================
$('.spoiler').click(function(){
  $(this).toggleClass('opened').toggleClass('closed').prev().slideToggle(700);
  if($(this).hasClass('opened')) {
    $(this).find('label').html('Згорнути текст');
  }
  else {
    $(this).find('label').html('Читати далі');
  }
});
//

//TABS===================================================================
$('.tabs__item').each(function (i, item) {
  let target = $(this).attr('href');
  if($(this).hasClass('active')){
    $(target).show();
  } else {
    $(target).hide();
  }
}).click(function (e) {
  e.preventDefault();
  let target = $(this).attr('href');
  if($(this).hasClass('active')){
    return false;
  } else {
    $('.tabs__item').removeClass('active');
    $('.tabs__tab').hide();
    $(target).fadeIn(500);
    $(target).find('.camp__slider').slick('refresh');
    $(this).addClass('active');
  }
});



//footer copyright====================================================
let spanElement = document.createElement('span');
let copyRight = `Smartik © 2017 - ${new Date().getFullYear()}.  Розроблено <a href="#"> d-wave </a>`;
spanElement.innerHTML = copyRight;
$('.footer__copyright').append(spanElement);
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
//=========================================================================

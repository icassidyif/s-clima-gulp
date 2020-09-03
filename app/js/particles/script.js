//Spoiler=========================================================================
// $('.spoiler').click(function(){
//   $(this).toggleClass('opened').toggleClass('closed').prev().slideToggle(700);
//   if($(this).hasClass('opened')) {
//     $(this).find('label').html('Згорнути текст');
//   }
//   else {
//     $(this).find('label').html('Читати далі');
//   }
// });
//


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

      let animItemPoint = (animItemHeight > window.innerHeight)? window.innerHeight - window.innerHeight / animStart : window.innerHeight - animItemHeight / animStart;

      // Знаходимо чи є елементи , які зміщені по осі Y і компенсуємо зміщення
      const style = getComputedStyle(animItem);
      const matrix = new WebKitCSSMatrix(style.webkitTransform);
      const translateY = matrix.m42;
      if(translateY !== 0){
        animItemPosition += -translateY;
      }
      // кынець
      if(pageYOffset > animItemPosition - animItemPoint && pageYOffset < (animItemPosition + animItemHeight)) {
        animItem.classList.add('active');
      }else {
        if(!animItem.classList.contains('anim-no-hide')) {
          animItem.classList.remove('active');
        }
      }
    })
  }
  setTimeout(()=> {
    animScroll();
  }, 300)
}

// Функція , яка визначає позицію елемента по X та Y
function offset (el) {
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
let copyRight = `Smartik © 2017 - ${new Date().getFullYear()}.  Розроблено <a href="#"> d-wave </a>`;
spanElement.innerHTML = copyRight;
$('.footer__copyright').append(spanElement);
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================


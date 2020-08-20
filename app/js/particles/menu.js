//Menu BURGER
let burgerMenu = document.querySelector('.burger-menu');
let body = document.querySelector('body');
let menu = document.querySelector('.menu');
if(burgerMenu != null){
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock');
  })
}
// end menu
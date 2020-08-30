let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
console.log(supportsTouch);


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

//dropdown sub-menu

function changeMaxHeight (li, ul, height) {
  if(li.classList.contains('closed')){
    li.classList.remove('closed');
    ul.style.maxHeight = height + 'px';
  } else {
    li.classList.add('closed');
    ul.style.maxHeight = `0px`;
  }
}

let hasSubmenus = document.querySelectorAll('.menu ul li a:not(:only-child)');

hasSubmenus.forEach(element => {
  let subMenu = element.parentElement.querySelector('ul');
  let heightSubmenu = subMenu.clientHeight;
  let liItem = element.parentElement;

  liItem.classList.add('has-submenu');
  changeMaxHeight(liItem, subMenu, heightSubmenu);

  element.addEventListener('click',(event) => {
    event.preventDefault();
    changeMaxHeight(liItem, subMenu, heightSubmenu);
  })
});
// end dropdown-menu
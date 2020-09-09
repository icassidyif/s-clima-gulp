
//Menu BURGER
let burgerMenu = document.querySelector('.burger-menu');
let body = document.querySelector('body');
let menu = document.querySelector('.menu-main');
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

let hasSubmenus = document.querySelectorAll('.menu-main ul li a:not(:only-child)');


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


//  change background-color
function bgMenu() {
  const header = document.querySelector('.header-main');

  if(pageYOffset > 50) {
    if(!header.classList.contains('header-main_scroll')) {
      header.classList.add('header-main_scroll');
    }
  }else {
    if(header.classList.contains('header-main_scroll')) {
      header.classList.remove('header-main_scroll');
    }
  }
}


window.addEventListener('scroll',(event) => {
  bgMenu();

  // change background for submenu
  if(pageYOffset > 80) {
    hasSubmenus.forEach(element => {
      let subMenu = element.parentElement.querySelector('ul');
      subMenu.classList.add('change-bg');
    })
  }else {
    hasSubmenus.forEach(element => {
      let subMenu = element.parentElement.querySelector('ul');
      subMenu.classList.remove('change-bg');
    })
  }
// end change background-color
})

bgMenu();
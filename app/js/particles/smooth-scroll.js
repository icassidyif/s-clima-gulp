//Check scroll position=by Cassidy=======================================================

//=========================================================================//init SmoothScroll========================================================
let scroll = new SmoothScroll('a[href*="#"]',{
  header: '[data-scroll-header]',
  speed: 300,
  topOnEmptyHash: true,
  clip: true,
  easing: 'easeInOutCubic',

  updateURL: true,
  popstate: true
});
//=========================================================================
//=========================================================================//listeners========================================================
document.addEventListener('scrollStart', (e) => {
  burgerMenu.classList.remove('active');
  menu.classList.remove('active');
  body.classList.remove('lock');
}, false);
//=========================================================================

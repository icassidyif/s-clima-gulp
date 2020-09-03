//Check scroll position=by Cassidy=======================================================

//=========================================================================//init SmoothScroll========================================================
let scroll = new SmoothScroll('a[href*="#"]',{
  header: '[data-scroll-header]',
  speed: 500,
  topOnEmptyHash: true,
  clip: true,
  easing: 'easeInOutCubic',

  updateURL: true,
  popstate: true
});
//=========================================================================
//=========================================================================//
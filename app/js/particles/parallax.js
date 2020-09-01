function parallaxEffect(event) {
  layers.forEach(layer => {
    const speed = layer.getAttribute('data-speed');
    layer.style.transform = `translate(${event.clientX * speed / 1000}px, ${event.clientY * speed / 1300}px )`;
  })
}
let parallax = document.querySelector('.parallax-main');
let layers = parallax.querySelectorAll('.parallax-main__layer');
parallax.addEventListener('mousemove', parallaxEffect);



//Scroll parallax
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
});


//end scroll parallax
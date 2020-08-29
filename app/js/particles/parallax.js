function parallaxEffect(event) {
  layers.forEach(layer => {
    const speed = layer.getAttribute('data-speed');
    layer.style.transform = `translate(${event.clientX * speed / 1000}px, ${event.clientY * speed / 1300}px )`;
  })
}

let parallax = document.querySelector('.parallax');
let layers = parallax.querySelectorAll('.parallax__layer');
parallax.addEventListener('mousemove', parallaxEffect);

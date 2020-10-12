// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {
  let webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support === true) {
    document.querySelector('body').classList.add('webp');
  }else{
    document.querySelector('body').classList.add('no-webp');
  }
  ibg(); // запуск перевірки IBG. Функція визначить і при можливості замінить формат даного класу з JPEG в WEBP.
});
//--------------------------------------------------------------------------------

// img like a BG by Cassidy
function ibg() {
  let ibgs = document.querySelectorAll('.ibg');
  let body = document.querySelector('body');
  let isWebP = body.classList.contains('webp');
  ibgs.forEach((item) => {
    if(item.querySelector('img')){
      item.style.backgroundImage = (isWebP)? 'url('+item.querySelector('source').getAttribute('srcset')+')' : 'url('+item.querySelector('img').getAttribute('src')+')'
    }
  })
}
//end img like BG



// show popup alert
function showPopupSuccess() {
  $.magnificPopup.open({
    items: {
      src: $('#alert-success-send'),
      type:'inline'
    },
    modal: true
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
}

function showPopupError() {
  $.magnificPopup.open({
    items: {
      src: $('#alert-error-send'),
      type:'inline'
    },
    modal: true
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
}

//end popup alert

//create filter show window
function createFilterShow(count = 0, link = '#') {
  const block = document.createElement('div');
  block.classList.add('filter__show');
  block.classList.add('show-filter');
  const text = document.createElement('span');
  text.classList.add('show-filter__text');
  text.innerHTML = `Знайдено<span>${count}</span>товарів`;
  const linkBtn = document.createElement('a');
  linkBtn.classList.add('show-filter__link');
  linkBtn.setAttribute('href', link);
  linkBtn.innerHTML = 'Показати';
  block.append(text);
  block.append(linkBtn);
  return block;
}
//end create filter show window

// Append filter show window to element
function bindFilterBlock(element, block) {
  let target;
  switch (element.tagName) {
    case 'INPUT': {
      target = element.parentElement;
      block.classList.add('show-filter_right');
      block.style.top = 0;
      if(window.innerWidth < 768) {
        $(target).after(block);
      } else {
        $(target).append(block);
      }
      break;
    }
    case 'LABEL': {
      target = element;
      if(window.innerWidth < 768) {
        $(target.parentElement).after(block);
      } else {
        $(target).append(block);
      }
      break;
    }
    case 'DIV': {
      target = element;
      if(window.innerWidth < 768) {
        block.style.marginTop = -20+'px';
        block.style.marginBottom = 40+'px';
        $(target.parentElement).after(block);
      } else {
        block.style.top = -15+'px';
        $(target).append(block);
      }
    }
      break;
  }
}
//End Append filter show window to element
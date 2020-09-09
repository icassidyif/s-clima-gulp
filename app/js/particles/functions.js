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

// form send process
const ajaxSend = (formData, url) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(data === 'true'){
        showPopupSuccess();
      }else {
        showPopupError();
      }
    })
    .catch(error => {
      console.error(error);
    })
};
// end

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
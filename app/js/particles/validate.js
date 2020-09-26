$("select").css({
  display: "block",
  position: 'absolute',
  visibility: 'hidden'
});

$("#phone").mask("+38 (999) 999-99-99");

$.validator.addMethod('customPhone', function (value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
}, "Please enter a valid phone number");


function calculatePower(square, height, light) {
  let volume = square * height;
  switch (light) {
    case 1:
      light = 30;
      break;
    case 2:
      light = 35;
      break;
    case 3:
      light = 40;
      break;
  }
  return volume * light / 1000;
}


$('#order-form').validate({
  rules: {
    cartOrderName: {
      required: true
    },
    cartOrderPhone: {
      required: true,
      customPhone: true
    },
    cartOrderMessage: {
    }
  },
  messages: {
    cartOrderName: {
      required: "Це обов'язкове поле"
    },
    cartOrderPhone: {
      required: "Це обов'язкове поле",
      customPhone: 'Невірний номер телефону'
    }
  },
  submitHandler: function (form) {
    //$.magnificPopup.close();
    // let url = '/php/call.php';
    let CurrentCart = JSON.parse(localStorage.getItem('cart'));
    let formData = $(form).serializeArray();
    // ajaxSend(formData, url);
    console.log(formData, CurrentCart);
    //clear
    form.reset();
    cart.products = {};
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
    let modal = M.Modal.getInstance($('#cart'));
    modal.close();
  }
});


$('#power-calc').validate({
  rules: {
    square: {
      required: true,
      min: '1',
      max: '900',
      step: '.1',
      number: true
    },
    height: {
      required: true,
      min: '1',
      max: '50',
      step: '.1',
      number: true
    },
    sunlight: {
      required: true
    },
    power: {
      number: true,
      step: .1
    }
  },
  messages: {
    square: {
      required: 'Введіть площу приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    height: {
      required: 'Введіть висоту приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    sunlight: {
      required: 'Виберіть варіант зі списку'
    },
    power: {
      number: ' ',
      step: ' '
    }
  },
  submitHandler: function (form) {
    let resultInput = form.querySelector('.power');
    let resultLabel = form.querySelector('.power + label');
    let data = $(form).serializeArray();
    let result = calculatePower(parseInt(data[0].value), parseInt(data[1].value), parseInt(data[2].value));
    result = Math.ceil(result * 10) / 10;

    resultInput.value = result;
    resultLabel.classList.add('active');
  //   SEND AJAX
  }
})


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
  return Math.ceil((volume * light / 1000) * 10) / 10;
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

    let url = '/send-data';
    let CurrentCart = JSON.parse(localStorage.getItem('cart'));
    // ## just cond
    let vFormData = $(form).serializeArray();
    vFormData[3] = vFormData[0];
    vFormData[0] = {'type' : 'air_cond'};
    vFormData[4] = {'goods': ''};
    vFormData[4]['goods'] = CurrentCart;

    fetch(url, { method: 'POST', body: JSON.stringify(vFormData) })
      .then(function (response) {
        return response.text();
      })
      .then(function (body) {
        // console.log(body);
      });
    // ## just cond

    //clear
    form.reset();
    cart.products = {};
    products = cart.products;
    loadToLocalStorage();
    updateCartContent();
    let modal = M.Modal.getInstance($('#cart'));
    modal.close();
    M.toast({html: 'Дякуємо за замовлення! Наш менежер скоро зв\'яжеться з Вами.'});
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
    resultInput.value = calculatePower(parseInt(data[0].value), parseInt(data[1].value), parseInt(data[2].value));
    resultLabel.classList.add('active');
  }
})




$('#form-calculate').validate({
  rules: {
    formCalculateSquare: {
      required: false,
      min: 1,
      max: 900,
      step: .1,
      number: true
    },
    formCalculateHeight: {
      required: false,
      min: 1,
      max: 50,
      step: .1,
      number: true
    },
    power: {
      required: false,
      min: 0,
      max: 100,
      step: .1,
      number: true
    },
    formName: {
      required: true,
      minlength: 2
    },
    formPhone: {
      required: true,
      customPhone: true
    }
  },
  messages: {
    formCalculateSquare: {
      required: 'Введіть площу приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formCalculateHeight: {
      required: 'Введіть висоту приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formName: {
      required: "Це обов'язкове поле",
      minlength: 'Надто коротке ім\'я'
    },
    formPhone: {
      required: "Це обов'язкове поле",
      customPhone: 'Невірний номер телефону'
    },
    power: {
      number: '',
      min: '',
      max: '',
      step: ''
    }
  },
  submitHandler: function (form) {
    let data = $(form).serializeArray();
    let pickUpBySelf;
    let instanceModal = M.Modal.getInstance(document.getElementById('prom-pick-up'));
    data.forEach(element => {
      if (element.name === 'typePickUp') {
        pickUpBySelf = (element.value === 'pickUpBySelf');
      }
    })
    if(pickUpBySelf) {
      let powerValue ;
      data.forEach(element => {
        if (element.name === 'power') {
          powerValue = +element.value;
        }
      })
      form.reset();
      instanceModal.close();
      window.open(`https://www.google.ru/?power=${powerValue}`, '_self');
    } else {
      console.log(data);
      form.reset();
      instanceModal.close();
      M.toast({html: 'Дякуємо за звернення! Наш менежер скоро зв\'яжеться з Вами.'});
    }
  }
})


$('#form-calculate2').validate({
  rules: {
    formCalculateSquare: {
      required: false,
      min: 1,
      max: 900,
      step: .1,
      number: true
    },
    formCalculateHeight: {
      required: false,
      min: 1,
      max: 50,
      step: .1,
      number: true
    },
    power: {
      required: false,
      min: 0,
      max: 100,
      step: .1,
      number: true
    },
    formName: {
      required: true,
      minlength: 2
    },
    formPhone: {
      required: true,
      customPhone: true
    }
  },
  messages: {
    formCalculateSquare: {
      required: 'Введіть площу приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formCalculateHeight: {
      required: 'Введіть висоту приміщення',
      min: 'Надто мале значення',
      max: 'Надто велике значення',
      step: 'Невірне значення',
      number: 'Введіть числове значення'
    },
    formName: {
      required: "Це обов'язкове поле",
      minlength: 'Надто коротке ім\'я'
    },
    formPhone: {
      required: "Це обов'язкове поле",
      customPhone: 'Невірний номер телефону'
    },
    power: {
      number: '',
      min: '',
      max: '',
      step: ''
    }
  },
  submitHandler: function (form) {
    let data = $(form).serializeArray();
    let pickUpBySelf;
    let instanceModal = M.Modal.getInstance(document.getElementById('pob-pick-up'));
    data.forEach(element => {
      if (element.name === 'typePickUp') {
        pickUpBySelf = (element.value === 'pickUpBySelf');
      }
    })
    if(pickUpBySelf) {
      let powerValue ;
      data.forEach(element => {
        if (element.name === 'power') {
          powerValue = +element.value;
        }
      })
      form.reset();
      instanceModal.close();
      window.open(`https://www.google.ru/?power=${powerValue}`, '_self');
    } else {
      console.log(data);
      form.reset();
      instanceModal.close();
      M.toast({html: 'Дякуємо за звернення! Наш менежер скоро зв\'яжеться з Вами.'});
    }
  }
})


$('#feedback-form').validate({
  rules: {
    contactName: {
      required: true
    },
    contactPhone: {
      required: true,
      customPhone: true
    }
  },
  messages: {
    contactName: {
      required: "Це обов'язкове поле"
    },
    contactPhone: {
      required: "Це обов'язкове поле",
      customPhone: 'Невірний номер телефону'
    }
  },
  submitHandler: function (form) {
    let formData = $(form).serializeArray();
    console.log(formData);
    form.reset();
    M.toast({html: 'Дякуємо за звернення!'});
  }
});

$("#phone").mask("+38 (999) 999-99-99");

$.validator.addMethod('customphone', function (value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
}, "Please enter a valid phone number");


$('#order-form').validate({
  rules: {
    cartOrderName: {
      required: true
    },
    cartOrderPhone: {
      required: true,
      customphone: true
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
      customphone: 'Невірний номер телефону'
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
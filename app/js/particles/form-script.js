const promForm = new Form();
const householdForm = new Form();
const categories = [
  {
    name: 'Кондиціонери',
    url: '/cond'
  },
  {
    name: 'Осушувачі/Очищувачі повітря',
    url: '/osy'
  },
  {
    name: 'Теплові завіси',
    url: '/teplZav'
  },
  {
    name: 'Теплові насоси',
    url: '/teplNas'
  },
  {
    name: 'Вентиляція',
    url: '/vent'
  },
];

//-------------- CREATE FORM FROM ELEMENTS


if(document.querySelector('#pick-up')) {

  function goPromForm() {
    // functions
    function detectSelectedOption(selectEl) {
      return selectEl.querySelector('option[selected]').dataset.link;
    }
    function createPickUpBySelfContent() {
      console.log('content for pickUpBySelf');
      const title = promForm.createTitle('Параметри приміщення');

      // Calculate section
      const inputSquare = promForm.createInput('number', 'formCalculateSquare', 'form-calculate-square');
      inputSquare.classList.add('column-sm-1-2');
      inputSquare.querySelector('label').innerHTML = 'Площа приміщення (м2)';

      const inputHeight = promForm.createInput('number', 'formCalculateHeight', 'form-calculate-height');
      inputHeight.classList.add('column-sm-1-2');
      inputHeight.querySelector('label').innerHTML = 'Висота приміщення (м)';

      const select = promForm.createSelect('form-sunlight', ['Слабке', 'Середнє', 'Високе']);
      select.classList.add('column-sm-1-2');

      const column = document.createElement('div');
      column.classList.add('column');
      column.classList.add('column-sm-1-2');
      const buttonCalc = promForm.createButton('button','form__calculate-btn');
      buttonCalc.innerHTML = 'Розрахувати';
      const inputCalc = promForm.createInput('number','power', 'form-calculate-power');
      inputCalc.classList.add('input-field_inline');
      inputCalc.querySelector('label').innerHTML = 'кВт';
      column.append(buttonCalc);
      column.append(inputCalc);

      // Submit section
      const columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      const buttonSubmit = promForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Показати товари';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit);


      //  clear before insert
      $('#form-calculate .container2').nextAll().remove();
      //appending
      promFormElement.firstChild.append(title);
      promFormElement.firstChild.append(inputSquare);
      promFormElement.firstChild.append(inputHeight);
      promFormElement.firstChild.append(select);
      promFormElement.firstChild.append(column);
      promFormElement.firstChild.append(columnSubmit);
      initMaterializeSelect();

      // Listeners
      let square;
      let height;
      let light;
      let result;
      let resultLabel;
      function refreshCalculateValues() {
        square = +promFormElement.querySelector('input[name="formCalculateSquare"]').value;
        height = +promFormElement.querySelector('input[name="formCalculateHeight"]').value;
        light = +promFormElement.querySelector('select[name="form-sunlight"]').value;
        result = promFormElement.querySelector('input[name="power"]');
        resultLabel = promFormElement.querySelector('input[name="power"] + label');
      }
      function resetCalculateValues() {
        promFormElement.querySelector('input[name="formCalculateSquare"]').value = '';
        promFormElement.querySelector('input[name="formCalculateHeight"]').value = '';
      }
      refreshCalculateValues();
      result.value = calculatePower(square,height,light);
      resultLabel.classList.add('active');

      buttonCalc.addEventListener('click', e => {
        refreshCalculateValues();
        result.value = calculatePower(square,height,light);
        resultLabel.classList.add('active');
        resetCalculateValues();
      });
    }

    function createPickUpByProfContent() {
      console.log('content for pickUpByProf');
      function refreshCount() {
        if(promFormElement.querySelectorAll('.form__block').length >= 0) {
          const calcBlocks = promFormElement.querySelectorAll('.form__block');
          calcBlocks.forEach((calcBlock,index) => {
            const text = calcBlock.querySelector('.form__title span + span');
            text.innerHTML = index + 1;
          });
        }
      }

      const nameInput = promForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';

      const phoneInput = promForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';

      const container3 = document.createElement('div');
      container3.classList.add('container3');

      const addBtn = promForm.createAddBtn();

      const textInput = promForm.createTextarea('form-comment','mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту';

      // Submit section
      const columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      const buttonSubmit = promForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit);

      //  clear before insert
      $('#form-calculate .container2').nextAll().remove();
      // appending
      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(container3);
      promFormElement.firstChild.append(addBtn);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit);

      // listener
      const addButton = promFormElement.querySelector('.form__icon-add');
      addButton.addEventListener('click', addBlock);

      function addBlock(e) {
        const outPlace = promFormElement.querySelector('.container3');
        const calculateRoomBlock = promForm.buildCalculateBlock();
        //appending
        outPlace.before(calculateRoomBlock);
        refreshCount();
        calculateRoomBlock.querySelector('.form__remove-btn').addEventListener('click', removeBlock);
        initMaterializeSelect();

      }

      function removeBlock(e) {
        const currentBlock = e.target.closest('.form__block');
        currentBlock.remove();
        refreshCount();
      }
    }


    function createCondtitonContent(category) {
      console.log('go condition content');
      const pickUpSelf = promForm.createRadio('typePickUp', 'pickUpBySelf', true);
      pickUpSelf.classList.add('column-sm-1-2');
      const spanSelf = document.createElement('span');
      spanSelf.innerHTML = 'Підібрати самостійно';
      pickUpSelf.firstChild.append(spanSelf);
      const pickUpProf = promForm.createRadio('typePickUp', 'pickUpByProf', false);
      pickUpProf.classList.add('column-sm-1-2');
      const spanProf = document.createElement('span');
      spanProf.innerHTML = 'Довірити вибір спеціалісту';
      pickUpProf.firstChild.append(spanProf);
      //creating container2
      const container2 = document.createElement('div');
      container2.classList.add('container2');
      //  clear before insert
      $('#form-calculate .container1').nextAll().remove();
      //appending
      promFormElement.firstChild.append(pickUpSelf);
      promFormElement.firstChild.append(pickUpProf);
      promFormElement.firstChild.append(container2);

      //  event listening
      const inputsRadio = promFormElement.querySelectorAll('input[name="typePickUp"]');
      inputsRadio.forEach(inputRadio => {
        inputRadio.addEventListener('change', e => {
          if(e.target.value === 'pickUpBySelf') {
            createPickUpBySelfContent();
          } else if(e.target.value === 'pickUpByProf') {
            createPickUpByProfContent();
          }
        });
        if(inputRadio.checked && inputRadio.value === 'pickUpBySelf') {
          createPickUpBySelfContent();
        } else if(inputRadio.checked && inputRadio.value === 'pickUpByProf') {
          createPickUpByProfContent();
        }

      })

    }
    function createAnotherContent(category) {
      console.log('go another content');
      const textBlcok = promForm.createInfoText('Підбір обладнання для осушувачів/очищувачів повітря технічно складний процес, який потребує професійного підходу.  Будь ласка, заповніть форму нижче, щоб отримати консультацію спеціаліста.');

      const nameInput = promForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';

      const phoneInput = promForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';

      const textInput = promForm.createTextarea('form-comment','mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту';

      // Submit section
      const columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      const buttonSubmit = promForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit);

      //  clear before insert
      $('#form-calculate .container1').nextAll().remove();
      //appending
      promFormElement.firstChild.append(textBlcok);
      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit);
    }
    //create form
    const promFormElement = promForm.createForm('form-calculate');
    //create Select
    const promFormSelect = promForm.createSelect('categories', categories);
    promFormSelect.classList.add('column-sm-1-2');
    //appending
    promFormElement.firstChild.appendChild(promFormSelect);
    //query Select
    const selectElement = promFormElement.querySelector('select');
    //create details with active options
    const promFormDetails = promForm.createDetails(detectSelectedOption(selectElement));
    promFormDetails.classList.add('column-sm-1-2');
    //create container-1
    const container1 = document.createElement('div');
    container1.classList.add('container1');
    //appending
    promFormElement.firstChild.appendChild(promFormDetails);
    promFormElement.firstChild.appendChild(container1);


    if(+selectElement.querySelector('option[selected]').value === 1) {
      createCondtitonContent(+selectElement.querySelector('option[selected]').value);
    } else {
      createAnotherContent(+selectElement.querySelector('option[selected]').value);
    }

    // insert form into modal
    const outPromPickUp = document.querySelector('.prom-pick-up');
    outPromPickUp.appendChild(promFormElement);

    //  event listening
    selectElement.addEventListener('change', e => {
      promFormDetails.querySelector('a').setAttribute('href', e.target[+e.target.value-1].dataset.link);
      if(+e.target.value !== 1) {
        createAnotherContent(+e.target.value);
      } else {
        createCondtitonContent(+e.target.value);
      }
    })
  }













  function goHouseHoldForm() {
    // functions
    function detectSelectedOption(selectEl) {
      return selectEl.querySelector('option[selected]').dataset.link;
    }
    function createPickUpBySelfContent() {
      console.log('content for pickUpBySelf');
      const title = householdForm.createTitle('Параметри приміщення');

      // Calculate section
      const inputSquare = householdForm.createInput('number', 'formCalculateSquare', 'form-calculate-square');
      inputSquare.classList.add('column-sm-1-2');
      inputSquare.querySelector('label').innerHTML = 'Площа приміщення (м2)';

      const inputHeight = householdForm.createInput('number', 'formCalculateHeight', 'form-calculate-height');
      inputHeight.classList.add('column-sm-1-2');
      inputHeight.querySelector('label').innerHTML = 'Висота приміщення (м)';

      const select = householdForm.createSelect('form-sunlight', ['Слабке', 'Середнє', 'Високе']);
      select.classList.add('column-sm-1-2');

      const column = document.createElement('div');
      column.classList.add('column');
      column.classList.add('column-sm-1-2');
      const buttonCalc = householdForm.createButton('button','form__calculate-btn');
      buttonCalc.innerHTML = 'Розрахувати';
      const inputCalc = householdForm.createInput('number','power', 'form-calculate-power');
      inputCalc.classList.add('input-field_inline');
      inputCalc.querySelector('label').innerHTML = 'кВт';
      column.append(buttonCalc);
      column.append(inputCalc);

      // Submit section
      const columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      const buttonSubmit = householdForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Показати товари';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit);


      //  clear before insert
      $('#form-calculate2 .container2').nextAll().remove();
      //appending
      promFormElement.firstChild.append(title);
      promFormElement.firstChild.append(inputSquare);
      promFormElement.firstChild.append(inputHeight);
      promFormElement.firstChild.append(select);
      promFormElement.firstChild.append(column);
      promFormElement.firstChild.append(columnSubmit);
      initMaterializeSelect();

      // Listeners
      let square;
      let height;
      let light;
      let result;
      let resultLabel;
      function refreshCalculateValues() {
        square = +promFormElement.querySelector('input[name="formCalculateSquare"]').value;
        height = +promFormElement.querySelector('input[name="formCalculateHeight"]').value;
        light = +promFormElement.querySelector('select[name="form-sunlight"]').value;
        result = promFormElement.querySelector('input[name="power"]');
        resultLabel = promFormElement.querySelector('input[name="power"] + label');
      }
      function resetCalculateValues() {
        promFormElement.querySelector('input[name="formCalculateSquare"]').value = '';
        promFormElement.querySelector('input[name="formCalculateHeight"]').value = '';
      }
      refreshCalculateValues();
      result.value = calculatePower(square,height,light);
      resultLabel.classList.add('active');

      buttonCalc.addEventListener('click', e => {
        refreshCalculateValues();
        result.value = calculatePower(square,height,light);
        resultLabel.classList.add('active');
        resetCalculateValues();
      });
    }

    function createPickUpByProfContent() {
      console.log('content for pickUpByProf');
      function refreshCount() {
        if(promFormElement.querySelectorAll('.form__block').length >= 0) {
          const calcBlocks = promFormElement.querySelectorAll('.form__block');
          calcBlocks.forEach((calcBlock,index) => {
            const text = calcBlock.querySelector('.form__title span + span');
            text.innerHTML = index + 1;
          });
        }
      }

      const nameInput = householdForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';

      const phoneInput = householdForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';

      const container3 = document.createElement('div');
      container3.classList.add('container3');

      const addBtn = householdForm.createAddBtn();

      const textInput = householdForm.createTextarea('form-comment','mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту';

      // Submit section
      const columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      const buttonSubmit = householdForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit);

      //  clear before insert
      $('#form-calculate2 .container2').nextAll().remove();
      // appending
      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(container3);
      promFormElement.firstChild.append(addBtn);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit);

      // listener
      const addButton = promFormElement.querySelector('.form__icon-add');
      addButton.addEventListener('click', addBlock);

      function addBlock(e) {
        const outPlace = promFormElement.querySelector('.container3');
        const calculateRoomBlock = householdForm.buildCalculateBlock();
        //appending
        outPlace.before(calculateRoomBlock);
        refreshCount();
        calculateRoomBlock.querySelector('.form__remove-btn').addEventListener('click', removeBlock);
        initMaterializeSelect();

      }

      function removeBlock(e) {
        const currentBlock = e.target.closest('.form__block');
        currentBlock.remove();
        refreshCount();
      }
    }


    function createCondtitonContent(category) {
      console.log('go condition content');
      const pickUpSelf = householdForm.createRadio('typePickUp', 'pickUpBySelf', true);
      pickUpSelf.classList.add('column-sm-1-2');
      const spanSelf = document.createElement('span');
      spanSelf.innerHTML = 'Підібрати самостійно';
      pickUpSelf.firstChild.append(spanSelf);
      const pickUpProf = householdForm.createRadio('typePickUp', 'pickUpByProf', false);
      pickUpProf.classList.add('column-sm-1-2');
      const spanProf = document.createElement('span');
      spanProf.innerHTML = 'Довірити вибір спеціалісту';
      pickUpProf.firstChild.append(spanProf);
      //creating container2
      const container2 = document.createElement('div');
      container2.classList.add('container2');
      //  clear before insert
      $('#form-calculate2 .container1').nextAll().remove();
      //appending
      promFormElement.firstChild.append(pickUpSelf);
      promFormElement.firstChild.append(pickUpProf);
      promFormElement.firstChild.append(container2);

      //  event listening
      const inputsRadio = promFormElement.querySelectorAll('input[name="typePickUp"]');
      inputsRadio.forEach(inputRadio => {
        inputRadio.addEventListener('change', e => {
          if(e.target.value === 'pickUpBySelf') {
            createPickUpBySelfContent();
          } else if(e.target.value === 'pickUpByProf') {
            createPickUpByProfContent();
          }
        });
        if(inputRadio.checked && inputRadio.value === 'pickUpBySelf') {
          createPickUpBySelfContent();
        } else if(inputRadio.checked && inputRadio.value === 'pickUpByProf') {
          createPickUpByProfContent();
        }

      })

    }
    function createAnotherContent(category) {
      console.log('go another content');
      const textBlcok = householdForm.createInfoText('Підбір обладнання для осушувачів/очищувачів повітря технічно складний процес, який потребує професійного підходу.  Будь ласка, заповніть форму нижче, щоб отримати консультацію спеціаліста.');

      const nameInput = householdForm.createInput('text', 'formName', 'form-name', 'person');
      nameInput.classList.add('column-sm-1-2');
      nameInput.querySelector('label').innerHTML = 'Ім\'я';

      const phoneInput = householdForm.createInput('text', 'formPhone', 'form-phone', 'phone');
      phoneInput.classList.add('column-sm-1-2');
      phoneInput.querySelector('label').innerHTML = 'Контактний номер';

      const textInput = householdForm.createTextarea('form-comment','mode_edit');
      textInput.querySelector('label').innerHTML = 'Коментар до запиту';

      // Submit section
      const columnSubmit = document.createElement('div');
      columnSubmit.classList.add('column');
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('form__btn-submit');
      const buttonSubmit = householdForm.createButton('submit', 'form__btn');
      buttonSubmit.innerHTML = 'Надіслати запит';
      columnSubmit.append(buttonDiv);
      buttonDiv.append(buttonSubmit);

      //  clear before insert
      $('#form-calculate2 .container1').nextAll().remove();
      //appending
      promFormElement.firstChild.append(textBlcok);
      promFormElement.firstChild.append(nameInput);
      promFormElement.firstChild.append(phoneInput);
      promFormElement.firstChild.append(textInput);
      promFormElement.firstChild.append(columnSubmit);
    }
    //create form
    const promFormElement = householdForm.createForm('form-calculate2');
    //create Select
    const promFormSelect = householdForm.createSelect('categories', categories);
    promFormSelect.classList.add('column-sm-1-2');
    //appending
    promFormElement.firstChild.appendChild(promFormSelect);
    //query Select
    const selectElement = promFormElement.querySelector('select');
    //create details with active options
    const promFormDetails = householdForm.createDetails(detectSelectedOption(selectElement));
    promFormDetails.classList.add('column-sm-1-2');
    //create container-1
    const container1 = document.createElement('div');
    container1.classList.add('container1');
    //appending
    promFormElement.firstChild.appendChild(promFormDetails);
    promFormElement.firstChild.appendChild(container1);


    if(+selectElement.querySelector('option[selected]').value === 1) {
      createCondtitonContent(+selectElement.querySelector('option[selected]').value);
    } else {
      createAnotherContent(+selectElement.querySelector('option[selected]').value);
    }

    // insert form into modal
    const outPromPickUp = document.querySelector('.household-pick-up');
    outPromPickUp.appendChild(promFormElement);

    //  event listening
    selectElement.addEventListener('change', e => {
      promFormDetails.querySelector('a').setAttribute('href', e.target[+e.target.value-1].dataset.link);
      if(+e.target.value !== 1) {
        createAnotherContent(+e.target.value);
      } else {
        createCondtitonContent(+e.target.value);
      }
    })
  }





  goPromForm();
  goHouseHoldForm();


}
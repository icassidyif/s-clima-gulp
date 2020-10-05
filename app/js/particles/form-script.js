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
  // functions
  function detectSelectedOption(selectEl) {
    return selectEl.querySelector('option[selected]').dataset.link;
  }
  function createPickUpBySelfContent() {
    console.log('content for pickUpBySelf');
    const title = promForm.createTitle();
    title.firstChild.innerHTML = 'Параметри приміщення';

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

    const columnSubmit = document.createElement('div');
    columnSubmit.classList.add('column');
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('form__btn-submit');
    const buttonSubmit = promForm.createButton('submit', 'form__btn');
    buttonSubmit.innerHTML = 'Показати товари';
    columnSubmit.append(buttonDiv);
    buttonDiv.append(buttonSubmit);


    //  clear before insert
    $('.container2').nextAll().remove();
    //appending
    promFormElement.firstChild.append(title);
    promFormElement.firstChild.append(inputSquare);
    promFormElement.firstChild.append(inputHeight);
    promFormElement.firstChild.append(select);
    promFormElement.firstChild.append(column);
    promFormElement.firstChild.append(columnSubmit);
    initMaterializeSelect();


  }
  function createPickUpByProfContent() {
    console.log('content for pickUpByProf');

    //  clear before insert
    $('.container2').nextAll().remove();
  }
  function createCondtitonContent() {
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
    $(container1).nextAll().remove();
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
  function createAnotherContent() {
    console.log('go another content');
    $(container1).nextAll().remove();
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
    createCondtitonContent();
  } else {
    createAnotherContent();
  }

  // insert form into modal
  const outPromPickUp = document.querySelector('.prom-pick-up');
  outPromPickUp.appendChild(promFormElement);

  //  event listening
  selectElement.addEventListener('change', e => {
    promFormDetails.querySelector('a').setAttribute('href', e.target[+e.target.value-1].dataset.link);
    if(+e.target.value !== 1) {
      createAnotherContent();
    } else {
      createCondtitonContent();
    }
  })
}








//
//   //listener
//   const selectElement = promFormElement.querySelector('select');
//   console.log(selectElement);
//   selectElement.addEventListener('change', e => {
//     console.log(e.target.value);
//   })
//
//
// }






//Event work

//const checkedSelect = instance.getSelectedValues();
//console.log(checkedSelect);
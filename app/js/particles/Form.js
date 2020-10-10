class Form {
  constructor() {
    this.inputText = document.createElement('input');
    this.conumt = 1;
  }
  calculate(e) {
    let block = (!e.target)? e : e.target.closest('.form__block');
    let square;
    let height;
    let light;
    let result;
    let resultLabel;
    function refreshCalculateValues() {
      square = +block.querySelector('input[name="formCalculateSquare"]').value;
      height = +block.querySelector('input[name="formCalculateHeight"]').value;
      light = +block.querySelector('select[name="form-sunlight"]').value;
      result = block.querySelector('input[name="power"]');
      resultLabel = block.querySelector('input[name="power"] + label');
    }
    function resetCalculateValues() {
      block.querySelector('input[name="formCalculateSquare"]').value = '';
      block.querySelector('input[name="formCalculateHeight"]').value = '';
    }
    refreshCalculateValues();
    result.value = calculatePower(square,height,light);
    resultLabel.classList.add('active');
    resetCalculateValues();
  }

  buildCalculateBlock() {
    let mainColumn = document.createElement('div');
    mainColumn.classList.add('column');
    mainColumn.classList.add('form__block');
    let mainRow = document.createElement('div');
    mainRow.classList.add('row');

    const title = this.createTitle(`Приміщення #`);
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('form__remove-btn');
    const image = document.createElement('img');
    image.setAttribute('src', '../img/form-room-close.svg');

    const inputSquare = this.createInput('number', 'formCalculateSquare', 'form-calculate-square');
    inputSquare.classList.add('column-sm-1-2');
    inputSquare.querySelector('label').innerHTML = 'Площа приміщення (м2)';

    const inputHeight = this.createInput('number', 'formCalculateHeight', 'form-calculate-height');
    inputHeight.classList.add('column-sm-1-2');
    inputHeight.querySelector('label').innerHTML = 'Висота приміщення (м)';

    const select = this.createSelect('form-sunlight', ['Слабке', 'Середнє', 'Високе']);
    select.classList.add('column-sm-1-2');

    const column = document.createElement('div');
    column.classList.add('column');
    column.classList.add('column-sm-1-2');
    const buttonCalc = this.createButton('button','form__calculate-btn');
    buttonCalc.innerHTML = 'Розрахувати';
    const inputCalc = this.createInput('number','power', 'form-calculate-power');
    inputCalc.classList.add('input-field_inline');
    inputCalc.querySelector('label').innerHTML = 'кВт';
    column.append(buttonCalc);
    column.append(inputCalc);

    //appending
    mainColumn.append(mainRow);
    mainRow.append(title)
    title.firstChild.append(closeBtn);
    closeBtn.append(image);
    mainRow.append(inputSquare);
    mainRow.append(inputHeight);
    mainRow.append(select);
    mainRow.append(column);

    // listening
    buttonCalc.addEventListener('click', this.calculate);
    this.calculate(mainColumn);

    return mainColumn;
  }

  createTitle(text) {
    const column = document.createElement('div');
    column.classList.add('column');
    const titleBlock = document.createElement('div');
    titleBlock.classList.add('form__title');
    const title = document.createElement('span');
    const spanCount = document.createElement('span');
    if(text){
      title.innerHTML = text;
    }
    column.append(titleBlock);
    titleBlock.append(title);
    titleBlock.append(spanCount);
    return column;
  }

  createButton(type = 'button', className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.setAttribute('type', type);

    // appending
    return button;
  }

  createInfoText(text) {
    const column = document.createElement('div');
    column.classList.add('column');

    const paragraph = document.createElement('div');
    paragraph.innerHTML = text;
    paragraph.classList.add('form__info-text');

    //appending
    column.append(paragraph);

    return column;
  }

  createAddBtn() {
    const column = document.createElement('div');
    column.classList.add('column');
    const icon = document.createElement('div');
    icon.classList.add('form__icon-add');
    const image = document.createElement('img');
    image.classList.add('svg-form-add-btn');
    image.setAttribute('src', '../img/form-add-btn.svg');

    // appending
    icon.append(image);
    column.append(icon);

    return column;
  }

  createInput(type, name, id= '', iconName) {
    const index = Math.random().toString(36).substr(2, 9);
    const column = document.createElement('div');
    column.classList.add('column');
    const inputField = document.createElement('div');
    inputField.classList.add('input-field');
    if(iconName) {
      const icon = document.createElement('i');
      icon.classList.add('material-icons');
      icon.classList.add('prefix');
      icon.innerHTML = iconName;
      inputField.append(icon);
    }
    const input = document.createElement('input');
    input.setAttribute('id', id+index);
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    const label = document.createElement('label');
    label.setAttribute('for', id+index);


    // appending
    column.append(inputField);
    inputField.append(input);
    inputField.append(label);

    return column;
  }

  createTextarea(id= '', iconName) {
    const index = Math.random().toString(36).substr(2, 9);
    const column = document.createElement('div');
    column.classList.add('column');
    const inputField = document.createElement('div');
    inputField.classList.add('input-field');
    if(iconName) {
      const icon = document.createElement('i');
      icon.classList.add('material-icons');
      icon.classList.add('prefix');
      icon.innerHTML = iconName;
      inputField.append(icon);
    }
    const textArea = document.createElement('textarea');
    textArea.setAttribute('id', id + index);
    textArea.setAttribute('name', 'message');
    textArea.classList.add('materialize-textarea');
    const label = document.createElement('label');
    label.setAttribute('for', id + index);

    // appending
    column.append(inputField);
    inputField.append(textArea);
    inputField.append(label);

    return column;
  }

  createRadio(name, value, checked) {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('value', value);
    radio.classList.add('with-gap');
    const column = document.createElement('div');
    column.classList.add('column');
    if(checked === true) {
      radio.setAttribute('checked','');
    }
    radio.setAttribute('name', name);
    //appending
    label.append(radio);
    column.append(label);
    return column;
  }
  createSelect(name, values) {
    const select = document.createElement('select');
    const column = document.createElement('div');
    column.classList.add('column');
    const container = document.createElement('div');
    container.classList.add('input-field');

    select.setAttribute('name', name);
    select.setAttribute('required', '');
    values.forEach((value, index) => {
      const option = document.createElement('option');
      option.setAttribute('value', index + 1);
      if(index + 1 === 1) {
        option.setAttribute('selected', '');
      }

      if(typeof (value) === "string") {
        option.append(value);
      } else {
        option.dataset.link = value.url;
        option.append(value.name);
      }

      select.append(option);
    });

    // appending
    column.append(container);
    container.append(select);
    return column;
  }
  createDetails(link) {
    const column = document.createElement('div');
    column.classList.add('column');
    const details = document.createElement('div');
    details.classList.add('form__details');
    const text = document.createElement('span');
    text.innerHTML = 'Ознайомитись';
    const textLink = document.createElement('span');
    const detailsLink = document.createElement('a');
    detailsLink.setAttribute('href', link);
    detailsLink.classList.add('link');
    detailsLink.innerHTML = 'детальніше';
    // appending
    column.append(details);
    details.append(text);
    details.append(textLink);
    textLink.append(detailsLink);

    return column;
  }
  createForm(id) {
    const form = document.createElement('form');
    form.classList.add('form');
    form.id = id;
    const row = document.createElement('div');
    row.classList.add('row');
    //appending
    form.append(row);
    return form;
  }
}



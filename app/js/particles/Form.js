class Form {
  constructor() {
    this.inputText = document.createElement('input');
  }
  createTitle() {
    const column = document.createElement('div');
    column.classList.add('column');
    const titleBlock = document.createElement('div');
    titleBlock.classList.add('form__title');
    const title = document.createElement('span');
    column.append(titleBlock);
    titleBlock.append(title);
    return column;
  }

  createButton(type = 'button', className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.setAttribute('type', type);

    // appending
    return button;
  }

  createInput(type, name, id = '', min = '', max = '') {
    const column = document.createElement('div');
    column.classList.add('column');
    const inputField = document.createElement('div');
    inputField.classList.add('input-field');

    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('min', min);
    input.setAttribute('max', max);
    const label = document.createElement('label');
    label.setAttribute('for', id);


    // appending
    column.append(inputField);
    inputField.append(input);
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



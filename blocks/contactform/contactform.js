function createFormGroup(labelText, inputType, inputId, inputName, isTextarea = false) {
  const formGroup = document.createElement('div');
  formGroup.className = 'contact-form-group';

  const label = document.createElement('label');
  label.htmlFor = inputId;
  label.className = 'contact-form-label';
  label.textContent = labelText;
  formGroup.appendChild(label);

  const inputGroup = document.createElement('div');
  inputGroup.className = 'contact-form-input-group';

  if (isTextarea) {
    const textarea = document.createElement('textarea');
    textarea.id = inputId;
    textarea.name = inputName;
    textarea.className = 'contact-form-control';
    textarea.rows = 6;
    textarea.maxLength = 3000;
    textarea.required = true;
    inputGroup.appendChild(textarea);
  } else {
    const input = document.createElement('input');
    input.type = inputType;
    input.id = inputId;
    input.name = inputName;
    input.className = 'fcf-form-control';
    input.required = true;
    inputGroup.appendChild(input);
  }

  formGroup.appendChild(inputGroup);
  return formGroup;
}

function createSubmitButtonGroup() {
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'contact-form-group';

  const button = document.createElement('button');
  button.type = 'submit';
  button.id = 'contact-form-button';
  button.className = 'contact-btn contact-btn-primary contact-btn-lg contact-btn-block';
  button.textContent = 'Send Message';

  button.addEventListener('click', () => {
    const emailInput = document.querySelector('#Email').value;
    const messageInput = document.querySelector('#Message').value;

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInput,
        message: messageInput,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  });

  buttonGroup.appendChild(button);

  return buttonGroup;
}

function removeInitialBlockDivs(parentElement) {
  let div = parentElement.querySelector(':scope > div');

  while (div) {
    parentElement.removeChild(div);
    div = parentElement.querySelector(':scope > div');
  }
}

export default function decorate(block) {
  const form = document.createElement('form');
  form.id = 'contact-form-id';
  form.className = 'contact-form-class';

  const labelText = block.children[0].querySelector('p').textContent;
  const label2Text = block.children[1].querySelector('p').textContent;

  form.appendChild(createFormGroup(labelText, 'email', 'Email', 'Email'));
  form.appendChild(createFormGroup(label2Text, 'text', 'Message', 'Message', true));
  form.appendChild(createSubmitButtonGroup());

  block.appendChild(form);

  removeInitialBlockDivs(block);
}

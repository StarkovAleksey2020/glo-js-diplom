export default class SendForm {
  constructor(formName, statusMessageClass) {
    this.form = document.getElementById(formName);
    this.inputs = Array.from(this.form.querySelectorAll('input'));
    this.errorMessage = 'Что-то пошло не так ...';
    this.loadMessage = 'Загрузка ...';
    this.fillPhone = 'Заполните номер телефона';
    this.nameFieldLength = 'Длина поля имени - минимум 2 знака';
    this.successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    this.statusMessageClass = statusMessageClass;
    this.message = null;
    this.isError = false;
    this.phone = this.inputs.filter(item => item.getAttribute('name') === 'tel')[0];
    this.name = this.inputs.filter(item => item.getAttribute('name') === 'fio')[0];
  }

  init() {
    this.message = this.form.querySelector(this.statusMessageClass);
    this.createStatusMessage(this.form, this.statusMessageClass);
    this.clearForm();
    this.formListener();
  }

  createStatusMessage(form, field) {
    this.message = document.querySelector('error-message');
    
    if (!this.message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('error-message');
      messageElement.style.cssText = 'font-size: 2rem';
      messageElement.style.color = '#000000';
      const el = form.appendChild(messageElement);
    }

  }

  formListener() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      this.message = document.querySelector('.error-message');
      
      for (let index = 0; index < this.inputs.length; index++) {
        const fieldName = this.inputs[index].getAttribute('name');
        if (fieldName === 'fio') {
          this.checkName(this.inputs[index].value);
        } else if (fieldName === 'tel') {
          this.checkPhone(this.inputs[index]);
        }      
      }

      if (!this.isError) {
        this.message.textContent = '';
        this.message.classList.add('loader');
        const formData = new FormData(this.form);
        let body = {};
        for (let value of formData.entries()) {
          body[value[0]] = value[1];
        }
        this.postData(body, () => {
          this.message.classList.remove('loader');
          this.message.textContent = this.successMessage;
          this.clearForm(this.form);
        }, (error) => {
          this.message.classList.remove('loader');
          this.message.textContent = this.errorMessage;
          console.error(error);
        });
      }
    });
    this.phone.addEventListener('input', (e) => {
      let first = true;
      let phoneInput = e.target.value;
      e.target.value = phoneInput
        .replace(/[^0-9\+]/g, '')
        .replace(/(\+)+/g, function(match, p1) {
        if(first) {
          first = false;
          return p1;
        }
        else {
          return '';
        }
      });
    });
    this.name.addEventListener('input', (e) => {
      let nameInput = e.target.value;
      e.target.value = nameInput.replace(/[^А-Яа-яЁё ]/g, '').toUpperCase();
    });
  
  }

  checkName(name) {
    if (name.trim().length < 2) {
      this.message.textContent = this.nameFieldLength;
      this.isError = true;
      throw new Error('name field too short (must be minimum 2 chars)');
    } else {
      this.isError = false;
    }
  }

  checkPhone(phone) {
    if (phone.value.trim().length === 0) {
      this.message.textContent = this.fillPhone;
      this.isError = true;
      throw new Error('empty phone field');
    } else {
      this.isError = false;
    }
  }

  clearForm() {
    for (const item of this.inputs) {
      if (item.type !== 'submit') {
        item.value = '';
      }
    }
  }

  postData(body, outputData, errorData) {
    /*
    const fetchPromise = fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    fetchPromise.then(response => {
      if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Status: ${response.statusText}. Code: ${response.status}.`);
      }
      console.log('response: ', response);
      //response.json();
    });
*/
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {

      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200 || request.status === 201) {
        outputData();
      } else {
        errorData(request.status);
      }
    });

    request.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(body));
    
  }
}




/*
const sendForm = (formName) => {
  const errorMessage = 'Что-то пошло не так ...',
    loadMessage = 'Загрузка ...',
    fillEmail = 'Заполните email!',
    nameFieldLength = 'Длина поля имени - минимум 2 знака',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  
  const form = document.getElementById(formName);

  let statusMessage = document.querySelector('.error-message');

  if (!statusMessage) {
    statusMessage = document.createElement('div');
    statusMessage.classList.add('error-message');
    statusMessage.style.cssText = 'font-size: 2rem';
    statusMessage.style.color = '#000000';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.appendChild(statusMessage);
    const inputs = Array.from(form.querySelectorAll('input'));

    for (let index = 0; index < inputs.length; index++) {
      const fieldName = inputs[index].getAttribute('name');
      if (fieldName === 'tel') {
        if (inputs[index].value.trim().length === 0) {
          statusMessage.textContent = fillEmail;
          throw new Error('empty phone field');
        }
        inputs[index].addEventListener('input', (e) => {
          let first = true;
          let phoneInput = e.target.value;
          e.target.value = phoneInput
            .replace(/[^0-9\+]/g, '')
            .replace(/(\+)+/g, function(match, p1) {
            if(first) {
              first = false;
              return p1;
            }
            else {
              return '';
            }
          });
        });
      } else if (fieldName === 'fio') {
        if (inputs[index].value.trim().length < 2) {
          statusMessage.textContent = nameFieldLength;
          throw new Error('name field too short (must be minimum 2 chars)');
        }
      }
    }
    

    //statusMessage.textContent = loadMessage;
    statusMessage.textContent = '';
    statusMessage.classList.add('loader');
    const formData = new FormData(form);
    let body = {};
    for (let value of formData.entries()) {
      body[value[0]] = value[1];
    }
    postData(body, () => {
      statusMessage.classList.remove('loader');
      statusMessage.textContent = successMessage;
      clearForm(formName);
    }, (error) => {
      statusMessage.classList.remove('loader');
      statusMessage.textContent = errorMessage;
      console.error(error);
    });
  });

  const clearForm = (formName) => {
    const inputElements = document.getElementById(formName).getElementsByTagName('input');
    for (let item of inputElements) {
      item.value = '';
    }
  };

  const postData = (body, outputData, errorData) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {

      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        outputData();
      } else {
        errorData(request.status);
      }
    });
    request.open('POST', './server.php');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(body));
  };
};

export default sendForm;
*/
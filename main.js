'user strict'

let email = document.querySelector('.email__input');
let emailError1 = document.querySelector('.email__error1');
let emailError2 = document.querySelector('.email__error2');

let password = document.querySelector('.pass__input');
let passwordError1 = document.querySelector('.pass__error1');
let passwordError2 = document.querySelector('.pass__error2');

let radio = document.querySelector('.checkbox__input');
let radioError = document.querySelector('.checkbox__error');

let button = document.querySelector('.button__login');

let user = {};
let valueEmail = '';
let valuePassword = '';
let emailValidUser = false;
let passwordValidUser = false;
let radioValidUser = false;

let modal = document.querySelector('.modal');
let modalForm = document.querySelector('.modal__form');
let modalFormClose = document.querySelector('.modal__form-close');
let modalFormUser = document.querySelector('.modal__form-user');

email.addEventListener('change', (e) => {
  valueEmail = e.target.value.trim();
});


password.addEventListener('change', (e) => {
  valuePassword = e.target.value.trim();
});

function validateLogin(valueEmail) {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(valueEmail).toLowerCase());
};

const validRegis = () => {
  if (valueEmail.length == 0) {
    emailError1.style.display = 'block';
    emailValidUser = false;
  } else {
    emailError1.style.display = 'none';
    emailValidUser = false;

    if (validateLogin(valueEmail) == false) {
      emailError1.style.display = 'none';
      emailError2.style.display = 'block';
      emailValidUser = false;
    } else {
      emailError2.style.display = 'none';
      emailValidUser = false;

      if (radio.checked === false) {
        radioError.style.display = 'block';
        emailValidUser = false;
      } else {
        radioError.style.display = 'none';
        emailValidUser = true;
      }
    }
  }

  if (valuePassword.length == 0) {
    passwordError1.style.display = 'block';
    passwordValidUser = false;
  } else {
    passwordError1.style.display = 'none';
    passwordValidUser = false;
    if (valuePassword.length != 0 && valuePassword.length < 6) {
      passwordError2.style.display = 'block';
      passwordValidUser = false;
    } else {
      passwordError2.style.display = 'none';
      passwordValidUser = false;
      if (radio.checked === false) {
        radioError.style.display = 'block';
        passwordValidUser = false;
      } else {
        radioError.style.display = 'none';
        passwordValidUser = true;
      }
    }
  }

  if (radio.checked === false) {
    radioError.style.display = 'block';
    radioValidUser = false;
  } else {
    radioError.style.display = 'none';
    radioValidUser = true;
  }
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  validRegis();
  user = {
    email: valueEmail,
    password: valuePassword,
  };
  if (emailValidUser == true && passwordValidUser == true && radioValidUser == true) {
    localStorage.setItem('user', JSON.stringify(user));
    modal.classList.add('active');
    modalForm.classList.add('active');
    modalFormUser.innerText = valueEmail;
  }
});

modalFormClose.addEventListener('click',() => {
  modal.classList.remove('active');
  modalForm.classList.remove('active');
});

let userValid = JSON.parse(localStorage.getItem('user'));
email.value = valueEmail = userValid.email;
password.value = valuePassword = userValid.password;

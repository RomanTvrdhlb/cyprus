import { validateForms } from '../functions/validate-forms';
import vars from '../_vars';
import { modalClickHandler } from '../components/modals'
import { removeClassInArray, addCustomClass, removeCustomClass } from "../functions/customFunctions";


const rules1 = [
  {
    ruleSelector: '.input-phone',
    tel: true,
    telError: 'Введіть правильний телефон',
    showErrorMessage: false,
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть телефон!',
        showErrorMessage: false,
      },
    ]
  },
  {
    ruleSelector: '.input-name',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Поле має містити щонайменше 3 символи',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть ваше ПІБ!',
        showErrorMessage: false,
      }
    ]
  },
  {
    ruleSelector: '.input-mail',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Поле має містити щонайменше 3 символи',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть вашу Пошту!',
        showErrorMessage: false,
      },
      {
        rule: 'email',
        errorMessage: 'Заповніть вашу Пошту!',
        showErrorMessage: false,
      }
    ]
  },
];

const rules2 = [
  {
    ruleSelector: '.input-name',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Поле має містити щонайменше 3 символи',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть ваше ПІБ!',
        showErrorMessage: false,
      }
    ]
  }
];

const afterForm = () => {
  window.location.href = 'thank.html';
};

const error = () => {
  console.log('Ошибка отправки')
};

if(document.querySelectorAll('.form-validation')){
  document.querySelectorAll('.form-validation').forEach(function(form){
    validateForms(form, rules2, afterForm, error);
  })
}

if(document.querySelector('.form-quiz')){
  validateForms(document.querySelector('.form-quiz'), rules1, afterForm, error);
}



















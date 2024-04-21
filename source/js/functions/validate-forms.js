import JustValidate from 'just-validate';
import Inputmask from "inputmask";
import { addCustomClass, removeCustomClass } from './customFunctions';

let code = '+ 38';

function getCountryCode(){
  return fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {

     return data.country_calling_code;
  })
}

function initInputMask(code, telSelector, form){
  const maskOption = {
    mask:  `${code ? code : '+999'} (99) 999 99 99`,
  };

  telSelector.addEventListener('change', function(){
    if(!this.inputmask.isComplete()){
      addCustomClass(telSelector, 'just-validate-error-field');
      form.querySelector('.main-btn').style.pointerEvents = 'none';
    } else {
      form.querySelector('.main-btn').style.pointerEvents = 'initial';
      removeCustomClass(telSelector, 'just-validate-error-field');
    }
  })

  form.addEventListener('sumbit', function(e){
    if(!telSelector.inputmask.isComplete()){
      
      addCustomClass(telSelector, 'just-validate-error-field');
    }
  })
  
  telSelector.placeholder = `${code}...`;

  new Inputmask(maskOption).mask(telSelector);
}

export const validateForms = (selector, rules, afterSend) => {
  let form = selector;

  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    getCountryCode().then(code => {
      initInputMask(code, telSelector, selector);
    })
  }

  let validation = new JustValidate(selector, {validateBeforeSubmitting: true});

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    addCustomClass(form, 'loader');
    let formData = new FormData(ev.target);
    if (formData.has('Мессенжер для связи')) {
      let messengerValue = formData.get('Мессенжер для связи');
      switch (messengerValue) {
          case "1":
              formData.set('Мессенжер для связи', 'WhatsApp');
              break;
          case "2":
              formData.set('Мессенжер для связи', 'Telegram');
              break;
          case "3":
              formData.set('Мессенжер для связи', 'Viber');
              break;
      }
  }

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
            setTimeout(function(){
              addCustomClass(form, 'loaded');
            },1000);
          }
          console.log('status 200');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  })
};
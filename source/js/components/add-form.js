import {addCustomClass, removeCustomClass} from "../functions/customFunctions";

document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.add-form');
  const formsBtn = document.querySelectorAll('.single-product__trigger');




  forms.forEach(form => {
    const quantityInput = form.querySelector('.product-quantity');
    const quantityPlaceholder = form.querySelector('.add-form__label').getAttribute('data-placeholder');

    quantityInput.value = 0;

    console.log(form)

    if (!form.querySelector('.quantity-text')) {
      quantityInput.insertAdjacentHTML('afterend', `<span class="quantity-text"> ${quantityPlaceholder}</span>`);
    }

    const decreaseBtn = form.querySelector('.decrease-btn');
    const increaseBtn = form.querySelector('.increase-btn');

    decreaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 0) {
        quantityInput.value = currentValue - 1;
      }

      if (currentValue - 1 === 0 && form.classList.contains('active')) {
        form.classList.remove('active');
      }
    });


    increaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;

      console.log('123')

      !form.classList.contains('active') && form.classList.add('active');
    });
  });


//   ------------


  const likeBtns = document.querySelectorAll('.product-card__favorite');

  likeBtns.forEach((btn) => {
    btn.addEventListener('click', function (){
      this.classList.toggle('active');
    })
  })



});

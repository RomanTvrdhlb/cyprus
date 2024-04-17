import intlTelInput from 'intl-tel-input';
const inputs = document.querySelectorAll(".main-form__input.tel");


if (inputs) {
  inputs.forEach(item => {
      let iti = intlTelInput(item, {
          countrySearch: false,
          defaultCountry: "ua",
          initialCountry: "auto",
          autoPlaceholder: 'aggressive',
          nationalMode: false,
          customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
              return selectedCountryData.dialCode;
          },
          geoIpLookup: function (success, failure) {
              fetch('https://opt-master.academy/requests/geo.php')
                  .then(response => response.json())
                  .then(resp => {
                      const countryCode = (resp && resp.countrycode) ? resp.countrycode : "ua";
                      success(countryCode);
                  })
          },
          separateDialCode: false,
          formatOnDisplay: false,
      });

      let itemText = item.parentNode.querySelector('.iti__a11y-text');

      function replaceInputValue(item){
        item.placeholder = '50 123 45 67';
        itemText.innerText = itemText.innerText.replace(/[^0-9\+]/g, '');
        item.setAttribute('data-value', itemText.innerText + item.value); 
      }
     
      item.addEventListener('change',  function(){
        itemText.innerText = itemText.innerText.replace(/[^0-9\+]/g, '');
        item.setAttribute('data-value', itemText.innerText + item.value); 
      })

      iti.promise.then(function () {
        replaceInputValue(item);
      });

      item.addEventListener('click', function() {
        replaceInputValue(itemText);
      });

      replaceInputValue(itemText);
  });
}
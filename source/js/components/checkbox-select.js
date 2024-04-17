import {toggleCustomClass} from "../functions/customFunctions";

document.addEventListener('DOMContentLoaded', function () {
  const catalog = document.querySelector('.cabinet-catalog');

  if (catalog) {
    const dataChecked = catalog.querySelector('.select-checked');
    let isChecked = false;

    dataChecked.addEventListener('click', function () {
      const checkboxes = catalog.querySelectorAll('input[type="checkbox"]');
      toggleCustomClass(this);
      isChecked = !isChecked;

      checkboxes.forEach(function (checkbox) {
        checkbox.checked = isChecked;
      });
    });

  }
});

import {addCustomClass, removeCustomClass} from "../functions/customFunctions";

document.addEventListener("DOMContentLoaded", function() {
  const parents = document.querySelectorAll('.rating');
  parents.forEach(function(item){
    const stars = item.querySelectorAll('.rating__star');

    let currentRating = 0;

    function updateRating(index) {
      stars.forEach((star, i) => {
        if (i <= index) {
          addCustomClass(star)
        } else {
          removeCustomClass(star)
        }
      });
      currentRating = index + 1;
    }
  
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
  
        if (currentRating === index + 1) {
          removeCustomClass(star)
          currentRating = 0;
        } else {
          updateRating(index);
        }
      });
  
    });
  })
});

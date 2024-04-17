import {fadeIn, fadeOut} from "../functions/customFunctions";

let isStickyVisible = true;

const element = document.querySelector('.total-box__list');
const stickyBlock = document.querySelector('.cart-sticky');
function checkIfScrolledToElement() {
  const bounding = element.getBoundingClientRect();
  if (
    bounding.top >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  ) {
    if (isStickyVisible) {
      fadeOut(stickyBlock, 200);
      isStickyVisible = false;
    }
  } else if (bounding.top < 0 && !isStickyVisible) {
    return;
  } else {

    if (!isStickyVisible) {
      fadeIn(stickyBlock, 200, 'flex');
      isStickyVisible = true;
    }
  }
}

function handleScrollEvent() {
  if (window.matchMedia("(max-width: 960px)").matches) {
    window.addEventListener('scroll', checkIfScrolledToElement);
  } else {
    window.removeEventListener('scroll', checkIfScrolledToElement);
    if (!isStickyVisible) {
      fadeIn(stickyBlock, 200, 'flex');
      isStickyVisible = true;
    }
  }
}

if (element && stickyBlock) {
  handleScrollEvent();
  window.addEventListener('resize', handleScrollEvent);
}



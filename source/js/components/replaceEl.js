import {ElementReplacer} from '../functions/replacer'

new ElementReplacer({
  element: document.querySelector('.main-nav'),
  parentDesktop: document.querySelector('.header__inner'),
  parentMobile: document.querySelector('.mobile-menu'),
  breakpoint: 1024,
  mobilePlace: "afterbegin",
  desktopPlace: "beforeend"
});

new ElementReplacer({
  element: document.querySelector('.main-social'),
  parentDesktop: document.querySelector('.header__top'),
  parentMobile: document.querySelector('.mobile-menu__box'),
  breakpoint: 1024,
  mobilePlace: "afterbegin",
  desktopPlace: "afterbegin"
});

new ElementReplacer({
  element: document.querySelector('.geo'),
  parentDesktop: document.querySelector('.header__top'),
  parentMobile: document.querySelector('.mobile-menu__box'),
  breakpoint: 1024,
  mobilePlace: "afterbegin",
  desktopPlace: "afterbegin"
});

new ElementReplacer({
  element: document.querySelector('.tel-link'),
  parentDesktop: document.querySelector('.header__top'),
  parentMobile: document.querySelector('.mobile-menu__box'),
  breakpoint: 1024,
  mobilePlace: "afterbegin",
  desktopPlace: "afterbegin"
});






// 'beforebegin': перед самим элементом targetElement.
// 'afterbegin': внутри элемента targetElement, перед его первым потомком.
// 'beforeend': внутри элемента targetElement, после его последнего потомка.
// 'afterend': после самого элемента targetElement.



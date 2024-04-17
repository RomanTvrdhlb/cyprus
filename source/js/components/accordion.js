import vars from "../_vars";
import {
  toggleCustomClass,
  addCustomClass,
  removeCustomClass,
  removeClassInArray,
} from "../functions/customFunctions";
const { accParrents } = vars;

// window.addEventListener("DOMContentLoaded", () => {

// });

export const accInit = (accParrents, dataBtn, dataContent) => {
  accParrents.forEach(function (accordionParrent) {
    if (accordionParrent) {
      let multipleSetting = false;
      let breakpoinSetting = false;
      let defaultOpenSetting;

      if (
        accordionParrent.getAttribute('data-single') &&
        accordionParrent.getAttribute('data-breakpoint')
      ) {
        multipleSetting = accordionParrent.dataset.single; // true - включает сингл аккордион
        breakpoinSetting = accordionParrent.dataset.breakpoint; // брейкпоинт сингл режима (если он true)
      }

      const getAccordions = function (dataName = `[${dataBtn}]`) {
        return accordionParrent.querySelectorAll(dataName);
      };

      const accordions = getAccordions();
      let openedAccordion = null;

      const closeAccordion = function (accordion, className = "active") {
        accordion.style.maxHeight = 0;
        removeCustomClass(accordion, className);
      };

      const openAccordion = function (accordion, className = "active", height = false) {
        accordion.style.maxHeight = height ? height : accordion.scrollHeight + "px";
        addCustomClass(accordion, className);
      };

      const toggleAccordionButton = function (
        button,
        className = "active"
      ) {
        toggleCustomClass(button, className);
      };

      const checkIsAccordionOpen = function (accordion) {
        return accordion.classList.contains("active");
      };

      const accordionClickHandler = function (e) {
        e.preventDefault();
        let curentDataNumber = this.getAttribute(`${dataBtn}`);

        toggleAccordionButton(this);
        const accordionContent = accordionParrent.querySelector(
          `[${dataContent}="${curentDataNumber}"]`
        );
        const isAccordionOpen = checkIsAccordionOpen(accordionContent);

        if (isAccordionOpen) {
          closeAccordion(accordionContent);
          openedAccordion = null;
        } else {
          if (openedAccordion != null) {
            const mobileSettings = () => {
              let containerWidth = document.documentElement.clientWidth;
              if (
                containerWidth <= breakpoinSetting &&
                multipleSetting === "true"
              ) {
                closeAccordion(openedAccordion);
                toggleAccordionButton(
                  accordionParrent.querySelector(
                    `[${dataBtn}="${openedAccordion.getAttribute(
                      dataContent
                    )}"]`
                  )
                );
              }
            };

            window.addEventListener("resize", () => {
              mobileSettings();
            });
            mobileSettings();
          }

          openAccordion(accordionContent);
          openedAccordion = accordionContent;
        }
      };

      const activateAccordion = function (accordions, handler) {
        for (const accordion of accordions) {
          accordion.addEventListener("click", handler);
        }
      };
      const accordionDefaultOpen = (currentId) => {
        const defaultOpenContent = accordionParrent.querySelector(
          `[${dataContent}="${currentId}"]`
        );
        const defaultOpenButton = accordionParrent.querySelector(
          `[${dataBtn}="${currentId}"]`
        );
        openedAccordion = defaultOpenContent;

        toggleAccordionButton(defaultOpenButton);
        openAccordion(defaultOpenContent);

        console.log(defaultOpenContent)
      };

      if (accordionParrent.dataset.default) {
        defaultOpenSetting = accordionParrent.dataset.default;

        // получает id аккордиона который будет открыт по умолчанию
        accordionDefaultOpen(defaultOpenSetting);
      }



      activateAccordion(accordions, accordionClickHandler);
    }
  });
};

accInit([...document.querySelectorAll('[data-accordion]')], "data-id", "data-content");

const mobileAcc = document.querySelectorAll("[data-mobile-acc]");

if (mobileAcc.length) {
  // adaptiveInit("576");
}

// function adaptiveInit(breakpoint) {
//   let containerWidth = document.documentElement.clientWidth;
//
//   if (containerWidth <= `${breakpoint}`) {
//     mobileAcc.forEach((item) => {
//       removeClassInArray(
//         item.querySelectorAll("[data-tab-content]"),
//         "active"
//       );
//
//       item.querySelectorAll("[data-id]").forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const currentId = btn
//             .closest("[data-tab-content]")
//             .getAttribute("data-tab-content");
//           const currentBtnId = btn.getAttribute("data-id");
//
//           const box = item.querySelector(`[data-tab-content='${currentId}']`);
//
//           let boxHeight = box.style.maxHeight.replace("px", "");
//           let innerHeight = document
//             .querySelector(`[data-content='${currentBtnId}']`)
//             .style.maxHeight.replace("px", "");
//
//           box.style.maxHeight = +innerHeight + +boxHeight + "px";
//         });
//       });
//     });
//     accInit(mobileAcc, "data-tab", "data-tab-content");
//   }
//   if (containerWidth > `${breakpoint}`) {
//     document.querySelectorAll("[data-tab-content]").length && addCustomClass(
//       document.querySelectorAll("[data-tab-content]")[0],
//       "active"
//     );
//   }
// }


// observeBodyMutation(accInit);

import {
  removeClassInArray,
  addCustomClass,
  removeCustomClass,
} from "../functions/customFunctions";
import vars from "../_vars";

const areasTab = document.querySelectorAll('.areas-tabs')
const firstCount = document.querySelector('[data-count]');
const count = document.querySelector('[data-count-join]');

// --------------- tabs custom function --------------- //
// const tabsFunction = function (
//   tabsDataInitArray,
//   tabsNavAttr,
//   tabsContentAttr,
//   active = "active"
// ) {
//   tabsDataInitArray &&
//   tabsDataInitArray.forEach((tabParent) => {
//     if (tabParent) {
//       const tabNav = [...tabParent.querySelectorAll(`[${tabsNavAttr}]`)];
//       const tabContent = [
//         ...tabParent.querySelectorAll(`[${tabsContentAttr}]`),
//       ];

//       tabNav.map((nav) => {
//         nav.addEventListener("click", (e) => {
//           e.preventDefault();
//           const activeTabAttr = e.target.getAttribute(`${tabsNavAttr}`);
//           removeClassInArray(tabNav, active);
//           removeClassInArray(tabContent, active);
//           addCustomClass(
//             tabParent.querySelector(`[${tabsNavAttr}="${activeTabAttr}"]`),
//             active
//           );
//           console.log(tabParent.querySelector(`[${tabsNavAttr}="${activeTabAttr}"]`));
//           addCustomClass(
//             tabParent.querySelector(
//               `[${tabsContentAttr}="${activeTabAttr}"]`
//             ),
//             active
//           );
//         });
//       });
//     }
//   });
// };

// tabsFunction(areasTab, "data-tab", "data-tab-content");
// tabsFunction(document.querySelectorAll('.join'), "data-tab", "data-tab-content");

const tabsFunction = function (
  tabsDataInitArray,
  tabsNavAttr,
  tabsContentAttr,
  active = "active"
) {
  tabsDataInitArray &&
    tabsDataInitArray.forEach((tabParent) => {
      if (tabParent) {
        const tabNav = [...tabParent.querySelectorAll(`[${tabsNavAttr}]`)];
        const tabContent = [
          ...tabParent.querySelectorAll(`[${tabsContentAttr}]`),
        ];

        tabNav.map((nav) => {
          nav.addEventListener("click", (e) => {
            e.preventDefault();
            const activeTabAttr = e.target.getAttribute(`${tabsNavAttr}`);
            removeClassInArray(tabNav, active);
            removeClassInArray(tabContent, active);
            addCustomClass(
              tabParent.querySelector(`[${tabsNavAttr}="${activeTabAttr}"]`),
              active
            );
            addCustomClass(
              tabParent.querySelector(
                `[${tabsContentAttr}="${activeTabAttr}"]`
              ),
              active
            );

            const joinContent = tabParent.querySelector('.join-content');
            if(joinContent){
              if (!joinContent.classList.contains('active'))  {
                addCustomClass(count, 'active');
                addCustomClass(firstCount, 'mode');
              } else {
                removeCustomClass(count, 'active');
                removeCustomClass(firstCount, 'mode');
              }
            }
          });
        });
      }
    });
};

tabsFunction(areasTab, "data-tab", "data-tab-content");
tabsFunction(document.querySelectorAll(".join"), "data-tab", "data-tab-content");
tabsFunction(document.querySelectorAll(".header-menu__box"), "data-tab", "data-tab-content");
tabsFunction(document.querySelectorAll(".main-gallery"), "data-tab", "data-tab-content");
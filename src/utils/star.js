import { getItem } from "./selector";

export function changeColorStar(starList, element) {
  let dataIdElement = element.parentElement.dataset.id;
  [...starList.children].forEach((e) => {
    if (e.dataset.id <= dataIdElement) {
      e.classList.add("remix__notes-evaluate-list-item-active");
    } else {
      e.classList.remove("remix__notes-evaluate-list-item-active");
    }
  });
}
export function starRatingByMouseOver(event) {
  if (event.target.tagName != "I") return;

  let starList = getItem(document, ".remix__notes-evaluate-list");
  changeColorStar(starList, event.target);
}
export function starRatingByMouseLeave(event) {
  if (!event.target.matches(".remix__notes-evaluate-list")) return;

  let starList = getItem(document, ".remix__notes-evaluate-list");
  [...starList.children].forEach((e) => {
    e.classList.remove("remix__notes-evaluate-list-item-active");
  });
}

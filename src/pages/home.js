import { getItem, getListItem } from "../utils/selector";
import {
  changeColorStar,
  starRatingByMouseLeave,
  starRatingByMouseOver,
} from "../utils/star";
import homeApi from "./api/homeApi";

var timeOut1, timeOut2;

function handleWebsiteEvaluate() {
  let starList = getItem(document, ".remix__notes-evaluate-list");
  starList.addEventListener("mouseover", starRatingByMouseOver);
  starList.addEventListener("mouseleave", starRatingByMouseLeave);
  starList.addEventListener("click", (event) => {
    if (event.target.tagName != "I" || starList.dataset.check) return;

    let evaluateStar = +event.target.parentElement.dataset.id + 1;

    starList.dataset.check = 1;
    starList.removeEventListener("mouseover", starRatingByMouseOver);
    starList.removeEventListener("mouseleave", starRatingByMouseLeave);
    changeColorStar(starList, event.target);

    let modalElegantElement = getItem(document, ".modal-elegant");
    if (!modalElegantElement) return;

    let modalElegantBodyElement = getItem(
      modalElegantElement,
      ".modal-elegant__body"
    );
    if (!modalElegantBodyElement) return;
    modalElegantBodyElement.classList.remove("modal-elegant__body--active");

    let modalElegantBodyImageElement = getItem(
      modalElegantElement,
      ".modal-elegant__body-img"
    );
    if (!modalElegantBodyImageElement) return;

    let modalElegantBodyNoteElement = getItem(
      modalElegantElement,
      ".modal-elegant__body-note"
    );
    if (!modalElegantBodyNoteElement) return;

    let modalElegantBodyMessageElement = getItem(
      modalElegantElement,
      ".modal-elegant__body-message"
    );
    if (!modalElegantBodyMessageElement) return;

    modalElegantElement.classList.add("modal-elegant--active");

    switch (evaluateStar) {
      case 1:
        modalElegantBodyImageElement.innerHTML = "&#128557;";
        modalElegantBodyNoteElement.textContent = `${evaluateStar}* ! Awful`;
        modalElegantBodyMessageElement.textContent = `Xin lỗi vì trải nghiệm không tốt. Admin sẽ cố gắng cải thiện webite !!`;
        break;
      case 2:
        modalElegantBodyImageElement.innerHTML = "&#128560;";
        modalElegantBodyNoteElement.textContent = `${evaluateStar}* ! Bad`;
        modalElegantBodyMessageElement.textContent =
          "Cảm ơn bạn đã đánh giá ! Admin ghi nhận ý kiến và cải thiện";
        break;
      case 3:
        modalElegantBodyImageElement.innerHTML = "&#128520;";
        modalElegantBodyNoteElement.textContent = `${evaluateStar}* ! Normal`;
        modalElegantBodyMessageElement.textContent = `Cảm ơn bạn đã đánh giá ! Chúc bạn trải nghiệm website vui vẻ`;
        break;
      case 4:
        modalElegantBodyImageElement.innerHTML = "&#128516;";
        modalElegantBodyNoteElement.textContent = `${evaluateStar}* ! Good`;
        modalElegantBodyMessageElement.textContent = `Cảm ơn bạn đã ủng hộ website ! Admin rất vui vì điều đó !`;
        break;
      case 5:
        modalElegantBodyImageElement.innerHTML = "&#128518;";
        modalElegantBodyNoteElement.textContent = `${evaluateStar}* ! Awful`;
        modalElegantBodyMessageElement.textContent = `Wow ! Cảm ơn bạn đã đánh giá`;
        break;
    }
    timeOut1 = setTimeout(() => {
      modalElegantBodyElement.classList.add("modal-elegant__body--active");
    }, 1500);
    timeOut2 = setTimeout(() => {
      modalElegantElement.classList.remove("modal-elegant--active");
    }, 2000);
  });
}
function handleModalElegantExit() {
  let modalElegantElement = getItem(document, ".modal-elegant");
  if (!modalElegantElement) return;

  let modalElegantXElement = getItem(
    modalElegantElement,
    ".modal-elegant__body-x"
  );
  if (!modalElegantXElement) return;

  modalElegantXElement.addEventListener("click", () => {
    if (timeOut1) clearTimeout(timeOut1);
    if (timeOut2) clearTimeout(timeOut2);

    modalElegantElement.classList.remove("modal-elegant--active");
  });
  document.addEventListener("keydown", (event) => {
    if (event.code != "Escape") return;

    if (timeOut1) clearTimeout(timeOut1);
    if (timeOut2) clearTimeout(timeOut2);

    modalElegantElement.classList.remove("modal-elegant--active");
  });
}
function handleTimeCurrent(
  selectorHours = ".countdown__body-time-hours",
  selectorMinutes = ".countdown__body-time-minutes",
  selectorSeconds = ".countdown__body-time-seconds"
) {
  console.log(1);
  let hoursElement = getItem(document, selectorHours);
  if (!hoursElement) return;

  let minutesElement = getItem(document, selectorMinutes);
  if (!minutesElement) return;

  let secondsElement = getItem(document, selectorSeconds);
  if (!secondsElement) return;

  let currentTime = new Date();

  hoursElement.textContent = currentTime.getHours();
  minutesElement.textContent = currentTime.getMinutes();
  secondsElement.textContent = currentTime.getSeconds();

  hoursElement.textContent = hoursElement.textContent.padStart(2, "0");
  minutesElement.textContent = minutesElement.textContent.padStart(2, "0");
  secondsElement.textContent = secondsElement.textContent.padStart(2, "0");
}
function createSongItem(itemElement) {
  let liNewElement = document.createElement("li");

  let liTemplate =
    document.getElementById("song-list").content.firstElementChild;
  if (!liTemplate) return;

  liNewElement = liTemplate.cloneNode(true);

  let imageElement = liNewElement.querySelector(
    ".remix__body-song-list-item-image > a > img"
  );
  if (!imageElement) return;

  let timeElement = liNewElement.querySelector(
    ".remix__body-song-list-item-image > a > h3"
  );
  if (!timeElement) return;

  let titleElement = liNewElement.querySelector(
    ".remix__body-song-list-item-info-link > h2"
  );
  if (!titleElement) return;

  let categoryElement = liNewElement.querySelector(
    ".remix__body-song-list-item-info-link > h4"
  );
  if (!categoryElement) return;

  let viewElement = liNewElement.querySelector(
    ".remix__body-song-list-item-view > span"
  );
  if (!viewElement) return;

  imageElement.src = `src/assets/images/${itemElement.image}`;
  timeElement.textContent = itemElement.timeEmd;
  titleElement.textContent = itemElement.title;
  categoryElement.textContent = itemElement.category;
  viewElement.textContent = itemElement.listens;

  return liNewElement;
}
function renderSongList(idListElement, songList) {
  let listElement = getItem(document, idListElement);
  if (!listElement) return;

  songList.forEach((e, i) => {
    let liNewElement = createSongItem(e);
    if (i == 0) {
      liNewElement.classList.add("remix__body-song-list-item-active");
    }
    listElement.appendChild(liNewElement);
  });
}
function handleHideLoader(element) {
  let loaderElement = getItem(document, element);
  if (!loaderElement) return;

  loaderElement.classList.add("hide");
}
function handleButtonMenu(selectorButton, selectorList) {
  let buttonElement = getItem(document, selectorButton);
  if (!buttonElement) return;

  let listElement = getItem(document, selectorList);
  if (!listElement) return;

  buttonElement.addEventListener("click", () => {
    listElement.classList.toggle("music__order--active");
  });
}
(async () => {
  // call API should handle error
  try {
    let songList = await homeApi.getFullAPI();
    handleHideLoader("#loader");
    handleModalElegantExit();
    handleWebsiteEvaluate();
    handleButtonMenu("#button__music-menu", ".music__order");
    setInterval(handleTimeCurrent, 1000);
    renderSongList(".remix__body-song-list", songList.slice(0, 10));
    renderSongList(".remix__body-rap-list", songList.slice(10));
  } catch (error) {
    console.log(error);
  }
})();

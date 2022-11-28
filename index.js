// Loader

let loader = document.querySelector(".loader");

function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hideLoader() {
  loader.classList.add("hidden");
}

sleep(3000).then(() => {
  hideLoader();
});

// Prevent Reloads on Links Clicking

let allLinks = document.querySelectorAll(".link");

function preventDefaultOnLinks(event) {
  event.preventDefault();
}

allLinks.forEach((element) => {
  element.addEventListener("click", preventDefaultOnLinks);
});

// Gifts

let giftsCards = document.querySelectorAll(".gifts__card");
let giftsPaginator = document.querySelector(".gifts__paginator");
let nextButton = document.querySelector(".button_place_next");
let prevButton = document.querySelector(".button_place_prev");
let currentGift = 0;

function showPaginator() {
  giftsPaginator.textContent = `${currentGift + 1} / ${giftsCards.length}`;
}

function renderGiftsCard(currentGift) {
  giftsCards.forEach((card) => {
    card.classList.remove("gifts__card_active");
  });
  giftsCards[currentGift].classList.add("gifts__card_active");
}

function showNext() {
  if (currentGift < giftsCards.length - 1) {
    currentGift += 1;
  } else {
    currentGift = 0;
  }
  showPaginator();
  renderGiftsCard(currentGift);
}

function showPrev() {
  if (currentGift === 0) {
    currentGift = giftsCards.length - 1;
  } else {
    currentGift -= 1;
  }
  showPaginator();
  renderGiftsCard(currentGift);
}

showPaginator();
nextButton.addEventListener("click", showNext);
prevButton.addEventListener("click", showPrev);

// Likes

let giftsCardsArea = document.querySelector(".gifts__cards");

function toggleLike() {
  let currentActiveGift = giftsCardsArea.querySelector(".gifts__card_active");
  let likeButton = currentActiveGift.querySelector(".gifts__like");
  likeButton.classList.toggle("gifts__like_active");
}

function detectDoubleTapClosure() {
  let lastTap = 0;
  let timeout;
  return function detectDoubleTap(event) {
    const curTime = new Date().getTime();
    const tapLen = curTime - lastTap;
    if (tapLen < 500 && tapLen > 0) {
      console.log("Double tapped!");
      event.preventDefault();
      toggleLike();
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 500);
    }
    lastTap = curTime;
  };
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  giftsCardsArea.addEventListener("touchend", detectDoubleTapClosure());
}

giftsCardsArea.addEventListener("dblclick", toggleLike);

// Blogs

const buttonBlogs = document.querySelector(".button_place_blogs");
const blogsToHide = document.querySelectorAll(".blogs__card");
const hiddenBlogsLength = blogsToHide.length;

function toggleBlogs() {
  blogsToHide.forEach((element) => {
    element.classList.toggle("hidden");
  });
  if (document.querySelectorAll(".blogs__card + .hidden").length > 0) {
    buttonBlogs.textContent = `Show More (${hiddenBlogsLength})`;
  } else {
    buttonBlogs.textContent = `Show Less`;
  }
}

function showHowManyHiddenElements() {
  buttonBlogs.textContent = `Show More (${hiddenBlogsLength})`;
}

showHowManyHiddenElements();
buttonBlogs.addEventListener("click", toggleBlogs);

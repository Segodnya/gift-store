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

const buttonGifts = document.querySelector(".button_place_gifts");
const buttonBlogs = document.querySelector(".button_place_blogs");
const giftsToHide = document.querySelectorAll(".gifts__card:not(:first-of-type)");
const blogsToHide = document.querySelectorAll(".blogs__card");
const hiddenGiftsLength = giftsToHide.length;
const hiddenBlogsLength = blogsToHide.length;

function toggleGifts() {
  console.log(document.querySelectorAll(".gifts__card + .hidden").length);
  giftsToHide.forEach((element) => {
    element.classList.toggle("hidden");
  });
  if (document.querySelectorAll(".gifts__card + .hidden").length > 0) {
    buttonGifts.textContent = `Show More (${hiddenGiftsLength})`;
  } else {
    buttonGifts.textContent = `Show Less`;
  }
}

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
  buttonGifts.textContent = `Show More (${hiddenGiftsLength})`;
  buttonBlogs.textContent = `Show More (${hiddenBlogsLength})`;
}

showHowManyHiddenElements();
buttonGifts.addEventListener("click", toggleGifts);
buttonBlogs.addEventListener("click", toggleBlogs);

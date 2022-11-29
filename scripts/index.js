// Loader

let loader = document.querySelector(".loader");

function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hideLoader() {
  loader.classList.add("hidden");
}

sleep(1000).then(() => {
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

// Bubbles, visjs
var nodes = new vis.DataSet([{ label: "Wife" }, { label: "GF/BF" }, { label: "Friend" }, { label: "Teacher" }, { label: "Coworker" }, { label: "Date" }]);
var edges = new vis.DataSet();
var container = document.querySelector(".pick__bubbles");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
  nodes: {
    borderWidth: 0,
    shape: "circle",
    color: { background: "rgba(247, 148, 30, 0.3)", highlight: { background: "rgba(247, 148, 30, 0.3)", border: "#f7941e" } },
    font: { color: "#f7941e" },
  },
  physics: {
    stabilization: false,
    minVelocity: 0.01,
    solver: "repulsion",
    repulsion: {
      nodeDistance: 40,
    },
  },
};
var network = new vis.Network(container, data, options);

network.on("click", function (e) {
  if (e.nodes.length) {
    var node = nodes.get(e.nodes[0]);
    nodes.update(node);
  }
});

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

// Pop-up and Discount

let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__container");
let openPopupButton = document.querySelector("#button-discount");
let closePopupButton = document.querySelector(".popup__close-button");
let inputName = document.querySelector(".popup__input_type_name");
let inputNumber = document.querySelector(".popup__input_type_number");
let inputEmail = document.querySelector("#send-emails");
let inputShipping = document.querySelector("#free-shipping");
let discountSpan = document.querySelector(".popup__result");
let discount = 0;

function openPopup() {
  popup.classList.add("popup_opened");
  renderDiscount();
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  closePopup();
}

function calculateDiscount(discount = 0) {
  if (checkEmail) {
    discount += 10;
  } else {
    pass;
  }
  if (checkShipping) {
    discount += 3;
  } else {
    pass;
  }
  return discount;
}

function inputNameLength() {
  let stringLength = inputName.textContent.length;
  if (stringLength > 0) {
    console.log("check");
  }
}

function renderDiscount(discount = calculateDiscount()) {
  discountSpan.textContent = `${discount}%`;
}

function checkEmail() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    return true;
  } else {
    console.log("Checkbox is not checked..");
    return false;
  }
}

function checkShipping() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    return true;
  } else {
    console.log("Checkbox is not checked..");
    return false;
  }
}

openPopupButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
inputName.addEventListener("change", inputNameLength);
inputEmail.addEventListener("change", checkEmail);
inputShipping.addEventListener("change", checkShipping);

const themeControl = document.querySelector("#theme-change");
const html = document.documentElement;
const themeValue = localStorage.getItem("theme");
const catalogPage = document.querySelector(".catalog-page");

let data = [];

if (themeValue === "dark") {
  html.setAttribute("data-theme", "dark");
  themeControl.checked = true;
} else {
  html.setAttribute("data-theme", "light");
  themeControl.checked = false;
}
themeControl.addEventListener("change", () => {
  if (themeControl.checked === true) {
    localStorage.setItem("theme", "dark");
    html.setAttribute("data-theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
    html.setAttribute("data-theme", "light");
  }
});

// elements
const catalogMenuButton = document.querySelectorAll(".catalog-menu-button");
const buttonShowMore = document.querySelector(".button-show-more");
const card = document.querySelector(".card-section-grid");

//media
const media = window.matchMedia("(max-width: 768px)");

//modal
const modalOverlay = document.querySelector(".modal-overlay");
const modalButton = document.querySelector(".modal-button");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalPrice = document.querySelector(".modal-price");
const modalImage = document.querySelector(".modal-image");
const modalSizeChoice = document.querySelector(".modal-size-choice");
const modalAdditivesChoice = document.querySelector(".modal-additives-choice");

// Selected State
let currentItem = [];
let selectedItem = null;

//Event Listener
catalogMenuButton.forEach((button) =>
  button.addEventListener("click", (e) => {
    card.classList.remove("more");
    const dataCategory = button.dataset.type;
    const selectedCategory = data.filter(
      (item) => item.category === dataCategory,
    );
    currentItem = selectedCategory;
    if (selectedCategory.length <= 4) {
      buttonShowMore.classList.add("button-show-hidden");
    } else {
      buttonShowMore.classList.remove("button-show-hidden");
    }
    renderCard(selectedCategory);
    catalogMenuButton.forEach((item) => {
      item.classList.remove("catalog-menu-button-active");
    });
    button.classList.add("catalog-menu-button-active");
  }),
);

// function
async function takeInfo() {
  const response = await fetch("./products.json");
  data = await response.json();
  const coffee = data.filter((coffee) => coffee.category === "coffee");
  currentItem = coffee;
  renderCard(coffee);
}

// functions are related with modal
function blockOverflow() {
  html.classList.add("page-locked-overflow");
}

function closeModal() {
  modalOverlay.classList.add("overlay-hidden");
  html.classList.remove("page-locked-overflow");
}

//render

function renderCard(user) {
  const cardSectionGrid = document.querySelector(".card-section-grid");
  cardSectionGrid.replaceChildren();
  user.forEach((oneCard, index) => createCard(oneCard, index + 1));
}

// state
function createCard(product, index) {
  const createItem = document.createElement("div");
  const createTitle = document.createElement("h2");
  const createParagraph = document.createElement("p");
  const createSpan = document.createElement("span");
  const createCardSectionContaier = document.createElement("div");
  const imageFrames = document.createElement("div");
  const cardSectionItemImage = document.createElement("img");

  createCardSectionContaier.classList.add("card-section-item-container");
  createItem.classList.add("card-text-container");
  createTitle.classList.add("card-section-item-title");
  createParagraph.classList.add("card-section-item-description");
  createSpan.classList.add("card-section-item-price");
  imageFrames.classList.add("image-frames");
  cardSectionItemImage.classList.add("card-section-item-image");

  const category = product.category;

  cardSectionItemImage.src = `./image/${category}-${index}.jpg`;
  createTitle.textContent = product.name;
  createParagraph.textContent = product.description;
  createSpan.textContent = `$${product.price}`;

  createItem.append(createTitle);
  createItem.append(createParagraph);
  createItem.append(createSpan);
  imageFrames.append(cardSectionItemImage);
  createCardSectionContaier.append(imageFrames);
  createCardSectionContaier.append(createItem);

  card.append(createCardSectionContaier);
  createCardSectionContaier.addEventListener("click", () => {
    selectedItem = product;
    modalImage.src = `./image/${category}-${index}.jpg`;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price}`;
    modalOverlay.classList.remove("overlay-hidden");
    const sizes = product.sizes;
    const arrayOfSizes = Object.entries(sizes);
    arrayOfSizes.forEach(([key, value]) => {
      const modalSizeButton = document.createElement("button");
      const modalSizeSpan = document.createElement("span");
      const addPriceButton = document.createElement("button");
      const modalAdditiveButton = document.createElement("button");
      modalSizeButton.textContent = key;
      modalSizeSpan.textContent = value.size;
      modalSizeButton.append(modalSizeSpan);
      modalSizeChoice.append(modalSizeButton);

      addPriceButton.dataset.addPrice = value.addPrice;
      modalAdditivesChoice.append(modalAdditiveButton);
      console.log(key);
      console.log(value);
    });
    blockOverflow();
  });
}

if (catalogPage) {
  takeInfo();

  //Event Listener
  buttonShowMore.addEventListener("click", () => {
    card.classList.add("more");
    buttonShowMore.classList.add("button-show-hidden");
  });

  modalButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      modalSizeChoice.replaceChildren();
      closeModal();
    }
  });
  html.addEventListener("keydown", (e) => {
    if (
      !modalOverlay.classList.contains("overlay-hidden") &&
      e.key === "Escape"
    ) {
      closeModal();
      modalSizeChoice.replaceChildren();
    }
  });

  media.addEventListener("change", (e) => {
    if (e.matches) {
      card.classList.remove("more");
      buttonShowMore.classList.remove("button-show-hidden");
    }
    if (currentItem.length <= 4) {
      card.classList.remove("more");
      buttonShowMore.classList.add("button-show-hidden");
    }
  });
}

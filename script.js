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

//Event Listener
catalogMenuButton.forEach((button) =>
  button.addEventListener("click", (e) => {
    const dataCategory = button.dataset.type;
    const selectedCategory = data.filter(
      (item) => item.category === dataCategory,
    );
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

async function takeInfo() {
  const response = await fetch("./products.json");
  data = await response.json();
  const coffee = data.filter((coffee) => coffee.category === "coffee");
  renderCard(coffee);
}

//render

function renderCard(user) {
  const cardSectionGrid = document.querySelector(".card-section-grid");
  cardSectionGrid.replaceChildren();
  user.forEach((oneCard, index) => createCard(oneCard, index + 1));
}

// state
function createCard(product, index) {
  const card = document.querySelector(".card-section-grid");
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
}

if (catalogPage) {
  takeInfo();
}

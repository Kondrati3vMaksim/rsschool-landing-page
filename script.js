const themeControl = document.querySelector("#theme-change");
const html = document.documentElement;
const themeValue = localStorage.getItem("theme");
const catalogPage = document.querySelector(".catalog-page");
const mainPage = document.querySelector(".main-page");
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
const modalTextTotal = document.querySelector(".modal-price-text-total");
const divSize = document.createElement("div");
divSize.classList.add("modal-size-button-container");
const divAdditives = document.createElement("div");
divAdditives.classList.add("modal-additives-container");
const burgerMenu = document.querySelector(".burger-menu");
const header = document.querySelector(".header");
const headerNavigation = document.querySelector(".header-navigation");
const couruselContainer = document.querySelectorAll(".favorite-card-product");
const nextSlide = document.querySelector(".right-button");
const previousSlide = document.querySelector(".left-button");
const selectedIndicator = document.querySelectorAll(".selected-card-item");
const couruselSlide = document.querySelector(".courusel-contaier");
//media
const media = window.matchMedia("(max-width: 768px)");

//modal
const modalOverlay = document.querySelector(".modal-overlay");
const modalButton = document.querySelector(".modal-button");
const modalButtonClose = document.querySelector(".modal-button-close");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalPrice = document.querySelector(".modal-price");
const modalImage = document.querySelector(".modal-image");
const modalSizeChoice = document.querySelector(".modal-size-choice");
const modalAdditivesChoice = document.querySelector(".modal-additives-choice");

// Selected State
let currentItem = [];
let selectedItem = null;
let selectedSizeAddPrice = 0;
let totalAdditivesPrice = 0;

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

burgerMenu.addEventListener("click", () => {
  headerNavigation.classList.add("burger-active");
  const toggleMenuActive = header.classList.toggle("burger-menu-active");

  html.classList.toggle("blocked-overflow", toggleMenuActive);
});

html.addEventListener("keydown", (e) => {
  if (html.classList.contains("blocked-overflow") && e.key === "Escape") {
    closeBurgerMenu();
  }
});

headerNavigation.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) {
    return;
  }
  closeBurgerMenu();
});

media.addEventListener("change", (e) => {
  if (e.matches === false) {
    closeBurgerMenu();
    headerNavigation.classList.remove("burger-active");
  }
});

//courusel

if (mainPage) {
  let currentIndex = 0;
  let trackIndex = currentIndex + 1;
  //clone card for courusel
  const copyFirtCard = couruselContainer[0].cloneNode(true);
  const copyLastCard =
    couruselContainer[couruselContainer.length - 1].cloneNode(true);
  couruselSlide.append(copyFirtCard);
  couruselSlide.prepend(copyLastCard);
  couruselSlide.style.transition = "none";
  const offset = trackIndex * -100;
  couruselSlide.style.transform = `translateX(${offset}%)`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      couruselSlide.style.transition = "transform 0.4s ease";
    });
  });

  let isAnimation = false;
  previousSlide.addEventListener("click", () => {
    if (isAnimation) {
      return;
    }
    isAnimation = true;
    currentIndex -= 1;
    trackIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = couruselContainer.length - 1;
    }
    console.log(trackIndex);
    renderCouruselCard();
  });

  nextSlide.addEventListener("click", () => {
    if (isAnimation) {
      return;
    }
    isAnimation = true;
    currentIndex += 1;
    trackIndex += 1;
    if (currentIndex >= couruselContainer.length) {
      currentIndex = 0;
    }

    renderCouruselCard();
  });

  couruselSlide.addEventListener("transitionend", () => {
    if (trackIndex === 4) {
      couruselSlide.style.transition = "none";
      trackIndex = 1;
      const offset = trackIndex * -100;
      couruselSlide.style.transform = `translateX(${offset}%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          couruselSlide.style.transition = "transform 0.4s ease";
          isAnimation = false;
        });
      });
      return;
    }
    if (trackIndex === 0) {
      couruselSlide.style.transition = "none";
      trackIndex = 3;
      const offset = trackIndex * -100;
      couruselSlide.style.transform = `translateX(${offset}%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          couruselSlide.style.transition = "transform 0.4s ease";
          isAnimation = false;
        });
      });
      return;
    }
    isAnimation = false;
  });

  function renderCouruselCard() {
    const offset = trackIndex * -100;
    couruselSlide.style.transform = `translateX(${offset}%)`;
    selectedIndicator.forEach((active, index) => {
      if (index === currentIndex) {
        active.classList.add("selected-card-item-active");
      } else {
        active.classList.remove("selected-card-item-active");
      }
    });
  }
}

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

function closeBurgerMenu() {
  header.classList.remove("burger-menu-active");
  html.classList.remove("blocked-overflow");
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

  //function
  function updateTotal() {
    const totalPrice = (
      Number(product.price) +
      selectedSizeAddPrice +
      totalAdditivesPrice
    ).toFixed(2);
    modalPrice.textContent = `$${totalPrice}`;
  }

  // get state product
  createCardSectionContaier.addEventListener("click", () => {
    selectedItem = product;

    //create element for modal
    const spanSizeModal = document.createElement("span");
    const spanAdditives = document.createElement("span");

    //render modal
    modalImage.src = `./image/${category}-${index}.jpg`;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price}`;
    modalOverlay.classList.remove("overlay-hidden");
    modalTextTotal.textContent = "Total:";
    const sizes = product.sizes;

    //clear modal choice
    modalSizeChoice.replaceChildren();
    modalAdditivesChoice.replaceChildren();
    divSize.replaceChildren();
    divAdditives.replaceChildren();

    //text added
    spanSizeModal.textContent = "Size";
    modalSizeChoice.append(spanSizeModal);
    spanAdditives.textContent = "Additives";
    modalAdditivesChoice.append(spanAdditives);

    //get size and render modal price
    const arrayOfSizes = Object.entries(sizes);
    arrayOfSizes.forEach(([key, value]) => {
      const modalSizeButton = document.createElement("button");
      modalSizeButton.classList.add("modal-button");
      const modalSizeSpan = document.createElement("span");

      //Size
      const sizeForButton = document.createElement("span");
      sizeForButton.textContent = key.toUpperCase();
      modalSizeSpan.textContent = value.size;
      modalSizeSpan.classList.add("name-choices");
      sizeForButton.classList.add("char-of-size");

      modalSizeButton.append(sizeForButton);
      modalSizeButton.append(modalSizeSpan);
      divSize.append(modalSizeButton);
      modalSizeChoice.append(divSize);

      //add cost
      modalSizeButton.dataset.addPrice = value["add-price"];

      if (key === "s") {
        modalSizeButton.classList.add("modal-size-button-active");
        selectedSizeAddPrice = Number(modalSizeButton.dataset.addPrice);
      }

      // get totalPrice and render
      modalSizeButton.addEventListener("click", () => {
        const buttonsContainer = modalSizeChoice.querySelectorAll("button");
        buttonsContainer.forEach((button) => {
          button.classList.remove("modal-size-button-active");
        });
        modalSizeButton.classList.add("modal-size-button-active");
        selectedSizeAddPrice = Number(modalSizeButton.dataset.addPrice);
        updateTotal();
      });
    });

    //set for original index
    const selectedAdditives = new Set();
    totalAdditivesPrice = 0;

    //get Additives and render
    product.additives.forEach((items, index) => {
      const modalAdditiveButton = document.createElement("button");
      modalAdditiveButton.classList.add("modal-button");
      const modalAdditiveNumber = document.createElement("span");
      const modalAdditiveName = document.createElement("span");

      modalAdditiveNumber.textContent = index + 1;
      modalAdditiveName.textContent = items.name;
      modalAdditiveName.classList.add("name-choices");
      // give price to button
      modalAdditiveButton.dataset.addPrice = items["add-price"];

      modalAdditivesChoice.append(divAdditives);
      modalAdditiveNumber.classList.add("char-of-size");
      modalAdditiveButton.append(modalAdditiveNumber);
      modalAdditiveButton.append(modalAdditiveName);
      divAdditives.append(modalAdditiveButton);
      modalAdditivesChoice.append(divAdditives);
      modalAdditiveButton.addEventListener("click", () => {
        modalAdditiveButton.classList.toggle("modal-additives-button-active");
        totalAdditivesPrice = 0;
        if (selectedAdditives.has(index)) {
          selectedAdditives.delete(index);
        } else {
          selectedAdditives.add(index);
        }
        selectedAdditives.forEach((id) => {
          totalAdditivesPrice += Number(product.additives[id]["add-price"]);
        });
        updateTotal();
      });
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

  modalButtonClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });
  html.addEventListener("keydown", (e) => {
    if (
      !modalOverlay.classList.contains("overlay-hidden") &&
      e.key === "Escape"
    ) {
      closeModal();
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

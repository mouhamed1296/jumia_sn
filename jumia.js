const sliderImages = [];
const buttons = document.querySelectorAll(".slider-button");
let dots = document.querySelectorAll(".dot");
const categories = document.getElementById("categorie_produits");

const navigation = [
  {
    icon: "fa-phone",
    text: "Téléphone & Tablettes",
  },
  {
    icon: "fa-apple-whole",
    text: "Supermarché",
  },
  {
    icon: "fa-eye-dropper",
    text: "Santé & Beauté",
  },
  {
    icon: "fa-tv",
    text: "Electronique",
  },
  {
    icon: "fa-desktop",
    text: "Informatique",
  },
  {
    icon: "fa-fire-burner",
    text: "Electroménager",
  },
  {
    icon: "fa-home",
    text: "Maison & Bureau",
  },
  {
    icon: "fa-vest",
    text: "Mode",
  },
  {
    icon: "fa-baby",
    text: "Produits pour bébés",
  },
  {
    icon: "fa-dumbbell",
    text: "Articles de sport",
  },
  {
    icon: "fa-gamepad",
    text: "Jeux vidéos & console",
  },
  {
    icon: "fa-ellipsis",
    text: "Autres Catégories",
  },
];

const sliderContainer = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const sliderImg = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.jpg"];
const sliderLength = sliderImg.length;

sliderImg.forEach((img, i) => {
  sliderContainer.innerHTML += `<li class="slide" ${i === 0 && "data-active"}>
  <img src="img/${img}" alt="slide${i}">
</li>`;
  dotsContainer.innerHTML += `<li class="dot" ${
    i === 0 && "data-active"
  }></li>`;
});

navigation.forEach((element) => {
  let li = document.createElement("li");
  let a = document.createElement("a");
  let i = document.createElement("i");
  i.classList.add("fa-solid", element.icon);
  a.appendChild(i);
  a.append(element.text);
  li.appendChild(a);
  categories.appendChild(li);
});

const moveSlider = (slides, index, activeSlide, dots, activeDot) => {
  console.log(index);
  if (index < 0) index = slides.children.length - 1;
  if (index >= slides.children.length) index = 0;

  slides.children[index].dataset.active = true;
  delete activeSlide.dataset.active;

  dots.children[index].dataset.active = true;
  delete activeDot.dataset.active;
};

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slides = dot.closest("#slider").querySelector("#slides");
    const activeSlide = slides.querySelector("[data-active]");

    dots = dot.closest("#slider").querySelector("#dots");
    const activeDot = dots.querySelector("[data-active]");

    let newIndex = [...dots.children].indexOf(dot);
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    dots.children[newIndex].dataset.active = true;
    delete activeDot.dataset.active;
  });
});

buttons.forEach((button) => {
  setInterval(() => {
    const slides = button.closest("#slider").querySelector("#slides");
    const activeSlide = slides.querySelector("[data-active]");
    const dots = button.closest("#slider").querySelector("#dots");
    const activeDot = dots.querySelector("[data-active]");
    let newIndex;
    const activeIndex = [...slides.children].indexOf(activeSlide);
    if (activeIndex < 0) newIndex = activeIndex + 1;
    if (activeIndex >= slides.children.length) {
      newIndex = 0;
    } else {
      newIndex = activeIndex + 1;
    }
    moveSlider(slides, newIndex, activeSlide, dots, activeDot);
  }, 6000);
  button.addEventListener("click", () => {
    const offset = button.classList.contains("next") ? 1 : -1;
    const slides = button.closest("#slider").querySelector("#slides");
    const activeSlide = slides.querySelector("[data-active]");
    const dots = button.closest("#slider").querySelector("#dots");
    const activeDot = dots.querySelector("[data-active]");
    const newIndex = [...slides.children].indexOf(activeSlide) + offset;
    moveSlider(slides, newIndex, activeSlide, dots, activeDot);
  });
});

//horizontal media scroller

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const hSlider = document.getElementById("h_slider-container");

prevButton.addEventListener("click", () => {
  hSlider.scrollBy({ top: 0, left: -550, behavior: "smooth" });
});
nextButton.addEventListener("click", () => {
  hSlider.scrollBy({ top: 0, left: 550, behavior: "smooth" });
});

/* observer */
let observerNext = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true)
      document.querySelector(".nextIcon").classList.add("activeIcon");
    document.querySelector(".prevIcon").classList.remove("activeIcon");
  },
  { threshold: [1] }
);

observerNext.observe(hSlider.lastElementChild);
let observerPrev = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true)
      document.querySelector(".prevIcon").classList.add("activeIcon");
    document.querySelector(".nextIcon").classList.remove("activeIcon");
  },
  { threshold: [1] }
);

observerPrev.observe(hSlider.firstElementChild);

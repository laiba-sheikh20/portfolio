const Nav = document.querySelector("nav");
const breadcrumb = document.querySelector(".breadcrumb");
const desktopNav = document.querySelector(".desktopNav");
const companyIdentity = document.querySelector(".companyIdentity");
const body = document.body;

// Nav active class toggle on scroll
let isNavActive = true;
let counter = 0;
let interval;

$(document).ready(function () {
  $(".slider").slick({
    dots: false,
    arrows: true,
    prevArrow: $(".arrows svg:first-child"),
    nextArrow: $(".arrows svg:last-child"),
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: true,
    swipe: true,
  });

  $(".slider").on("afterChange", function (event, slick, currentSlide) {
    $(".indicator div").removeClass("active");
    $(".indicator div").eq(currentSlide).addClass("active");
  });

  $(".indicator div").on("click", function () {
    var index = $(this).index();
    $(".slider").slick("slickGoTo", index);
  });

  $(".carousel").slick({
    dots: false,
    arrows: true,
    centerMode: true,
    prevArrow: $(".carouselArrow .left:first-child"),
    nextArrow: $(".carouselArrow .left:last-child"),
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    centerPadding: "20px",
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
        },
      },
    ],
  });

  // $(".companies_carousel").slick({
  //   dots: false,
  //   arrows: true,
  //   prevArrow: $(".company_left_carouselArrow"),
  //   nextArrow: $(".company_right_carouselArrow"),
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   slidesToShow: 4,
  //   centerPadding: 0,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         slidesToShow: 2,
  //       },
  //     },
  //   ],
  // });

  const lightbox = GLightbox({
    selector: ".glightbox",
  });
});

function toggleNav() {
  if (isNavActive && window.scrollY > 60) {
    isNavActive = false;
    Nav.classList.add("active");
  } else if (!isNavActive && window.scrollY < 60) {
    isNavActive = true;
    Nav.classList.remove("active");
  }
}

window.onscroll = () => {
  toggleNav();
  activateNavLinkOnScroll(); // 👈 ScrollSpy check on scroll
};

// Loading screen logic
document.addEventListener("DOMContentLoaded", function () {

});

 document.addEventListener("DOMContentLoaded", () => {
    const loadingPercentage = document.querySelector(".loading-percentage");
    let counter = 0;

    const interval = setInterval(() => {
      if (counter < 99) {
        counter++;
        loadingPercentage.textContent = counter + "%";
      }
    }, 20); // speed of counting

    window.addEventListener("load", () => {
      clearInterval(interval);
      loadingPercentage.textContent = "100%";

      document.body.style.overflowY = "auto";

      const loadingScreen = document.querySelector(".loadingScreen");

      setTimeout(() => {
        loadingScreen.classList.add("hide");
      }, 300); // wait before hiding

      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 1000); // completely remove after fade
    });
  });
breadcrumb.addEventListener("click", function () {
  breadcrumb.classList.toggle("active");
  desktopNav.classList.toggle("active");

  if (desktopNav.classList.contains("active")) {
    body.style.overflow = "hidden";
    companyIdentity.style.width = "13.3125rem";
  } else {
    body.style.overflowY = "auto";
    companyIdentity.style.width = "11.3125rem";
  }
});

// ✅ ScrollSpy + Active Nav Link Code Starts Here
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".desktopNav li a");

function activateNavLinkOnScroll() {
  const fromTop = window.scrollY + 150; // adjust offset if nav is fixed

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));

    if (!section) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (fromTop >= top && fromTop <= bottom) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ✅ Click par active class
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});
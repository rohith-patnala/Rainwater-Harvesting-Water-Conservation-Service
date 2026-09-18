// =========================================
// MOBILE HOME DROPDOWN FUNCTION
// =========================================

function initializeMobileHomeDropdown() {

const mobileHomeToggle =
document.getElementById("mobileHomeToggle");

const mobileHomeMenu =
document.getElementById("mobileHomeMenu");

if (!mobileHomeToggle || !mobileHomeMenu) {
return;
}

mobileHomeToggle.addEventListener("click", function () {

const isOpen =
mobileHomeMenu.classList.contains("open");

mobileHomeMenu.classList.toggle(
"open",
!isOpen
);

mobileHomeToggle.classList.toggle(
"open",
!isOpen
);

mobileHomeToggle.setAttribute(
"aria-expanded",
String(!isOpen)
);

});

}
document.addEventListener("DOMContentLoaded", async function () {

/* Load Header */
const headerContainer = document.getElementById("header-container");

if (headerContainer) {
try {
const response = await fetch("header.html");

if (!response.ok) {
throw new Error("header.html file not found");
}

headerContainer.innerHTML = await response.text();

setActiveNavigation();

initializeMobileHomeDropdown();
} catch (error) {
console.error("Header loading error:", error);
}
}


/* Load Footer */
const footerContainer = document.getElementById("footer-container");

if (footerContainer) {
try {
const response = await fetch("footer.html");

if (!response.ok) {
throw new Error("footer.html file not found");
}

footerContainer.innerHTML = await response.text();

} catch (error) {
console.error("Footer loading error:", error);
}
}


/* Lucide Icons */
if (typeof lucide !== "undefined") {
lucide.createIcons();
}


/* Mobile Menu */
const menuToggle = document.getElementById("menuToggle");
const mobileNavigation = document.getElementById("mobileNavigation");

if (menuToggle && mobileNavigation) {
menuToggle.addEventListener("click", function () {
const isOpen = mobileNavigation.classList.toggle("open");

menuToggle.setAttribute("aria-expanded", String(isOpen));

menuToggle.innerHTML = isOpen
? '<i data-lucide="x"></i>'
: '<i data-lucide="menu"></i>';

lucide.createIcons();
});
}


/* Dark Mode */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
themeToggle.addEventListener("click", function () {
document.body.classList.toggle("dark-mode");

const isDark =
document.body.classList.contains("dark-mode");

localStorage.setItem(
"theme",
isDark ? "dark" : "light"
);

themeToggle.innerHTML = isDark
? '<i data-lucide="sun"></i>'
: '<i data-lucide="moon"></i>';

lucide.createIcons();
});
}


/* Saved Dark Mode */
if (localStorage.getItem("theme") === "dark") {
document.body.classList.add("dark-mode");

if (themeToggle) {
themeToggle.innerHTML = '<i data-lucide="sun"></i>';
lucide.createIcons();
}
}


/* RTL / LTR */
const directionToggle = document.getElementById("directionToggle");

if (directionToggle) {
directionToggle.addEventListener("click", function () {
const currentDirection =
document.documentElement.getAttribute("dir") || "ltr";

const newDirection =
currentDirection === "ltr" ? "rtl" : "ltr";

document.documentElement.setAttribute(
"dir",
newDirection
);

localStorage.setItem("direction", newDirection);
});
}


/* Saved Direction */
const savedDirection = localStorage.getItem("direction");

if (savedDirection) {
document.documentElement.setAttribute(
"dir",
savedDirection
);
}

});
// =========================================
// MOBILE HOME DROPDOWN
// =========================================

// const mobileHomeToggle =
// document.getElementById("mobileHomeToggle");

// const mobileHomeMenu =
// document.getElementById("mobileHomeMenu");


// if (mobileHomeToggle && mobileHomeMenu) {

// mobileHomeToggle.addEventListener("click", function () {

// const isOpen =
// mobileHomeMenu.classList.contains("open");

// if (isOpen) {

// mobileHomeMenu.classList.remove("open");

// mobileHomeToggle.classList.remove("open");

// mobileHomeToggle.setAttribute(
// "aria-expanded",
// "false"
// );

// } else {

// mobileHomeMenu.classList.add("open");

// mobileHomeToggle.classList.add("open");

// mobileHomeToggle.setAttribute(
// "aria-expanded",
// "true"
// );

// }

// });

// }


// =========================================
// ACTIVE PAGE NAVIGATION
// =========================================

function setActiveNavigation() {

let currentPage =
window.location.pathname.split("/").pop();

if (
currentPage === "" ||
currentPage === "/" ||
currentPage.includes("index")
) {
currentPage = "index.html";
}


// Remove active from all desktop links
document.querySelectorAll(
".main-navigation .nav-link"
).forEach(function (link) {

link.classList.remove("active");

});


// Remove active from all mobile links
document.querySelectorAll(
".mobile-navigation .mobile-nav-link"
).forEach(function (link) {

link.classList.remove("active");

});


// Add active to current desktop page
document.querySelectorAll(
".main-navigation .nav-link"
).forEach(function (link) {

const linkPage =
link.getAttribute("href");

if (linkPage === currentPage) {
link.classList.add("active");
}

});


// Add active to current mobile page
document.querySelectorAll(
".mobile-navigation .mobile-nav-link"
).forEach(function (link) {

const linkPage =
link.getAttribute("href");

if (linkPage === currentPage) {
link.classList.add("active");
}

});


// Home dropdown active for both Home pages
if (
currentPage === "index.html" ||
currentPage === "home-2.html"
) {

const homeLink = document.querySelector(
".nav-dropdown-toggle"
);

if (homeLink) {
homeLink.classList.add("active");
}

}

}
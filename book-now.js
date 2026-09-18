const htmlElement = document.documentElement;

const darkToggle = document.getElementById("darkToggle");
const rtlToggle = document.getElementById("rtlToggle");

const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");


// =========================================
// LUCIDE ICONS
// =========================================

if (window.lucide) {
    lucide.createIcons();
}


// =========================================
// DARK MODE TOGGLE
// =========================================

darkToggle.addEventListener("click", function () {

    const isDark =
        htmlElement.getAttribute("data-theme") === "dark";

    if (isDark) {

        htmlElement.removeAttribute("data-theme");

        darkToggle.innerHTML =
            '<i data-lucide="moon"></i>';

    } else {

        htmlElement.setAttribute("data-theme", "dark");

        darkToggle.innerHTML =
            '<i data-lucide="sun"></i>';
    }

    lucide.createIcons();

});


// =========================================
// RTL / LTR TOGGLE
// =========================================

rtlToggle.addEventListener("click", function () {

    const isRTL =
        htmlElement.getAttribute("dir") === "rtl";

    if (isRTL) {

        htmlElement.setAttribute("dir", "ltr");

        rtlToggle.innerHTML =
            '<i data-lucide="arrow-left-right"></i>';

    } else {

        htmlElement.setAttribute("dir", "rtl");

        rtlToggle.innerHTML =
            '<i data-lucide="arrow-left-right"></i>';
    }

    lucide.createIcons();

});


// =========================================
// BOOKING FORM SUBMIT
// =========================================

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    formMessage.textContent =
        "Thank you! Your booking request has been submitted successfully.";

    formMessage.classList.add("show");

    bookingForm.reset();

});


// =========================================
// RESET MESSAGE
// =========================================

bookingForm.addEventListener("reset", function () {

    formMessage.textContent = "";

    formMessage.classList.remove("show");

});
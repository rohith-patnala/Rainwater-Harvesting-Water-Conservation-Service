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
// DARK MODE
// SAVED ACROSS ALL PAGES
// =========================================

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        // Apply dark mode
        htmlElement.setAttribute(
            "data-theme",
            "dark"
        );

        // Show sun icon
        if (darkToggle) {
            darkToggle.innerHTML =
                '<i data-lucide="sun"></i>';
        }

    } else {

        // Apply light mode
        htmlElement.removeAttribute(
            "data-theme"
        );

        // Show moon icon
        if (darkToggle) {
            darkToggle.innerHTML =
                '<i data-lucide="moon"></i>';
        }
    }


    // Reload Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}


// =========================================
// APPLY SAVED THEME ON PAGE LOAD
// =========================================

applySavedTheme();


// =========================================
// DARK MODE TOGGLE
// =========================================

if (darkToggle) {

    darkToggle.addEventListener(
        "click",
        function () {

            const isDark =
                htmlElement.getAttribute(
                    "data-theme"
                ) === "dark";


            if (isDark) {

                // =================================
                // DARK → LIGHT
                // =================================

                htmlElement.removeAttribute(
                    "data-theme"
                );

                // Save light mode
                localStorage.setItem(
                    "theme",
                    "light"
                );

                // Change icon to moon
                darkToggle.innerHTML =
                    '<i data-lucide="moon"></i>';

            } else {

                // =================================
                // LIGHT → DARK
                // =================================

                htmlElement.setAttribute(
                    "data-theme",
                    "dark"
                );

                // Save dark mode
                localStorage.setItem(
                    "theme",
                    "dark"
                );

                // Change icon to sun
                darkToggle.innerHTML =
                    '<i data-lucide="sun"></i>';
            }


            // Reload Lucide icons
            if (window.lucide) {
                lucide.createIcons();
            }

        }
    );

}


// =========================================
// RTL / LTR TOGGLE
// =========================================

if (rtlToggle) {

    rtlToggle.addEventListener(
        "click",
        function () {

            const isRTL =
                htmlElement.getAttribute("dir") === "rtl";


            if (isRTL) {

                // =================================
                // RTL → LTR
                // =================================

                htmlElement.setAttribute(
                    "dir",
                    "ltr"
                );

                rtlToggle.textContent = "RTL";

                rtlToggle.setAttribute(
                    "aria-label",
                    "Switch to RTL"
                );

                rtlToggle.setAttribute(
                    "title",
                    "RTL"
                );


                // Save direction
                localStorage.setItem(
                    "direction",
                    "ltr"
                );

            } else {

                // =================================
                // LTR → RTL
                // =================================

                htmlElement.setAttribute(
                    "dir",
                    "rtl"
                );

                rtlToggle.textContent = "LTR";

                rtlToggle.setAttribute(
                    "aria-label",
                    "Switch to LTR"
                );

                rtlToggle.setAttribute(
                    "title",
                    "LTR"
                );


                // Save direction
                localStorage.setItem(
                    "direction",
                    "rtl"
                );

            }

        }
    );

}


// =========================================
// APPLY SAVED RTL / LTR DIRECTION
// =========================================

function applySavedDirection() {

    const savedDirection =
        localStorage.getItem("direction");


    if (savedDirection === "rtl") {

        // Apply RTL
        htmlElement.setAttribute(
            "dir",
            "rtl"
        );

        if (rtlToggle) {

            rtlToggle.textContent = "LTR";

            rtlToggle.setAttribute(
                "aria-label",
                "Switch to LTR"
            );

            rtlToggle.setAttribute(
                "title",
                "LTR"
            );
        }

    } else {

        // Apply LTR
        htmlElement.setAttribute(
            "dir",
            "ltr"
        );

        if (rtlToggle) {

            rtlToggle.textContent = "RTL";

            rtlToggle.setAttribute(
                "aria-label",
                "Switch to RTL"
            );

            rtlToggle.setAttribute(
                "title",
                "RTL"
            );
        }
    }
}


// =========================================
// APPLY SAVED DIRECTION ON PAGE LOAD
// =========================================

applySavedDirection();


// =========================================
// BOOKING FORM SUBMIT
// =========================================

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            formMessage.textContent =
                "Thank you! Your booking request has been submitted successfully.";


            formMessage.classList.add(
                "show"
            );


            bookingForm.reset();

        }
    );

}


// =========================================
// RESET MESSAGE
// =========================================

if (bookingForm) {

    bookingForm.addEventListener(
        "reset",
        function () {

            formMessage.textContent = "";

            formMessage.classList.remove(
                "show"
            );

        }
    );

}
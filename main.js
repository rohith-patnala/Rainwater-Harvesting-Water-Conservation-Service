```javascript
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


// =========================================
// GET CLEAN PAGE NAME
// NETLIFY SAFE
// =========================================

function getCleanPageName(url) {

    if (!url) {
        return "index.html";
    }

    try {

        // Create URL relative to current website
        const linkUrl = new URL(
            url,
            window.location.origin
        );

        let pathname = linkUrl.pathname;

        // Remove trailing slash
        pathname = pathname.replace(/\/+$/, "");

        // Get filename
        let pageName = pathname.split("/").pop();

        // Root path
        if (!pageName || pageName === "") {
            pageName = "index.html";
        }

        // Decode URL
        try {
            pageName = decodeURIComponent(pageName);
        } catch (error) {
            console.warn(
                "Could not decode page name:",
                error
            );
        }

        return pageName.toLowerCase();

    } catch (error) {

        console.warn(
            "Could not process URL:",
            url
        );

        return "index.html";
    }
}


// =========================================
// GET CURRENT PAGE
// NETLIFY SAFE
// =========================================

function getCurrentPage() {

    let pathname = window.location.pathname;

    // Remove trailing slash
    pathname = pathname.replace(/\/+$/, "");

    // Get last part of URL
    let currentPage = pathname.split("/").pop();

    // Netlify root URL
    if (!currentPage || currentPage === "") {
        return "index.html";
    }

    try {
        currentPage = decodeURIComponent(currentPage);
    } catch (error) {
        console.warn(
            "Could not decode current URL:",
            error
        );
    }

    return currentPage.toLowerCase();
}


// =========================================
// ACTIVE PAGE NAVIGATION
// NETLIFY SAFE VERSION
// =========================================

function setActiveNavigation() {

    const currentPage = getCurrentPage();


    // =========================================
    // REMOVE ALL EXISTING ACTIVE STATES
    // =========================================

    document.querySelectorAll(
        ".main-navigation .nav-link"
    ).forEach(function (link) {

        link.classList.remove("active");

    });


    document.querySelectorAll(
        ".mobile-navigation .mobile-nav-link"
    ).forEach(function (link) {

        link.classList.remove("active");

    });


    document.querySelectorAll(
        ".mobile-navigation .mobile-dropdown-link"
    ).forEach(function (link) {

        link.classList.remove("active");

    });


    // =========================================
    // DESKTOP NAVIGATION
    // =========================================

    document.querySelectorAll(
        ".main-navigation .nav-link"
    ).forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage = getCleanPageName(href);

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    // =========================================
    // MOBILE NORMAL NAVIGATION
    // =========================================

    document.querySelectorAll(
        ".mobile-navigation .mobile-nav-link"
    ).forEach(function (link) {

        // Skip Home dropdown button
        if (
            link.id === "mobileHomeToggle"
        ) {
            return;
        }

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage = getCleanPageName(href);

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    // =========================================
    // MOBILE HOME DROPDOWN LINKS
    // =========================================

    document.querySelectorAll(
        ".mobile-navigation .mobile-dropdown-link"
    ).forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage = getCleanPageName(href);

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    // =========================================
    // HOME DROPDOWN ACTIVE STATE
    // =========================================

    if (
        currentPage === "index.html" ||
        currentPage === "home-2.html"
    ) {


        // -----------------------------------------
        // Desktop Home
        // -----------------------------------------

        const desktopHome =
            document.querySelector(
                ".main-navigation .nav-dropdown-toggle"
            );

        if (desktopHome) {

            desktopHome.classList.add("active");

        }


        // -----------------------------------------
        // Mobile Home
        // -----------------------------------------

        const mobileHome =
            document.getElementById(
                "mobileHomeToggle"
            );

        if (mobileHome) {

            mobileHome.classList.add("active");

        }

    }

}


// =========================================
// DOCUMENT READY
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {


        // =========================================
        // LOAD HEADER
        // =========================================

        const headerContainer =
            document.getElementById(
                "header-container"
            );


        if (headerContainer) {

            try {

                /*
                 * IMPORTANT:
                 * "./header.html" works correctly
                 * when deployed on Netlify.
                 */

                const response =
                    await fetch("./header.html", {
                        cache: "no-cache"
                    });


                if (!response.ok) {

                    throw new Error(
                        "header.html file not found. Status: " +
                        response.status
                    );

                }


                const headerHTML =
                    await response.text();


                // Insert Header
                headerContainer.innerHTML =
                    headerHTML;


                // -----------------------------------------
                // Header has now loaded
                // Initialize all header functions
                // -----------------------------------------

                setActiveNavigation();

                initializeMobileHomeDropdown();


                // Re-create Lucide icons inside header
                if (
                    typeof lucide !== "undefined"
                ) {

                    lucide.createIcons();

                }


            } catch (error) {

                console.error(
                    "Header loading error:",
                    error
                );

            }

        }


        // =========================================
        // LOAD FOOTER
        // =========================================

        const footerContainer =
            document.getElementById(
                "footer-container"
            );


        if (footerContainer) {

            try {

                const response =
                    await fetch("./footer.html", {
                        cache: "no-cache"
                    });


                if (!response.ok) {

                    throw new Error(
                        "footer.html file not found. Status: " +
                        response.status
                    );

                }


                const footerHTML =
                    await response.text();


                // Insert Footer
                footerContainer.innerHTML =
                    footerHTML;


                // Re-create footer icons
                if (
                    typeof lucide !== "undefined"
                ) {

                    lucide.createIcons();

                }


            } catch (error) {

                console.error(
                    "Footer loading error:",
                    error
                );

            }

        }


        // =========================================
        // LUCIDE ICONS
        // =========================================

        if (
            typeof lucide !== "undefined"
        ) {

            lucide.createIcons();

        }


        // =========================================
        // MOBILE MENU
        // =========================================

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );

        const mobileNavigation =
            document.getElementById(
                "mobileNavigation"
            );


        if (
            menuToggle &&
            mobileNavigation
        ) {

            menuToggle.addEventListener(
                "click",
                function () {

                    const isOpen =
                        mobileNavigation.classList.toggle(
                            "open"
                        );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        isOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    );


                    menuToggle.innerHTML =
                        isOpen
                            ? '<i data-lucide="x"></i>'
                            : '<i data-lucide="menu"></i>';


                    if (
                        typeof lucide !== "undefined"
                    ) {

                        lucide.createIcons();

                    }

                }
            );

        }


        // =========================================
        // DARK MODE
        // =========================================

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                function () {

                    document.body.classList.toggle(
                        "dark-mode"
                    );


                    const isDark =
                        document.body.classList.contains(
                            "dark-mode"
                        );


                    localStorage.setItem(
                        "theme",
                        isDark
                            ? "dark"
                            : "light"
                    );


                    themeToggle.innerHTML =
                        isDark
                            ? '<i data-lucide="sun"></i>'
                            : '<i data-lucide="moon"></i>';


                    if (
                        typeof lucide !== "undefined"
                    ) {

                        lucide.createIcons();

                    }

                }
            );

        }


        // =========================================
        // SAVED DARK MODE
        // =========================================

        if (
            localStorage.getItem("theme") === "dark"
        ) {

            document.body.classList.add(
                "dark-mode"
            );


            if (themeToggle) {

                themeToggle.innerHTML =
                    '<i data-lucide="sun"></i>';


                if (
                    typeof lucide !== "undefined"
                ) {

                    lucide.createIcons();

                }

            }

        }


        // =========================================
        // RTL / LTR
        // =========================================

        const directionToggle =
            document.getElementById(
                "directionToggle"
            );


        if (directionToggle) {

            directionToggle.addEventListener(
                "click",
                function () {

                    const currentDirection =
                        document.documentElement.getAttribute(
                            "dir"
                        ) || "ltr";


                    const newDirection =
                        currentDirection === "ltr"
                            ? "rtl"
                            : "ltr";


                    document.documentElement.setAttribute(
                        "dir",
                        newDirection
                    );


                    localStorage.setItem(
                        "direction",
                        newDirection
                    );

                }
            );

        }


        // =========================================
        // SAVED DIRECTION
        // =========================================

        const savedDirection =
            localStorage.getItem(
                "direction"
            );


        if (savedDirection) {

            document.documentElement.setAttribute(
                "dir",
                savedDirection
            );

        }


    }
);

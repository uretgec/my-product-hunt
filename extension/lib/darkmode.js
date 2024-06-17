"use strict";

function MyDarkMode() {}


MyDarkMode.prototype.DarkModeNone = "0";
MyDarkMode.prototype.DarkModeActive = "1";
MyDarkMode.prototype.DarkModePassive = "2";
MyDarkMode.prototype.StorageKey = "myDarkMode";

MyDarkMode.prototype.setMode = function (mode = 0) {
    localStorage.setItem(this.StorageKey, mode);
}

MyDarkMode.prototype.getMode = function () {
    return localStorage.getItem(this.StorageKey);
}

// Via: https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
MyDarkMode.prototype.checkAutoDarkMode = function () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches || false;
}

MyDarkMode.prototype.toggleMode = function (currentMode) {
    if(currentMode === this.DarkModePassive) {
        return this.DarkModeActive;
    }
    
    return this.DarkModePassive;
}

MyDarkMode.prototype.predictMode = function (currentMode) {
    if(currentMode === this.DarkModePassive) {
        return this.DarkModePassive;
    }

    if(this.checkAutoDarkMode() || currentMode === this.DarkModeActive) {
        return this.DarkModeActive;
    }

    return this.DarkModePassive;
}

MyDarkMode.prototype.toggleIcon = function (currentMode) {
    //return currentMode === this.DarkModeActive ? "🌞" : "🌜";
    return currentMode === this.DarkModeActive ? "&#127774; Light" : "&#127772; Dark";
}

MyDarkMode.prototype.addDarkModeTemplate = function (predictMode) {
    let darkModeToggleButton = document.getElementById("myDarkModeButton");
    if (darkModeToggleButton === null) {
        let template = "<div class=\"myDarkModeToggle\">"
                        + "<a id=\"myDarkModeButton\" data-id=\"" + predictMode + "\" href=\"javascript:void(0);\">" + this.toggleIcon(predictMode) + "</a>"
                        + "</div>"
        document.body.insertAdjacentHTML("beforeend", template)

        // add listener to button
        darkModeToggleButton = document.getElementById("myDarkModeButton");
        darkModeToggleButton.addEventListener("click", (this.handlerDarkMode).bind(this));
    }
}

MyDarkMode.prototype._process = function () {
    let currentMode = this.getMode();
    let predictMode = this.predictMode(currentMode);
    if(predictMode === myDarkMode.DarkModeActive) {
        if (!document.body.classList.contains(this.StorageKey)) document.body.classList.add(this.StorageKey);
    }

    // dark mode toggle button process
    this.addDarkModeTemplate(predictMode);

    // remove different hover efect style attr
    let hoverEffectStyles = document.querySelectorAll(".styles_container__K6Yj1")
    if (hoverEffectStyles.length > 0) {
        hoverEffectStyles.forEach((hoverEffectItem) => {
            hoverEffectItem.removeAttribute("style");
        });
    }
}

MyDarkMode.prototype.handlerDarkMode = function(event) {

    let toggleElement = event.target || null;
    if(!!toggleElement) {

        // Update toggle icon
        let toggleMode = this.toggleMode(toggleElement.getAttribute("data-id"));
        toggleElement.setAttribute("data-id", toggleMode);
        toggleElement.innerHTML = this.toggleIcon(toggleMode);

        // Update localstorage data
        this.setMode(toggleMode);

        // Toggle DarkMode
        if (toggleMode === this.DarkModeActive) {
            if (!document.body.classList.contains(this.StorageKey)) document.body.classList.add(this.StorageKey);
        } else {
            document.body.classList.remove(this.StorageKey);
        }
    }
}

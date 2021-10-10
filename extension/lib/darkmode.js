"use strict";

function MyDarkMode() {}


MyDarkMode.prototype.DarkModeNone = "0";
MyDarkMode.prototype.DarkModeActive = "1";
MyDarkMode.prototype.DarkModePassive = "2";

MyDarkMode.prototype.setMode = function (mode) {
    localStorage.setItem("myDarkMode", mode);
}

MyDarkMode.prototype.getMode = function () {
    return localStorage.getItem("myDarkMode");
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
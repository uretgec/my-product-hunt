"use strict";

// Manifest json file to object data
let manifestData = chrome.runtime.getManifest();

// Fired when the extension is first installed, when the extension is updated to a new version, and when the browser is updated to a new version.
chrome.runtime.onInstalled.addListener(
    function() {
        console.info('%c' + manifestData.name + ' Extension: %cWelcome to my world!', 'color: orange;', 'color: default;');
    }
);

// Use APIs that support event filters to restrict listeners to the cases the extension cares about. 
// If an extension is listening for the tabs.onUpdated event, try using the webNavigation.onCompleted event with filters instead, as the tabs API does not support filters.
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/UrlFilter
let urlFilters = {
    url: [
        {
            hostEquals:'www.producthunt.com',
            schemes:["https"]
        }
    ]
};
chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.tabs.sendMessage(details.tabId, {
        action: 'IM_READY'
    });
}, urlFilters);

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    chrome.tabs.sendMessage(details.tabId, {
        action: 'IM_READY'
    });
}, urlFilters);

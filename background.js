"use strict";

// Manifest json file to object data
let manifestData = chrome.runtime.getManifest()

// Fired when the extension is first installed, when the extension is updated to a new version, and when the browser is updated to a new version.
chrome.runtime.onInstalled.addListener(
    function() {
        console.info('%c' + manifestData.name + ' Extension: %cWelcome to my world!', 'color: orange;', 'color: default;');
    }
);

// When the user navigates to a new URL in a tab, this will typically generate several  onUpdated events as various properties of the tabs.Tab object are updated. This includes the url, but also potentially the title and favIconUrl properties. The status property will cycle through "loading" and "complete".
chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {        
        if ( tab.active && changeInfo.status === "complete" && tab.hasOwnProperty("url") ) {
            chrome.permissions.contains({
                permissions: manifestData.permissions,
                origins: [tab.url]
            }, function(result) {
                if (result) {
                    chrome.tabs.sendMessage(tabId, {
                        action: 'IM_READY'
                    });
                } else {
                    // console.log("get out");
                }
            });
        }
    }
);

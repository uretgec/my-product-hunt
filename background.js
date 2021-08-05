/* 
    DOCS
    - https://developer.chrome.com/docs/extensions/mv3/messaging/
    - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Intercept_HTTP_requests
*/

// Collect sending IAM_READY action message tabs
//let iamReadyTabs = [];

// Manifest json file to object data
let manifestData = chrome.runtime.getManifest()

// Fired when the extension is first installed, when the extension is updated to a new version, and when the browser is updated to a new version.
/*chrome.runtime.onInstalled.addListener(
    function() {
        console.log("runtime.onInstalled", chrome.runtime.getManifest());
    }
);*/

// When the user navigates to a new URL in a tab, this will typically generate several  onUpdated events as various properties of the tabs.Tab object are updated. This includes the url, but also potentially the title and favIconUrl properties. The status property will cycle through "loading" and "complete".
chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {
        // console.log("tabs.onUpdated", tabId, changeInfo, tab);
        /*if (iamReadyTabs.includes(tabId) && tab.active && changeInfo.status === "complete" && tab.hasOwnProperty("url")) {
            chrome.tabs.sendMessage(tabId, {
                action: 'REMOVE_BLURRY_BLOCK'
            });
        }*/
        
        if ( tab.active && changeInfo.status === "complete" && tab.hasOwnProperty("url") ) {
            chrome.permissions.contains({
                permissions: manifestData.permissions,
                origins: [tab.url]
            }, function(result) {
                if (result) {
                    chrome.tabs.sendMessage(tabId, {
                        action: 'REMOVE_BLURRY_BLOCK'
                    });
                } else {
                    // console.log("get out");
                }
            });
        }
    }
);

// listen runtime message from content script or extension
/*chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log("content script or extension sendMessage", request, sender, sendResponse);
        if (request.action === "IAM_READY") {
            if (sender.hasOwnProperty("tab")) {
                iamReadyTabs.push(sender.tab.id);
            }
            sendResponse({action: "ROGER_THAT"});
        }
    }
);*/

/*
chrome.webRequest.onBeforeRequest.addListener(
    function(requestDetail) {
        if (requestDetail.method === "POST") {
            console.log("chrome.webRequest.onBeforeRequest", requestDetail);
        }
    },
    { urls: ["https://www.producthunt.com/frontend/graphql"], types: ["xmlhttprequest"] },
    ["requestBody", "extraHeaders"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(requestDetail) {
        if (requestDetail.method === "POST") {
            console.log("chrome.webRequest.onBeforeSendHeaders", requestDetail);
        }
    },
    { urls: ["https://www.producthunt.com/frontend/graphql"], types: ["xmlhttprequest"] },
    ["requestHeaders", "extraHeaders"]
);


chrome.webRequest.onCompleted.addListener(
    function(requestDetail) {
        console.log("chrome.webRequest.onCompleted", requestDetail);
    },
    { urls: ["https://www.producthunt.com/frontend/graphql"], types: ["xmlhttprequest"] },
    ["responseHeaders", "extraHeaders"]
);
*/
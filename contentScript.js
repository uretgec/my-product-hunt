/**
 * My Product Hunt List
 * 
 * - blur effect background with sign up button on today list at homepage removes.
 */

// listen runtime message from bg
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // console.log("content script", request, sender, sendResponse);

        if(request.action === "REMOVE_BLURRY_BLOCK") {
            document.querySelectorAll(".styles_overlay__2r_YH").forEach(function(item) {
                item.remove();
            });

            document.querySelectorAll(".styles_content__1JfPV").forEach(function(item) {
                item.removeAttribute("class");
            });
        }
    }
);

// send message to background service
/*chrome.runtime.sendMessage(
    {action: "IAM_READY"}, 
    function(response) {
        console.log("service worker sendMessage", response);
    }
);*/
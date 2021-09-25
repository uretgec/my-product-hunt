"use strict";

// Get MyProductHunt with Dombili class
const myProductHunt = new MyProductHunt();

// listen runtime message from bg
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.action === "IM_READY") {
        // Remove signup block
        document.querySelectorAll(myProductHunt.SignupBlock).forEach(function(item) {
            item.remove();
        });

        // Remove blur bg
        document.querySelectorAll(myProductHunt.BlurryBlock).forEach(function(item) {
            item.removeAttribute("class");
        });

        // Dark Mode Button Inject
        document.body.classList.add("darkMode");
    }
});

// Mouse tracking
let prevPostItemId = null;
document.addEventListener("mouseover", function( event ) {

    let relTarg = event.relatedTarget || event.toElement;
    let postItemObj = relTarg.closest(myProductHunt.ProductPostBlock);
    if(postItemObj === null) return;

    // Checked data-marked attribute
    if(postItemObj.hasAttribute("data-marked")) return;

    // Find producthunt id
    let currentPostItemId = postItemObj.getAttribute("data-test").replace("post-item-","");
    if(prevPostItemId === currentPostItemId) return;
    prevPostItemId = currentPostItemId;
    
    let postItemUri = postItemObj.querySelector('a[data-test="post-name-' + currentPostItemId + '"]');
    if(postItemUri === null) return;

    let postItemSlug = postItemUri.getAttribute("href").replace("/posts/","");

    // Extra content div created
    let extraContentContainer = document.createElement("div");
    extraContentContainer.setAttribute("class",myProductHunt.ExtraContentClassName);
    
    // Inject post item div
    extraContentContainer.insertAdjacentHTML("beforeend", myProductHunt.createLoadingBarBlock());
    postItemObj.append(extraContentContainer);
    
    // Graphql Post Request
    fetch(
        myProductHunt.generateUri("frontend", "graphql"), 
        myProductHunt.generatePostRequestOptions(postItemSlug)
    )
    .then(function(resp) {
        return resp.json();
    })
    .then(function(item) {
        return myProductHunt.generateGraphqlResponseData(item);
    })
    .then(function(product) {

        // Product marked after success response
        postItemObj.setAttribute("data-marked", currentPostItemId);

        // First Row: Hunter and Makers - Reviews + Socials
        let extraContentBlock = myProductHunt.createRowContainerBlock(
            myProductHunt.createHunterAndMakersBlock(product),
            myProductHunt.createReviewsBlock(product),
            myProductHunt.createSocialsBlock(product)
        );

        // Second Row: Headline
        extraContentBlock += myProductHunt.createRowContainerBlock(
            myProductHunt.createHeadlineBlock(product)
        );

        // Third Row: Topics
        extraContentBlock += myProductHunt.createRowContainerBlock(
            myProductHunt.createTopicsBlock(product)
        );

        // Fourth Row: Bookmarks
        extraContentBlock += myProductHunt.createRowContainerBlock(
            myProductHunt.createBookmarksBlock(product)
        );

        extraContentContainer.innerHTML = ''; // Sorry about that
        extraContentContainer.insertAdjacentHTML("beforeend", extraContentBlock);
        postItemObj.append(extraContentContainer);

    })
    .catch(function(e) {
        console.warn("Error", e);
    });
    
}, false);
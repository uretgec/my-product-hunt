"use strict";

// Init Managers
// const myProductHunt = new MyProductHunt();
const myDarkMode = new MyDarkMode();

// listen runtime message from bg
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.action === "IM_READY") {

        // inject dark mode toggle button
        myDarkMode._process()
    }
});

// // mouse tracking
// let prevPostItemId = null;
// document.addEventListener("mouseover", function (event) {
//     let relTarg = event.relatedTarget || event.toElement;
//     let productPostBlockID = 1;
//     let postItemObj = relTarg.closest(myProductHunt.ProductPostBlock);
//     if(postItemObj === null) {
//         postItemObj = relTarg.closest(myProductHunt.ProductSecondPostBlock);
//         productPostBlockID = 2;
//     }
//     if(postItemObj === null) return;

//     // Checked data-marked attribute
//     if(postItemObj.hasAttribute("data-marked")) return;

//     // Find producthunt id
//     let currentPostItemId = postItemObj.getAttribute("data-test").replace("post-item-","");
//     if(prevPostItemId === currentPostItemId) return;
//     prevPostItemId = currentPostItemId;

//     // Product marked after success response
//     postItemObj.setAttribute("data-marked", currentPostItemId);
    
//     //let postItemUri = postItemObj.querySelector('a[data-test="post-name-' + currentPostItemId + '"]');
//     let postItemUri = postItemObj.querySelector('a');
//     if(postItemUri === null) return;

//     let postItemSlug = postItemUri.getAttribute("href").replace("/posts/","");
//     postItemSlug = postItemSlug.replace("/products/","");
    
//     // # check - fragment
//     let fragment = postItemSlug.indexOf("#")
//     if (fragment !== -1) {
//         postItemSlug = postItemSlug.substr(0, fragment)
//     }

//     // Extra content div created
//     let extraContentContainer = document.createElement("div");
//     extraContentContainer.setAttribute("class",myProductHunt.ExtraContentClassName);
    
//     // Inject post item div
//     extraContentContainer.insertAdjacentHTML("beforeend", myProductHunt.createLoadingBarBlock());
//     if(productPostBlockID === 2) {
//         postItemObj.append(extraContentContainer);
//     } else {
//         postItemObj.after(extraContentContainer);
//     }
    
//     // Graphql Post Request
//     fetch(
//         myProductHunt.generateUri("frontend", "graphql"), 
//         myProductHunt.generatePostRequestOptions(postItemSlug)
//     )
//     .then(function(resp) {
//         return resp.json();
//     })
//     .then(function(item) {
//         return myProductHunt.generateGraphqlResponseData(item);
//     })
//     .then(function(product) {

//         // First Row: Hunter and Makers - Reviews + Socials
//         let extraContentBlock = myProductHunt.createRowContainerBlock(
//             myProductHunt.createHunterAndMakersBlock(product),
//             myProductHunt.createReviewsBlock(product),
//         );

//         // Second Row: Headline
//         extraContentBlock += myProductHunt.createRowContainerBlock(
//             myProductHunt.createHeadlineBlock(product)
//         );

//         // Third Row: Topics
//         extraContentBlock += myProductHunt.createRowContainerBlock(
//             myProductHunt.createTopicsBlock(product)
//         );

//         // Fourth Row: Bookmarks
//         extraContentBlock += myProductHunt.createRowContainerBlock(
//             myProductHunt.createBookmarksBlock(product)
//         );

//         extraContentContainer.innerHTML = ''; // Sorry about that
//         extraContentContainer.insertAdjacentHTML("beforeend", extraContentBlock);
//         if(productPostBlockID === 2) {
//             postItemObj.append(extraContentContainer);
//         } else {
//             postItemObj.after(extraContentContainer);
//         }

//     })
//     .catch(function(e) {
//         extraContentContainer.innerHTML = ''; // Sorry about that
//     });    
// }, false);


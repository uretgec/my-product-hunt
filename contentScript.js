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

// mouse tracking
let currentPostItem = null;
document.addEventListener("mouseover", function( event ) {
    //console.log("mouseover", event);
    let relTarg = event.relatedTarget || event.toElement;
    let ifound = relTarg.closest("div .styles_item__2kQQ5");
    if(!!ifound && currentPostItem != ifound.getAttribute("data-test")) {
        currentPostItem = ifound.getAttribute("data-test");

        let itemSlug = ifound.querySelector('[data-test*="' +currentPostItem.replace("post-item","post-name")+ '"]');
        if(!!itemSlug) {
            fetch("https://www.producthunt.com/frontend/graphql", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest"
                },
                "referrer": "https://www.producthunt.com" + itemSlug.getAttribute("href"),
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "{\"operationName\":\"PostPage\",\"variables\":{\"slug\":\""+itemSlug.getAttribute("href").replace("/posts/","")+"\",\"topPostsVariant\":\"TODAY\"},\"query\":\"query PostPage($slug:String!$topPostsVariant:TopPostsCardVariant!){post(slug:$slug){_id id slug name tagline trashedAt isAvailable pricingType productLinks{id redirectPath __typename}relatedAd(kind:\\\"sidebar\\\"){...AdFragment __typename}...CollectButtonFragment ...FacebookShareButtonFragment ...MetaTags ...PostBadgesFragment ...PostPageActionsFragment ...PostPageDescription ...PostPageGallery ...PostPageGetItButtons ...PostPageLaunchTips ...PostPageModerationReason ...PostPageSocialLinks ...PostPageTimestampFragment ...PostStatusIcons ...PostThumbnail ...PostVoteButton ...TopicFollowButtonList ...PostPageMakersCard ...PostCommentInput ...PostPageVotersFragment ...PostPageUpvoteBarFragment ...ScheduledNoticeFragment ...ModerationToolsFragment ...LaunchDayNoticeFragment ...LaunchDashMessageFragment ...EmbedButtonFragment ...EmbedBadgeMessageFragment ...StructuredDataFromPost __typename}viewer{id deviceType ...NewsletterSubscribeFormPopupFragment contentGating{promoCode(slug:$slug)__typename}__typename}dismissed(dismissableGroup:\\\"cards\\\" dismissableKey:\\\"EmailSubscribeCard\\\"){id isDismissed dismissableGroup dismissableKey __typename}...TopPostsFragment}fragment PostPageActionsFragment on Post{id _id name slug userId url canManage __typename}fragment PostPageDescription on Post{_id id slug description isMaker canComment canManage promo{text code __typename}makers{id __typename}__typename}fragment PostPageGallery on Post{id slug socialImageMediaId canManage createdAt updatedAt media{id originalHeight originalWidth ...MediaCarouselFragment __typename}__typename}fragment MediaCarouselFragment on Media{id imageUuid mediaType originalHeight originalWidth metadata{url videoId platform __typename}__typename}fragment PostPageGetItButtons on Post{id isAvailable productLinks{id redirectPath storeName websiteName devices __typename}__typename}fragment PostPageLaunchTips on Post{id _id canComment commentsCount createdAt featuredAt makerInviteUrl slug name isMaker isHunter url __typename}fragment PostPageModerationReason on Post{moderationReason{reason moderator{id name headline username __typename}__typename}__typename}fragment PostPageSocialLinks on Post{id angellistUrl facebookUrl githubUrl instagramUrl mediumUrl twitterUrl isAvailable __typename}fragment PostPageTimestampFragment on Post{id disabledWhenScheduled createdAt featuredAt __typename}fragment PostPageMakersCard on Post{id canManage slug user{id name headline username ...UserImage __typename}makers{id name headline username ...UserImage __typename}__typename}fragment UserImage on User{_id id name username avatarUrl headline isViewer ...KarmaBadge __typename}fragment KarmaBadge on User{karmaBadge{kind score __typename}__typename}fragment CollectButtonFragment on Post{id name isCollected __typename}fragment PostStatusIcons on Post{name productState __typename}fragment PostThumbnail on Post{id name thumbnail{id ...MediaThumbnail __typename}...PostStatusIcons __typename}fragment MediaThumbnail on Media{id imageUuid __typename}fragment PostVoteButton on Post{_id id featuredAt updatedAt createdAt disabledWhenScheduled hasVoted ...on Votable{id votesCount __typename}__typename}fragment FacebookShareButtonFragment on Shareable{id url __typename}fragment TopicFollowButtonList on Topicable{id topics{edges{node{id ...TopicFollowButton __typename}__typename}__typename}__typename}fragment TopicFollowButton on Topic{id slug name isFollowed followersCount ...TopicImage __typename}fragment TopicImage on Topic{name imageUuid __typename}fragment MetaTags on SEOInterface{id meta{canonicalUrl creator description image mobileAppUrl oembedUrl robots title type author authorUrl __typename}__typename}fragment PostCommentInput on Post{_id id canManage __typename}fragment AdFragment on AdChannel{id post{id slug name updatedAt commentsCount ...PostVoteButton __typename}ctaText dealText name tagline thumbnailUuid url __typename}fragment PostBadgesFragment on Post{id badges{edges{node{...on TopPostBadge{id position period date __typename}...on GoldenKittyAwardBadge{id category year __typename}__typename}__typename}__typename}...EmbedButtonFragment __typename}fragment EmbedButtonFragment on Post{id slug __typename}fragment PostPageVotersFragment on Post{id votesCount __typename}fragment PostPageUpvoteBarFragment on Post{id name tagline ...PostVoteButton ...PostThumbnail ...PostPageGetItButtonFragment __typename}fragment PostPageGetItButtonFragment on Post{id isAvailable productState productLinks{id __typename}...PostPageGetItButtons ...ProductUnavailableButtonFragment __typename}fragment ProductUnavailableButtonFragment on Post{id __typename}fragment ScheduledNoticeFragment on Post{id createdAt featuredAt __typename}fragment NewsletterSubscribeFormPopupFragment on Viewer{id showCookiePolicy ...SubscribeToNewsletterFormViewer __typename}fragment SubscribeToNewsletterFormViewer on Viewer{id email hasNewsletterSubscription __typename}fragment ModerationToolsFragment on Post{id name slug __typename}fragment LaunchDayNoticeFragment on Post{id slug createdAt isMaker isHunter __typename}fragment LaunchDashMessageFragment on Post{id slug isMaker isHunter createdAt __typename}fragment EmbedBadgeMessageFragment on Post{id embedBadgeMessage{title tagline url __typename}__typename}fragment StructuredDataFromPost on Post{id structuredData __typename}fragment TopPostsFragment on Query{postsTop(preferredVariant:$topPostsVariant){variant posts{id _id name slug tagline ...PostThumbnail __typename}__typename}__typename}\"}",
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            }).then(function(resp) {
                //console.log("response", resp);
                return resp.json();
            })
            .then(function(data) {
                console.log(itemSlug.getAttribute("href"), data);
            });
        }

        console.log("ifound", relTarg, ifound.getAttribute("data-test"), '[data-test="' +currentPostItem.replace("post-item","post-name")+ '"]', itemSlug.getAttribute("href"));
    }
    
    //ifound.style.border = "1px solid #000000";
}, false);

// product item box
/*document.querySelectorAll(".styles_item__2kQQ5").forEach(function(item) {
    console.log("styles_item__2kQQ5", item);
});*/

/**

fetch("https://www.producthunt.com/frontend/graphql", {
  "headers": {
    "accept": "*\/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://www.producthunt.com/posts/logo-design-09b50e82-1c85-4dea-a607-c13086d4338d",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"operationName\":\"PostPage\",\"variables\":{\"slug\":\"logo-design-09b50e82-1c85-4dea-a607-c13086d4338d\",\"topPostsVariant\":\"TODAY\"},\"query\":\"query PostPage($slug:String!$topPostsVariant:TopPostsCardVariant!){post(slug:$slug){_id id slug name tagline trashedAt isAvailable pricingType productLinks{id redirectPath __typename}relatedAd(kind:\\\"sidebar\\\"){...AdFragment __typename}...CollectButtonFragment ...FacebookShareButtonFragment ...MetaTags ...PostBadgesFragment ...PostPageActionsFragment ...PostPageDescription ...PostPageGallery ...PostPageGetItButtons ...PostPageLaunchTips ...PostPageModerationReason ...PostPageSocialLinks ...PostPageTimestampFragment ...PostStatusIcons ...PostThumbnail ...PostVoteButton ...TopicFollowButtonList ...PostPageMakersCard ...PostCommentInput ...PostPageVotersFragment ...PostPageUpvoteBarFragment ...ScheduledNoticeFragment ...ModerationToolsFragment ...LaunchDayNoticeFragment ...LaunchDashMessageFragment ...EmbedButtonFragment ...EmbedBadgeMessageFragment ...StructuredDataFromPost __typename}viewer{id deviceType ...NewsletterSubscribeFormPopupFragment contentGating{promoCode(slug:$slug)__typename}__typename}dismissed(dismissableGroup:\\\"cards\\\" dismissableKey:\\\"EmailSubscribeCard\\\"){id isDismissed dismissableGroup dismissableKey __typename}...TopPostsFragment}fragment PostPageActionsFragment on Post{id _id name slug userId url canManage __typename}fragment PostPageDescription on Post{_id id slug description isMaker canComment canManage promo{text code __typename}makers{id __typename}__typename}fragment PostPageGallery on Post{id slug socialImageMediaId canManage createdAt updatedAt media{id originalHeight originalWidth ...MediaCarouselFragment __typename}__typename}fragment MediaCarouselFragment on Media{id imageUuid mediaType originalHeight originalWidth metadata{url videoId platform __typename}__typename}fragment PostPageGetItButtons on Post{id isAvailable productLinks{id redirectPath storeName websiteName devices __typename}__typename}fragment PostPageLaunchTips on Post{id _id canComment commentsCount createdAt featuredAt makerInviteUrl slug name isMaker isHunter url __typename}fragment PostPageModerationReason on Post{moderationReason{reason moderator{id name headline username __typename}__typename}__typename}fragment PostPageSocialLinks on Post{id angellistUrl facebookUrl githubUrl instagramUrl mediumUrl twitterUrl isAvailable __typename}fragment PostPageTimestampFragment on Post{id disabledWhenScheduled createdAt featuredAt __typename}fragment PostPageMakersCard on Post{id canManage slug user{id name headline username ...UserImage __typename}makers{id name headline username ...UserImage __typename}__typename}fragment UserImage on User{_id id name username avatarUrl headline isViewer ...KarmaBadge __typename}fragment KarmaBadge on User{karmaBadge{kind score __typename}__typename}fragment CollectButtonFragment on Post{id name isCollected __typename}fragment PostStatusIcons on Post{name productState __typename}fragment PostThumbnail on Post{id name thumbnail{id ...MediaThumbnail __typename}...PostStatusIcons __typename}fragment MediaThumbnail on Media{id imageUuid __typename}fragment PostVoteButton on Post{_id id featuredAt updatedAt createdAt disabledWhenScheduled hasVoted ...on Votable{id votesCount __typename}__typename}fragment FacebookShareButtonFragment on Shareable{id url __typename}fragment TopicFollowButtonList on Topicable{id topics{edges{node{id ...TopicFollowButton __typename}__typename}__typename}__typename}fragment TopicFollowButton on Topic{id slug name isFollowed followersCount ...TopicImage __typename}fragment TopicImage on Topic{name imageUuid __typename}fragment MetaTags on SEOInterface{id meta{canonicalUrl creator description image mobileAppUrl oembedUrl robots title type author authorUrl __typename}__typename}fragment PostCommentInput on Post{_id id canManage __typename}fragment AdFragment on AdChannel{id post{id slug name updatedAt commentsCount ...PostVoteButton __typename}ctaText dealText name tagline thumbnailUuid url __typename}fragment PostBadgesFragment on Post{id badges{edges{node{...on TopPostBadge{id position period date __typename}...on GoldenKittyAwardBadge{id category year __typename}__typename}__typename}__typename}...EmbedButtonFragment __typename}fragment EmbedButtonFragment on Post{id slug __typename}fragment PostPageVotersFragment on Post{id votesCount __typename}fragment PostPageUpvoteBarFragment on Post{id name tagline ...PostVoteButton ...PostThumbnail ...PostPageGetItButtonFragment __typename}fragment PostPageGetItButtonFragment on Post{id isAvailable productState productLinks{id __typename}...PostPageGetItButtons ...ProductUnavailableButtonFragment __typename}fragment ProductUnavailableButtonFragment on Post{id __typename}fragment ScheduledNoticeFragment on Post{id createdAt featuredAt __typename}fragment NewsletterSubscribeFormPopupFragment on Viewer{id showCookiePolicy ...SubscribeToNewsletterFormViewer __typename}fragment SubscribeToNewsletterFormViewer on Viewer{id email hasNewsletterSubscription __typename}fragment ModerationToolsFragment on Post{id name slug __typename}fragment LaunchDayNoticeFragment on Post{id slug createdAt isMaker isHunter __typename}fragment LaunchDashMessageFragment on Post{id slug isMaker isHunter createdAt __typename}fragment EmbedBadgeMessageFragment on Post{id embedBadgeMessage{title tagline url __typename}__typename}fragment StructuredDataFromPost on Post{id structuredData __typename}fragment TopPostsFragment on Query{postsTop(preferredVariant:$topPostsVariant){variant posts{id _id name slug tagline ...PostThumbnail __typename}__typename}__typename}\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then(function(resp) {
    resp.headers.forEach(function(value, name){
        console.log(value, name);
    });
    console.log("response", resp);
    return resp.json();
})
.then(function(data) {
    console.log("Graphl", data);
});

*/
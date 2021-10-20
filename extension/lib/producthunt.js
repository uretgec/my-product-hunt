"use strict";

function MyProductHunt() {}

MyProductHunt.prototype.BaseUri = "https://www.producthunt.com"
MyProductHunt.prototype.SignupBlock = ".styles_overlay__2r_YH"
MyProductHunt.prototype.BlurryBlock = ".styles_content__1JfPV"
MyProductHunt.prototype.ProductPostBlock = ".styles_item__1QTTj"
MyProductHunt.prototype.ProductSecondPostBlock = ".styles_item__2kQQ5"
MyProductHunt.prototype.ExtraContentClassName = "styles_container__4Ydg1"
MyProductHunt.prototype.ImgixSuffixQuery = "?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"

MyProductHunt.prototype.generateUri = function (...params) {
    return [this.BaseUri].concat(params).join('/')
}

MyProductHunt.prototype.generatePostGraphqlQuery = function (slug) {
    return {
        "operationName": "PostPage",
        "variables": {
            "slug": slug,
            "topPostsVariant": "TODAY"
        },
        "query": "query PostPage($slug:String!$topPostsVariant:TopPostsCardVariant!){post(slug:$slug){_id id slug name tagline trashedAt isAvailable pricingType productLinks{id redirectPath __typename}relatedAd(kind:\"sidebar\"){...AdFragment __typename}...CollectButtonFragment ...FacebookShareButtonFragment ...MetaTags ...PostBadgesFragment ...PostPageActionsFragment ...PostPageDescription ...PostPageGallery ...PostPageGetItButtons ...PostPageLaunchTips ...PostPageModerationReason ...PostPageSocialLinks ...PostPageTimestampFragment ...PostStatusIcons ...PostThumbnail ...PostVoteButton ...TopicFollowButtonList ...PostPageMakersCard ...PostCommentInput ...PostPageVotersFragment ...PostPageUpvoteBarFragment ...ScheduledNoticeFragment ...ModerationToolsFragment ...LaunchDayNoticeFragment ...LaunchDashMessageFragment ...EmbedButtonFragment ...EmbedBadgeMessageFragment ...StructuredDataFromPost ...PostPageQuestionsFragment __typename}viewer{id deviceType ...NewsletterSubscribeFormPopupFragment __typename}dismissed(dismissableGroup:\"cards\" dismissableKey:\"EmailSubscribeCard\"){id isDismissed dismissableGroup dismissableKey __typename}...TopPostsFragment}fragment PostPageActionsFragment on Post{id _id name slug userId url canManage __typename}fragment PostPageDescription on Post{_id id slug description isMaker canComment canManage promo{text code __typename}makers{id __typename}__typename}fragment PostPageGallery on Post{id slug canManage createdAt updatedAt media{id originalHeight originalWidth ...MediaCarouselFragment __typename}__typename}fragment MediaCarouselFragment on Media{id imageUuid mediaType originalHeight originalWidth metadata{url videoId platform __typename}__typename}fragment PostPageGetItButtons on Post{id isAvailable productLinks{id redirectPath storeName websiteName devices __typename}__typename}fragment PostPageLaunchTips on Post{id _id canComment commentsCount createdAt featuredAt makerInviteUrl slug name isMaker isHunter url __typename}fragment PostPageModerationReason on Post{moderationReason{reason moderator{id name headline username __typename}__typename}__typename}fragment PostPageSocialLinks on Post{id angellistUrl facebookUrl githubUrl instagramUrl mediumUrl twitterUrl isAvailable __typename}fragment PostPageTimestampFragment on Post{id disabledWhenScheduled createdAt featuredAt __typename}fragment PostPageMakersCard on Post{id canManage slug user{id name headline username ...UserImage __typename}makers{id name headline username ...UserImage __typename}__typename}fragment UserImage on User{_id id name username avatarUrl headline isViewer ...KarmaBadge __typename}fragment KarmaBadge on User{karmaBadge{kind score __typename}__typename}fragment CollectButtonFragment on Post{id name isCollected __typename}fragment PostStatusIcons on Post{name productState __typename}fragment PostThumbnail on Post{id name thumbnailImageUuid ...PostStatusIcons __typename}fragment PostVoteButton on Post{_id id featuredAt updatedAt createdAt disabledWhenScheduled hasVoted ...on Votable{id votesCount __typename}__typename}fragment FacebookShareButtonFragment on Shareable{id url __typename}fragment TopicFollowButtonList on Topicable{id topics{edges{node{id ...TopicFollowButton __typename}__typename}__typename}__typename}fragment TopicFollowButton on Topic{id slug name isFollowed followersCount ...TopicImage __typename}fragment TopicImage on Topic{name imageUuid __typename}fragment MetaTags on SEOInterface{id meta{canonicalUrl creator description image mobileAppUrl oembedUrl robots title type author authorUrl __typename}__typename}fragment PostCommentInput on Post{_id id canManage __typename}fragment AdFragment on AdChannel{id post{id slug name updatedAt commentsCount ...PostVoteButton __typename}ctaText dealText name tagline thumbnailUuid url __typename}fragment PostBadgesFragment on Post{id badges{edges{node{...on TopPostBadge{id position period date __typename}...on GoldenKittyAwardBadge{id category year __typename}__typename}__typename}__typename}...EmbedButtonFragment __typename}fragment EmbedButtonFragment on Post{id slug __typename}fragment PostPageVotersFragment on Post{id votesCount __typename}fragment PostPageUpvoteBarFragment on Post{id name tagline ...PostVoteButton ...PostThumbnail ...PostPageGetItButtonFragment __typename}fragment PostPageGetItButtonFragment on Post{id isAvailable productState productLinks{id __typename}...PostPageGetItButtons ...ProductUnavailableButtonFragment __typename}fragment ProductUnavailableButtonFragment on Post{id __typename}fragment ScheduledNoticeFragment on Post{id createdAt featuredAt __typename}fragment NewsletterSubscribeFormPopupFragment on Viewer{id showCookiePolicy ...SubscribeToNewsletterFormViewer __typename}fragment SubscribeToNewsletterFormViewer on Viewer{id email hasNewsletterSubscription __typename}fragment ModerationToolsFragment on Post{id name slug __typename}fragment LaunchDayNoticeFragment on Post{id slug createdAt isMaker isHunter __typename}fragment LaunchDashMessageFragment on Post{id slug isMaker isHunter createdAt __typename}fragment EmbedBadgeMessageFragment on Post{id embedBadgeMessage{title tagline url __typename}__typename}fragment StructuredDataFromPost on Post{id structuredData __typename}fragment TopPostsFragment on Query{postsTop(preferredVariant:$topPostsVariant){variant posts{id _id name slug tagline ...PostThumbnail __typename}__typename}__typename}fragment PostPageQuestionsFragment on Post{id questions(first:3){edges{node{id slug title __typename}__typename}__typename}__typename}"
   }
}

/* TODO: Browser version and sec-ch-ua header data updated - https://wicg.github.io/ua-client-hints/ */
MyProductHunt.prototype.generatePostRequestOptions = function (slug) {
    return {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"93\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"93\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": this.generateUri("posts", slug),
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify(this.generatePostGraphqlQuery(slug)),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }
}

MyProductHunt.prototype.generateGraphqlResponseData = function (item) {
    let product = {
        meta: {
            id: item.data.post.id,
            createdAt: item.data.post.createdAt,
            updatedAt: item.data.post.updatedAt,
            featuredAt: item.data.post.featuredAt,
            name: item.data.post.name,
            slug: item.data.post.slug,
            description: item.data.post.meta.description,
            tagline: item.data.post.tagline,
        },
        hunter: {
            avatarUrl: item.data.post.user.avatarUrl + this.ImgixSuffixQuery,
            name: item.data.post.user.name,
            headline: item.data.post.user.headline || "",
            username: item.data.post.user.username,
        },
        makers: [],
        topics: [],
        bookmarks: item.data.post.productLinks,
        socialList: {
            angellistUrl: item.data.post.angellistUrl,
            facebookUrl: item.data.post.facebookUrl,
            githubUrl: item.data.post.githubUrl,
            instagramUrl: item.data.post.instagramUrl,
            twitterUrl: item.data.post.twitterUrl,
            mediumUrl: item.data.post.mediumUrl,
        },
        rating: {
            bestRating: 0, // Max
            ratingCount: 0, // Total
            ratingValue: 0, // Avg
            worstRating: 0, // Min
        }
    };

    if(item.data.post.structuredData.hasOwnProperty("aggregateRating")) {
        product.rating = {
            bestRating: item.data.post.structuredData.aggregateRating.bestRating,
            ratingCount: item.data.post.structuredData.aggregateRating.ratingCount,
            ratingValue: item.data.post.structuredData.aggregateRating.ratingValue,
            worstRating: item.data.post.structuredData.aggregateRating.worstRating,
        }
    }

    if(item.data.post.makers.length > 0) {
        for (let makerid in item.data.post.makers) {
            const makerItem = item.data.post.makers[makerid];
            product.makers.push({
                avatarUrl: makerItem.avatarUrl + this.ImgixSuffixQuery,
                name: makerItem.name,
                headline: makerItem.headline || "",
                username: makerItem.username,
            });
        }
    }

    if(item.data.post.topics.edges.length > 0) {
        for (let topicid in item.data.post.topics.edges) {
            const topicItem = item.data.post.topics.edges[topicid].node;
            product.topics.push({
                imageUrl: "https://ph-files.imgix.net/" + topicItem.imageUuid + this.ImgixSuffixQuery,
                name: topicItem.name,
                slug: topicItem.slug,
                followersCount: topicItem.followersCount,
            });
        }
    }
    
    return product;
}

MyProductHunt.prototype.createRowContainerBlock = function (...blocks) {
    let content = '<div class="styles_rowblock__4Ydg1">'

    if(!!blocks) {
        for (const key in blocks) {
            content += blocks[key]
        }
    }

    content += '</div>'
    return content
}

MyProductHunt.prototype.createLoadingBarBlock = function () {
    return '<div class="styles_loadingblock__4Ydg1">'
            + '<span class="styles_font__2Nqit styles_orange__3VieU styles_xSmall__1eYHj styles_semiBold__2IC3i styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
            + 'Loading more data'
            + '</span>'
            + '</div>';
}

MyProductHunt.prototype.createHunterAndMakersBlock = function (product) {
    let content = '<!--Hunter and Makers-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_xSmall__1eYHj styles_normal__iGf4Q  styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + 'Hunter'
        + '</div>'
        + '<div class="styles_makersContainer__1N77x">'
        + '<a href="/@' + product.hunter.username + '" title="' + product.hunter.name + ' - ' + product.hunter.headline.replace('"', "'") + '" target="_blank">'
        + '<img src="' + product.hunter.avatarUrl + '" alt="" class="styles_image__2cVru" style="width: 30px; height: 30px;">'
        + '</a>' 
        + '</div>'
        + '</div>'

        +'<div class="styles_columnblock__4Ydg1">'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_xSmall__1eYHj styles_normal__iGf4Q  styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + product.makers.length + ' Makers'
        + '</div>'
        + '<div class="styles_makersContainer__1N77x styles_rowinlineblock__4Ydg1">'

        if(product.makers.length > 0) {
            for (let makerid = 0; makerid < product.makers.length; makerid++) {
                const maker = product.makers[makerid];
                content += '<a href="/@' + maker.username + '" title="' + maker.name + ' - ' + maker.headline.replace('"', "'") + '" target="_blank"';
                if(makerid > 0 && product.makers.length > 7) {
                    content +=' style="margin-left:-15px"';
                }
                
                content += '><img src="' + maker.avatarUrl + '" alt="" class="styles_image__2cVru" style="width: 30px; height: 30px;">'
                + '</a>'
            }
        }

        content += '</div>'
        + '</div>'

        return content
}

MyProductHunt.prototype.createReviewsBlock = function (product) {
    let content = '<!--Reviews-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_xSmall__1eYHj styles_normal__iGf4Q  styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + 'Ratings'
        + '</div>'
        + '<div class="styles_actions__3Sc81">'
        + '<a class="styles_button__-7l7l styles_smallSize__38yI- styles_subtleVariant__14Msp styles_simpleVariant__1SJ3a styles_button__SCCIK" href="/posts/' + product.meta.slug + '/reviews" target="_blank">'
        + '<span class="styles_font__2Nqit styles_xSmall__1eYHj styles_semiBold__2IC3i styles_buttonContainer__2c7tT styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + product.rating.ratingCount + ' Voters - ' + product.rating.ratingValue + '/5'
        + '</span>'
        + '</a>'
        + '</div>'
        + '</div>'

    return content
}

MyProductHunt.prototype.createSocialsBlock = function (product) {
    let content = '<!--Socials-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_xSmall__1eYHj styles_normal__iGf4Q  styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + 'Social Links'
        + '</div>'
        + '<div class="styles_flex__363IJ styles_flex-align-flex-start__3RSvk styles_flex-direction-column__203zO styles_flex-justify-center__3kSv0 styles_responsive__96EZc">'
        + '<span class="styles_font__2Nqit styles_grey__3J1TQ styles_small__2bw6M styles_normal__iGf4Q styles_container__14gv3 styles_lineHeight__2RYYy styles_underline__20yPd">'

        let noSocialLinks = true;
            for (const socialKey in product.socialList) {
                if(!!product.socialList[socialKey]) {
                noSocialLinks = false;
            }
        };

        if(!noSocialLinks) {
            if(!!product.socialList.angellistUrl) {
                content += '<a href="' + product.socialList.angellistUrl + '" title="AngelList" target="_blank"><svg viewBox="0 0 16 23" xmlns="http://www.w3.org/2000/svg" class="styles_icon__3ITVt"><path d="M11.98 5.574L10.532 9.59l1.488.257c1.4-3.682 2.099-5.797 2.099-6.344 0-.457-.161-.686-.484-.686-.483 0-1.034.918-1.653 2.756zm-3.802 8.414l.42 1.078a5.7 5.7 0 01.903-.82l-.42-.068-.49-.086-.413-.104zM4.464 3.014c0 .8.674 2.927 2.022 6.381.153-.082.36-.122.624-.122a17 17 0 01.954.06l-1.54-4.298C5.89 3.238 5.368 2.34 4.96 2.34a.405.405 0 00-.369.215.885.885 0 00-.127.459zM3.46 12.31c0 .294.219.78.655 1.458a11.83 11.83 0 001.495 1.874c.56.571.983.857 1.272.857a.434.434 0 00.324-.16.487.487 0 00.146-.33c0-.196-.135-.612-.407-1.25a14.814 14.814 0 00-1.011-1.972 4.6 4.6 0 00-.782-.991c-.28-.262-.543-.392-.789-.392-.17 0-.362.11-.578.33-.216.221-.325.413-.325.576zm-2.01 4.103c0 .335.107.76.319 1.274.5 1.184 1.278 2.11 2.334 2.78 1.055.67 2.249 1.005 3.58 1.005 1.925 0 3.544-.694 4.859-2.082 1.288-1.38 1.933-3.124 1.933-5.23 0-.351-.004-.625-.013-.821a3.426 3.426 0 00-.146-.76c-.09-.31-.219-.538-.388-.685-.475-.4-1.372-.709-2.69-.925-1.319-.216-2.465-.325-3.44-.325-.314 0-.522.045-.624.135-.101.041-.152.184-.152.429 0 .277.09.522.273.735.182.212.418.375.706.49a6.855 6.855 0 002.099.429l1.08.048c.348.017.645.017.891 0h.292a.65.65 0 01.51.233c.126.155.207.38.24.674-.237.228-.644.449-1.22.661-.517.18-.912.368-1.183.563a5.313 5.313 0 00-1.38 1.397c-.377.555-.566 1.114-.566 1.678 0 .253.079.614.235 1.084.157.47.236.826.236 1.071l-.038.147a.994.994 0 00-.051.172c-1.162-.082-1.78-.964-1.857-2.646-.068.017-.242.025-.522.025a.969.969 0 01.026.257c0 .433-.172.798-.515 1.096a1.777 1.777 0 01-1.202.447c-.696 0-1.401-.318-2.118-.955-.716-.637-1.075-1.286-1.075-1.948 0-.277.14-.55.42-.82.441.522.695.833.763.93.653.85 1.217 1.274 1.692 1.274a.697.697 0 00.337-.104c.123-.069.184-.153.184-.25 0-.278-.37-.87-1.113-1.777-.742-.906-1.235-1.36-1.481-1.36-.365 0-.662.182-.89.546a2.05 2.05 0 00-.344 1.108zm-1.45.11c0-.824.18-1.49.54-1.996.36-.506.94-.865 1.737-1.078-.238-.604-.356-1.029-.356-1.274 0-.506.258-1.008.775-1.506.518-.498 1.035-.747 1.552-.747.246 0 .543.061.89.184C3.756 6.333 3.065 4.018 3.065 3.16c0-.653.174-1.186.522-1.599.347-.412.852-.618 1.513-.618 1.11 0 2.489 2.372 4.134 7.116l.101.282c.051-.13.174-.455.37-.974.194-.518.379-1.002.553-1.451.173-.45.402-.97.686-1.562a14.51 14.51 0 01.82-1.506c.264-.413.562-.766.897-1.06.335-.294.66-.44.973-.44.602 0 1.077.2 1.425.6.347.4.521.897.521 1.494 0 .881-.674 3.127-2.022 6.736.517.122.943.31 1.278.563.335.254.583.572.744.956.161.384.272.765.331 1.145.06.38.089.83.089 1.353 0 1.225-.2 2.368-.598 3.43a8.266 8.266 0 01-1.679 2.756c-.72.775-1.615 1.388-2.683 1.837-1.069.449-2.247.674-3.536.674a8.305 8.305 0 01-2.836-.515c-1.264-.465-2.357-1.247-3.282-2.345C.462 18.934 0 17.765 0 16.523z" fill="#999"></path></svg></a>'
            }

            if(!!product.socialList.twitterUrl) {
                content += '<a href="' + product.socialList.twitterUrl + '" title="Twitter" target="_blank"><svg viewBox="0 0 16 13" xmlns="http://www.w3.org/2000/svg" class="styles_icon__3ITVt"><path d="M15.999 1.537a6.57 6.57 0 01-1.885.517A3.296 3.296 0 0015.557.238a6.576 6.576 0 01-2.084.796A3.282 3.282 0 007.88 4.027 9.32 9.32 0 011.112.599 3.28 3.28 0 002.13 4.98a3.27 3.27 0 01-1.487-.41v.042a3.284 3.284 0 002.633 3.217 3.29 3.29 0 01-1.483.056 3.286 3.286 0 003.067 2.28A6.587 6.587 0 010 11.523a9.29 9.29 0 005.032 1.475c6.038 0 9.34-5.001 9.34-9.338 0-.143-.004-.284-.01-.425a6.673 6.673 0 001.637-1.698H16z"></path></svg></a>'
            }

            if(!!product.socialList.facebookUrl) {
                content += '<a href="' + product.socialList.facebookUrl + '" title="Facebook" target="_blank"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="styles_icon__3ITVt"><path d="M16 8.048a8 8 0 10-9.25 7.9V10.36H4.719V8.048H6.75V6.285a2.822 2.822 0 013.021-3.112c.6.008 1.199.06 1.791.156V5.3h-1.008a1.155 1.155 0 00-1.3 1.25v1.5h2.219l-.355 2.312H9.25v5.591A8 8 0 0016 8.048z" fill="#6F6F6F" opacity="0.8"></path></svg></a>'
            }

            if(!!product.socialList.instagramUrl) {
                content += '<a href="' + product.socialList.instagramUrl + '" title="Instagram" target="_blank"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="styles_icon__3ITVt"><g fill="#6F6F6F" opacity="0.8"><circle cx="12.145" cy="3.892" r="1"></circle><path d="M8 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"></path><path d="M12 16H4c-2.056 0-4-1.944-4-4V4c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zM4 2c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2V4c0-.935-1.065-2-2-2H4z"></path></g></svg></a>'
            }

            if(!!product.socialList.githubUrl) {
                content += '<a href="' + product.socialList.githubUrl + '" title="GitHub" target="_blank"><svg viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" class="styles_icon__3ITVt"><path d="M20 10.932c0 2.228-.636 4.232-1.908 6.012-1.271 1.78-2.914 3.012-4.928 3.695-.234.045-.406.014-.514-.093a.537.537 0 01-.163-.4v-2.809c0-.861-.226-1.491-.677-1.89a8.74 8.74 0 001.335-.24c.394-.107.802-.28 1.223-.52.421-.24.773-.535 1.055-.885.282-.351.512-.817.69-1.398.178-.582.267-1.25.267-2.005 0-1.074-.343-1.988-1.028-2.743.32-.807.286-1.713-.105-2.716-.243-.08-.594-.031-1.054.146-.46.178-.86.373-1.198.586l-.495.32a9.05 9.05 0 00-2.5-.346 9.05 9.05 0 00-2.5.346 11.523 11.523 0 00-.553-.36c-.23-.142-.593-.312-1.088-.512-.494-.2-.868-.26-1.12-.18-.381 1.003-.412 1.909-.09 2.716-.686.755-1.03 1.67-1.03 2.743 0 .755.09 1.42.268 1.998.178.577.406 1.043.683 1.398.278.355.627.652 1.048.892.421.24.83.413 1.224.52.395.106.84.186 1.335.24-.347.319-.56.776-.638 1.37a2.543 2.543 0 01-.586.2 3.606 3.606 0 01-.742.067c-.287 0-.57-.095-.853-.286-.282-.191-.523-.469-.723-.833a2.13 2.13 0 00-.631-.692c-.256-.177-.471-.284-.645-.32l-.26-.04c-.182 0-.308.02-.378.06-.07.04-.09.091-.065.154a.736.736 0 00.117.186.96.96 0 00.17.16l.09.066c.192.09.38.258.567.506.187.249.324.475.41.68l.13.306c.113.337.304.61.574.819.269.208.56.341.872.4.312.057.614.088.905.092.29.005.532-.01.723-.046l.299-.054c0 .338.002.733.007 1.186l.006.719c0 .16-.056.293-.17.4-.112.106-.286.137-.52.092-2.014-.683-3.657-1.915-4.928-3.695C.636 15.164 0 13.16 0 10.932 0 9.077.447 7.366 1.341 5.8a10.07 10.07 0 013.64-3.722A9.616 9.616 0 0110 .706c1.814 0 3.487.457 5.02 1.371A10.07 10.07 0 0118.659 5.8C19.553 7.366 20 9.077 20 10.932z" fill="#999"></path></svg></a>'
            }
        } else {
            content += '-'
        }

        content += '</span>'
        + '</div>'
        + '</div>'

    return content
}

MyProductHunt.prototype.createHeadlineBlock = function (product) {
    let content = '<!--Headline-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_xSmall__1eYHj styles_normal__iGf4Q  styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + 'Description'
        + '</div>'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_small__2bw6M styles_normal__iGf4Q styles_format__219oD styles_lineHeight__2RYYy styles_underline__20yPd">'
        + product.meta.description
        + '</div>'
        + '</div>'

    return content
}

MyProductHunt.prototype.createTopicsBlock = function (product) {
    let content = '<!--Topics-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_xSmall__1eYHj styles_normal__iGf4Q  styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + 'Other Topics'
        + '</div>'
        + '<div class="styles_actions__3Sc81" style="flex-wrap:wrap">'
    
        if(product.topics.length > 1) {
            for (let topicid = 1; topicid < product.topics.length; topicid++) {
                const topic = product.topics[topicid];
                content += '<a class="styles_button__-7l7l styles_smallSize__38yI- styles_subtleVariant__14Msp styles_simpleVariant__1SJ3a styles_button__SCCIK" title="' + topic.name + ' (' + topic.followersCount + ')" href="/topics/' + topic.slug + '" target="_blank">'
                    + '<span class="styles_font__2Nqit styles_xSmall__1eYHj styles_semiBold__2IC3i styles_buttonContainer__2c7tT styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
                    + topic.name.replace(" ", "-")
                    + '</span>'
                    + '</a>'
            }
        } else {
            content += '-'
        }

        content += '</div>'
        + '</div>'

    return content
}

MyProductHunt.prototype.createBookmarksBlock = function (product) {
    let content = '<!--Bookmarks-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="styles_font__2Nqit styles_grey__3J1TQ styles_xSmall__1eYHj styles_normal__iGf4Q  styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
        + 'Bookmarks'
        + '</div>'
        + '<div class="styles_actions__3Sc81">'

        if(product.bookmarks.length > 0) {
            for (let bookmarkid = 0; bookmarkid < product.bookmarks.length; bookmarkid++) {
                const bookmark = product.bookmarks[bookmarkid];
                    content += '<a class="styles_button__-7l7l styles_smallSize__38yI- styles_subtleVariant__14Msp styles_simpleVariant__1SJ3a styles_button__SCCIK" title="' + bookmark.storeName + ' (' + bookmark.websiteName + ')" href="' + bookmark.redirectPath + '" target="_blank">'
                        + '<span class="styles_font__2Nqit styles_xSmall__1eYHj styles_semiBold__2IC3i styles_buttonContainer__2c7tT styles_lineHeight__2RYYy styles_underline__20yPd styles_uppercase__2YIgd">'
                        + bookmark.storeName.replace(" ", "-")
                        + '</span>'
                        + '</a>'
            }
        } else {
            content += '-'
        }

        content += '</div>'
        + '</div>'

    return content
}
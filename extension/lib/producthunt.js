"use strict";

function MyProductHunt() {}

MyProductHunt.prototype.BaseUri = "https://www.producthunt.com"
MyProductHunt.prototype.ProductPostBlock = ".styles_item__Dk_nz" // Home page item list
MyProductHunt.prototype.ProductSecondPostBlock = ".styles_item__Dk_nz" // Topics page item list
MyProductHunt.prototype.ExtraContentClassName = "styles_container__4Ydg1"
MyProductHunt.prototype.ImgixSuffixQuery = "?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"

MyProductHunt.prototype.generateUri = function (...params) {
    return [this.BaseUri].concat(params).join('/')
}

MyProductHunt.prototype.generatePostGraphqlQuery = function (slug) {

    return {
        "operationName":"PostPage",
        "variables":{
            "slug":slug
        },
        "query":"query PostPage($slug:String!$badgeTypes:[BadgesTypeEnum!]){post(slug:$slug){id slug name trashedAt isArchived product{id slug passedOnePost ...ProductPageReviewSummaryFragment ...ReviewCardFragment __typename}targetedAd(kind:\"sidebar\"){id ...AdFragment __typename}redirectToProduct{id slug __typename}...PostPageHeaderFragment ...PostPageDescriptionFragment ...PostPageScheduledNoticeFragment ...PostPageLaunchDayNoticeFragment ...PostPageModerationReasonFragment ...PostPageModerationToolsFragment ...PostPageBreadcrumbFragment ...PostPageAboutFragment ...PostPageGalleryFragment ...PostPageBannerFragment ...PostPageCommentPromptFragment ...StructuredDataFromPost ...MetaTags __typename}}fragment MetaTags on SEOInterface{id meta{canonicalUrl creator description image mobileAppUrl oembedUrl robots title type author authorUrl __typename}__typename}fragment StructuredDataFromPost on Post{id structuredData __typename}fragment PostPageHeaderFragment on Post{id name tagline dailyRank createdAt ...PostThumbnail ...PostStatusIcons ...PostVoteButtonFragment ...PostPageGetItButtonFragment ...PostHeaderBadgesFragment ...PostPageActionsFragment __typename}fragment PostStatusIcons on Post{id name productState __typename}fragment PostThumbnail on Post{id name thumbnailImageUuid ...PostStatusIcons __typename}fragment PostVoteButtonFragment on Post{id featuredAt updatedAt createdAt product{id isSubscribed __typename}disabledWhenScheduled hasVoted ...on Votable{id votesCount __typename}__typename}fragment PostPageGetItButtonFragment on Post{id isAvailable productState links{id redirectPath storeName websiteName devices __typename}__typename}fragment PostHeaderBadgesFragment on Post{id badges(first:3 types:$badgeTypes){edges{node{...ProductBadgeFragment __typename}__typename}__typename}__typename}fragment ProductBadgeFragment on Badge{...on TopPostBadge{id ...ProductTopPostBadgeFragment __typename}...on GoldenKittyAwardBadge{id ...ProductGoldenKittyBadgeFragment __typename}...on TopPostTopicBadge{id ...ProductTopPostTopicBadgeFragment __typename}__typename}fragment ProductTopPostBadgeFragment on TopPostBadge{id post{id name __typename}position period date __typename}fragment ProductGoldenKittyBadgeFragment on GoldenKittyAwardBadge{id year position category post{id name __typename}__typename}fragment ProductTopPostTopicBadgeFragment on TopPostTopicBadge{id __typename}fragment PostPageActionsFragment on Post{id slug userId canManage __typename}fragment PostPageDescriptionFragment on Post{id slug tagline description pricingType isArchived createdAt featuredAt ...ShareModalSubjectFragment ...PostThumbnail ...PostPromoCodeFragment product{id slug name tagline logoUuid ...CollectionAddButtonFragment __typename}topics(first:3){edges{node{id slug name __typename}__typename}totalCount __typename}__typename}fragment PostPromoCodeFragment on Post{id promo{text code __typename}__typename}fragment ShareModalSubjectFragment on Shareable{id url ...FacebookShareButtonFragment __typename}fragment FacebookShareButtonFragment on Shareable{id url __typename}fragment CollectionAddButtonFragment on Product{id name description ...ProductItemFragment __typename}fragment ProductItemFragment on Product{id slug name tagline followersCount reviewsCount topics(first:2){edges{node{id slug name __typename}__typename}__typename}...ProductFollowButtonFragment ...ProductThumbnailFragment ...ProductMuteButtonFragment ...FacebookShareButtonV6Fragment ...ReviewStarRatingCTAFragment __typename}fragment ProductThumbnailFragment on Product{id name logoUuid isNoLongerOnline __typename}fragment ProductFollowButtonFragment on Product{id followersCount isSubscribed __typename}fragment ProductMuteButtonFragment on Product{id isMuted __typename}fragment FacebookShareButtonV6Fragment on Shareable{id url __typename}fragment ReviewStarRatingCTAFragment on Product{id slug name isMaker reviewsRating __typename}fragment PostPageScheduledNoticeFragment on Post{id slug name createdAt canCreateUpcomingEvent canViewUpcomingEventCreateBtn upcomingEvent{id canEdit approved __typename}product{id name slug canEdit ...TeamRequestCTAFragment __typename}__typename}fragment TeamRequestCTAFragment on Product{id slug name websiteUrl websiteDomain isClaimed isViewerTeamMember viewerPendingTeamRequest{id __typename}__typename}fragment PostPageLaunchDayNoticeFragment on Post{id slug createdAt isMaker isHunter product{id slug __typename}__typename}fragment PostPageModerationReasonFragment on Post{id moderationReason{reason moderator{id name headline username __typename}__typename}__typename}fragment PostPageModerationToolsFragment on Post{id name slug featuredAt createdAt product{id __typename}...ModerationChangeProductFormPostFragment __typename}fragment ModerationChangeProductFormPostFragment on Post{id name primaryLink{id url __typename}product{id ...ModerationChangeProductFormProductFragment __typename}__typename}fragment ModerationChangeProductFormProductFragment on Product{id name slug tagline cleanUrl websiteUrl ...ProductThumbnailFragment __typename}fragment PostPageBreadcrumbFragment on Post{id slug name product{id slug __typename}__typename}fragment PostPageAboutFragment on Post{id name slug votesCount commentsCount dailyRank weeklyRank createdAt featuredAt canManage product{id name slug tagline reviewersCount reviewsCount followersCount firstPost{id createdAt __typename}...ProductThumbnailFragment ...ProductFollowButtonFragment ...ReviewStarRatingCTAFragment __typename}user{id name username ...UserImage __typename}makers{id name username ...UserImage __typename}topics(first:3){edges{node{id name slug __typename}__typename}__typename}__typename}fragment UserImage on User{id name username avatarUrl __typename}fragment PostPageGalleryFragment on Post{id name media{id originalHeight originalWidth imageUuid mediaType metadata{url videoId platform __typename}__typename}__typename}fragment PostPageBannerFragment on Post{id isArchived featuredAt createdAt product{id slug name postsCount __typename}__typename}fragment AdFragment on Ad{id subject post{id slug name updatedAt commentsCount ...PostVoteButtonFragment __typename}ctaText name tagline thumbnailUuid url __typename}fragment PostPageCommentPromptFragment on Post{id name isArchived commentPrompt ...PostThumbnail __typename}fragment ProductPageReviewSummaryFragment on Product{id name slug postsCount reviewsCount reviewersCount reviewsRating isMaker reviewers(first:3){edges{node{id username name ...UserImage __typename}__typename}__typename}...ReviewCTAPromptFragment __typename}fragment ReviewCTAPromptFragment on Product{id isMaker viewerReview{id __typename}...ReviewCTASharePromptFragment __typename}fragment ReviewCTASharePromptFragment on Product{id name tagline slug ...ProductThumbnailFragment ...FacebookShareButtonFragment __typename}fragment ReviewCardFragment on Product{id name isMaker ...ReviewCTAPromptFragment __typename}"
    }
}

/* TODO: Browser version and sec-ch-ua header data updated - https://wicg.github.io/ua-client-hints/ */
MyProductHunt.prototype.generatePostRequestOptions = function (slug) {
    return {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
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
        bookmarks: item.data.post.links,
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
            + '<span class="my_style_bold">'
            + 'Loading more data'
            + '</span>'
            + '</div>';
}

MyProductHunt.prototype.createHunterAndMakersBlock = function (product) {
    let content = '<!--Hunter and Makers-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="my_style_bold">'
        + 'Hunter'
        + '</div>'
        + '<div class="">'
        + '<a href="/@' + product.hunter.username + '" title="' + product.hunter.name + ' - ' + product.hunter.headline.replace('"', "'") + '" target="_blank">'
        + '<img src="' + product.hunter.avatarUrl + '" alt="" class="styles_image__Je5S2" style="width: 30px; height: 30px;">'
        + '</a>' 
        + '</div>'
        + '</div>'

        +'<div class="styles_columnblock__4Ydg1">'
        + '<div class="my_style_bold">'
        + product.makers.length + ' Makers'
        + '</div>'
        + '<div class="styles_rowinlineblock__4Ydg1">'

        if(product.makers.length > 0) {
            for (let makerid = 0; makerid < product.makers.length; makerid++) {
                const maker = product.makers[makerid];
                content += '<a href="/@' + maker.username + '" title="' + maker.name + ' - ' + maker.headline.replace('"', "'") + '" target="_blank"';
                if(makerid > 0 && product.makers.length > 7) {
                    content +=' style="margin-left:-15px"';
                }
                
                content += '><img src="' + maker.avatarUrl + '" alt="" class="styles_image__Je5S2" style="width: 30px; height: 30px;">'
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
        + '<div class="my_style_bold">'
        + 'Ratings'
        + '</div>'
        + '<div class="">'
        + '<a class="my_style_border" href="/posts/' + product.meta.slug + '/reviews" target="_blank">'
        + '<span class="">'
        + product.rating.ratingCount + ' Voters - ' + product.rating.ratingValue + '/5'
        + '</span>'
        + '</a>'
        + '</div>'
        + '</div>'

    return content
}

MyProductHunt.prototype.createHeadlineBlock = function (product) {
    let content = '<!--Headline-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="my_style_bold">'
        + 'Description'
        + '</div>'
        + '<div class="">'
        + product.meta.description
        + '</div>'
        + '</div>'

    return content
}

MyProductHunt.prototype.createTopicsBlock = function (product) {
    let content = '<!--Topics-->'
        + '<div class="styles_columnblock__4Ydg1">'
        + '<div class="my_style_bold">'
        + 'Other Topics'
        + '</div>'
        + '<div class="" style="flex-wrap:wrap">'
    
        if(product.topics.length > 1) {
            for (let topicid = 1; topicid < product.topics.length; topicid++) {
                const topic = product.topics[topicid];
                content += '<a class="my_style_border" title="' + topic.name + '" href="/topics/' + topic.slug + '" target="_blank">'
                    + '<span class="">'
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
        + '<div class="my_style_bold">'
        + 'Bookmarks'
        + '</div>'
        + '<div class="">'

        if(product.bookmarks.length > 0) {
            for (let bookmarkid = 0; bookmarkid < product.bookmarks.length; bookmarkid++) {
                const bookmark = product.bookmarks[bookmarkid];
                    content += '<a class="my_style_border" title="' + bookmark.storeName + ' (' + bookmark.websiteName + ')" href="' + bookmark.redirectPath + '" target="_blank">'
                        + '<span class="">'
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
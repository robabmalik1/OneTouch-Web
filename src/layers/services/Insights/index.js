import InsightService from "./InsightsService";

const insightService = new InsightService()


export const GetFaceBookInsights = (teamId, filterPeriod, since, until, accountId, responseCB) => {
    let facebookPageInsights = {
        pageImpressions : 0,
        pageaddedfans : 0,
        pageleftfans: 0
    }

    insightService.getFaceBookInsights(teamId, filterPeriod, since, until, accountId).then((res)=>{
        if(res.data.code === 200 & res.data.status === "success" && res.data.result.data.length > 0){

            res.data.result.data.forEach((report, index)=>{
                if (report.name === "page_impressions"){
                    let totalImpressions = getTotal(report.values)
                    facebookPageInsights.pageImpressions = totalImpressions
                }
                if (report.name === "page_fan_adds"){
                    let totalFansAdded = getTotal(report.values)
                    facebookPageInsights.pageaddedfans = totalFansAdded
                }
                if (report.name === "page_fan_removes"){
                    let pageleftfans = getTotal(report.values)
                    facebookPageInsights.pageleftfans = pageleftfans
                }
            })            
            responseCB(null, facebookPageInsights)
        }else{
            responseCB("Failed to get insights", facebookPageInsights)
        }        
    }).catch((err)=>{
        console.log(err)
        responseCB("Failed to get insights", facebookPageInsights)
    })
}

export const GetTwitterInsights = (teamId,  accountId, filterPeriod, responseCB) => {
    let twitterInsights = {
        followerCount : 0,
        followingCount : 0,
        postsCount: 0
    }

    insightService.getTwitterInsights(teamId, accountId, filterPeriod).then((res)=>{
        if(res.data.code === 200 & res.data.status === "success" ){
            twitterInsights.followerCount = res.data.result[0].followerCount
            twitterInsights.followingCount = res.data.result[0].followingCount
            twitterInsights.postsCount = res.data.result[0].postsCount
            responseCB(null, twitterInsights)
        }else{
            responseCB("Failed to get insights", twitterInsights)
        }        
    }).catch((err)=>{
        console.log(err)
        responseCB("Failed to get insights", twitterInsights)
    })
}


export const GetInstagramInsights = (teamId,  accountId, filterPeriod, responseCB) => {
    let instagramInsights = {
        impressions : 0,
        reach : 0,
        profileViews: 0
    }

    insightService.getInstagramInsights(teamId, accountId, filterPeriod).then((res)=>{
        if(res.data.code === 200 & res.data.status === "success" ){
            res.data.result.data.forEach((report, index)=>{
                if (report.name === "impressions"){
                    let impressions = getTotal(report.values)
                    instagramInsights.impressions = impressions
                }
                if (report.name === "reach"){
                    let reach = getTotal(report.values)
                    instagramInsights.reach = reach
                }
                if (report.name === "profile_views"){
                    let profileViews = getTotal(report.values)
                    instagramInsights.profileViews = profileViews
                }
            }) 
            responseCB(null, instagramInsights)
        }else{
            responseCB("Failed to get insights", instagramInsights)
        }        
    }).catch((err)=>{
        console.log(err)
        responseCB("Failed to get insights", instagramInsights)
    })
}

function getTotal(data){
    let totalImpressions  = 0
    data.forEach((dayData, index)=>{
        totalImpressions = totalImpressions+ dayData.value
    })
    return totalImpressions
}

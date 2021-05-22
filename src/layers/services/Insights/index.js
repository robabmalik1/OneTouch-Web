import InsightService from "./InsightsService";

const insightService = new InsightService()


export const GetFaceBookInsights = (teamId, filterPeriod, since, until, accountId, responseCB) => {
    let facebookPageInsights = {
        pageImpressions : 0
    }

    insightService.getFaceBookInsights(teamId, filterPeriod, since, until, accountId).then((res)=>{
        if(res.data.code === 200 & res.data.status === "success" && res.data.result.data.length > 0){

            res.data.result.data.forEach((report, index)=>{
                if (report.name === "page_impressions"){
                    let totalImpressions = getTotalImpressions(report.values)
                    facebookPageInsights.pageImpressions = totalImpressions
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

function getTotalImpressions(data){
    let totalImpressions  = 0
    data.forEach((dayData, index)=>{
        totalImpressions = totalImpressions+ dayData.value
    })
    return totalImpressions
}
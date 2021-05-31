import PublishService from "./PublishService";

//const instagramUploadService = new InstagramUpload()
const publishService = new PublishService()
//todo use UserId from local store to maintain consistency
//const localStore = new LocalStore()

export const PublishPost = async (post, accounts,date,draft, sendResponse) => {
    //post.user_id = localStore.getClientId()
    let responses = []
    var currentDate = new Date();
    console.log("current Date: "+currentDate);
    console.log("Parsed date: "+date);


    if(post.localImage){
        let url = await localUploadImages(post.localImage, post.teamId)
        if(url){
            post.image = url
        }else{
            sendResponse(null)
        }
    }
    if(draft===5){
        createPostData(post,accounts,5,new Date(currentDate + 2*60000));
        sendResponse(responses)
        alert("Saved as draft")
    }else{
    if(((date-currentDate)<2000) ){
        const newDate = +new Date(currentDate + 10*60000);
        console.log(newDate);
        // moment().add(5,'minutes')
        createPostData(post,accounts,1,+new Date(currentDate + 10*60000));
        sendResponse(responses)
        alert("Will be published in a few minutes")
    }
    else{
        createPostData(post,accounts,2,date);
        sendResponse(responses)
        alert("Scheduled")
    }
    }
}

const localUploadImages = async (file, teamId)=>{
    const formData = new FormData();
    formData.append('media', file);
    let res = await publishService.uploadLocalMedia(formData, teamId || 1)
    if(res.data.code === 200){
        if(res.data.mediaDetails){
            return res.data.mediaDetails[0].media_url
        }
        return null
    }
    return null
}

function createPostData(data,accounts,status,date) {
    if(status===1){
    let post = {
        "postType": (data.localImage)?"Image":"Link",
        "message": data.caption,
        "mediaPaths": [
            (data.localImage)?data.image:""
        ],
        "link": (!data.localImage)?data.image:"",//set link if there is no local image selected
        "accountIds": accounts,
        "postStatus": 1,
        "pinBoards": [
            {
                "accountId": 0,
                "boardId": [
                    ""
                ]
            }
        ]
    }
    return publishService.publishPosts(post, data.teamId || 1)
    }
    else if(status===2){
        let post = {
            "postInfo": {
                "postType": (data.localImage)?"Image":"Link",
                "description": data.caption,
                "mediaUrl": [
                    (data.localImage)?data.image:""
                ],
                "shareLink": "",
                "postingSocialIds": accounts,
                //[{"accountType": 2,  "accountId": 8}]
                "scheduleCategory": 0,
                "pinBoards": [{"accountId": 0,"boardId": [""]}],
                "moduleName": "",
                "teamId": data.teamId,
                "moduleValues": [""],
                "scheduleStatus": 1,
                "normalScheduleDate": date,
                "daywiseScheduleTimer": []
            }
        }
        return publishService.schedulePosts(post)
    }
    else if(status===5){
        let post = {
            "postType": (data.localImage)?"Image":"Link",
            "message": data.caption,
            "mediaPaths": [
                (data.localImage)?data.image:""
            ],
            "link": (!data.localImage)?data.image:"",//set link if there is no local image selected
            "accountIds": accounts,
            "postStatus": 0,
            "pinBoards": [
                {
                    "accountId": 0,
                    "boardId": [
                        ""
                    ]
                }
            ]
        }
        return publishService.publishPosts(post, data.teamId || 1)
    }
}

export const getScheduledPosts =(pageId, sendResponse)=>{
    publishService.getScheduledPosts(pageId).then((res)=>{
        if(res.status === 200){
            if(res.data.postContents && res.data.postContents.length>0 && res.data.scheduleDetails && res.data.scheduleDetails.length > 0){
                sendResponse("",res.data)
            }else{
                sendResponse("No posts founded")
            }
        }else{
            sendResponse("Failed to get scheduled posts")
        }
    }).catch((err)=>{
        alert(err)
        sendResponse("Failed to get scheduled posts")
    })
}

/*
function postInstagramBasic(data) {
    console.log("postInsta")
    instagramUploadService.postBasic(data).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}
 */
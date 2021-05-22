import InstagramUpload from "../../../layers/services/InstagramUpload";
import LocalStore from "../../../layers/config/localStore";

const instagramUploadService = new InstagramUpload()
//todo use UserId from local store to maintain consistency
const localStore = new LocalStore()

export const PublishPost = (post, accounts) => dispatch => {
    alert(post.user_id);
    // post.user_id = localStore.getClientId()
    accounts.forEach((value) => {
        switch (value) {
            case "IB":
                postInstagramBasic(post)
                break
            default:
                console.log("Invalid Account")
        }
    })
}

function postInstagramBasic(data) {
    console.log("postInsta")
    instagramUploadService.postBasic(data).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}
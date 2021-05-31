import {HTTP_PUBLISH} from "layers/lib/HTTPService";
import LocalStore from "../../config/localStore";

import CONSTANTS from "../../config/constants";

const localStore = new LocalStore()

const  GET_TASKS = CONSTANTS.TASKS.GET_TASKS
const  UPDATE_TASK= CONSTANTS.TASKS.UPDATE_TASK
const  ASSIGN_TASK= CONSTANTS.TASKS.ASSIGN_TASK


export default class TasksService {
    getTasks(teamId, pageId ) {
        let query = "?teamId="+teamId+"&pageId"+pageId
        return HTTP_PUBLISH.get(GET_TASKS+query, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    updateTaskStatus(taskId, status, teamId) {
        let query = "?teamId="+teamId+"&taskId"+taskId+"&status"+status
        return HTTP_PUBLISH.get(UPDATE_TASK+query, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    assignTask(taskId, assigningUserId, teamId) {
        let query = "?teamId="+teamId+"&taskId"+taskId+"&assigningUserId"+assigningUserId
        return HTTP_PUBLISH.put(ASSIGN_TASK+query, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }
}
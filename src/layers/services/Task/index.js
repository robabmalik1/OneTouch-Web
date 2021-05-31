import TaskService from "./TaskService";

const taskService = new TaskService()


/*
 *         in, description, name , type , name
*/
export const GetTasks = ( teamId, pageId ) => {

    taskService.getTasks(teamId, pageId).then((res)=>{
        if(res.data.code === 200 & res.data.status === "success" ){
            responseCB(null, )
        }else{
            responseCB("Failed to get insights")
        }        
    }).catch((err)=>{
        console.log(err)
        responseCB("Failed to get insights")
    })
}

export const AssignTask = ( taskId, assigningUserId, teamId , responseCB) => {

    taskService.assignTask(taskId, assigningUserId, teamId).then((res)=>{
        if(res.data.code === 200 & res.data.status === "success" ){
            responseCB(null, )
        }else{
            responseCB("Failed to get insights")
        }        
    }).catch((err)=>{
        console.log(err)
        responseCB("Failed to get insights")
    })
}

export const UpdateTaskStatus = ( taskId, status, teamId , responseCB) => {

    taskService.updateTaskStatus(taskId, status, teamId).then((res)=>{
        if(res.data.code === 200 & res.data.status === "success" ){
            responseCB(null, )
        }else{
            responseCB("Failed to get insights")
        }        
    }).catch((err)=>{
        console.log(err)
        responseCB("Failed to get insights")
    })
}
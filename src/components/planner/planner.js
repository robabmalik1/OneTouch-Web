import React, { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import {getScheduledPosts} from "layers/services/Publish"
import moment from 'moment'
import SnackBar from "../misc/snackbar";
import { func } from "prop-types"
import ScheduledJobModal from "./scheduled-job-model"
const localizer = momentLocalizer(moment);

function Planner(props){
    const [responseMsg,setResponse] = useState(null);
    const [scheduleDetails, setScheduleDetails] = useState([])
    const [postContents, setPostContents] = useState([])
    const [events, setEvents] = useState([])
    const [selectedJobData , setSelectedJobData] = useState(null)
    const [refresh,setRefresh]=useState(false);

    useEffect(() => {
        getScheduledPosts(1, responseHandler)
    }, []);

    const responseHandler = (msg, data)=>{
        if(!msg){
            setPostContents(data.postContents)
            setScheduleDetails(data.scheduleDetails)
        }
        else{
            setResponse(msg)

        }
    }

    const createEvents = ()=>{
        let eventObjs = []
        scheduleDetails.forEach((value, index)=>{
            let postContent = getPostDetail(value.mongo_schedule_id)
            if(postContent){
                eventObjs.push({
                    'title': postContent.description || postContent.normalScheduleDate,
                    'allDay': true,
                    'start': value.one_time_schedule_date,
                    'end': value.one_time_schedule_date,
                    'data':{
                        scheduleDetails: value,
                        postContents: postContent
                    }
                  })
            }            
        })
        setEvents(eventObjs)
    }

    const ifDeleted =()=>{
        // setScheduleDetails(null)
        getScheduledPosts(1, responseHandler);
        setRefresh(!refresh);
        setSelectedJobData(null)
        // createEvents()
    }

    const getPostDetail = (postId)=>{
        let postDetail
        postContents.forEach((value, index)=>{
            if (value._id === postId){
                postDetail = value
            }
        })
        return postDetail
    }

    const eventClicked =(props)=>{
        setSelectedJobData(props.data)
    }
        return (
            <div className="mt-4 ml-2 mr-2">
                {
                    (scheduleDetails.length > 0 && events.length <= 0)?createEvents():<></>
                }
                {
                    (responseMsg)?
                        <SnackBar error={responseMsg} clear={() => setResponse(null)}/>
                        :
                        <></>
                }
                {(refresh || !refresh) &&
                <Calendar
                    localizer={localizer}
                    events={events}
                    events={events}
                    onSelectEvent={eventClicked}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '90vh' }}
                />
                }
                <ScheduledJobModal data={selectedJobData} clearSelectedJob ={setSelectedJobData} isDeleted={()=>ifDeleted()}/>
            </div>
        )
}

export default Planner
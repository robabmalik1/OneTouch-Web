import React, {useEffect, useState} from 'react'
import axios from "axios";
import LocalStore from "../../layers/config/localStore";
import {
    Card, CardContent, CardHeader,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const localStore = new LocalStore();
function createData(name, topic, audience) {
    return { name, topic, audience };
}


function Marketing (props){
    const [adAccount,setAdAccounts]=useState(null);
    const [adac,setadac]=useState(null)
    const [data,setData]=useState(null)
    const [type,setType]=useState(null)
    const [interests,setInterests]=useState(null)
    const [rows,setRows]=useState([])
    const [campaings,setCampaigns] = useState(null);
    const getAdAccounts = ()=>{
        axios.get(`http://localhost:6100/ads/getAdAccount?teamId=${localStore.getCurrTeam()}&accountId=1`,{headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }})
            .then((res)=>{
                setAdAccounts(res.data)
                setadac(res.data.result[0].act_id.split("_")[1])
                return res.data.result[0].act_id;
            })
            .then((act)=>{
                getCampaigns(act)
                // getAds(act);
            })
    }

    const getAds = (act) => {
        axios.get(`http://localhost:6100/ads/queryAdAccount?teamId=${localStore.getCurrTeam()}&accountId=1&act_id=${act}&endpoint=adsets`,{headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }})
            .then((res)=>{
                setData(res.data)
            })
    }

    const getCampaigns = (act) => {
        axios.get(`http://localhost:6100/ads/queryAdAccount?teamId=${localStore.getCurrTeam()}&accountId=1&act_id=${act}&endpoint=campaigns`,{headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }})
            .then((res)=>{
                setCampaigns(res.data)
            })
    }

    const getAdsInterests = (type) => {
        axios.get(`http://localhost:6100/ads/getAdInterests?teamId=${localStore.getCurrTeam()}&accountId=1&type=${type}`,{headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }})
            .then((res)=>{
                // res.data.result.data.map((interest,index)=>{
                //     rows.push(createData(interest.name, interest.topic, interest.audience_size ))
                // })

                // console.log(rows)
                setInterests(res.data)
            })
    }

    useEffect(()=>{
        getAdAccounts()
    },[])

    const classes = useStyles();

    // const rows = [];


    return (
        <>
            <Card className={"w-full ml-6"}>
                <CardHeader className={"text-lg bg-blue"} component={"h1"} title={"Ad Account"} />
                <CardContent>
                    <TableContainer className={"w-full"} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Ad Account Name</TableCell>
                                    <TableCell align="center">Account Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

            {adAccount &&
            adAccount.result.map((res,index)=>{
                return(
                <>


                                            <TableRow key={res.act_id} >
                                                <TableCell className={"text-lg"} align={"center"} component="th" scope="row">
                                                    {res.name}
                                                </TableCell>
                                                <TableCell className={"text-lg"} align="center">{res.act_id}</TableCell>
                                            </TableRow>
                </>
                )
            })

            }

                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>
            </Card>

            <Card className={"w-full ml-6"}>
                <CardHeader className={"text-lg bg-blue"} component={"h1"} title={"Campaigns"} />
                <CardContent>
                    <TableContainer className={"w-full"} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Campaign Id</TableCell>
                                    <TableCell align="center">Campaign Name</TableCell>
                                    <TableCell align="center">Objective</TableCell>
                                    <TableCell align="center">Effective</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

            {campaings &&
            <>
                <TableRow key={campaings.result.id} >
                    <TableCell className={"text-lg"} align={"center"} component="th" scope="row">
                        {campaings.result.id}
                    </TableCell>
                    <TableCell className={"text-lg"} align="center">{campaings.result.name}</TableCell>
                    <TableCell className={"text-lg"} align="center">{campaings.result.effective_status}</TableCell>
                    <TableCell className={"text-lg"} align="center">{campaings.result.name}</TableCell>
                </TableRow>
            </>

            }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>
            </Card>


            <Card className={"w-full ml-6"}>
                <CardHeader className={"text-lg bg-blue"} component={"h1"} title={"Ad Interests"} />
                <CardContent>
                    <div className={"w-full"}>
                    <TextField
                        className={"p-2 text-lg"}
                        value={type}
                        onChange={(e)=>setType(e.target.value)}
                        placeholder={"Interest"}
                    />
                    <Button className={"bg-blue"} onClick={()=>getAdsInterests(type)}>Search Ad Interests</Button>
                    </div>


                    <TableContainer className={"w-full"} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Topic</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Audience Size</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {interests && interests.result.data.map((row) => (
                                    <TableRow key={row.name} >
                                        <TableCell className={"text-lg"} component="th" scope="row">
                                            {row.topic}
                                        </TableCell>
                                        <TableCell className={"text-lg"} align="center">{row.name}</TableCell>
                                        <TableCell className={"text-lg"} align="center">{row.audience_size}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>
            </Card>

            {data && JSON.stringify(data)}
        <Button className={"bg-blue p-16 m-16"} href={"https://web.facebook.com/ads/manager/accounts/?act="+adac} >Go to Ads manager</Button>
        </>

    )
}


export default Marketing;


import React, {useState} from 'react';
import {TextField,Button} from "@material-ui/core";
import {
    useParams
} from "react-router-dom";
import {resPassword} from "../../../../redux/ducks/auth/login/loginOps";
import {useDispatch} from "react-redux";
function Forgot(props) {
    const [password,setPassword]=useState('');
    const {email}=useParams();
    const dispatch = useDispatch();
    return (
        <div>
            <TextField label={"Enter New Password"} value={password} onChange={e=>setPassword(e.target.value)}>

            </TextField>
            <Button label={"Submit"} onClick={()=>{dispatch(resPassword(email,password))}}>Reset</Button>
        </div>
    );
}

export default Forgot;
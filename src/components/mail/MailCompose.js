import React, {useState} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    TextareaAutosize, FormGroup
} from '@material-ui/core';
import useForm from '../misc/useForm';
import MailAttachment from './MailAttachment';
import {useDispatch} from "react-redux";
import {sendMessage} from "./store/actions/sendActionCreators";
import filesize from "filesize";
import Dropzone, {useDropzone} from "react-dropzone";

function MailCompose()
{
    const [openDialog, setOpenDialog] = useState(false);
    const {form, handleChange,resetForm} = useForm({
        to     : '',
        subject: '',
        message: ''
    });
    const [attachments,setAttachments]=useState([]);
    const [dropzoneActive,setDropzoneActive]=useState(false);
    let dropzoneRef;
    const dispatch = useDispatch();

    function handleOpenDialog()
    {
        setOpenDialog(true);
    }

    function handleCloseDialog()
    {
        setOpenDialog(false);
    }

    function handleDelete()
    {
        resetForm();
        setOpenDialog(false);
    }

    function handleSubmit(ev)
    {
        ev.preventDefault();

        dispatch(sendMessage(form.to,form.subject,form.message,attachments));
        setOpenDialog(false);
        resetForm();
        setAttachments([]);
    }

    const onDrop=(files)=> {

        setDropzoneActive(false);
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                setAttachments([
                        ...attachments,
                        {
                            name: files[i].name,
                            size: files[i].size,
                            type: files[i].type,
                            blob: reader.result
                        }
                    ]
                )
                console.log(files[i].name);
            };
            console.log(attachments)
            reader.readAsBinaryString(files[i]);
        }
    }

    const {getRootProps} = useDropzone({onDrop})

    const dropzoneOverlayStyle = {
        position: 'relative',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '1em 0',
        background: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        color: '#fff'
    };

    const removeAttachment=(file)=> {
        setAttachments(attachments.filter(item => item !== file));
}


    return (
        <div className="p-24">

            <Button
                variant="contained"
                color="primary"
                className="w-full"
                onClick={handleOpenDialog}
            >
                COMPOSE
            </Button>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <AppBar position="static">
                    <Toolbar className="flex w-64">
                        <Typography variant="subtitle1" color="inherit">
                            New Message
                        </Typography>
                    </Toolbar>
                </AppBar>

                <FormGroup>
                    <Dropzone
                        disableClick
                        // style={{position: "relative"}}
                        onDrop={onDrop}
                        onDragEnter={() => {
                            setDropzoneActive(true)
                        }}
                        onDragLeave={() => setDropzoneActive(false)}
                        ref={(node) => {
                            dropzoneRef = node;
                        }}
                    >
                        {()=>{
                            return(
                                <div {...getRootProps()}>
                                    {dropzoneActive &&
                                    <div style={dropzoneOverlayStyle}>
                                        Drag and drop files here to attach them to your email...
                                    </div>
                                    }
                                </div>
                            )
                        }
                        }
                    </Dropzone>
                </FormGroup>

                <form noValidate onSubmit={handleSubmit} className="flex flex-col">
                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label="To"
                            autoFocus
                            id="to"
                            name="to"
                            value={form.to}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Subject"
                            id="subject"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            id="message"
                            name="message"
                            onChange={handleChange}
                            value={form.message}
                            label="Message"
                            type="text"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />

                        <div className="pt-8">
                            {attachments &&
                            attachments.map((at,index)=>{
                               return( <>
                                <MailAttachment onRemove={()=>{
                                    return(
                                    <IconButton>
                                        <Icon className="text-16" onClick={()=>{removeAttachment(at)}} >close</Icon>
                                    </IconButton>
                                    )
                                }
                                    }
                                                fileName={at.name} size={filesize(at.size)} />
                                </>
                               )
                            })
                            }

                        {/*    <MailAttachment fileName="attachment-1.jpg" size="350 kb"/>*/}
                        </div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button variant="contained" color="primary" type="submit">
                                Send
                            </Button>
                            <IconButton onClick={()=>{setDropzoneActive(true)}} >
                                <Icon>attach_file</Icon>
                            </IconButton>
                        </div>
                        <IconButton onClick={handleDelete}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default MailCompose;

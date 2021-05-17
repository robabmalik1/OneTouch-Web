import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Typography,
    Checkbox,
    ListItem,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    List,
    ListItemText, Divider, Slide, FormGroup, FormControl, ButtonGroup,TextareaAutosize
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import renderHtml from 'react-render-html'
import Dropzone, {useDropzone} from 'react-dropzone'
import filesize from 'filesize'
import {makeStyles} from '@material-ui/styles';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import _ from '@lodash';
import * as Actions from '../store/actions/index';
import MailChip from '../MailChip';
import {getHeader} from "../messageMethods";
import Moment from 'react-moment';
import {downloadAttachment, getMessage} from "../store/actions/messageActionCreators";
import {reply} from '../store/actions/sendActionCreators';
import IconButton from "@material-ui/core/IconButton";

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles(theme => ({
    mailItem: {
        borderBottom: '1px solid  ' + theme.palette.divider,

        '&.unread'  : {
            background: 'rgba(0,0,0,0.03)'
        },
        '&.selected': {
            '&::after': {
                content        : '""',
                position       : 'absolute',
                left           : 0,
                display        : 'block',
                height         : '100%',
                width          : 3,
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MailListItem = (props) => {
    const dispatch = useDispatch();
    const selectedMailIds = useSelector(({mailApp}) => mailApp.mails.selectedMailIds);
    const labels = useSelector(({mailApp}) => mailApp.labels);

    const classes = useStyles(props);
    const toPath = pathToRegexp.compile(props.match.path);
    const checked = selectedMailIds.length > 0 && selectedMailIds.find(id => id === props.mail.id) !== undefined;

    const messageBody = useSelector(state=>state.mailApp.message)
    // useEffect(()=>{
    //
    // },[])

    //Dialog
    let dropzoneRef;

    const dropzoneOverlayStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '2.5em 0',
        background: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        color: '#fff'
    };

    const [open, setOpen] = useState(false);
    const [attachments,setAttachments] = useState([]);
    const [Reply,setReply]=useState("");
    const [dropzoneActive,setDropzoneActive]=useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setInitialState=()=> {
        setReply('');
        setAttachments([]);
        setDropzoneActive(false);
    }

    const onSendReply=(e)=> {
        e.preventDefault();
        dispatch(reply(messageBody.message, Reply, attachments));
        setInitialState();
    }

    const removeAttachment=(file)=> {
        setAttachments(attachments.filter(item => item !== file))
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
            };
            reader.readAsBinaryString(files[i]);
        }
    }

    const {getRootProps} = useDropzone({onDrop})


    return (
        <>
        <ListItem
            dense
            button
            onClick={() => {
                dispatch(getMessage(props.mail.id))
                setOpen(true);
            }
            }
            className={clsx(classes.mailItem, checked && "selected", !props.mail.read && "unread", "py-16 pl-0 pr-8 sm:pl-8 sm:pr-24")}>

            <Checkbox
                tabIndex={-1}
                disableRipple
                checked={checked}
                onChange={() => dispatch(Actions.toggleInSelectedMails(props.mail.id))}
                onClick={(ev) => ev.stopPropagation()}
            />

            <div className="flex flex-1 flex-col relative overflow-hidden">

                <div className="flex items-center justify-between px-16 pb-8">
                    <div className="flex items-center">
                        {/*{props.mail.from.avatar ? (*/}
                        {/*    <Avatar className="mr-8" alt={props.mail.from.name} src={props.mail.from.avatar}/>*/}
                        {/*) : (*/}
                            <Avatar className={clsx(classes.avatar, "mr-8")}>
                                {getHeader(props.mail, 'From')[0]}
                                {/*{props.mail.from.name[0]}*/}
                            </Avatar>
                        {/*)}*/}
                        <Typography variant="h5" >{getHeader(props.mail, 'From')}</Typography>
                    {/*    {props.mail.from.name}*/}
                    </div>
                    <Typography variant="subtitle1">
                        <Moment locale={'ru'} fromNow date={getHeader(props.mail, 'Date')}/>
                    </Typography>
                {/*    {props.mail.time}*/}
                </div>

                <div className="flex flex-col px-16 py-0">
                    <Typography variant={"h4"} className="truncate">{getHeader(props.mail, 'Subject')}</Typography>
                    <Typography  variant={"h5"} color="textSecondary" className="truncate">{_.truncate(props.mail.snippet.replace(/<(?:.|\n)*?>/gm, ''), {'length': 300})}</Typography>
                {/*    message instead of snipper*/}
                </div>

                <div className="flex justify-end">
                    {props.mail.isUnread &&
                        <MailChip className="mr-4" title={"Unread"} color={"red"} key={1}/>
                    }
                </div>
            </div>
        </ListItem>

        {/*Dialog*/}

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={"relative"}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        {/*<Typography variant="h6" className={classes.title}>*/}
                        {/*    Sound*/}
                        {/*</Typography>*/}
                        {/*<Button autoFocus color="inherit" onClick={handleClose}>*/}
                        {/*    save*/}
                        {/*</Button>*/}
                    </Toolbar>
                </AppBar>
                <List>
                    {(!messageBody.isLoading && messageBody.message)?
                        <>
                    <div className={"ml-4"}>
                        <span><i>From:</i> {getHeader(messageBody.message, 'From')}</span>
                        <hr style={{margin: '5px'}}/>
                        <span><i>To:</i> {getHeader(messageBody.message, 'To')}</span>
                        <hr style={{margin: '5px'}}/>
                        <span><i>Subject:</i> {getHeader(messageBody.message, 'Subject')}</span>
                    </div>
                    {/*<ListItem button>*/}
                    {/*    <ListItemText primary="Phone ringtone" secondary="Titania" />*/}
                    {/*</ListItem>*/}
                    <Divider className={"mb-16"} />
                    <div style={{backgroundColor: "lightblue"}}>
                    {renderHtml(messageBody.message.payload.htmlBody)}
                    </div>
                    {/*Attachments*/}

                    {messageBody.message.payload.attachments.length ? (
                            <div>
                                <hr/>
                                <ButtonGroup vertical>
                                    {messageBody.message.payload.attachments.map((attachment, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => dispatch(downloadAttachment(messageBody.message.id, attachment))}
                                        >
                                            <i className="fa fa-cloud-download" aria-hidden="true"/> {attachment.filename}
                                            ({filesize(attachment.body.size)})

                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </div>
                        ) :
                        (
                            null
                        )}

                        {/*Reply*/}

                            <form className={"mt-16 ml-8"} onSubmit={onSendReply}>
                                <FormGroup>
                                    <Dropzone
                                        disableClick
                                        // style={{position: "relative"}}
                                        onDrop={onDrop}
                                        onDragEnter={() => {
                                            alert("Dropzone is active")
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
                                                <TextareaAutosize
                                                    aria-label="message"
                                                    name={"message"}
                                                    value={Reply}
                                                    onChange={e=>setReply(e.target.value)}
                                                    rowsMin={3}
                                                    cols={150}
                                                    placeholder="Write your reply here" />
                                            </div>
                                            )
                                        }
                                        }
                                    </Dropzone>
                                </FormGroup>

                                <List >
                                    {attachments &&
                                    attachments.map((file, index)=>{
                                        return(
                                            <ListItem key={index}>
                                                {file.name} ({filesize(file.size)})
                                                <Button
                                                    onClick={() => removeAttachment(file)}
                                                    className='btn-link badge close'
                                                >
                                                    &times;
                                                </Button>
                                            </ListItem>
                                        )
                                        })

                                    }

                                </List>


                                <Button variant={"outlined"}
                                        className='ml-4'
                                        onClick={() => {
                                    console.log("clicked")
                                            setDropzoneActive(true)
                                    dropzoneRef.open()
                                }}>
                                    Attach Files
                                </Button>

                                <Button
                                    type='submit'
                                    className='pull-right ml-4'
                                    bsStyle='primary'
                                    variant={"outlined"}
                                    // style={{marginBottom: '100px'}}
                                >
                                    Reply
                                </Button>
                            </form>


                        </>:
                        <h1>Loading</h1>
                    }


                </List>
            </Dialog>
        </>
    );
};

export default withRouter(MailListItem);

import React, { useEffect, useState } from 'react';
import {
    AppBar,
    // Avatar,
    // Button,
    Card,
    CardActions,
    CardContent,
    // CardHeader,
    // Divider,
    Icon,
    // IconButton,
    // Input,
    // List,
    // ListItem,
    // ListItemText,
    // Paper,
    // Toolbar,
    Typography
} from '@material-ui/core';
import AnimateGroup from '../../../../misc/animateGroup/animateGroup';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";

function TimelineTab(props) {
    const [data, setData] = useState({
        posts: [
            {
                'id': '1',
                'user': {
                    'name': 'Garry Newman',
                    'avatar': 'assets/images/avatars/garry.jpg'
                },
                // 'message': 'Remember the place we were talking about the other night? Found it!',
                'time': '32 minutes ago',
                'type': 'post',
                'like': 5,
                'share': 21,
                // 'media': {
                //     'type': 'image',
                //     'preview': 'assets/images/profile/morain-lake.jpg'
                // },
            },
        ]
    });

    useEffect(() => {
        // axios.get('/api/profile/timeline').then(res => {
        //     setData(res.data);
        // });
    }, []);

    if (!data) {
        return <h1>Nothing to Display</h1>;
    }
    const { selectedAccounts, img, caption } = props;

    return (
        <div className="md:flex ">
            {/* max-w-2xl */}

            <div className="flex flex-col flex-1 md:pr-32">

                <AnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >

                    {data.posts.map((post) => (
                        <Card key={post.id} className="mb-32 overflow-hidden">
                            <CardContent className="p-12 ml-2">
                                {!img && (
                                    // {!imageUrl &&
                                    <Skeleton className="ml-4" height={360} width={550} />
                                    // }

                                )}

                                {img && (
                                    <img
                                        src={img}
                                        alt="post"
                                        width="100%"
                                        style={{ maxWidth: '900px' }}
                                    />
                                )}




                            </CardContent>

                            <CardActions style={{ display: 'block' }}>
                                <div className="flex ml-12">
                                    {/* <Avatar aria-label="Recipe" src={post.user.avatar} /> */}

                                    <span>
                                        {/*
                                        <Typography className="inline font-medium mr-4" color="primary" paragraph={false}>
                                            {(!selectedAccounts || selectedAccounts.length === 0) && <Skeleton className=" mt-2" height={15} width={`100px`} />}
                                            {selectedAccounts && selectedAccounts[0]}
                                        </Typography>
                                        */}
                                        {post.type === 'post'}

                                    </span>
                                </div>
                                <Typography component="p" className="ml-16 mt-3">
                                    Just Now
                                </Typography>

                                {!caption &&
                                    <Skeleton className=" mb-16 mt-12 " height={15} width={`300px`} />
                                }
                                {caption && (
                                    <Typography component="p" className="mb-16 mt-12 ml-12">
                                        {caption}
                                    </Typography>
                                )}

                            </CardActions>

                            <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>

                                {post.comments && post.comments.length > 0 && (
                                    <div className="">
                                        <div className="flex items-center">
                                            <Typography>
                                                {post.comments.length} comments
                                                </Typography>
                                            <Icon className="text-16 ml-4" color="action">keyboard_arrow_down</Icon>
                                        </div>

                                        {/* <List>
                                            {post.comments.map((comment) => (
                                                <div key={comment.id}>
                                                    <ListItem className="px-0">
                                                        <Avatar alt={comment.user.name} src={comment.user.avatar} className="mr-16" />
                                                        <ListItemText
                                                            primary={(
                                                                <div>
                                                                    <Typography className="inline font-medium" color="initial" paragraph={false}>
                                                                        {comment.user.name}
                                                                    </Typography>
                                                                    <Typography className="inline ml-4" variant="caption">
                                                                        {comment.time}
                                                                    </Typography>
                                                                </div>
                                                            )}
                                                            secondary={comment.message}
                                                        />
                                                    </ListItem>
                                                    <div className="flex items-center ml-56 mb-8">
                                                        <Link to="#" className="mr-8">Reply</Link>
                                                        <Icon className="text-14 cursor-pointer">flag</Icon>
                                                    </div>
                                                </div>
                                            ))}
                                        </List> */}
                                    </div>
                                )}

                                {/* <div className="flex flex-auto">
                                    <Avatar src="assets/images/avatars/profile.jpg" />
                                    <div className="flex-1 pl-8">
                                        <Paper elevation={0} className="w-full mb-16">
                                            <Input
                                                className="p-8 w-full border-1"
                                                classes={{ root: 'text-13' }}
                                                placeholder="Add a comment.."
                                                multiline
                                                rows="6"
                                                margin="none"
                                                disableUnderline
                                            />
                                        </Paper>
                                        <Button className="normal-case" variant="contained" color="primary" size="small">Post Comment</Button>
                                    </div>
                                </div> */}
                            </AppBar>
                        </Card>
                    )
                    )}
                </AnimateGroup>

            </div>

            {/* <div className="flex flex-col md:w-320">
                <AnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >

                </AnimateGroup>
            </div> */}
        </div>
    );
}

export default TimelineTab;

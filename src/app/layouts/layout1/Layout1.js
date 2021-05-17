import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import NavbarWrapperLayout1 from './components/NavbarWrapperLayout1';
import clsx from 'clsx';
import Scrollbars from '../../../components/misc/scrollbars/scrollbars';
import Message from '../../../components/misc/message/message';



const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        '&.boxed': {
            maxWidth: 1280,
            margin: '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.scroll-body': {
            '& $wrapper': {
                height: 'auto',
                flex: '0 0 auto',
                overflow: 'auto'
            },
            '& $contentWrapper': {},
            '& $content': {}
        },
        '&.scroll-content': {
            '& $wrapper': {},
            '& $contentWrapper': {},
            '& $content': {}
        },
        '& .navigation': {
            '& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut
                })
            },
        }
    },
    wrapper: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: '1 1 auto',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 3,
        overflow: 'hidden',
        flex: '1 1 auto'
    },
    content: {
        position: 'relative',
        display: 'flex',
        overflow: 'auto',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex: 2
    }
}));

function Layout1(props) {
    const config = useSelector(({ fuse }) => fuse.settings.defaults.layout.config);

    const classes = useStyles(props);


    // console.warn('FuseLayout:: rendered');

    return (
        <div id="fuse-layout" className={clsx(classes.root, config.mode, ' fullwidth scroll-content')}>

            < div className="flex flex-1 flex-col overflow-hidden relative" >
                < div className={classes.wrapper} >
                    <NavbarWrapperLayout1 />

                    < div className={classes.contentWrapper} >

                        < Scrollbars className={classes.content} scrollToTopOnChildChange >

                            {/* < FuseSuspense > */}
                            {/* {renderRoutes(routes)} */}

                            {/* </FuseSuspense > */}
                            {props.children}
                        </Scrollbars >

                    </div >
                </div >

            </div >





            < Message />
        </div >
    )
}

export default Layout1;

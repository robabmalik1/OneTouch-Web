import {combineReducers} from 'redux';
import mails from './mails.reducer';
import mail from './mail.reducer';
import folders from './folders.reducer';
import labels from './labels.reducer';
import filters from './filters.reducer';
import gapi from './gapiLoadReducer';
import auth from './authorizeReducer';
import messages from './messageListReducer';
import message from './messageReducer'

const reducer = combineReducers({
    gapi,
    auth,
    messages,
    message,
    mails,
    mail,
    folders,
    labels,
    filters
});

export default reducer;

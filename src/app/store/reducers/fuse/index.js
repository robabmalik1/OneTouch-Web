import { combineReducers } from 'redux';
import navigation from './navigation.reducer';
import settings from './settings.reducer';
import navbar from './navbar.reducer';
import message from './message.reducer';
import routes from './routes.reducer';

const fuseReducers = combineReducers({
    navigation,
    settings,
    navbar,
    message,
    routes
});

export default fuseReducers;

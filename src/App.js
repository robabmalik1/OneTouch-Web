
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {blueGrey, lightBlue} from '@material-ui/core/colors'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import LocalStore from "./layers/config/localStore";
import jwt_decode from "jwt-decode";
import { actions } from "./redux/ducks/auth/login/loginDuck";
import { logoutUser } from "./redux/ducks/auth/login/loginOps";
import Connect from './components/user-profiling/connect/connect';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayUtils from '@date-io/dayjs';
import '@fake-db'
// Components
import Marketing from './components/marketing/marketing';
import Login from './components/user-profiling/auth/login/login';
import Register from './components/user-profiling/auth/register/register';
import Publish from './components/content-posting/publish/publish';
import Analytics from './components/analytics/AnalyticsDashboardApp';
import ManageTeams from "./components/teams/details/manageTeams";
// import Content from './components/content-library/contentLib';
import Chat from './components/teams/chat/Chat';
import Call from './components/teams/call/call';
// import ContentLib from './components/content-library/contentLib';
import PublishedPosts from './components/feed/Feed';
import Settings from './components/authorized-user/settings';
// import Profile from './components/content-posting/profile/ProfilePage';
import Planner from './components/planner/planner';
import Wall from './components/feed/wall/wall';

import PrivateRoute from "./components/misc/PrivateRoute";

// import Hello from "./components/misc/hello";
import { StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/styles';
import { create } from 'jss';

import history from '@history';
import jssExtend from 'jss-extend';

//css
import "./styles/css/main.css";
import Forgot from "./components/user-profiling/auth/forgotPassword/forgot";
import LoginSuccess from "./components/user-profiling/auth/login/loginSuccess";
import PlatformRedirect from "./components/user-profiling/connect/platformRedirect";
import Live from "./components/livestream/live";
import MailApp from "./components/mail/MailApp";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point'),
});


const generateClassName = createGenerateClassName();
const localStore = new LocalStore();
// Check for token to keep user logged in
 if (localStore.getToken()) {
  // Set auth token header auth
  const token = localStore.getToken();
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    //Redirect to login

    window.location.href = "./Login";
  }else{
    store.dispatch(actions.loginSuccess(decoded.token));
  }
}


const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary: {
      main: "#3C4252",
    },
    facebook: {
      main: blueGrey[500],
    },
    secondary:{
      main: lightBlue[500],
    }
  }
})

function App() {
  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DayUtils}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <Route exact path="/">
                <Redirect to="/Login" />
              </Route>
              {/*<Route path={"*"} exact={true} component={Hello} />*/}

              {/*<Redirect from={"*"} to={"/404"} />*/}
              <Route path="/Register" component={Register} />
              <Route path="/Login" component={Login} />
              <Route path="/Reset/:email" component={Forgot} />
              <Route path="/LoginSuccess/:access_token" component={LoginSuccess} />

              <Switch>
                <PrivateRoute path="/PR" component={PlatformRedirect} />
                <PrivateRoute path="/Live" component={Live} />
                <PrivateRoute path="/Mail/:handle" component={MailApp} />
                <PrivateRoute path="/Connect/:handle" component={Connect} />
                <PrivateRoute path="/Publish" component={Publish} />
                <PrivateRoute path="/Analytics" component={Analytics} />
                {/* <PrivateRoute path="/Content" component={Content} /> */}
                <PrivateRoute path="/Teams/Chat" component={Chat} />
                <PrivateRoute path="/Teams/Call" component={Call} />
                <PrivateRoute path="/Teams/Details" component={ManageTeams} />
                <PrivateRoute path="/Marketing" component={Marketing} />
                <PrivateRoute path="/Feed/Timeline"  component={PublishedPosts} />
                <PrivateRoute path="/Feed/Wall" component={Wall} />
                <PrivateRoute path="/Planner" component={Planner} />
                <PrivateRoute path="/Settings" component={Settings} />

                {/* <PrivateRoute path="/Content-Posting/Publish" component={Profile} /> */}
              </Switch>

            </Router>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    </StylesProvider>
  );
}

export default App;

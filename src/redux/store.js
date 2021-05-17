import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import rootReducer from "./ducks";

const initialState = {};

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk,logger)
);

const store = createStore(rootReducer(), initialState, enhancer);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
  return store;
};

export default store;
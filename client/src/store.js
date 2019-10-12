import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; //if there is no js in the import statement then it looks for index.js

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,   //reducers
  initialState,  //store should have empty data
  compose(
    applyMiddleware(...middleware),  //enhancers    ... is spread operator,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )   //this is to allow the developers to see the redux store in development phase, not in production
  //applyMiddleware(...middleware)  //enhancers    ... is spread operator,
  
);

export default store;

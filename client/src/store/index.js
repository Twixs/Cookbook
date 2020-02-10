import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';

const middlwares = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlwares)));

export default store;

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    // productsReducer 為 products 的子項目，換句話說 products
    // 收納了 productsReducer 所延伸的 state 們
    combineReducers({products: productsReducer}),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
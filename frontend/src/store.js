import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./Redux/Reducers/product.reducer";

const rootReducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer
});

let initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store

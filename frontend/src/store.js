import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./Redux/product/Reducers/product.reducer";
import { userReducer } from "./Redux/user/user.reducer";

const rootReducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user : userReducer,
});

let initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store

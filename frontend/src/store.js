import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productDetailsReducer, productReducer, productUpdateAndDeleteReducer } from "./Redux/product/Reducers/product.reducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./Redux/order/reducer.order";
import { forgotPasswordReducer, profileReducer, userReducer } from "./Redux/user/user.reducer";
import { persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./Redux/cart/reducer";

const rootReducer = combineReducers({
  products : productReducer,
  productDetails : productDetailsReducer,
  user : userReducer,
  // profile : profileReducer,
  forgotPassword : forgotPasswordReducer,
  cart : cartReducer,
  newOrder : newOrderReducer,
  myOrders : myOrdersReducer,
  orderDetails : orderDetailsReducer,
  newProduct : newProductReducer,
  modifyProduct : productUpdateAndDeleteReducer
});

const persistConfig = {
  key : 'persist-user',
  storage : storage,
  blacklist: ['productDetailsReducer']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

let initialState = {
  cart : {
    cartItems : localStorage.getItem("cartItems")
     ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo : localStorage.getItem("shippingInfo")
       ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {}
  }
};

const middleware = [thunk];

const store = legacy_createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
export default store

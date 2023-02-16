import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./Redux/product/Reducers/product.reducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./Redux/user/user.reducer";
import { persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  products : productReducer,
  productDetails : productDetailsReducer,
  user : userReducer,
  // profile : profileReducer,
  forgotPassword : forgotPasswordReducer
});

const persistConfig = {
  key : 'persist-user',
  storage : storage,
  blacklist: ['productDetailsReducer']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

let initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  persistedReducer,
  // productDetailsReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
export default store

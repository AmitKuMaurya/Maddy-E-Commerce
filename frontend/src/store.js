import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./Redux/product/Reducers/product.reducer";
import { profileReducer, userReducer } from "./Redux/user/user.reducer";
import { persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  products : productReducer,
  productDetails : productDetailsReducer,
  user : userReducer,
  profile : profileReducer,
});

const persistConfig = {
  key : 'persist-user',
  storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

let initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
export default store

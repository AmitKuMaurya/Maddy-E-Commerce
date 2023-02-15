import { Route, Routes } from "react-router-dom";
import "./App.css";
import DetailedProduct from "./Pages/DetailedProduct";
import AllProduct from "./components/AllProduct";
import Header from "./components/Header";
import Main from "./components/Main";
import LoginAndSignup from "./components/user/Login&Signup";
// import { useEffect } from 'react';
// import Search from './components/Search';
// import store from "./store";
import UserProfile from "./components/user/UserProfile";
import UserOptions from "./components/utility/userOptions";
// import { persistUser } from './Redux/user/user.action';
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/PrivateRoute/ProtectedRoute";
import UpdateUserProfile from "./components/user/UpdateUserProfile";
function App() {
  // const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);

  // useEffect(()=>{
  //   store.dispatch(persistUser());
  // },[])

  return (
    <>
      <Header />
      {isAuth ? <UserOptions user={user} /> : null}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<DetailedProduct />} />
        <Route path="/products" element={<AllProduct />} />
        <Route path="/login" element={<LoginAndSignup />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateUserProfile />
            </ProtectedRoute>
          }
        />
        {/* <Route path='/products/:keyword' element={<AllProduct/>} /> */}
        {/* <Route path='/search' element={<Search/>} /> */}
      </Routes>
    </>
  );
}

export default App;
<h1>Hello here is your Maddy's E-commerce</h1>;

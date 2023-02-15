import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({  children }) => {
    const { isAuth } = useSelector((state) => state.user);

//   return (
//         <React.Fragment>
    //   {loading === false && (
         
           if (!isAuth) {
             return <Navigate to="/login" />;
           }

           // if (isAdmin === true && user.role !== "admin") {
           //   return <Navigate to="/login" />;
           // }

           return children
        }

export default ProtectedRoute
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from "../../Context/AuthProvider";
import Navbar from "../navbar";

const PrivateRoute = () => {
     //     const { user } = useAuth();
     const { token } = useSelector(state => state.auth)

     // const navigate = useNavigate();

     // useEffect(() => {
     //      console.log(user, 'user');
     //      if (!user) {
     //           navigate("/login");
     //      }
     // }, [user, navigate]);
     console.log(token, 'this is the reason');
     if (!token) {
          return <Navigate to="/login" />;
     }
     return (
          <>
               <Navbar />
               <Outlet />
          </>
     );
};

export default PrivateRoute;

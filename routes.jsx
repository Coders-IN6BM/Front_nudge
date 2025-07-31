import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Homepage from './src/pages/homePage/homePage.jsx';
import Login from './src/pages/auth/login.jsx';
import ProfileEdit from './src/pages/ProfileEdit/ProfileEdit.jsx';
import Dashboard from './src/pages/dashboard/dashboard.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <ProfileEdit />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './screens/App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import "./index.css";
import ProtectedComponent from './components/protected_route';
import LogIn from './screens/register/login';
import SignUp from './screens/register/signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Stream from './screens/courses/streaming';
import NavBar from './components/nav';
import { LogOut } from './screens/register/utils';
import MyLearning from './screens/learning';
import ExamStart from './screens/exam/exam';
import { ErrorProvider } from './hooks/use_error';




const router = createBrowserRouter([
        {
            path: "/",
            element: <App /> //<ProtectedComponent component={<App />} />
        },
        {
            path : "/login/",
            element: <LogIn />
        },
        {
            path : "/signup/",
            element : <SignUp />
        },
        {
            path : "/lectures/:lectureID",
            element : <ProtectedComponent component={<Stream />} />
        },
        {
            path : "/exam/:id/start/",
            element : <ProtectedComponent component={<ExamStart />} />
        },
        {
            path : "/logout",
            element : <LogOut />
        },
        {
            path : "/learning",
            element : <MyLearning />
        },
        {
            path : "*",
            element : <SignUp />
        }
    ]
);


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
    <ErrorProvider>
        <QueryClientProvider client={queryClient}>
                <NavBar />
                <RouterProvider router={router} />
        </QueryClientProvider>
    </ErrorProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

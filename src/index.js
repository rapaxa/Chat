import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import Reg from "./pages/AuthorPage/Reg";
import Login from "./pages/AuthorPage/Login";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:"reg",
                element:<Reg/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"/",
                element:<LayoutPage/>
            },
        ]

    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);



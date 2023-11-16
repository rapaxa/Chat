import './App.css';
import {Outlet, RouterProvider} from "react-router-dom";
import Header from "./components/Header";
import React from "react";

const  App =()=> {
    return (
        <div className="App ">
            <Header />
             <div className="d-flex justify-content-center">
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
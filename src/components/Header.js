import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isLogin} from "../redux/slice/auth";
import {useEffect, useState} from "react";
import {LogoSVG} from "./LogoSVG";
import {Button} from "antd";

const Header = () => {
    const isUserLoggedIn = useSelector((state) => state.auth.isLogin);
    const dispatch = useDispatch();
    const [stateLogIn, setStateLogIn] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        if (isUserLoggedIn === false) {
            setStateLogIn('Log in')
        } else if (isUserLoggedIn === true) {
            setStateLogIn('Log out')
        }

    }, [isUserLoggedIn])
    const handleLoginToggle = () => {
        dispatch(isLogin(false));
        navigate('/login')
    };
    const handleReg = () => {
        navigate('/reg')
    }
    return (
        <header className="flex-column position-sticky top-0 z-3 d-flex ">
            <nav className="navbar navbar-expand-lg bg-white  bg-opacity-75">
                <div className="container-fluid m-lg-1 d-flex align-items-center">
                    <LogoSVG/>
                    <div className="w-100 navbar-collapse " id="navbarNavDropdown" style={{fontWeight: "bold"}}>
                        <ul className="nav nav-underline w-50 navbar-nav d-flex justify-content-around">

                        </ul>
                        <div className="btn-group w-100 d-flex justify-content-end">
                            <Button type="primary" className="m-1" onClick={handleLoginToggle}>{stateLogIn}</Button>
                            {isUserLoggedIn ? (" ") :
                                <Button className="m-1" style={{color: "yellow"}} onClick={handleReg} type="primary">
                                    Sign In
                                </Button>}
                        </div>

                    </div>

                </div>
            </nav>
        </header>
    )
}
export default Header
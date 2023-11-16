import {useEffect, useState} from "react";
import {signInUser} from "../../firebase/signInUser";
import {useDispatch, useSelector} from "react-redux";
import {isData, isLogin} from "../../redux/slice/auth";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const islogin = useSelector((state) => state.auth.isLogin)
    useEffect(() => {
        if (islogin) {
            navigate('/');
        }

    }, []);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        signInUser(email, password)
            .then(user => {
                const userData = {
                    uid: user.uid,
                    name: user.displayName
                };
                dispatch(isLogin(true))
                dispatch(isData(userData))

                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <main className="w-50">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                           aria-describedby="emailHelp"
                           value={email} onChange={handleEmailChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                           value={password}
                           onChange={handlePasswordChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>

    )
}

export default Login;

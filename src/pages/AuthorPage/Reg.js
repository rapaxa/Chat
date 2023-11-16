import React, {useEffect, useState} from "react";
import {createUser} from "../../firebase/createUser";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {isLogin} from "../../redux/slice/auth";
import {useSelector} from "react-redux";

const Reg = () => {
    const schema = yup.object().shape({
        name: yup.string(), email: yup.string().required('Email is required').email('Invalid email'), password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must contain at least 8 characters'),
    });

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '', password: '', name: ''
    });
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isLogin)

    useEffect(() => {
        if (isLogin) {
            navigate('/main')
        }
    }, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        validateInput('email', event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        validateInput('password', event.target.value);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
        validateInput('name', event.target.value)
    }

    const validateInput = (field, value) => {
        try {
            schema.validateSyncAt(field, {[field]: value});
            setErrors({...errors, [field]: ''});
        } catch (error) {
            setErrors({...errors, [field]: error.message});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validateInput('email', email);
        validateInput('password', password);
        validateInput('name', name)
        if (!errors.email && !errors.password) {
            createUser(email, password, name)
                .then((res) => {
                    console.log(res);
                    navigate('/');
                })
                .catch((error) => {
                    // Handle errors if the request is unsuccessful
                    console.error(error);
                });
        }
    }

    return (<div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">Регистрация</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Имя</label>
                                <input
                                    type="name"
                                    onChange={handleNameChange}
                                    className={`form-control ${errors.name && 'is-invalid'}`}
                                    id="name"
                                    placeholder="Введите имя"
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    onChange={handleEmailChange}
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                    id="email"
                                    placeholder="Введите email"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <input
                                    type="password"
                                    onChange={handlePasswordChange}
                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                    id="password"
                                    placeholder="Введите пароль"
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                                Зарегистрироваться
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Reg;

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { api } from '../../common/api'
import { useStateContext } from "../../context/ContextProvider";

const Login = () => {
    const emailRef: any = useRef();
    const passwordRef: any = useRef();
    const navigate = useNavigate();

    const { setToken, setUser } = useStateContext();
    const [errors, setErrors]: any = useState([]);

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
        };

        api
            .post("/auth/login", payload)
            .then(({ data }) => {
                try {
                    const user = jwtDecode(data.access_token);
                    setToken(data.access_token);
                    setUser(user);
                } catch (error) { }
                navigate('/dashboard')
            })
            .catch((err) => {
                const response = err.response;
                if (response && response?.data?.message) {
                    let { message } = response.data;
                    setErrors(message);
                }
            });
    };

    return (
        <form
            className="custom-form mt-4 pt-2"
            onSubmit={onSubmit}
        >

            <div className="mb-3">
                <input type="email" ref={emailRef} className="form-control" placeholder="Your email address" />
            </div>
            <div className="mb-3">
                <div className="mb-3">
                    <input type="password" ref={passwordRef} className="form-control" placeholder="Your password" />
                </div>
            </div>

            <div className="mb-3">

                <button
                    type="submit"
                    className="btn btn-primary w-100 waves-effect waves-light"
                >
                    Login
                </button>

                <div className="alert">
                    {JSON.stringify(errors)}
                </div>
            </div>
        </form>

    );
};

export default Login;
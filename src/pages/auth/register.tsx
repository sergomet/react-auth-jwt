import { useState } from "react";
import { Link } from "react-router-dom";

import { api } from '../../common/api'
import { useStateContext } from "../../context/ContextProvider";

const Register = () => {

    const [errors, setErrors]: any = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const { setToken, setUser } = useStateContext();

    const onChange = async (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({ ...formData, [name]: value });

    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setErrors(false);

        try {
            const { data } = await api.post('/signup', formData)
            if (data) {
                setToken(data.token);
                setUser(data.user);
            }
        } catch (err: any) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
                console.log(response.data.errors);
            }
        }

    }

    return (
        <>
            <div className="auth-page">
                <form
                    className="needs-validation custom-form mt-4 pt-2"
                    onSubmit={onSubmit}
                >
                    <div className="mb-3">
                        <input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="Enter Password"
                            onChange={onChange}
                        />
                    </div>

                    {errors && (
                        <div className="alert alert-danger">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary w-100 waves-effect waves-light"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="mt-5 text-center">
                    <p className="text-muted mb-0">
                        Already have an account ?{" "}
                        <Link
                            to="/login"
                            className="text-primary fw-semibold"
                        >
                            {" "}
                            Login{" "}
                        </Link>{" "}
                    </p>
                </div>
            </div>

        </>
    );
};

export default Register;
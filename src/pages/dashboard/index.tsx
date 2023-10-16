import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider"

export const Dashboard = () => {
    const { user } = useStateContext();
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                Hello {user.email}
                <div>
                    <Link to={'/logout'}>Logout</Link>
                </div>
            </div>
        </div>
    )
}

import { useSelector } from "react-redux";
import User from "../User/User";
import Admin from "../Admin/Admin";


const ViewRole = () => {
    const user = useSelector(state => state.auth.user)
    console.log(user)
    if (!user) {
        return "No user data available"
    }

    const { email, role = 'user' } = user;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Email: {email}</p>
            <p>Role: {role}</p>
            {role === 'admin' ? (
                <div>
                    <h2>Admin View</h2>
                    <Admin />
                </div>
            ) : (
                <div>
                    <h2>Regular User</h2>
                    <User />
                </div>
            )}
        </div>
    )
}

export default ViewRole;
import { useSelector } from "react-redux";
import RegularUser from "../Views/Admin/RegularUser/RegularUser";
import Dashboard from "../Dashboard/Dashboard";


const User = () => {
    const user = useSelector(state => state.auth.user)
    console.log(user)
    if(!user){
        return "No user data available"
    }

    const {email, uid, role = 'user' } = user;

    return(
        <div>
            <h1>User Profile</h1>
            <p>Email: {email}</p>
            <p>UID: {uid}</p>
            {role === 'admin' ? (
                <div>
                    <h2>Admin View</h2>
                    <Dashboard/>
                </div>
            ) : (
                <div>
                    <h2>Regular User</h2>
                    <RegularUser/>
                </div>
            )}
        </div>
    )
}

export default User;
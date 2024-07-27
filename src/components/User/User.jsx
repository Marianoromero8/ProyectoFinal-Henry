import { useSelector } from "react-redux";
import Admin from "../Views/Admin/Admin";
import RegularUser from "../Views/Admin/RegularUser/RegularUser";


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
                    <Admin/>
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
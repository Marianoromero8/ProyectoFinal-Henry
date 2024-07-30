import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slice/authThunks";
import { useNavigate } from "react-router-dom";

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => navigate('/login'))
    }
    return (
        <div>
            <div>
                <button onClick={handleLogout} disabled={loading}>
                    {loading ? 'logging out ...' : 'Logout'}
                </button>
                <button onClick={() => { navigate('/home') }}>Home</button>
            </div>
            <div>
                <h1>HOLA, ERES UN USUARIO COMUN</h1>
            </div>
        </div>
    )
}

export default User;
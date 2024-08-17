import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

// const RoutProtect = ({ children, role }) => {
//     const navigate = useNavigate();
//     const user = useSelector((state) => state.auth.user)

//     useEffect(() => {
//         if (!user) {
//             navigate('/');
//         } else if (role && user.role !== role) {
//             navigate('/');
//         }
//     }, [user, role, navigate]);

//     if (!user || (role && user.role !== role)) {
//         return <h1>No tienes un usuario registrado</h1>;
//     }

//     if (!user) {
//         return <Loader></Loader>
//     }

//     return children;
// }

// export default RoutProtect;

const RouteProtect = ({ children, roles }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else if (roles && !roles.includes(user.role)) {
            navigate('/');
        }
    }, [user, roles, navigate]);

    if (!user || (roles && !roles.includes(user.role))) {
        return <h1>No tienes acceso</h1>;
    }

    if (!user) {
        return <Loader />;
    }

    return children;
}

export default RouteProtect;
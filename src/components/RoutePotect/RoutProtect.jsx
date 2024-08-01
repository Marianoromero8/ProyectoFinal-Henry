import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoutProtect = ({ children, role }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else if (role && user.role !== role) {
            navigate('/');
        }
    }, [user, role, navigate]);

    if (!user || (role && user.role !== role)) {
        return null;
    }

    return children;
}

export default RoutProtect;
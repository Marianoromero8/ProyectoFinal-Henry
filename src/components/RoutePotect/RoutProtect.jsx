import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoutProtect = ({children, role}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user)

    if(!user){
        return navigate('/')
    }

    if(role && user.role !== role){
        return navigate('/')
    }

    return children;
}

export default RoutProtect;
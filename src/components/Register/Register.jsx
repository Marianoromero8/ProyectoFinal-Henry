import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/auth/authThunks";


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // O 'admin' según el caso
    
    const { loading, error, user } = useSelector((state) => state.auth);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const resultAction = await dispatch(registerUser({ email, password, role }));
  
      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/Login'); // Redirigir a Home
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </form>
    );
}

export default Register;
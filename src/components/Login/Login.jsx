import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slice/authThunks";
import { logout } from "../../store/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/ViewRole");
    }
  }, [user, navigate]);

  return (
    <div className={styles.containerGeneral}>
      <h2 className={styles.h1Titile}>Sign in to ChampionGear</h2>
      <div lassName={styles.container1}>
        <form onSubmit={handleSubmit} className={styles.container1}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </form>
        <div className={styles.formbuttons}>
          <button type="submit" disabled={loading}>
            Login
          </button>
        </div>
      </div>
      <div>
        <p>You don't have an account?</p>
        <Link to="/register">Create an account</Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, loginUser } from "../../store/slice/authThunks";
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

  const handleGoogleLogin = () => {
    dispatch(googleLogin())
  }

  useEffect(() => {
    if (user) {
      navigate("/ViewRole");
    }
  }, [user, navigate]);

  return (
    <div className={styles.containerGeneral}>
      <h2 className={styles.h1Titile}>
        Sign in to<strong> ChampionGear </strong>
      </h2>
      <div className={styles.container1}>
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

          <div className={styles.formbuttons}>
            <button type="submit" disabled={loading}>
              LOGIN
            </button>
          </div>

          <div className={styles.googleButton}>
            <button
              type="button"
              className={styles.buttonGoogle}
              onClick={handleGoogleLogin}
              disabled={loading}>
              Login with Google
            </button>
          </div>
        </form>
        <div className={styles.errorContainer}>{error && <p>{error}</p>}</div>
      </div>
      <div className={styles.containerDown}>
        <p>You don't have an account?</p>
        <Link to="/register" className={styles.containerDownDatos}>
          Create an account
        </Link>

        <Link to="/home" className={styles.containerDownDatosButton}>
          GO HOME
        </Link>
      </div>
    </div>
  );
};

export default Login;

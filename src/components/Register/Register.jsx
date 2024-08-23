import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/slice/authThunks";
import styles from "./Register.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Rol por default
  const role = "user";

  const { loading, error, user } = useSelector((state) => state.auth);
  const handleAlertError = () => {
    MySwal.fire({
      title: "Incomplete Fields",
      text: "Missing required fields.",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#134eff",
      background: "#ece8e8",
      color: "black",
      iconColor: "#ff6e1f",
      customClass: {
        popup: "custom-pop  up",
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return handleAlertError();
    }

    const resultAction = await dispatch(
      registerUser({ email, password, role })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/Login"); // Redirigir a Home
    }
  };

  return (
    <div className={styles.containerGeneral}>
      <h2 className={styles.h1Titile}>
        Sign<strong> up</strong>{" "}
      </h2>
      <div>
        <form onSubmit={handleSubmit} className={styles.container1}>
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
          <div className={styles.formbuttons}>
            <button type="submit">REGISTER</button>
          </div>
          <div className={styles.errorContainer}>
            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <div className={styles.containerDown}>
            <p>Do you have an account?</p>
            <Link to="/login" className={styles.containerDownDatos}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

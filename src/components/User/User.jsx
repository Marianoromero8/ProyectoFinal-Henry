import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slice/authThunks";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => navigate("/login"));
  };

  return (
    <div className={styles.containerGeneral}>
      <h1>
        Hello, you are a <strong>regular user </strong>.
      </h1>
      <div className={styles.containerButtons}>
        <button onClick={handleLogout} disabled={loading}>
          {loading ? "logging out ..." : "Logout"}
        </button>
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default User;

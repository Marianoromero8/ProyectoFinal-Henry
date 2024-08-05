import { useSelector } from "react-redux";
import User from "../User/User";
import Admin from "../Admin/Admin";

import styles from "./ViewRole.module.css";

const ViewRole = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  if (!user) {
    return "No user data available";
  }

  const { email, role = "user" } = user;

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      <p>
        Email: <strong> {email}</strong>{" "}
      </p>
      <p>
        Role: <strong>{role} </strong>
      </p>
      {role === "admin" ? (
        <div>
          <h2>Admin View</h2>
          <Admin />
        </div>
      ) : (
        <div className={styles.container2}>
          <User />
        </div>
      )}
    </div>
  );
};

export default ViewRole;

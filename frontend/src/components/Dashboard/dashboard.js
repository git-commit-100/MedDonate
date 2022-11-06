import React, { useContext } from "react";
import { AppContext } from "../../utils/store/appContext";
import Card from "../layout/UI/Card";
import styles from "./dashboard.module.scss";
import { FaHandsHelping } from "react-icons/fa";
import { RiSyringeLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { SlNotebook } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { email } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className={styles["dashboard-div"]}>
      <h2 className={styles["dahsboard-header"]}>Welcome, {email}</h2>

      <div className={styles["dashboard"]}>
        <Card className={styles["card"]} onClick={() => navigate("/donate")}>
          <FaHandsHelping className={styles["icon"]} />
          <h3 className={styles["card-title"]}>Donate Medicine</h3>
          <p className={styles["card-desc"]}>
            Someone could benefit from the perfectly good medicine that you have
            in your home. Lend a helping hand to those in need by donating
            instead of disposing.
          </p>
        </Card>

        <Card className={styles["card"]} onClick={() => navigate("/recieve")}>
          <RiSyringeLine className={styles["icon"]} />
          <h3 className={styles["card-title"]}>Receive Medication</h3>
          <p className={styles["card-desc"]}>
            Receive information of medicines from donor in your vicinty/area no
            time. Remember to stay strong, tough times shall pass.
          </p>
        </Card>

        <Card
          className={styles["card"]}
          onClick={() => navigate("/my-donations")}
        >
          <SlNotebook className={styles["icon"]} />
          <h3 className={styles["card-title"]}>My Donations</h3>
          <p className={styles["card-desc"]}>
            Review your medicine donations. See information about who are in
            need of your medicine.
          </p>
        </Card>

        <Card
          className={styles["card"]}
          onClick={() => navigate("/my-profile")}
        >
          <BiUserCircle className={styles["icon"]} />
          <h3 className={styles["card-title"]}>My Profile</h3>
          <p className={styles["card-desc"]}>
            Review your profile. Edit your information to make sure you keep
            your profile updated so as someone in need would able to ask for
            your help.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

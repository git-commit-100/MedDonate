import React from "react";
import styles from "./Admin.module.scss";
import Card from "../layout/UI/Card";
import Section from "../layout/UI/Section";
import { useNavigate } from "react-router-dom";
import { BiDonateBlood, BiDonateHeart } from "react-icons/bi";

function Admin() {
  const navigate = useNavigate();
  return (
    <div className={styles["admin-dashboard-div"]}>
      <h2 className={styles["admin-dahsboard-header"]}>Welcome, Admin</h2>

      <div className={styles["admin-dashboard"]}>
        <Card
          className={styles["card"]}
          onClick={() => navigate("/admin/donations")}
        >
          <BiDonateHeart className={styles["icon"]} />
          <h3 className={styles["card-title"]}>View Donations</h3>
          <p className={styles["card-desc"]}>
            Review donations that are taking place in the portal. This feature
            is for admin purpose only.
          </p>
        </Card>

        <Card
          className={styles["card"]}
          onClick={() => navigate("/admin/receive")}
        >
          <BiDonateBlood className={styles["icon"]} />
          <h3 className={styles["card-title"]}>Review Receive Requests</h3>
          <p className={styles["card-desc"]}>
            Review receiev requests that are taking place in the portal. This
            feature is for admin purpose only.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Section(Admin, "admin", "secondary");

import React, { useEffect, useState } from "react";
import styles from "./AdminDonations.module.scss";
import Input from "../../layout/UI/Input";
import useInput from "../../../utils/hooks/useInput";
import Card from "../../layout/UI/Card";
import { BiBlock } from "react-icons/bi";
import Button from "../../layout/UI/Button";
import Section from "../../layout/UI/Section";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LocalImage from "../../../utils/localImage";

function AdminDonations() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {
    value: searchInput,
    handleInputChange: searchInputChange,
    handleInputBlur: searchInputBlur,
    resetInput: resestSearch,
  } = useInput(() => {});

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/donate")
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function getMedicines(filter) {
    let medObj = [...data];

    if (filter) {
      medObj = medObj.filter((ele) =>
        ele.donatingUserInfo.city.toLocaleLowerCase().includes(filter)
      );
      if (medObj.length === 0) {
        // meaning city is not available for donation
        // return no city found message
        return (
          <Card className={styles["no-med-found"]}>
            <div className={styles["info"]}>
              <BiBlock className={styles["icon"]} />
              <p> No City Found !</p>
            </div>
            <p>
              Currently, there are no medicines up for donation at this city :(
            </p>
          </Card>
        );
      }
    }
    return medObj.map((med) => {
      return (
        <li className={styles["medicine-item"]} key={med.id}>
          <Card className={styles["medicine-card"]}>
            <div className={styles["img-div"]}>
              <img src={LocalImage(med.medImg)} alt="medicine" />
            </div>
            <div className={styles["medicine-info"]}>
              <h4>{med.medName}</h4>
              <p>{med.medDesc}</p>
              <h4>
                <span>Date of expiry:&nbsp;</span>
                {med.doe}
              </h4>
              <h4>
                <span>City:&nbsp;</span>
                {med.donatingUserInfo.city}
              </h4>
              {med.adminApproveDonation && (
                <h4 style={{ color: "#2191f7" }}>
                  <span>Status :&nbsp;</span>
                  Approved
                </h4>
              )}
              <div className={styles["actions-div"]}>
                <Button
                  type="secondary"
                  text={"Review Medicine"}
                  onClick={() => {
                    navigate(`/admin/review/${med.id}`);
                  }}
                />
              </div>
            </div>
          </Card>
        </li>
      );
    });
  }

  return (
    <div className={styles["donations-div"]}>
      <div className={styles["donations-info"]}>
        <h2>Review Donations here</h2>
      </div>

      <div className={styles["donations-main"]}>
        <div className={styles["donations-search-div"]}>
          <Input
            inputConfig={{ type: "search", autoComplete: "none" }}
            label="Search for city"
            useInputHook={{
              value: searchInput,
              handleInputChange: searchInputChange,
              handleInputBlur: searchInputBlur,
              resetInput: resestSearch,
            }}
            required={true}
          />
        </div>

        <div className={styles["medicines-div"]}>
          <h3>Medicines up for donation</h3>
          <ul className={styles["medicines-list"]}>
            {searchInput
              ? getMedicines(searchInput.toLocaleLowerCase())
              : getMedicines()}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Section(AdminDonations, "admin-donations", "secondary");
